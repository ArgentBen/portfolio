<?php

declare(strict_types=1);

require dirname(__DIR__) . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    api_json(['ok' => false, 'error' => 'Метод не поддерживается'], 405);
}

start_admin_session();
api_json(['ok' => true, 'authenticated' => !empty($_SESSION['admin'])]);
