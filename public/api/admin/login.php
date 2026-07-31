<?php

declare(strict_types=1);

require dirname(__DIR__) . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    api_json(['ok' => false, 'error' => 'Метод не поддерживается'], 405);
}

$config = load_config();
if (($config['admin_password'] ?? '') === '') {
    api_json(['ok' => false, 'error' => 'Укажите admin_password в api/config.php'], 500);
}

$input = read_json_input();
$password = (string) ($input['password'] ?? '');

if (!verify_admin_password($password, $config)) {
    api_json(['ok' => false, 'error' => 'Неверный пароль'], 401);
}

start_admin_session();
$_SESSION['admin'] = true;
session_regenerate_id(true);

api_json(['ok' => true]);
