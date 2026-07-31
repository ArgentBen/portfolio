<?php

declare(strict_types=1);

require __DIR__ . '/_notify.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'POST only']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config.php missing']);
    exit;
}

/** @var array<string, mixed> $config */
$config = require $configPath;

$input = json_decode((string) file_get_contents('php://input'), true);
$password = is_array($input) ? (string) ($input['password'] ?? '') : '';
$expected = (string) ($config['admin_password'] ?? '');

if ($expected === '' || $expected === 'change-me' || !hash_equals($expected, $password)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Forbidden']);
    exit;
}

$text = '🧪 Тест уведомлений с argentum-web.ru — ' . gmdate('Y-m-d H:i:s') . ' UTC';
$results = notify_all(
    $text,
    'Тест формы — АРГЕНТУМ',
    $text,
    'Тест argentum-web.ru',
    $config,
);

echo json_encode([
    'ok' => notify_delivery_ok($results, $config),
    'results' => $results,
    'has_telegram' => notify_has_telegram($config),
    'has_email' => notify_has_email($config),
]);
