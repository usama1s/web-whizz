<?php
// Anonymous usage statistics from the Flow Bulk Downloader extension (its background.js → trySend()), shown in the admin
// dashboard's "Flow usage" tab. At most one message a day per install, and only when the user ran a download (plus one
// "new install" message on the first day). The user can turn it off in the extension's popup.
// Each message holds what changed since the extension's last send: numbers and short codes, no ID of any kind.
// It is appended to a CSV OUTSIDE the web root, so nobody can download it from the site:
//   /home2/codifyp1/web-whizz-data/flow-usage.csv
// Only the fields below are kept, everything else is dropped. IP addresses are not stored (only a salted hash, for an
// hour, for the rate limit). Answers JSON; only the extension's own origin may read the reply (CORS).
//
// Keep in sync with the extension's background.js (STATS_NUMS, STATS_MAPS, ERR_CODES) and the admin dashboard (USAGE_*).

const ORIGINS = ['chrome-extension://cbnojammdmehkhjmngnomofcjejleglf'];
const FILE = 'flow-usage.csv';
const PER_HOUR = 30; // messages per IP per hour (many installs can share one IP behind a company or mobile network)

// Field in the message → CSV column. Counts are whole numbers (what changed since the last send).
const FLAGS = ['new' => 'new', 'wk' => 'weekFirst', 'mo' => 'monthFirst'];
const COUNTS = ['r' => 'runs', 'ok' => 'okRuns', 'f' => 'files', 's' => 'skipped', 'e' => 'errRuns', 'x' => 'stopped',
  'xu' => 'stopUser', 'xc' => 'stopCredits', 'xq' => 'stopPrompt', 'xp' => 'stopPage',
  'pick' => 'pick', 'wait' => 'wait', 'home' => 'home', 'newOnly' => 'newOnly', 'folder' => 'folder'];
// d: days since install, as a range only (0, 1-7, 8-30, 31-90, 91+), so one install's messages can't be linked by it.
const LABELS = ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'd' => '/^(0|1-7|8-30|31-90|91\+)$/'];
// "name:count,name:count": qualities used in good runs, and why items were skipped (only these codes).
const MAPS = ['qv' => null, 'qi' => null,
  'er' => ['menu', 'quality', 'plan', 'hidden', 'flow', 'timeout', 'ask', 'declined', 'notFound', 'genFailed', 'stillGen', 'project', 'other']];
const COLUMNS = ['date', 'v', 'lang', 'new', 'weekFirst', 'monthFirst', 'age', 'runs', 'okRuns', 'files', 'skipped', 'errRuns', 'stopped',
  'stopUser', 'stopCredits', 'stopPrompt', 'stopPage', 'pick', 'wait', 'home', 'newOnly', 'folder', 'qv', 'qi', 'er'];
// New columns go at the end only (the dashboard reads cells by the file's header).

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';

ob_start(); // see feedback.php: a stray warning must never break the JSON reply

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
function reply(bool $ok, int $status = 200): void {
  global $origin;
  while (ob_get_level()) ob_end_clean();
  http_response_code($status);
  if (in_array($origin, ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
  }
  header('Content-Type: application/json');
  header('Cache-Control: no-store');
  header('X-Robots-Tag: noindex');
  echo json_encode(['ok' => $ok]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Allow: POST');
  reply(false, 405);
}
// Only the extension sends these. A browser always says which page or extension a request comes from.
if (!in_array($origin, ORIGINS, true)) reply(false, 403);

$str = fn($k) => is_string($_POST[$k] ?? null) ? trim($_POST[$k]) : '';

$row = ['date' => gmdate('c')];
foreach (LABELS as $k => $re) $row[$k === 'd' ? 'age' : $k] = preg_match($re, $str($k)) ? $str($k) : '';
foreach (FLAGS as $k => $column) $row[$column] = $str($k) === '1' ? '1' : '';
foreach (COUNTS as $k => $column) {
  $v = $str($k);
  $row[$column] = ctype_digit($v) && strlen($v) <= 7 ? $v : '';
}
foreach (MAPS as $k => $allowed) {
  $parts = [];
  foreach (array_slice(explode(',', $str($k)), 0, 20) as $part) {
    if (!preg_match('/^([\w .+-]{1,12}):(\d{1,7})$/', $part, $m) || (int)$m[2] < 1) continue;
    if ($allowed !== null && !in_array($m[1], $allowed, true)) continue;
    $parts[$m[1]] = (int)$m[2];
  }
  $row[$k] = implode(',', array_map(fn($name, $n) => "$name:$n", array_keys($parts), $parts));
}

// A message must say something: a new install, or at least one run.
if ($row['new'] === '' && (int)$row['runs'] < 1) reply(false, 400);
if ($row['v'] === '') reply(false, 400);

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true)) reply(false, 500);

// Rate limit per IP (hashed, kept an hour). Over the limit: ok:false with 429, so the extension tries again another day.
$rh = fopen($dataDir . '/usage-rate.json', 'c+');
if ($rh && flock($rh, LOCK_EX)) {
  $now = time();
  $seen = json_decode(stream_get_contents($rh) ?: '{}', true) ?: [];
  foreach ($seen as $k => $times) {
    $seen[$k] = array_values(array_filter($times, fn($t) => $t > $now - 3600));
    if (!$seen[$k]) unset($seen[$k]);
  }
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
  $tooMany = count($seen[$ip] ?? []) >= PER_HOUR;
  if (!$tooMany) $seen[$ip][] = $now;
  ftruncate($rh, 0);
  rewind($rh);
  fwrite($rh, json_encode($seen));
  flock($rh, LOCK_UN);
  fclose($rh);
  if ($tooMany) reply(false, 429);
}

$file = $dataDir . '/' . FILE;
$fh = fopen($file, 'a');
if (!$fh || !flock($fh, LOCK_EX)) reply(false, 500);
clearstatcache(true, $file);
if (filesize($file) === 0) fputcsv($fh, COLUMNS, ',', '"', '\\');
// A leading = + - @ would run as a formula when the CSV is opened in Excel (labels like "-x" can't, but be safe).
$cells = array_map(fn($c) => preg_match('/^[=+\-@\t\r]/', (string)($row[$c] ?? '')) ? "'" . $row[$c] : (string)($row[$c] ?? ''), COLUMNS);
fputcsv($fh, $cells, ',', '"', '\\');
flock($fh, LOCK_UN);
fclose($fh);

reply(true);
