<?php

declare(strict_types=1);

require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    api_json(['ok' => false, 'error' => 'Метод не поддерживается'], 405);
}

header('Cache-Control: public, max-age=600, stale-while-revalidate=120');

$file = dirname(__DIR__) . '/data/blog.json';
if (!is_file($file)) {
    api_json(['ok' => true, 'posts' => []]);
}

$raw = file_get_contents($file);
$data = is_string($raw) ? json_decode($raw, true) : null;
$posts = is_array($data['posts'] ?? null) ? $data['posts'] : [];

api_json(['ok' => true, 'posts' => $posts]);
