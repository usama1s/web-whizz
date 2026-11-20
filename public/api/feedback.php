<?php
// Answers from the extension's three surveys (src/pages/FlowSurvey.jsx): welcome, goodbye (uninstall) and feedback.
// Every answer is appended to a CSV OUTSIDE the web root, so nobody can download it from the site:
//   /home2/codifyp1/web-whizz-data/flow-feedback.csv   (download it from cPanel → File Manager)
// and a short summary is emailed to NOTIFY. Answers JSON for the page's fetch().
// Only known values are kept (the lists below match the questions on the page); everything else is dropped.
// Spam protection like waitlist.php: hidden honeypot field, a time check, and 5 answers per IP per hour.

const NOTIFY = 'support@web-whizz.com';
const TYPES = ['welcome', 'goodbye', 'feedback'];

// Questions with fixed answers. Keep in sync with src/pages/FlowSurvey.jsx.
const CHOICES = [
  'reason' => ['broken', 'quality', 'slow', 'confusing', 'once', 'other_tool', 'no_flow', 'other'],
  'plan' => ['free', 'plus', 'pro', 'ultra', 'unsure'],
  'source' => ['store', 'google', 'youtube', 'social', 'friend', 'ai', 'other'],
  'volume' => ['1-10', '10-50', '50-200', '200+'],
  'chain' => ['yes', 'maybe', 'no'],
  'rating' => ['1', '2', '3', '4', '5'],
];
const MULTI = [
  'use' => ['youtube', 'social', 'ads', 'film', 'client', 'learning', 'personal'],
  'want' => ['chain', 'export', 'credits', 'prompts', 'failed', 'zip'],
];
const TEXTS = ['tool' => 200, 'stay' => 2000, 'good' => 2000, 'bad' => 2000];
// Usage counts the extension puts in the page address (background.js → pageUrl()): small whole numbers…
const COUNTS = ['d', 'r', 'ok', 'f', 's', 'e', 'x', 'pick', 'wait', 'home', 'newOnly', 'folder'];
// …and short labels.
const LABELS = ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'qv' => '/^[\w .+-]{1,12}$/', 'qi' => '/^[\w .+-]{1,12}$/', 'from' => '/^(popup|ask)$/'];

const COLUMNS = ['date', 'type', 'v', 'lang', 'from', 'days', 'runs', 'okRuns', 'files', 'skipped', 'errRuns', 'stopped',
  'pick', 'wait', 'home', 'newOnly', 'folder', 'qv', 'qi',
  'reason', 'tool', 'rating', 'plan', 'use', 'source', 'volume', 'want', 'chain', 'stay', 'bad', 'good', 'email'];

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';
$file = $dataDir . '/flow-feedback.csv';

function reply(bool $ok): void {
  header('Content-Type: application/json');
  header('Cache-Control: no-store');
  echo json_encode(['ok' => $ok]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Allow: POST');
  exit;
}

$type = $_POST['type'] ?? '';
if (!in_array($type, TYPES, true)) reply(false);

// Bot checks (see waitlist.php). A bot gets ok:true too, so it learns nothing; nothing is saved or emailed.
if (!empty($_POST['website'])) reply(true);
$elapsed = isset($_POST['elapsed']) && ctype_digit((string)$_POST['elapsed']) ? (int)$_POST['elapsed'] : -1;
if ($elapsed < 2 || $elapsed > 86400) reply(true);

$str = fn($k) => is_string($_POST[$k] ?? null) ? trim($_POST[$k]) : '';
$row = ['date' => gmdate('c'), 'type' => $type];

foreach (LABELS as $k => $re) $row[$k] = preg_match($re, $str($k)) ? $str($k) : '';
$names = ['d' => 'days', 'r' => 'runs', 'ok' => 'okRuns', 'f' => 'files', 's' => 'skipped', 'e' => 'errRuns', 'x' => 'stopped'];
foreach (COUNTS as $k) {
  $v = $str($k);
  $row[$names[$k] ?? $k] = ctype_digit($v) && strlen($v) <= 7 ? $v : '';
}
foreach (CHOICES as $k => $allowed) $row[$k] = in_array($str($k), $allowed, true) ? $str($k) : '';
foreach (MULTI as $k => $allowed) {
  $picked = is_array($_POST[$k] ?? null) ? $_POST[$k] : [];
  $row[$k] = implode(' ', array_values(array_intersect($allowed, $picked)));
}
foreach (TEXTS as $k => $max) $row[$k] = mb_substr(preg_replace('/\s+/u', ' ', $str($k)), 0, $max);

$email = strtolower($str('email'));
$row['email'] = $email !== '' && strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';

// The one required answer per survey.
if ($type === 'goodbye' && $row['reason'] === '') reply(false);
if ($type === 'feedback' && $row['rating'] === '') reply(false);

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true)) reply(false);

// At most 5 answers per visitor (IP address) per hour. Only a hash of the IP is kept, and only for an hour.
$rh = fopen($dataDir . '/feedback-rate.json', 'c+');
if ($rh && flock($rh, LOCK_EX)) {
  $now = time();
  $seen = json_decode(stream_get_contents($rh) ?: '{}', true) ?: [];
  foreach ($seen as $k => $times) {
    $seen[$k] = array_values(array_filter($times, fn($t) => $t > $now - 3600));
    if (!$seen[$k]) unset($seen[$k]);
  }
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
  $tooMany = count($seen[$ip] ?? []) >= 5;
  if (!$tooMany) $seen[$ip][] = $now;
  ftruncate($rh, 0);
  rewind($rh);
  fwrite($rh, json_encode($seen));
  flock($rh, LOCK_UN);
  fclose($rh);
  if ($tooMany) reply(true);
}

$fh = fopen($file, 'a');
if (!$fh || !flock($fh, LOCK_EX)) reply(false);
clearstatcache(true, $file);
if (filesize($file) === 0) fputcsv($fh, COLUMNS, ',', '"', '\\');
// A leading = + - @ would run as a formula when the CSV is opened in Excel.
$cells = array_map(fn($c) => preg_match('/^[=+\-@\t\r]/', (string)($row[$c] ?? '')) ? "'" . $row[$c] : (string)($row[$c] ?? ''), COLUMNS);
fputcsv($fh, $cells, ',', '"', '\\');
flock($fh, LOCK_UN);
fclose($fh);

// Short summary by email, so new answers don't wait for someone to open the CSV.
$lines = [];
foreach (COLUMNS as $c) if ($c !== 'date' && ($row[$c] ?? '') !== '') $lines[] = "$c: " . $row[$c];
@mail(NOTIFY, "Flow Bulk Downloader: new $type answer" . ($row['reason'] ? " ({$row['reason']})" : '') . ($row['rating'] ? " ({$row['rating']}★)" : ''),
  implode("\n", $lines), 'From: Web Whizz <' . NOTIFY . '>');

reply(true);
