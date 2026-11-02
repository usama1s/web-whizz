<?php
// "Pro coming soon" waitlist for the Flow Bulk Downloader page (copied into dist/api/ by the build).
// Each new email is appended to a CSV OUTSIDE the web root, so nobody can download the list:
//   /home2/codifyp1/web-whizz-data/flow-pro-waitlist.csv   (download it from cPanel → File Manager)
// and a short notice is emailed to NOTIFY. Answers JSON for the page's fetch(), or redirects back without JavaScript.

const NOTIFY = 'support@web-whizz.com';
const BACK = '/e/flow-downloader/';
const LANGS = ['en', 'tr', 'vi', 'pt-BR', 'es', 'id'];

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';
$file = $dataDir . '/flow-pro-waitlist.csv';

function reply(bool $ok, string $lang): void {
  $wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
  if ($wantsJson) {
    header('Content-Type: application/json');
    header('Cache-Control: no-store');
    echo json_encode(['ok' => $ok]);
  } else {
    $page = $lang === 'en' ? BACK : '/' . explode('-', $lang)[0] . BACK;
    header('Location: ' . $page . '?waitlist=' . ($ok ? 'ok' : 'error') . '#pro', true, 303);
  }
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Allow: POST');
  exit;
}

$lang = in_array($_POST['lang'] ?? '', LANGS, true) ? $_POST['lang'] : 'en';

// Bots fill the hidden "website" field; pretend it worked.
if (!empty($_POST['website'])) reply(true, $lang);

$email = strtolower(trim((string)($_POST['email'] ?? '')));
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(false, $lang);

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true)) reply(false, $lang);

$fh = fopen($file, 'c+');
if (!$fh || !flock($fh, LOCK_EX)) reply(false, $lang);

// Already on the list → nothing to add, still a success for the visitor.
$known = false;
while (($row = fgetcsv($fh, 0, ',', '"', '\\')) !== false) {
  if (ltrim($row[1] ?? '', "'") === $email) { $known = true; break; }
}
if (!$known) {
  if (ftell($fh) === 0) fputcsv($fh, ['date', 'email', 'lang'], ',', '"', '\\');
  fseek($fh, 0, SEEK_END);
  // A leading = + - @ would run as a formula when the CSV is opened in Excel.
  $cell = preg_match('/^[=+\-@]/', $email) ? "'" . $email : $email;
  fputcsv($fh, [gmdate('c'), $cell, $lang], ',', '"', '\\');
}
flock($fh, LOCK_UN);
fclose($fh);

if (!$known) {
  @mail(NOTIFY, 'Flow Pro waitlist: new signup', "$email ($lang) joined the Flow Bulk Downloader Pro waitlist.", 'From: Web Whizz <' . NOTIFY . '>');
}

reply(true, $lang);
