<?php
// "Something AI still showing?" reports from the AI-Free Web extension (src/background/index.ts → sendReport()), sent only
// after the user ticks the consent box. Shown in the admin dashboard's "AI-Free Web reports" tab, grouped so the
// most-reported elements come first, to turn into rules (rules.json in the extension repo → public/e/ai-free-web/rules/).
// Holds the site, the proposed selector and the element's type, role and own short label. Never page content or addresses.
// Appended to /home2/codifyp1/web-whizz-data/turn-off-ai-reports.csv (outside the web root); a summary is emailed.
require __DIR__ . '/toa-common.php';

const FILE = 'turn-off-ai-reports.csv';
const NOTIFY = 'support@web-whizz.com';
const PER_HOUR = 10;
const COLUMNS = ['date', 'v', 'lang', 'site', 'host', 'selector', 'stable', 'tag', 'role', 'label'];

$dataDir = dirname(__DIR__, 2) . '/web-whizz-data';
toa_guard();

$clean = fn(string $s, int $max) => mb_substr(preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $s), 0, $max);
$row = [
  'date' => gmdate('c'),
  'v' => preg_match('/^[0-9.]{1,15}$/', toa_str('v')) ? toa_str('v') : '',
  'lang' => preg_match('/^[A-Za-z_-]{2,10}$/', toa_str('lang')) ? toa_str('lang') : '',
  'site' => preg_match('/^[a-z0-9]{1,12}$/', toa_str('site')) ? toa_str('site') : '',
  // Only hosts the extension runs on.
  'host' => preg_match('/^([a-z0-9-]+\.)*(google\.com|youtube\.com|live\.com|office\.com|office365\.com|cloud\.microsoft|linkedin\.com|bing\.com)$/', toa_str('host')) ? toa_str('host') : '',
  'selector' => $clean(toa_str('sel'), 300),
  'stable' => toa_str('stable') === '1' ? '1' : '0',
  'tag' => preg_match('/^[a-z][a-z0-9-]{0,19}$/', toa_str('tag')) ? toa_str('tag') : '',
  'role' => preg_match('/^[a-z ]{0,30}$/', toa_str('role')) ? toa_str('role') : '',
  'label' => $clean(toa_str('label'), 80),
];
if ($row['site'] === '' || $row['host'] === '' || $row['selector'] === '' || $row['v'] === '') toa_reply(false, 400);

if (!is_dir($dataDir) && !mkdir($dataDir, 0700, true)) toa_reply(false, 500);
if (!toa_rate_ok($dataDir, 'toa-report-rate.json', PER_HOUR)) toa_reply(false, 429);
if (!toa_append($dataDir . '/' . FILE, COLUMNS, $row)) toa_reply(false, 500);

if (function_exists('mail')) {
  try {
    @mail(NOTIFY, "AI-Free Web: element still showing on {$row['host']}", "site: {$row['site']}\nhost: {$row['host']}\nselector: {$row['selector']}\nstable: {$row['stable']}\nelement: {$row['tag']} {$row['role']}\nlabel: {$row['label']}\nversion: {$row['v']} ({$row['lang']})", 'From: Web Whizz <' . NOTIFY . '>');
  } catch (\Throwable $e) {}
}
toa_reply(true);
