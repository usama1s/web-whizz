<?php
// Anonymous usage statistics from the AI-Free Web extension (its src/background/index.ts → trySend()), shown in the admin
// dashboard's "AI-Free Web usage" tab. OFF unless the user turns them on in the extension. At most one message a day per
// install, only after the extension cleaned a page (plus one "new install" message on install day if already on).
// Each message holds what changed since the extension's last send: numbers and short codes, no ID of any kind.
// Appended to a CSV OUTSIDE the web root:  /home2/codifyp1/web-whizz-data/turn-off-ai-usage.csv
// Only the fields below are kept, everything else is dropped. IPs are not stored (a salted hash, for an hour, for the rate limit).
//
// Keep in sync with the extension's src/shared/usage.ts (STATS_NUMS, STATS_MAPS) and the admin dashboard (TOA_*).
require __DIR__ . '/toa-common.php';

const FILE = 'turn-off-ai-usage.csv';
const PER_HOUR = 30;
const FLAGS = ['new' => 'new', 'wk' => 'weekFirst', 'mo' => 'monthFirst', 'm' => 'masterOff', 'mg' => 'managed'];
const COUNTS = ['p' => 'pages', 'h' => 'hidden', 'o' => 'showOnce', 'rp' => 'reports', 'cr' => 'customRules', 'ru' => 'rulesOk', 'rf' => 'rulesFail'];
// d: install age as a range only, so one install's messages can't be linked by it. rv: rules version.
const LABELS = ['v' => '/^[0-9.]{1,15}$/', 'lang' => '/^[A-Za-z_-]{2,10}$/', 'd' => '/^(0|1-7|8-30|31-90|91\+)$/', 'rv' => '/^\d{4}\.\d{1,2}\.\d{1,2}\.\d{1,3}$/'];
const SITE_ID = '/^[a-z0-9]{1,12}$/';
const COLUMNS = ['date', 'v', 'lang', 'new', 'weekFirst', 'monthFirst', 'age', 'rulesVersion', 'pages', 'hidden', 'showOnce', 'reports',
  'customRules', 'rulesOk', 'rulesFail', 'sites', 'off', 'masterOff', 'managed'];
// New columns go at the end only (the dashboard reads cells by the file's header).

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';
toa_guard();

$row = ['date' => gmdate('c')];
foreach (LABELS as $k => $re) $row[['d' => 'age', 'rv' => 'rulesVersion'][$k] ?? $k] = preg_match($re, toa_str($k)) ? toa_str($k) : '';
foreach (FLAGS as $k => $column) $row[$column] = toa_str($k) === '1' ? '1' : '';
foreach (COUNTS as $k => $column) {
  $v = toa_str($k);
  $row[$column] = ctype_digit($v) && strlen($v) <= 7 ? $v : '';
}
// sh: "site:count,site:count" (AI elements hidden per site since the last send).
$parts = [];
foreach (array_slice(explode(',', toa_str('sh')), 0, 20) as $part) {
  if (preg_match('/^([a-z0-9]{1,12}):(\d{1,7})$/', $part, $m) && (int)$m[2] > 0) $parts[$m[1]] = (int)$m[2];
}
$row['sites'] = implode(',', array_map(fn($k, $n) => "$k:$n", array_keys($parts), $parts));
// off: sites switched off right now.
$off = array_values(array_filter(array_slice(explode(',', toa_str('off')), 0, 20), fn($s) => preg_match(SITE_ID, $s)));
$row['off'] = implode(',', array_unique($off));

// A message must say something: a new install, or at least one cleaned page.
if ($row['new'] === '' && (int)$row['pages'] < 1) toa_reply(false, 400);
if ($row['v'] === '') toa_reply(false, 400);

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true)) toa_reply(false, 500);
if (!toa_rate_ok($dataDir, 'toa-usage-rate.json', PER_HOUR)) toa_reply(false, 429);
if (!toa_append($dataDir . '/' . FILE, COLUMNS, $row)) toa_reply(false, 500);
toa_reply(true);
