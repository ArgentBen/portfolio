<?php

declare(strict_types=1);

function api_json(array $data, int $code = 200): void
{
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function load_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_file($path)) {
        return [];
    }

    $config = require $path;

    return is_array($config) ? $config : [];
}

function portfolio_file(): string
{
    return dirname(__DIR__) . '/data/portfolio.json';
}

function read_portfolio(): array
{
    $file = portfolio_file();
    if (!is_file($file)) {
        return ['projects' => []];
    }

    $raw = file_get_contents($file);
    if (!is_string($raw) || $raw === '') {
        return ['projects' => []];
    }

    $data = json_decode($raw, true);

    return is_array($data) ? $data : ['projects' => []];
}

function write_portfolio(array $data): bool
{
    $file = portfolio_file();
    $dir = dirname($file);
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
        return false;
    }

    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return false;
    }

    return file_put_contents($file, $json . "\n") !== false;
}

function start_admin_session(): void
{
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params([
            'lifetime' => 86400,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Lax',
        ]);
        session_start();
    }
}

function verify_admin_password(string $input, array $config): bool
{
    $stored = (string) ($config['admin_password'] ?? '');
    if ($stored === '') {
        return false;
    }

    if (str_starts_with($stored, '$2y$') || str_starts_with($stored, '$2a$')) {
        return password_verify($input, $stored);
    }

    return hash_equals($stored, $input);
}

function require_admin(): void
{
    start_admin_session();
    if (empty($_SESSION['admin'])) {
        api_json(['ok' => false, 'error' => 'Требуется авторизация'], 401);
    }
}

function read_json_input(): array
{
    $raw = file_get_contents('php://input');
    if (!is_string($raw) || $raw === '') {
        return [];
    }

    $data = json_decode($raw, true);

    return is_array($data) ? $data : [];
}

function sanitize_project(array $input, bool $isNew): array
{
    $title = trim((string) ($input['title'] ?? ''));
    $client = trim((string) ($input['client'] ?? ''));
    $platform = trim((string) ($input['platform'] ?? ''));
    $year = trim((string) ($input['year'] ?? ''));
    $image = trim((string) ($input['image'] ?? ''));
    $shortDesc = trim((string) ($input['shortDesc'] ?? ''));
    $fullDesc = trim((string) ($input['fullDesc'] ?? ''));
    $url = trim((string) ($input['url'] ?? ''));

    if ($title === '' || $client === '' || $platform === '' || $shortDesc === '') {
        api_json(['ok' => false, 'error' => 'Заполните обязательные поля: название, клиент, платформа, краткое описание'], 400);
    }

    if ($image === '') {
        $image = 'images/portfolio/placeholder.jpg';
    }

    $tags = $input['tags'] ?? [];
    if (!is_array($tags)) {
        $tags = array_filter(array_map('trim', explode(',', (string) $tags)));
    } else {
        $tags = array_values(array_filter(array_map(static fn ($t) => trim((string) $t), $tags)));
    }

    $results = $input['results'] ?? [];
    if (!is_array($results)) {
        $results = [];
    }

    $cleanResults = [];
    foreach ($results as $row) {
        if (!is_array($row)) {
            continue;
        }
        $label = trim((string) ($row['label'] ?? ''));
        $value = trim((string) ($row['value'] ?? ''));
        if ($label !== '' && $value !== '') {
            $cleanResults[] = ['label' => $label, 'value' => $value];
        }
    }

    $project = [
        'title' => $title,
        'client' => $client,
        'platform' => $platform,
        'year' => $year !== '' ? $year : (string) date('Y'),
        'image' => ltrim($image, '/'),
        'shortDesc' => $shortDesc,
        'fullDesc' => $fullDesc !== '' ? $fullDesc : $shortDesc,
        'tags' => $tags,
        'results' => $cleanResults,
    ];

    if ($url !== '') {
        $project['url'] = $url;
    }

    if (!$isNew) {
        $id = (int) ($input['id'] ?? 0);
        if ($id <= 0) {
            api_json(['ok' => false, 'error' => 'Не указан id проекта'], 400);
        }
        $project['id'] = $id;
    }

    return $project;
}

function next_project_id(array $projects): int
{
    $max = 0;
    foreach ($projects as $project) {
        if (!is_array($project)) {
            continue;
        }
        $max = max($max, (int) ($project['id'] ?? 0));
    }

    return $max + 1;
}
