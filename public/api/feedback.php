<?php
// Answers from the extensions' three surveys (src/components/Survey.jsx): welcome, goodbye (uninstall) and feedback.
// One endpoint for every product; the form's hidden "product" field picks which (missing = flow, for older pages).
// Every answer is appended to that product's CSV OUTSIDE the web root, so nobody can download it from the site:
//   /home2/codifyp1/web-whizz-data/flow-feedback.csv             (Flow Bulk Downloader)
//   /home2/codifyp1/web-whizz-data/smart-sentinel-feedback.csv   (Smart Sentinel)
//   /home2/codifyp1/web-whizz-data/sidekick-boomi-feedback.csv   (Sidekick for Boomi)
//   /home2/codifyp1/web-whizz-data/turn-off-ai-feedback.csv     (AI-Free Web)
// (download them from cPanel → File Manager) and a short summary is emailed to NOTIFY. Answers JSON for the page's fetch().
// Only known values are kept (the lists below match the questions on each product's survey page); everything else is dropped.
// Spam protection like waitlist.php: hidden honeypot field, a time check, and 5 answers per IP per hour (all products together).

const NOTIFY = 'support@web-whizz.com';
const TYPES = ['welcome', 'goodbye', 'feedback'];

// choices: questions with one fixed answer · multi: pick-all-that-apply · texts: free text and its max length
// counts: usage counts the extension puts in the page address (small whole numbers), renamed to their CSV column
// labels: short text values from the address, with the pattern they must match
// required: the one answer each survey can't be sent without
const PRODUCTS = [
  // Keep in sync with src/pages/FlowSurvey.jsx and the extension's background.js → pageUrl().
  'flow' => [
    'name' => 'Flow Bulk Downloader',
    'file' => 'flow-feedback.csv',
    'choices' => [
      'reason' => ['broken', 'quality', 'slow', 'confusing', 'once', 'other_tool', 'no_flow', 'other'],
      'plan' => ['free', 'plus', 'pro', 'ultra', 'unsure'],
      'source' => ['store', 'google', 'youtube', 'social', 'friend', 'ai', 'other'],
      'volume' => ['1-10', '10-50', '50-200', '200+'],
      'chain' => ['yes', 'maybe', 'no'],
      'rating' => ['1', '2', '3', '4', '5'],
    ],
    'multi' => [
      'use' => ['youtube', 'social', 'ads', 'film', 'client', 'learning', 'personal'],
      'want' => ['chain', 'export', 'credits', 'prompts', 'failed', 'zip'],
    ],
    'texts' => ['tool' => 200, 'stay' => 2000, 'good' => 2000, 'bad' => 2000],
    'counts' => ['d' => 'days', 'r' => 'runs', 'ok' => 'okRuns', 'f' => 'files', 's' => 'skipped', 'e' => 'errRuns', 'x' => 'stopped',
      'pick' => 'pick', 'wait' => 'wait', 'home' => 'home', 'newOnly' => 'newOnly', 'folder' => 'folder'],
    'labels' => ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'qv' => '/^[\w .+-]{1,12}$/', 'qi' => '/^[\w .+-]{1,12}$/', 'from' => '/^(popup|ask|site)$/'],
    'columns' => ['date', 'type', 'v', 'lang', 'from', 'days', 'runs', 'okRuns', 'files', 'skipped', 'errRuns', 'stopped',
      'pick', 'wait', 'home', 'newOnly', 'folder', 'qv', 'qi',
      'reason', 'tool', 'rating', 'plan', 'use', 'source', 'volume', 'want', 'chain', 'stay', 'bad', 'good', 'email'],
  ],
  // Keep in sync with src/pages/SentinelSurvey.jsx and the extension's src/lib/usage.ts → pageUrl().
  'sentinel' => [
    'name' => 'Smart Sentinel',
    'file' => 'smart-sentinel-feedback.csv',
    'choices' => [
      'reason' => ['broken', 'timing', 'lost', 'confusing', 'access', 'missing', 'once', 'other_tool', 'other'],
      'source' => ['store', 'google', 'youtube', 'social', 'friend', 'ai', 'other'],
      'before' => ['manual', 'other_ext', 'script', 'new'],
      'monitor' => ['yes', 'maybe', 'no'],
      'rating' => ['1', '2', '3', '4', '5'],
    ],
    'multi' => [
      'use' => ['tickets', 'booking', 'stock', 'dashboard', 'queue', 'live', 'dev', 'other'],
      'want' => ['change', 'keyword', 'typing', 'scroll', 'list', 'autostart', 'sound'],
    ],
    'texts' => ['tool' => 200, 'stay' => 2000, 'good' => 2000, 'bad' => 2000],
    'counts' => ['d' => 'days', 'st' => 'starts', 'rl' => 'reloads', 'er' => 'errors', 'fin' => 'finished',
      'site' => 'site', 'random' => 'random', 'custom' => 'custom', 'stop' => 'stop', 'hard' => 'hard', 'sched' => 'sched', 'daily' => 'daily'],
    'labels' => ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'iv' => '/^\d{1,4}[smh]$/', 'from' => '/^(popup|ask|site)$/'],
    'columns' => ['date', 'type', 'v', 'lang', 'from', 'days', 'starts', 'reloads', 'errors', 'finished',
      'site', 'random', 'custom', 'stop', 'hard', 'sched', 'daily', 'iv',
      'reason', 'tool', 'rating', 'use', 'source', 'before', 'want', 'monitor', 'stay', 'bad', 'good', 'email'],
  ],
  // Keep in sync with src/pages/SidekickSurvey.jsx and the extension's src/shared/usage.ts → pageUrl().
  'sidekick' => [
    'name' => 'Sidekick for Boomi',
    'file' => 'sidekick-boomi-feedback.csv',
    'choices' => [
      'reason' => ['broken', 'conflict', 'slow', 'confusing', 'trust', 'missing', 'no_boomi', 'other_tool', 'other'],
      'role' => ['developer', 'consultant', 'admin', 'learning', 'other'],
      'source' => ['store', 'google', 'community', 'linkedin', 'friend', 'ai', 'other'],
      'rating' => ['1', '2', '3', '4', '5'],
    ],
    'multi' => [
      'want' => ['map', 'search', 'diff', 'docs', 'logs', 'team'],
    ],
    'texts' => ['tool' => 200, 'stay' => 2000, 'good' => 2000, 'bad' => 2000],
    'counts' => ['d' => 'days', 'ed' => 'editorOpens', 'ip' => 'inPlace', 'sp' => 'setProps', 'kb' => 'shortcuts'],
    'labels' => ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'from' => '/^(popup|site)$/'],
    'columns' => ['date', 'type', 'v', 'lang', 'from', 'days', 'editorOpens', 'inPlace', 'setProps', 'shortcuts',
      'reason', 'tool', 'rating', 'role', 'source', 'want', 'stay', 'bad', 'good', 'email'],
  ],
  // Keep in sync with src/pages/TurnOffAiSurvey.jsx and the extension's src/shared/usage.ts → pageUrl().
  'turnoffai' => [
    'name' => 'AI-Free Web',
    'file' => 'turn-off-ai-feedback.csv',
    'choices' => [
      'reason' => ['missed', 'broke', 'slow', 'confusing', 'want_ai', 'trust', 'other_tool', 'other'],
      'role' => ['everyday', 'office', 'writer', 'privacy', 'it', 'other'],
      'source' => ['store', 'google', 'reddit', 'social', 'news', 'friend', 'ai', 'other'],
      'rating' => ['1', '2', '3', '4', '5'],
    ],
    'multi' => [
      'annoy' => ['overviews', 'gmail', 'docs', 'youtube', 'outlook', 'office', 'linkedin', 'bing'],
      'want' => ['meta', 'amazon', 'x', 'notion', 'canva', 'zoom', 'firefox'],
    ],
    'texts' => ['tool' => 200, 'where' => 300, 'stay' => 2000, 'good' => 2000, 'bad' => 2000],
    'counts' => ['d' => 'days', 'p' => 'pages', 'h' => 'hidden', 'o' => 'showOnce', 'rp' => 'reports', 'cr' => 'customRules',
      'ru' => 'rulesOk', 'rf' => 'rulesFail'],
    // top: the site with most hidden; off: sites switched off (site ids from the extension's bundled.json)
    'labels' => ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'top' => '/^[a-z0-9]{1,12}$/',
      'off' => '/^[a-z0-9]{1,12}(,[a-z0-9]{1,12}){0,19}$/', 'from' => '/^(popup|site)$/'],
    'columns' => ['date', 'type', 'v', 'lang', 'from', 'days', 'pages', 'hidden', 'showOnce', 'reports', 'customRules', 'rulesOk', 'rulesFail',
      'top', 'off', 'reason', 'tool', 'where', 'rating', 'role', 'source', 'annoy', 'want', 'stay', 'bad', 'good', 'email'],
  ],
];

const REQUIRED = ['goodbye' => 'reason', 'feedback' => 'rating'];

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';

// Anything PHP prints by itself (a warning or notice, if the host shows them) is held back and thrown away in reply(),
// so the page always gets clean JSON. Otherwise the answer is saved but the page can't read the reply and says
// "That didn't go through", and people send it again.
ob_start();

function reply(bool $ok): void {
  while (ob_get_level()) ob_end_clean();
  header('Content-Type: application/json');
  header('Cache-Control: no-store');
  echo json_encode(['ok' => $ok]);
  exit;
}

// The email is only a heads-up; the answer is already saved. If the host has mail() turned off (on PHP 8 calling it
// is then a fatal error that @ doesn't hide) or sending fails, skip it rather than break the visitor's reply.
function notify(string $subject, string $body): void {
  if (!function_exists('mail')) return;
  try { @mail(NOTIFY, $subject, $body, 'From: Web Whizz <' . NOTIFY . '>'); } catch (\Throwable $e) {}
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  header('Allow: POST');
  exit;
}

$str = fn($k) => is_string($_POST[$k] ?? null) ? trim($_POST[$k]) : '';

$key = $str('product') === '' ? 'flow' : $str('product');
if (!isset(PRODUCTS[$key])) reply(false);
$p = PRODUCTS[$key];
$file = $dataDir . '/' . $p['file'];

$type = $str('type');
if (!in_array($type, TYPES, true)) reply(false);

// Bot checks (see waitlist.php). A bot gets ok:true too, so it learns nothing; nothing is saved or emailed.
if (!empty($_POST['website'])) reply(true);
$elapsed = isset($_POST['elapsed']) && ctype_digit((string)$_POST['elapsed']) ? (int)$_POST['elapsed'] : -1;
if ($elapsed < 2 || $elapsed > 86400) reply(true);

$row = ['date' => gmdate('c'), 'type' => $type];

foreach ($p['labels'] as $k => $re) $row[$k] = preg_match($re, $str($k)) ? $str($k) : '';
foreach ($p['counts'] as $k => $column) {
  $v = $str($k);
  $row[$column] = ctype_digit($v) && strlen($v) <= 7 ? $v : '';
}
foreach ($p['choices'] as $k => $allowed) $row[$k] = in_array($str($k), $allowed, true) ? $str($k) : '';
foreach ($p['multi'] as $k => $allowed) {
  $picked = is_array($_POST[$k] ?? null) ? $_POST[$k] : [];
  $row[$k] = implode(' ', array_values(array_intersect($allowed, $picked)));
}
foreach ($p['texts'] as $k => $max) $row[$k] = mb_substr(preg_replace('/\s+/u', ' ', $str($k)), 0, $max);

$email = strtolower($str('email'));
$row['email'] = $email !== '' && strlen($email) <= 254 && filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : '';

// The one required answer per survey.
if (isset(REQUIRED[$type]) && ($row[REQUIRED[$type]] ?? '') === '') reply(false);

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
if (filesize($file) === 0) fputcsv($fh, $p['columns'], ',', '"', '\\');
// A leading = + - @ would run as a formula when the CSV is opened in Excel.
$cells = array_map(fn($c) => preg_match('/^[=+\-@\t\r]/', (string)($row[$c] ?? '')) ? "'" . $row[$c] : (string)($row[$c] ?? ''), $p['columns']);
fputcsv($fh, $cells, ',', '"', '\\');
flock($fh, LOCK_UN);
fclose($fh);

// Short summary by email, so new answers don't wait for someone to open the CSV.
$lines = [];
foreach ($p['columns'] as $c) if ($c !== 'date' && ($row[$c] ?? '') !== '') $lines[] = "$c: " . $row[$c];
$reason = $row['reason'] ?? '';
$rating = $row['rating'] ?? '';
notify("{$p['name']}: new $type answer" . ($reason ? " ($reason)" : '') . ($rating ? " ({$rating}★)" : ''), implode("\n", $lines));

reply(true);
