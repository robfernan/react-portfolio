<?php
/**
 * SPA Fallback — serves index.html for any route that isn't a real file.
 * This eliminates the dependency on mod_rewrite (which may not be enabled
 * on all Hostinger plans). Place this as index.php in public_html/.
 * 
 * How it works:
 * 1. If the requested path is a real file (JS, CSS, image, etc.) → serve it normally
 * 2. If it's a directory with an index.html → serve that
 * 3. Otherwise → serve the SPA's index.html so React Router can handle it
 */

// Get the requested path (without query string)
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Decode URL-encoded characters
$requestUri = rawurldecode($requestUri);

// Map to a file path relative to this directory
$filePath = __DIR__ . $requestUri;

// If it's an existing file, let Apache serve it normally
if (is_file($filePath)) {
    return; // Let Apache handle it
}

// If it's an existing directory with index.html, serve that
if (is_dir($filePath) && is_file($filePath . '/index.html')) {
    readfile($filePath . '/index.html');
    exit;
}

// Otherwise, serve the SPA entry point
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/index.html');
