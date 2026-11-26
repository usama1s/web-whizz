<?php
// Private admin dashboard: https://web-whizz.com/admin/ (copied into dist/admin/ by the build).
// Shows the answers that public/api/feedback.php and waitlist.php save OUTSIDE the web root:
//   /home2/codifyp1/web-whizz-data/flow-feedback.csv, smart-sentinel-feedback.csv, sidekick-boomi-feedback.csv,
//   flow-pro-waitlist.csv, turn-off-ai-feedback.csv
// and Turn Off AI's opt-in usage statistics and element reports (public/api/toa-usage.php, toa-report.php).
// Nothing on the site links here, it is never indexed (X-Robots-Tag), and every page needs the super admin login.
//
// Login: one super admin. Only a bcrypt hash of the password is stored here (this repo is public).
// To change the password, run:   php -r 'echo password_hash("NEW PASSWORD", PASSWORD_BCRYPT, ["cost" => 12]), "\n";'
// paste the result into ADMIN_HASH, then rebuild and upload. Changing it also signs out every open session.
// 5 wrong passwords from one IP lock that IP out for 15 minutes (web-whizz-data/admin-login-rate.json).
//
// The answer values (codes like "broken" or "other_tool") are turned into readable text with LABELS below.
// Keep them in sync with src/pages/FlowSurvey.jsx, SentinelSurvey.jsx, SidekickSurvey.jsx and TurnOffAiSurvey.jsx; an unknown code is shown as is.

const ADMIN_USER = 'usamamunir1s@gmail.com'; // lowercase; the login form ignores case and spaces around it
const ADMIN_HASH = '$2y$12$hT6fNaRvvb3zcOUErhGn3OqGKedLKXgkncIvzSMnin7G4MrCywwie';
const IDLE_LIMIT = 2 * 3600;      // signed out after 2 hours without a click
const SESSION_LIMIT = 12 * 3600;  // and after 12 hours in any case
const MAX_FAILS = 5;
const LOCK_SECONDS = 15 * 60;
const PER_PAGE = 50;

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';

const SOURCES = [
  'flow' => ['name' => 'Flow Bulk Downloader', 'file' => 'flow-feedback.csv'],
  'sentinel' => ['name' => 'Smart Sentinel', 'file' => 'smart-sentinel-feedback.csv'],
  'sidekick' => ['name' => 'Sidekick for Boomi', 'file' => 'sidekick-boomi-feedback.csv'],
  'waitlist' => ['name' => 'Pro waitlist', 'file' => 'flow-pro-waitlist.csv'],
  'turnoffai' => ['name' => 'Turn Off AI', 'file' => 'turn-off-ai-feedback.csv'],
  'toausage' => ['name' => 'Turn Off AI usage', 'file' => 'turn-off-ai-usage.csv'],
  'toareports' => ['name' => 'Turn Off AI reports', 'file' => 'turn-off-ai-reports.csv'],
];
const TYPES = ['welcome' => 'Welcome', 'goodbye' => 'Goodbye', 'feedback' => 'Feedback'];

const SOURCE_Q = ['store' => 'Chrome Web Store search', 'google' => 'Google search', 'youtube' => 'YouTube video',
  'social' => 'Social site', 'friend' => 'Friend or colleague', 'ai' => 'AI assistant', 'other' => 'Somewhere else'];
const YMN = ['yes' => 'Yes', 'maybe' => 'Maybe', 'no' => 'No'];

const LABELS = [
  'flow' => [
    'reason' => ['broken' => "Didn't work / downloads failed or stuck", 'quality' => 'Wanted quality not on their Flow plan',
      'slow' => 'Too slow', 'confusing' => "Couldn't figure out how to use it", 'once' => 'Only needed it once',
      'other_tool' => 'Found another tool', 'no_flow' => "Doesn't use Google Flow anymore", 'other' => 'Something else'],
    'plan' => ['free' => 'Free', 'plus' => 'Google AI Plus', 'pro' => 'Google AI Pro', 'ultra' => 'Google AI Ultra', 'unsure' => 'Not sure'],
    'source' => SOURCE_Q,
    'volume' => ['1-10' => '1–10 a week', '10-50' => '10–50 a week', '50-200' => '50–200 a week', '200+' => '200+ a week'],
    'chain' => YMN,
    'use' => ['youtube' => 'YouTube / Shorts', 'social' => 'TikTok, Reels, social', 'ads' => 'Ads / marketing',
      'film' => 'Films, music videos, stories', 'client' => 'Client work', 'learning' => 'Courses / explainers', 'personal' => 'Just for fun'],
    'want' => ['chain' => 'Prompt list → one continuous video', 'export' => 'Export to CapCut / Premiere / DaVinci',
      'credits' => 'Credits used per video', 'prompts' => 'Prompts sheet with each file',
      'failed' => 'Failed generations list (refunds)', 'zip' => 'Download all as one ZIP'],
  ],
  'sentinel' => [
    'reason' => ['broken' => 'Stopped refreshing / missed reloads', 'timing' => "Reloads didn't happen at the set time",
      'lost' => 'A reload lost typed text or scroll position', 'confusing' => "Couldn't figure out how to use it",
      'access' => "Didn't want to give site access", 'missing' => 'Missing a feature', 'once' => 'Only needed it once',
      'other_tool' => 'Found another tool', 'other' => 'Something else'],
    'source' => SOURCE_Q,
    'before' => ['manual' => 'Pressed reload by hand', 'other_ext' => 'Another auto refresh extension', 'script' => 'A script or bot', 'new' => 'New need'],
    'monitor' => YMN,
    'use' => ['tickets' => 'Tickets / drops / limited sales', 'booking' => 'Appointment or booking slots', 'stock' => 'Back in stock / price changes',
      'dashboard' => 'Dashboards / monitoring', 'queue' => 'Queues, tickets, job boards', 'live' => 'Live scores, news, auctions, trading',
      'dev' => 'Own website while building', 'other' => 'Something else'],
    'want' => ['change' => 'Alert when the page changes', 'keyword' => 'Alert when a word appears/disappears', 'typing' => 'Pause while typing',
      'scroll' => 'Keep scroll position', 'list' => 'List of all refreshing tabs', 'autostart' => 'Auto-start on certain pages',
      'sound' => 'Sound / desktop notification'],
  ],
  'sidekick' => [
    'reason' => ['broken' => "Didn't work on their Boomi screens", 'conflict' => "Got in the way of Boomi's editor or keys",
      'slow' => 'Boomi felt slower', 'confusing' => "Couldn't figure out how to use it", 'trust' => "Didn't want an extension on their Boomi account",
      'missing' => 'Missing a feature', 'no_boomi' => "Doesn't work with Boomi any more", 'other_tool' => 'Found another tool', 'other' => 'Something else'],
    'role' => ['developer' => 'Builds integrations for their company', 'consultant' => 'Consultant / partner', 'admin' => 'Supports, monitors or reviews',
      'learning' => 'Learning Boomi', 'other' => 'Something else'],
    'source' => SOURCE_Q + ['community' => 'Boomi Community / forum', 'linkedin' => 'LinkedIn'],
    'want' => ['map' => 'Map function / map script editor', 'search' => 'Search inside every shape and script', 'diff' => 'Compare script/process versions',
      'docs' => 'Export process documentation', 'logs' => 'Easier Test mode documents and logs', 'team' => 'Share snippets and dictionary with team'],
  ],
  'turnoffai' => [
    'reason' => ['missed' => 'AI was still showing', 'broke' => 'Hid something they needed / broke a page', 'slow' => 'Pages felt slower',
      'confusing' => "Couldn't figure out how to use it", 'want_ai' => 'Wants the AI features after all',
      'trust' => "Didn't want an extension on email/documents", 'other_tool' => 'Found another tool', 'other' => 'Something else'],
    'role' => ['everyday' => 'Everyday user (Gmail, Search, YouTube)', 'office' => 'Office worker (Microsoft 365 web)', 'writer' => 'Writer / student / teacher',
      'privacy' => 'Privacy-minded', 'it' => 'IT / manages browsers', 'other' => 'Something else'],
    'source' => SOURCE_Q + ['reddit' => 'Reddit / forum', 'news' => 'News article or blog'],
    'annoy' => ['overviews' => 'AI Overviews / AI Mode', 'gmail' => 'Gemini in Gmail', 'docs' => 'Gemini in Docs/Sheets/Slides/Drive', 'youtube' => 'AI on YouTube',
      'outlook' => 'Copilot in Outlook', 'office' => 'Copilot in Word/Excel/PowerPoint', 'linkedin' => 'AI on LinkedIn', 'bing' => 'Copilot in Bing'],
    'want' => ['meta' => 'Meta AI (FB/IG/WhatsApp)', 'amazon' => 'Amazon Rufus', 'x' => 'Grok on X', 'notion' => 'Notion AI', 'canva' => 'Canva AI',
      'zoom' => 'Zoom AI Companion', 'firefox' => 'Firefox version'],
  ],
];
// Turn Off AI site ids (the extension's src/rules/bundled.json) → names, for the usage and reports tabs.
const TOA_SITES = ['search' => 'Google Search', 'gmail' => 'Gmail', 'docs' => 'Google Docs', 'drive' => 'Google Drive', 'sheets' => 'Sheets & Slides',
  'youtube' => 'YouTube', 'outlook' => 'Outlook', 'office' => 'Word/Excel/PowerPoint', 'linkedin' => 'LinkedIn', 'bing' => 'Bing', 'other' => 'Other'];
const TOA_NUMS = ['pages', 'hidden', 'showOnce', 'reports', 'customRules', 'rulesOk', 'rulesFail'];
const TOA_PERIODS = [7 => 'Last 7 days', 30 => 'Last 30 days', 90 => 'Last 90 days', 0 => 'All time'];

// Questions shown on each answer, in order: [column, label]. Usage counts go in the collapsible "Usage" line.
const QUESTIONS = [
  'flow' => [['reason', 'Reason'], ['tool', 'Other tool'], ['plan', 'Flow plan'], ['source', 'Found us via'], ['volume', 'Volume'],
    ['chain', 'Would use prompt chaining'], ['use', 'Makes'], ['want', 'Would use']],
  'sentinel' => [['reason', 'Reason'], ['tool', 'Other tool'], ['source', 'Found us via'], ['before', 'Used before'],
    ['monitor', 'Would use change alerts'], ['use', 'Refreshes'], ['want', 'Would use']],
  'sidekick' => [['reason', 'Reason'], ['tool', 'Other tool'], ['role', 'Role'], ['source', 'Found us via'], ['want', 'Would use']],
  'turnoffai' => [['reason', 'Reason'], ['tool', 'Other tool'], ['role', 'Role'], ['source', 'Found us via'], ['annoy', 'Bothered most by'],
    ['want', 'Sites to cover next'], ['top', 'Most hidden on'], ['off', 'Sites switched off']],
];
const TEXTS = [['where', 'Where (site / element)'], ['stay', 'What would have made them stay'], ['bad', 'Fix or add'], ['good', 'Works well']];
const USAGE = [
  'flow' => ['days' => 'days installed', 'runs' => 'runs', 'okRuns' => 'ok runs', 'files' => 'files', 'skipped' => 'skipped',
    'errRuns' => 'error runs', 'stopped' => 'stopped', 'pick' => 'pick', 'wait' => 'wait', 'home' => 'home',
    'newOnly' => 'newOnly', 'folder' => 'folder', 'qv' => 'video quality', 'qi' => 'image quality'],
  'sentinel' => ['days' => 'days installed', 'starts' => 'starts', 'reloads' => 'reloads', 'errors' => 'errors', 'finished' => 'finished',
    'site' => 'site', 'random' => 'random', 'custom' => 'custom', 'stop' => 'stop', 'hard' => 'hard', 'sched' => 'sched',
    'daily' => 'daily', 'iv' => 'top interval'],
  'sidekick' => ['days' => 'days installed', 'editorOpens' => 'full editor opens', 'inPlace' => 'in-place editors', 'setProps' => 'Set Properties opens',
    'shortcuts' => 'shortcuts used'],
  'turnoffai' => ['days' => 'days installed', 'pages' => 'pages cleaned', 'hidden' => 'AI elements hidden', 'showOnce' => '"show once" uses',
    'reports' => 'reports sent', 'customRules' => 'own rules', 'rulesOk' => 'rule updates', 'rulesFail' => 'rejected rule files'],
];

// ---------------------------------------------------------------------------------------------------------------
// Security headers on every response.
header('X-Robots-Tag: noindex, nofollow, noarchive');
header('Cache-Control: no-store, private');
header('Referrer-Policy: no-referrer');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");

$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? '') == 443;
session_name($https ? '__Host-ww_admin' : 'ww_admin');
session_set_cookie_params(['lifetime' => 0, 'path' => '/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
ini_set('session.use_strict_mode', '1');
session_start();

$self = strtok($_SERVER['REQUEST_URI'] ?? '/admin/', '?');
$now = time();

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function go(string $url): void { header('Location: ' . $url, true, 303); exit; }
function csrf(): string { return $_SESSION['csrf'] ??= bin2hex(random_bytes(32)); }
function csrfOk(): bool { return is_string($_POST['csrf'] ?? null) && isset($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], $_POST['csrf']); }

// The session is tied to the current password hash, so changing ADMIN_HASH signs everyone out.
$authed = ($_SESSION['user'] ?? '') === ADMIN_USER
  && hash_equals($_SESSION['key'] ?? '', hash('sha256', ADMIN_HASH))
  && $now - ($_SESSION['seen'] ?? 0) < IDLE_LIMIT
  && $now - ($_SESSION['since'] ?? 0) < SESSION_LIMIT;
if (!$authed && isset($_SESSION['user'])) { $_SESSION = []; session_regenerate_id(true); }

// Failed logins per IP (hashed), kept LOCK_SECONDS. Returns the number of recent failures; $add records one more.
function fails(string $dataDir, bool $add = false, bool $clear = false): int {
  if (!is_dir($dataDir) && !@mkdir($dataDir, 0700, true)) return 0;
  $fh = @fopen($dataDir . '/admin-login-rate.json', 'c+');
  if (!$fh || !flock($fh, LOCK_EX)) return 0;
  $now = time();
  $all = json_decode(stream_get_contents($fh) ?: '{}', true) ?: [];
  foreach ($all as $k => $t) { $all[$k] = array_values(array_filter($t, fn($x) => $x > $now - LOCK_SECONDS)); if (!$all[$k]) unset($all[$k]); }
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__);
  if ($add) $all[$ip][] = $now;
  if ($clear) unset($all[$ip]);
  $n = count($all[$ip] ?? []);
  ftruncate($fh, 0); rewind($fh); fwrite($fh, json_encode($all)); flock($fh, LOCK_UN); fclose($fh);
  return $n;
}

$action = $_POST['action'] ?? '';
$error = '';

if ($action === 'login') {
  if (!csrfOk()) {
    $error = 'The form expired. Please try again.';
  } elseif (fails($dataDir) >= MAX_FAILS) {
    $error = 'Too many wrong attempts. Try again in 15 minutes.';
  } else {
    $user = is_string($_POST['user'] ?? null) ? strtolower(trim($_POST['user'])) : '';
    $pass = is_string($_POST['pass'] ?? null) ? $_POST['pass'] : '';
    $passOk = password_verify($pass, ADMIN_HASH); // always checked, so a wrong username takes as long as a wrong password
    if (hash_equals(ADMIN_USER, $user) && $passOk) {
      fails($dataDir, false, true);
      session_regenerate_id(true);
      $_SESSION = ['user' => ADMIN_USER, 'key' => hash('sha256', ADMIN_HASH), 'since' => $now, 'seen' => $now, 'csrf' => bin2hex(random_bytes(32))];
      go($self);
    }
    $left = MAX_FAILS - fails($dataDir, true);
    $error = $left > 0 ? 'Wrong username or password.' : 'Too many wrong attempts. Try again in 15 minutes.';
  }
}

if ($action === 'logout' && $authed && csrfOk()) {
  $_SESSION = [];
  session_destroy();
  go($self);
}

if (!$authed) { loginPage($error); exit; }
$_SESSION['seen'] = $now;

// ---------------------------------------------------------------------------------------------------------------
// Signed in.
$src = isset(SOURCES[$_GET['src'] ?? '']) ? $_GET['src'] : 'flow';
$file = $dataDir . '/' . SOURCES[$src]['file'];

if (isset($_GET['download'])) {
  if (!is_file($file)) { http_response_code(404); exit('No answers yet.'); }
  header('Content-Type: text/csv; charset=utf-8');
  header('Content-Disposition: attachment; filename="' . basename($file, '.csv') . '-' . gmdate('Y-m-d') . '.csv"');
  readfile($file);
  exit;
}

function readCsv(string $file): array {
  if (!is_file($file) || !($fh = fopen($file, 'r'))) return [];
  flock($fh, LOCK_SH);
  $head = fgetcsv($fh, null, ',', '"', '\\');
  $rows = [];
  while ($head && ($cells = fgetcsv($fh, null, ',', '"', '\\')) !== false) {
    if ($cells === [null]) continue;
    $row = [];
    // feedback.php puts a ' in front of = + - @ so Excel doesn't run them; take it off for showing.
    foreach ($head as $i => $c) $row[$c] = preg_replace("/^'(?=[=+\\-@\\t\\r])/", '', (string)($cells[$i] ?? ''));
    $rows[] = $row;
  }
  flock($fh, LOCK_UN);
  fclose($fh);
  return array_reverse($rows); // newest first
}

$counts = [];
foreach (SOURCES as $k => $s) {
  $f = $dataDir . '/' . $s['file'];
  $counts[$k] = is_file($f) ? max(0, count(file($f, FILE_SKIP_EMPTY_LINES)) - 1) : 0;
}

$all = readCsv($file);
$type = isset(TYPES[$_GET['type'] ?? '']) ? $_GET['type'] : '';
$q = trim(is_string($_GET['q'] ?? null) ? $_GET['q'] : '');
$written = !empty($_GET['written']);

$rows = array_values(array_filter($all, function ($r) use ($type, $q, $written) {
  if ($type !== '' && ($r['type'] ?? '') !== $type) return false;
  if ($written && trim(($r['stay'] ?? '') . ($r['bad'] ?? '') . ($r['good'] ?? '') . ($r['tool'] ?? '')) === '') return false;
  if ($q !== '' && mb_stripos(implode(' ', $r), $q) === false) return false;
  return true;
}));

function label(string $src, string $col, string $v): string { return LABELS[$src][$col][$v] ?? $v; }
function tally(array $rows, string $col, bool $multi = false): array {
  $t = [];
  foreach ($rows as $r) {
    $v = trim($r[$col] ?? '');
    if ($v === '') continue;
    foreach ($multi ? explode(' ', $v) : [$v] as $x) $t[$x] = ($t[$x] ?? 0) + 1;
  }
  arsort($t);
  return $t;
}
function url(array $change): string {
  global $self;
  $p = array_merge(array_intersect_key($_GET, array_flip(['src', 'type', 'q', 'written', 'days'])), $change);
  $p = array_filter($p, fn($v) => $v !== '' && $v !== null && $v !== 0);
  return $self . ($p ? '?' . http_build_query($p) : '');
}
function when(string $iso): string {
  $t = strtotime($iso);
  if (!$t) return $iso;
  $d = time() - $t;
  $ago = $d < 3600 ? max(1, intdiv($d, 60)) . ' min ago' : ($d < 86400 ? intdiv($d, 3600) . ' h ago' : ($d < 30 * 86400 ? intdiv($d, 86400) . ' d ago' : ''));
  return gmdate('j M Y, H:i', $t) . ' UTC' . ($ago ? " · $ago" : '');
}

$page = max(1, (int)($_GET['page'] ?? 1));
$pages = max(1, (int)ceil(count($rows) / PER_PAGE));
$page = min($page, $pages);
$shown = array_slice($rows, ($page - 1) * PER_PAGE, PER_PAGE);

$week = count(array_filter($all, fn($r) => strtotime($r['date'] ?? '') > $now - 7 * 86400));
$byType = tally($all, 'type');
$ratings = tally($rows, 'rating');
$rated = array_sum($ratings);
$avg = $rated ? array_sum(array_map(fn($k, $n) => $k * $n, array_keys($ratings), $ratings)) / $rated : 0;

// ---- Turn Off AI usage (toa-usage.php) and reports (toa-report.php). toa* names: Flow's usage tab has its own helpers.
function toaMonday(int $t): int { return gmmktime(0, 0, 0, (int)gmdate('n', $t), (int)gmdate('j', $t) - (int)gmdate('N', $t) + 1, (int)gmdate('Y', $t)); }
function toaMap(string $v): array {
  $o = [];
  foreach (explode(',', $v) as $part) if (preg_match('/^(.+):(\d+)$/', $part, $m)) $o[$m[1]] = (int)$m[2];
  return $o;
}
function toaPct(int $part, int $whole): string { return $whole ? round($part / $whole * 100) . '%' : '—'; }
function toaStats(array $all, int $days, int $now): array {
  $zero = array_fill_keys(TOA_NUMS, 0);
  $weeks = [];
  for ($i = 0, $w = toaMonday($now); $i < 12; $i++, $w -= 7 * 86400) $weeks[$w] = ['active' => 0, 'new' => 0] + $zero;
  $since = $days ? $now - $days * 86400 : 0;
  $u = ['total' => $zero, 'new' => 0, 'messages' => 0, 'versions' => [], 'rules' => [], 'langs' => [], 'sites' => [], 'off' => [], 'masterOff' => 0, 'managed' => 0];
  foreach ($all as $r) {
    $t = strtotime($r['date'] ?? '') ?: 0;
    $w = toaMonday($t);
    if (isset($weeks[$w])) {
      $weeks[$w]['active'] += ($r['weekFirst'] ?? '') === '1' ? 1 : 0;
      $weeks[$w]['new'] += ($r['new'] ?? '') === '1' ? 1 : 0;
      foreach (TOA_NUMS as $c) $weeks[$w][$c] += (int)($r[$c] ?? 0);
    }
    if ($t < $since) continue;
    $u['messages']++;
    $u['new'] += ($r['new'] ?? '') === '1' ? 1 : 0;
    $u['masterOff'] += ($r['masterOff'] ?? '') === '1' ? 1 : 0;
    $u['managed'] += ($r['managed'] ?? '') === '1' ? 1 : 0;
    foreach (TOA_NUMS as $c) $u['total'][$c] += (int)($r[$c] ?? 0);
    $v = ($r['v'] ?? '') !== '' ? $r['v'] : '?';
    $u['versions'][$v] ??= ['messages' => 0] + $zero;
    $u['versions'][$v]['messages']++;
    foreach (TOA_NUMS as $c) $u['versions'][$v][$c] += (int)($r[$c] ?? 0);
    if (($r['rulesVersion'] ?? '') !== '') $u['rules'][$r['rulesVersion']] = ($u['rules'][$r['rulesVersion']] ?? 0) + 1;
    if (($r['lang'] ?? '') !== '') $u['langs'][$r['lang']] = ($u['langs'][$r['lang']] ?? 0) + 1;
    foreach (toaMap($r['sites'] ?? '') as $k => $n) $u['sites'][$k] = ($u['sites'][$k] ?? 0) + $n;
    foreach (array_filter(explode(',', $r['off'] ?? '')) as $k) $u['off'][$k] = ($u['off'][$k] ?? 0) + 1;
  }
  uksort($u['versions'], fn($a, $b) => version_compare($b, $a));
  foreach (['rules', 'langs', 'sites', 'off'] as $k) arsort($u[$k]);
  $u['weeks'] = $weeks;
  return $u;
}
function toaBars(string $title, array $t, array $labels = [], string $empty = 'None yet.', string $note = ''): void {
  $t = array_filter($t);
  arsort($t);
  $max = $t ? max($t) : 1; ?>
  <div class="card chart">
    <h3><?= h($title) ?></h3>
    <?php if ($note): ?><p class="muted"><?= h($note) ?></p><?php endif; ?>
    <?php if (!$t): ?><p class="muted"><?= h($empty) ?></p><?php endif; ?>
    <?php foreach ($t as $k => $n): $l = $labels[$k] ?? (string)$k; ?>
      <div class="bar"><span class="l" title="<?= h($l) ?>"><?= h($l) ?></span>
        <span class="track"><span style="width:<?= round($n / $max * 100) ?>%"></span></span><span class="c"><?= number_format($n) ?></span></div>
    <?php endforeach; ?>
  </div>
<?php }
$days = (int)($_GET['days'] ?? 30);
if (!isset(TOA_PERIODS[$days])) $days = 30;
$TU = $src === 'toausage' ? toaStats($all, $days, $now) : null;
// Reports grouped by host + selector, most reported first.
$TR = [];
if ($src === 'toareports') {
  foreach ($all as $r) {
    $k = ($r['host'] ?? '') . ' ' . ($r['selector'] ?? '');
    $TR[$k] ??= ['n' => 0, 'last' => $r['date'] ?? '', 'r' => $r, 'versions' => []];
    $TR[$k]['n']++;
    $TR[$k]['versions'][$r['v'] ?? ''] = true;
  }
  uasort($TR, fn($a, $b) => $b['n'] <=> $a['n'] ?: strcmp($b['last'], $a['last']));
}

pageTop(SOURCES[$src]['name'] . ' — Admin');
?>
<header class="top">
  <div class="brand"><span class="logo">W</span> Web Whizz <span class="tag">Admin</span></div>
  <form method="post" class="out">
    <span class="who">Signed in as <b><?= h(ADMIN_USER) ?></b></span>
    <input type="hidden" name="csrf" value="<?= h(csrf()) ?>">
    <button name="action" value="logout" class="ghost">Sign out</button>
  </form>
</header>

<main>
  <nav class="tabs">
    <?php foreach (SOURCES as $k => $s): ?>
      <a href="<?= h($self . '?src=' . $k) ?>" class="<?= $k === $src ? 'on' : '' ?>"><?= h($s['name']) ?> <span class="n"><?= $counts[$k] ?></span></a>
    <?php endforeach; ?>
  </nav>

<?php if ($src === 'toausage'):
  $T = $TU['total'];
  $thisWeek = reset($TU['weeks']);
  $lastWeek = next($TU['weeks']); ?>
  <section class="tiles">
    <div class="tile"><span>Active installs this week</span><b><?= number_format($thisWeek['active']) ?></b><small>last week <?= number_format($lastWeek['active']) ?></small></div>
    <div class="tile"><span>New installs</span><b><?= number_format($TU['new']) ?></b><small><?= h(TOA_PERIODS[$days]) ?></small></div>
    <div class="tile"><span>Pages cleaned</span><b><?= number_format($T['pages']) ?></b><small><?= h(TOA_PERIODS[$days]) ?></small></div>
    <div class="tile"><span>AI elements hidden</span><b><?= number_format($T['hidden']) ?></b><small><?= $T['pages'] ? number_format($T['hidden'] / $T['pages'], 1) . ' per page' : '—' ?></small></div>
    <div class="tile"><span>"Show AI once"</span><b><?= number_format($T['showOnce']) ?></b><small><?= toaPct($T['showOnce'], $T['pages']) ?> of pages</small></div>
    <div class="tile"><span>Rule files rejected</span><b><?= number_format($T['rulesFail']) ?></b><small><?= number_format($T['rulesOk']) ?> updates installed</small></div>
  </section>

  <form class="filters" method="get" action="<?= h($self) ?>">
    <div class="chips">
      <?php foreach (TOA_PERIODS as $d => $l): ?><a href="<?= h($self . '?src=toausage' . ($d === 30 ? '' : '&days=' . $d)) ?>" class="<?= $d === $days ? 'on' : '' ?>"><?= h($l) ?></a><?php endforeach; ?>
    </div>
    <span class="muted grow">Opt-in (off by default): only installs that turned statistics on. At most one message per install per day, only after a page was cleaned. No IDs.</span>
    <a class="btn ghost" href="<?= h($self . '?src=toausage&download=1') ?>">Download CSV</a>
  </form>

  <section class="card">
    <div class="head"><h2>By week</h2><span class="muted">Weeks start on Monday (UTC). Active = opted-in installs that cleaned a page that week.</span></div>
    <div class="scroll"><table>
      <thead><tr><th>Week of</th><th>Active installs</th><th>New installs</th><th>Pages cleaned</th><th>AI hidden</th><th>Show once</th><th>Reports</th><th>Own rules</th></tr></thead>
      <tbody><?php foreach ($TU['weeks'] as $w => $r): ?><tr>
        <td><?= gmdate('j M Y', $w) ?></td><td><?= number_format($r['active']) ?></td><td><?= number_format($r['new']) ?></td><td><?= number_format($r['pages']) ?></td>
        <td><?= number_format($r['hidden']) ?></td><td><?= number_format($r['showOnce']) ?></td><td><?= number_format($r['reports']) ?></td><td><?= number_format($r['customRules']) ?></td>
      </tr><?php endforeach; ?></tbody>
    </table></div>
  </section>

  <section class="card">
    <div class="head"><h2>By version</h2><span class="muted"><?= h(TOA_PERIODS[$days]) ?></span></div>
    <?php if (!$TU['versions']): ?><p class="empty">No usage messages yet.</p><?php else: ?>
    <div class="scroll"><table>
      <thead><tr><th>Version</th><th>Messages</th><th>Pages cleaned</th><th>Hidden per page</th><th>Show once</th><th>Reports</th><th>Rules rejected</th></tr></thead>
      <tbody><?php foreach ($TU['versions'] as $v => $r): ?><tr>
        <td><?= h($v) ?></td><td><?= number_format($r['messages']) ?></td><td><?= number_format($r['pages']) ?></td>
        <td><?= $r['pages'] ? number_format($r['hidden'] / $r['pages'], 1) : '—' ?></td><td><?= toaPct($r['showOnce'], $r['pages']) ?></td>
        <td><?= number_format($r['reports']) ?></td><td><?= number_format($r['rulesFail']) ?></td>
      </tr><?php endforeach; ?></tbody>
    </table></div>
    <?php endif; ?>
  </section>

  <section class="charts">
    <?php
    toaBars('AI elements hidden, by site', $TU['sites'], TOA_SITES, 'Nothing hidden yet.', 'A site that drops suddenly may mean its rules broke.');
    toaBars('Sites switched off (messages)', $TU['off'], TOA_SITES, 'No site switched off.');
    toaBars('Rules version (messages)', $TU['rules']);
    toaBars('Browser language (messages)', $TU['langs']);
    toaBars('Master switch off / managed', ['Master switch off' => $TU['masterOff'], 'Managed by an organization' => $TU['managed']]);
    ?>
  </section>

<?php elseif ($src === 'toareports'): ?>
  <section class="tiles">
    <div class="tile"><span>Reports</span><b><?= number_format(count($all)) ?></b></div>
    <div class="tile"><span>Last 7 days</span><b><?= $week ?></b></div>
    <div class="tile"><span>Different elements</span><b><?= number_format(count($TR)) ?></b></div>
  </section>
  <section class="card">
    <div class="head"><h2>Elements still showing</h2><span class="muted">Most reported first. Turn the good ones into rules (bundled.json in the extension repo → npm run rules:sign → public/e/turn-off-ai/rules/).</span>
      <a class="btn ghost" href="<?= h($self . '?src=toareports&download=1') ?>">Download CSV</a></div>
    <?php if (!$TR): ?><p class="empty">No reports yet.</p><?php else: ?>
    <div class="scroll"><table>
      <thead><tr><th>Reports</th><th>Site</th><th>Host</th><th>Label</th><th>Element</th><th>Proposed selector</th><th>Last</th><th>Versions</th></tr></thead>
      <tbody><?php foreach (array_slice($TR, 0, 300) as $g): $r = $g['r']; ?><tr>
        <td><b><?= number_format($g['n']) ?></b></td><td><?= h(TOA_SITES[$r['site'] ?? ''] ?? ($r['site'] ?? '')) ?></td><td><?= h($r['host'] ?? '') ?></td>
        <td><?= h($r['label'] ?? '') ?></td><td><?= h(trim(($r['tag'] ?? '') . ' ' . ($r['role'] ?? ''))) ?></td>
        <td><code><?= h($r['selector'] ?? '') ?></code><?= ($r['stable'] ?? '') === '1' ? '' : ' <span class="muted">(unstable)</span>' ?></td>
        <td><?= h(when($g['last'])) ?></td><td><?= h(implode(', ', array_filter(array_keys($g['versions'])))) ?></td>
      </tr><?php endforeach; ?></tbody>
    </table></div>
    <?php endif; ?>
  </section>

<?php elseif ($src === 'waitlist'): ?>
  <section class="tiles">
    <div class="tile"><span>Signups</span><b><?= count($all) ?></b></div>
    <div class="tile"><span>Last 7 days</span><b><?= $week ?></b></div>
  </section>
  <section class="card">
    <div class="head"><h2>Signups</h2><a class="btn" href="<?= h($self . '?src=waitlist&download=1') ?>">Download CSV</a></div>
    <?php if (!$all): ?><p class="empty">No signups yet.</p><?php else: ?>
    <div class="scroll"><table>
      <thead><tr><?php foreach (array_keys($all[0]) as $c): ?><th><?= h($c) ?></th><?php endforeach; ?></tr></thead>
      <tbody><?php foreach ($all as $r): ?><tr><?php foreach ($r as $c => $v): ?>
        <td><?= $c === 'email' ? '<a href="mailto:' . h($v) . '">' . h($v) . '</a>' : h($c === 'date' ? when($v) : $v) ?></td>
      <?php endforeach; ?></tr><?php endforeach; ?></tbody>
    </table></div>
    <?php endif; ?>
  </section>

<?php else: ?>
  <section class="tiles">
    <div class="tile"><span>All answers</span><b><?= count($all) ?></b></div>
    <div class="tile"><span>Last 7 days</span><b><?= $week ?></b></div>
    <?php foreach (TYPES as $k => $t): ?><div class="tile"><span><?= $t ?></span><b><?= $byType[$k] ?? 0 ?></b></div><?php endforeach; ?>
    <div class="tile"><span>Avg rating<?= $type || $q || $written ? ' (filtered)' : '' ?></span><b><?= $rated ? number_format($avg, 1) . ' <i>★</i>' : '—' ?></b><small><?= $rated ?> rated</small></div>
  </section>

  <form class="filters" method="get" action="<?= h($self) ?>">
    <input type="hidden" name="src" value="<?= h($src) ?>">
    <div class="chips">
      <a href="<?= h(url(['type' => '', 'page' => ''])) ?>" class="<?= $type === '' ? 'on' : '' ?>">All</a>
      <?php foreach (TYPES as $k => $t): ?><a href="<?= h(url(['type' => $k, 'page' => ''])) ?>" class="<?= $type === $k ? 'on' : '' ?>"><?= $t ?></a><?php endforeach; ?>
    </div>
    <?php if ($type): ?><input type="hidden" name="type" value="<?= h($type) ?>"><?php endif; ?>
    <input type="search" name="q" value="<?= h($q) ?>" placeholder="Search answers, emails, versions…">
    <label class="check"><input type="checkbox" name="written" value="1" <?= $written ? 'checked' : '' ?>> Only with written comments</label>
    <button>Apply</button>
    <a class="btn ghost" href="<?= h($self . '?src=' . $src . '&download=1') ?>">Download CSV</a>
  </form>

  <?php
  $charts = [['reason', 'Why they uninstalled', false], ['rating', 'Ratings', false], ['want', 'Features they would use', true],
    ['use', 'What they use it for', true], ['source', 'How they found it', false], ['annoy', 'AI that bothered them most', true],
    ['role', 'Who they are', false]];
  $charts = array_filter($charts, fn($c) => tally($rows, $c[0], $c[2]));
  if ($charts): ?>
  <section class="charts">
    <?php foreach ($charts as [$col, $title, $multi]):
      $t = tally($rows, $col, $multi);
      if ($col === 'rating') { $t = []; foreach ([5, 4, 3, 2, 1] as $s) $t[(string)$s] = $ratings[(string)$s] ?? 0; }
      $max = max($t) ?: 1; ?>
      <div class="card chart">
        <h3><?= h($title) ?></h3>
        <?php foreach ($t as $v => $n): ?>
          <div class="bar"><?= $col === 'rating' ? '<span class="l stars">' . str_repeat('★', (int)$v) . '</span>'
            : '<span class="l" title="' . h(label($src, $col, (string)$v)) . '">' . h(label($src, $col, (string)$v)) . '</span>' ?>
            <span class="track"><span style="width:<?= round($n / $max * 100) ?>%"></span></span><span class="c"><?= $n ?></span></div>
        <?php endforeach; ?>
      </div>
    <?php endforeach; ?>
  </section>
  <?php endif; ?>

  <section>
    <div class="head"><h2><?= count($rows) ?> answer<?= count($rows) === 1 ? '' : 's' ?><?= $type || $q || $written ? ' match' : '' ?></h2>
      <?php if ($pages > 1): ?><span class="muted">Page <?= $page ?> of <?= $pages ?></span><?php endif; ?></div>
    <?php if (!$rows): ?><p class="card empty"><?= $all ? 'Nothing matches these filters.' : 'No answers yet.' ?></p><?php endif; ?>
    <?php foreach ($shown as $r): $t = $r['type'] ?? ''; ?>
      <article class="card answer">
        <div class="meta">
          <span class="badge <?= h($t) ?>"><?= h(TYPES[$t] ?? $t) ?></span>
          <?php if (($r['rating'] ?? '') !== ''): ?><span class="stars" title="<?= h($r['rating']) ?> of 5"><?= str_repeat('★', (int)$r['rating']) ?><s><?= str_repeat('★', 5 - (int)$r['rating']) ?></s></span><?php endif; ?>
          <span class="muted"><?= h(when($r['date'] ?? '')) ?></span>
          <span class="muted"><?= ($r['v'] ?? '') !== '' ? 'v' . h($r['v']) : '' ?><?= ($r['lang'] ?? '') !== '' ? ' · ' . h($r['lang']) : '' ?><?= ($r['from'] ?? '') !== '' ? ' · from ' . h($r['from']) : '' ?></span>
          <?php if (($r['email'] ?? '') !== ''): ?><a class="mail" href="mailto:<?= h($r['email']) ?>"><?= h($r['email']) ?></a><?php endif; ?>
        </div>
        <?php foreach (TEXTS as [$c, $l]): if (trim($r[$c] ?? '') === '') continue; ?>
          <blockquote><span><?= h($l) ?></span><?= h($r[$c]) ?></blockquote>
        <?php endforeach; ?>
        <dl>
          <?php foreach (QUESTIONS[$src] as [$c, $l]): $v = trim($r[$c] ?? ''); if ($v === '') continue; ?>
            <div><dt><?= h($l) ?></dt><dd>
              <?php if (in_array($c, ['use', 'want', 'annoy'], true)): foreach (explode(' ', $v) as $x): ?><span class="pill"><?= h(label($src, $c, $x)) ?></span><?php endforeach;
              else: ?><?= h(label($src, $c, $v)) ?><?php endif; ?>
            </dd></div>
          <?php endforeach; ?>
        </dl>
        <?php $usage = array_filter(USAGE[$src], fn($c) => ($r[$c] ?? '') !== '', ARRAY_FILTER_USE_KEY);
        if ($usage): ?>
          <details><summary>Usage counts</summary><p class="usage">
            <?php foreach ($usage as $c => $l): ?><span><b><?= h($r[$c]) ?></b> <?= h($l) ?></span><?php endforeach; ?>
          </p></details>
        <?php endif; ?>
      </article>
    <?php endforeach; ?>
    <?php if ($pages > 1): ?>
      <nav class="pager">
        <?php if ($page > 1): ?><a class="btn ghost" href="<?= h(url(['page' => $page - 1])) ?>">← Newer</a><?php endif; ?>
        <?php if ($page < $pages): ?><a class="btn ghost" href="<?= h(url(['page' => $page + 1])) ?>">Older →</a><?php endif; ?>
      </nav>
    <?php endif; ?>
  </section>
<?php endif; ?>
</main>
</body>
</html>
<?php

// ---------------------------------------------------------------------------------------------------------------
function loginPage(string $error): void {
  pageTop('Sign in — Admin');
  ?>
  <main class="login">
    <form method="post" class="card">
      <div class="brand"><span class="logo">W</span> Web Whizz <span class="tag">Admin</span></div>
      <h1>Sign in</h1>
      <?php if ($error): ?><p class="err" role="alert"><?= h($error) ?></p><?php endif; ?>
      <label>Email<input name="user" type="email" autocomplete="username" required autofocus></label>
      <label>Password<input name="pass" type="password" autocomplete="current-password" required></label>
      <input type="hidden" name="csrf" value="<?= h(csrf()) ?>">
      <button name="action" value="login">Sign in</button>
    </form>
  </main>
  </body></html>
  <?php
}

function pageTop(string $title): void {
  ?><!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?= h($title) ?></title>
<link rel="icon" href="data:,">
<style>
:root { --bg:#fbfaff; --surface:#fff; --text:#1b1340; --muted:#5f5a7a; --line:#e4def7; --primary:#5b34c8; --primary-ink:#fff;
  --soft:#ece6ff; --star:#e3a400; --bad:#c2334d; --bad-soft:#fde8ec; --good:#1f8a5b; --good-soft:#e2f5ec; --info-soft:#e6efff; --info:#2f5bb7;
  --shadow:0 1px 2px rgba(27,19,64,.06),0 8px 24px rgba(27,19,64,.06); color-scheme:light; }
@media (prefers-color-scheme: dark) { :root { --bg:#0f0c1d; --surface:#1b1634; --text:#eeeaff; --muted:#a8a1c9; --line:#2e2752;
  --primary:#8f74ff; --primary-ink:#120c2b; --soft:#261e4d; --star:#fbbc04; --bad:#ff8098; --bad-soft:#3a1824; --good:#5fd39c;
  --good-soft:#123326; --info:#8fb0ff; --info-soft:#18234a; --shadow:0 1px 2px rgba(0,0,0,.4); color-scheme:dark; } }
* { box-sizing:border-box; }
body { margin:0; background:var(--bg); color:var(--text); font:15px/1.5 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif; }
a { color:var(--primary); }
h1,h2,h3 { margin:0; line-height:1.25; } h2 { font-size:18px; } h3 { font-size:14px; color:var(--muted); font-weight:600; margin-bottom:10px; }
.muted { color:var(--muted); font-size:13px; }
.card { background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:16px; box-shadow:var(--shadow); }
button, .btn { font:inherit; font-weight:600; background:var(--primary); color:var(--primary-ink); border:0; border-radius:10px; padding:9px 14px; cursor:pointer; text-decoration:none; display:inline-block; white-space:nowrap; }
.ghost { background:transparent; color:var(--text); border:1px solid var(--line); }
input { font:inherit; color:inherit; background:var(--bg); border:1px solid var(--line); border-radius:10px; padding:9px 12px; }
input:focus-visible, button:focus-visible, a:focus-visible { outline:2px solid var(--primary); outline-offset:2px; }
.brand { display:flex; align-items:center; gap:8px; font-weight:700; }
.logo { width:28px; height:28px; border-radius:8px; background:var(--primary); color:var(--primary-ink); display:grid; place-items:center; font-size:14px; }
.tag { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.06em; background:var(--soft); color:var(--primary); padding:2px 8px; border-radius:99px; }
.top { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:12px 16px; border-bottom:1px solid var(--line); background:var(--surface); position:sticky; top:0; z-index:2; }
.out { display:flex; align-items:center; gap:12px; } .who { font-size:13px; color:var(--muted); }
main { max-width:1100px; margin:0 auto; padding:20px 16px 60px; display:grid; gap:20px; }
.tabs { display:flex; gap:6px; overflow-x:auto; border-bottom:1px solid var(--line); }
.tabs a { padding:10px 14px; text-decoration:none; color:var(--muted); font-weight:600; border-bottom:2px solid transparent; white-space:nowrap; }
.tabs a.on { color:var(--text); border-color:var(--primary); }
.n { font-size:12px; background:var(--soft); color:var(--primary); padding:1px 7px; border-radius:99px; margin-left:4px; }
.tiles { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:12px; }
.tile { background:var(--surface); border:1px solid var(--line); border-radius:14px; padding:14px 16px; display:grid; gap:2px; }
.tile span { font-size:13px; color:var(--muted); } .tile b { font-size:26px; font-variant-numeric:tabular-nums; } .tile i { color:var(--star); font-style:normal; font-size:20px; }
.tile small { color:var(--muted); font-size:12px; }
.filters { display:flex; flex-wrap:wrap; gap:10px; align-items:center; }
.filters input[type=search] { flex:1 1 220px; }
.grow { flex:1 1 220px; }
.chips { display:flex; gap:4px; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:3px; }
.chips a { padding:6px 12px; border-radius:9px; text-decoration:none; color:var(--muted); font-weight:600; font-size:14px; }
.chips a.on { background:var(--soft); color:var(--primary); }
.check { display:flex; align-items:center; gap:6px; font-size:14px; color:var(--muted); } .check input { width:16px; height:16px; }
.charts { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:12px; }
.bar { display:grid; grid-template-columns:minmax(0,2fr) 1fr 28px; gap:10px; align-items:center; font-size:13px; padding:3px 0; }
.bar .l { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.track { height:8px; background:var(--soft); border-radius:99px; overflow:hidden; } .track span { display:block; height:100%; background:var(--primary); border-radius:99px; min-width:2px; }
.bar .c { text-align:right; font-variant-numeric:tabular-nums; color:var(--muted); }
.head { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:12px; }
.answer { display:grid; gap:12px; margin-bottom:12px; }
.meta { display:flex; flex-wrap:wrap; gap:6px 12px; align-items:center; }
.badge { font-size:12px; font-weight:700; padding:2px 9px; border-radius:99px; background:var(--soft); color:var(--primary); }
.badge.goodbye { background:var(--bad-soft); color:var(--bad); } .badge.welcome { background:var(--good-soft); color:var(--good); } .badge.feedback { background:var(--info-soft); color:var(--info); }
.stars { color:var(--star); letter-spacing:1px; } .stars s { text-decoration:none; opacity:.25; }
.mail { font-size:13px; margin-left:auto; }
blockquote { margin:0; padding:10px 14px; border-left:3px solid var(--primary); background:var(--bg); border-radius:0 10px 10px 0; white-space:pre-wrap; overflow-wrap:anywhere; }
blockquote span { display:block; font-size:12px; font-weight:600; color:var(--muted); margin-bottom:2px; }
dl { margin:0; display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:8px 16px; }
dt { font-size:12px; color:var(--muted); } dd { margin:0; font-size:14px; }
.pill { display:inline-block; font-size:12px; background:var(--soft); padding:1px 8px; border-radius:99px; margin:2px 4px 0 0; }
details summary { cursor:pointer; font-size:13px; color:var(--muted); }
.usage { display:flex; flex-wrap:wrap; gap:6px 14px; font-size:13px; color:var(--muted); margin:8px 0 0; } .usage b { color:var(--text); }
.empty { color:var(--muted); text-align:center; padding:28px; }
.pager { display:flex; justify-content:center; gap:10px; }
.scroll { overflow-x:auto; } table { border-collapse:collapse; width:100%; font-size:14px; }
th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); white-space:nowrap; } th { color:var(--muted); font-weight:600; font-size:12px; }
.login { min-height:100vh; display:grid; place-items:center; }
.login form { width:min(380px,100%); display:grid; gap:14px; padding:28px; }
.login h1 { font-size:22px; margin-top:6px; }
.login label { display:grid; gap:6px; font-size:14px; font-weight:600; }
.err { margin:0; background:var(--bad-soft); color:var(--bad); padding:10px 12px; border-radius:10px; font-size:14px; }
@media (max-width:600px) { .who { display:none; } .mail { margin-left:0; } .bar { grid-template-columns:minmax(0,1.6fr) 1fr 24px; } }
</style>
</head>
<body>
<?php
}
