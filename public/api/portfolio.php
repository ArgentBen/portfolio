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

header('Cache-Control: public, max-age=300, stale-while-revalidate=60');

$data = read_portfolio();
api_json(['ok' => true, 'projects' => $data['projects'] ?? []]);
