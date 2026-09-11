<?php
/**
 * API Proxy — aviationweather.gov
 * Bypasses CORS by fetching server-side and relaying the response.
 * Usage: /api/proxy.php?path=metar&ids=KJFK&format=json
 */

$allowedHost = 'aviationweather.gov';
$path        = $_GET['path'] ?? '';
$ids         = $_GET['ids']  ?? '';
$format      = $_GET['format'] ?? 'json';

// Whitelist allowed path segments to prevent open-proxy abuse
$allowedPaths = ['metar', 'taf', 'stationinfo'];
if (!in_array($path, $allowedPaths, true)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => "Invalid path. Allowed: " . implode(', ', $allowedPaths)]);
    exit;
}

// Sanitize ids — allow letters, digits, commas (max 20 chars per id)
if (!preg_match('/^[A-Za-z0-9]{1,4}(,[A-Za-z0-9]{1,4})*$/', $ids)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid ids parameter']);
    exit;
}

// Build the upstream URL
$upstream = "https://{$allowedHost}/api/data/{$path}?ids={$ids}&format={$format}";

// Fetch with cURL (more reliable than file_get_contents on shared hosting)
$ch = curl_init($upstream);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_CONNECTTIMEOUT => 8,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_USERAGENT      => 'RobertFernandez-Portfolio/1.0 (https://robertfernandez.dev)',
    CURLOPT_HTTPHEADER     => [
        'Accept: application/json',
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err      = curl_error($ch);
curl_close($ch);

// Relay the upstream status code + content type
header('Content-Type: application/json');
http_response_code($httpCode ?: 502);

// Add CORS headers so the browser is happy (same-origin, but explicit)
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=300'); // 5 min — weather data changes fast

if ($response === false) {
    echo json_encode(['error' => 'Upstream fetch failed', 'detail' => $err]);
} else {
    echo $response;
}
