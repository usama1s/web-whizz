<?php
// "Pro coming soon" waitlist for the Flow Bulk Downloader page (copied into dist/api/ by the build).
// Each new email is appended to a CSV OUTSIDE the web root, so nobody can download the list:
//   /home2/codifyp1/web-whizz-data/flow-pro-waitlist.csv   (download it from cPanel → File Manager)
// and a short notice is emailed to NOTIFY. Answers JSON for the page's fetch(), or redirects back without JavaScript.
// Spam protection, no captcha: hidden honeypot field, a time check, a real-address check, and 3 signups per IP per hour.

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

// Bot checks. A bot gets the same "you're on the list" as a person, so it learns nothing; nothing is saved or emailed.
// 1. Bots fill the hidden "website" field.
if (!empty($_POST['website'])) reply(true, $lang);
// 2. The page sends "elapsed": seconds between the form appearing and being sent, measured by the browser alone.
//    Missing (posted without running the page), under 3 s (no person types an email that fast), or over a day
//    (a replayed form) → a bot.
$elapsed = isset($_POST['elapsed']) && ctype_digit((string)$_POST['elapsed']) ? (int)$_POST['elapsed'] : -1;
if ($elapsed < 3 || $elapsed > 86400) reply(true, $lang);

$email = strtolower(trim((string)($_POST['email'] ?? '')));
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(false, $lang);

// Addresses that can't receive mail: test domains, throwaway inboxes, and domains with no mail server.
// These are usually typos or tests, so the visitor sees the error and can fix it.
$domain = substr(strrchr($email, '@'), 1);
$fake = ['example.com', 'example.net', 'example.org', 'test.com', 'mailinator.com', 'guerrillamail.com', 'sharklasers.com',
  'yopmail.com', '10minutemail.com', 'temp-mail.org', 'tempmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com'];
if (in_array($domain, $fake, true) || preg_match('/\.(example|test|invalid|localhost|local)$/', $domain)) reply(false, $lang);
if (!checkdnsrr($domain, 'MX') && !checkdnsrr($domain, 'A')) reply(false, $lang);

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true)) reply(false, $lang);

// 3. At most 3 signups per visitor (IP address) per hour. Only a hash of the IP is kept, and only for an hour.
$rateFile = $dataDir . '/waitlist-rate.json';
$rh = fopen($rateFile, 'c+');
if ($rh && flock($rh, LOCK_EX)) {
  $now = time();
  $seen = json_decode(stream_get_contents($rh) ?: '{}', true) ?: [];
  foreach ($seen as $k => $times) {
    $seen[$k] = array_values(array_filter($times, fn($t) => $t > $now - 3600));
    if (!$seen[$k]) unset($seen[$k]);
  }
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
  $tooMany = count($seen[$ip] ?? []) >= 3;
  if (!$tooMany) $seen[$ip][] = $now;
  ftruncate($rh, 0);
  rewind($rh);
  fwrite($rh, json_encode($seen));
  flock($rh, LOCK_UN);
  fclose($rh);
  if ($tooMany) reply(true, $lang);
}

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
