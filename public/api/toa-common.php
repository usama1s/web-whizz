<?php
// Shared by toa-usage.php and toa-report.php (AI-Free Web). Not an endpoint: it only defines helpers.
//
// ORIGINS: only the extension itself may send. Replace the placeholder with the Chrome Web Store ID once the extension
// is published (and add the Edge Add-ons ID), e.g. 'chrome-extension://abcdefghijklmnopabcdefghijklmnop'. Until then
// every message is refused (403) and the extension simply tries again another day.
const TOA_ORIGINS = ['chrome-extension://REPLACE_WITH_CHROME_EXTENSION_ID'];

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'toa-common.php') { http_response_code(404); exit; }

function toa_reply(bool $ok, int $status = 200): void {
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  while (ob_get_level()) ob_end_clean();
  http_response_code($status);
  if (in_array($origin, TOA_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
  }
  header('Content-Type: application/json');
  header('Cache-Control: no-store');
  header('X-Robots-Tag: noindex');
  echo json_encode(['ok' => $ok]);
  exit;
}

// POST from the extension's own origin only.
function toa_guard(): void {
  ob_start();
  if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    toa_reply(false, 405);
  }
  if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', TOA_ORIGINS, true)) toa_reply(false, 403);
}

function toa_str(string $k): string { return is_string($_POST[$k] ?? null) ? trim($_POST[$k]) : ''; }

// $perHour messages per IP per hour. Only a salted hash of the IP is kept, for an hour, in $file.
function toa_rate_ok(string $dataDir, string $file, int $perHour): bool {
  $rh = fopen($dataDir . '/' . $file, 'c+');
  if (!$rh || !flock($rh, LOCK_EX)) return true;
  $now = time();
  $seen = json_decode(stream_get_contents($rh) ?: '{}', true) ?: [];
  foreach ($seen as $k => $times) {
    $seen[$k] = array_values(array_filter($times, fn($t) => $t > $now - 3600));
    if (!$seen[$k]) unset($seen[$k]);
  }
  $ip = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . __FILE__ . $file);
  $ok = count($seen[$ip] ?? []) < $perHour;
  if ($ok) $seen[$ip][] = $now;
  ftruncate($rh, 0);
  rewind($rh);
  fwrite($rh, json_encode($seen));
  flock($rh, LOCK_UN);
  fclose($rh);
  return $ok;
}

// Appends one row; writes the header on a new file. A leading = + - @ would run as a formula in Excel.
function toa_append(string $path, array $columns, array $row): bool {
  $fh = fopen($path, 'a');
  if (!$fh || !flock($fh, LOCK_EX)) return false;
  clearstatcache(true, $path);
  if (filesize($path) === 0) fputcsv($fh, $columns, ',', '"', '\\');
  $cells = array_map(fn($c) => preg_match('/^[=+\-@\t\r]/', (string)($row[$c] ?? '')) ? "'" . $row[$c] : (string)($row[$c] ?? ''), $columns);
  fputcsv($fh, $cells, ',', '"', '\\');
  flock($fh, LOCK_UN);
  fclose($fh);
  return true;
}
