<?php

declare(strict_types=1);

require dirname(__DIR__) . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    require_admin();
    $data = read_portfolio();
    api_json(['ok' => true, 'projects' => $data['projects'] ?? []]);
}

if ($method !== 'POST') {
    api_json(['ok' => false, 'error' => 'Метод не поддерживается'], 405);
}

require_admin();

$input = read_json_input();
$action = (string) ($input['action'] ?? '');
$data = read_portfolio();
$projects = is_array($data['projects'] ?? null) ? $data['projects'] : [];

if ($action === 'delete') {
    $id = (int) ($input['id'] ?? 0);
    if ($id <= 0) {
        api_json(['ok' => false, 'error' => 'Не указан id'], 400);
    }

    $before = count($projects);
    $projects = array_values(array_filter($projects, static fn ($p) => is_array($p) && (int) ($p['id'] ?? 0) !== $id));

    if (count($projects) === $before) {
        api_json(['ok' => false, 'error' => 'Проект не найден'], 404);
    }

    if (!write_portfolio(['projects' => $projects])) {
        api_json(['ok' => false, 'error' => 'Не удалось сохранить файл'], 500);
    }

    api_json(['ok' => true, 'projects' => $projects]);
}

if ($action === 'save') {
    $rawProject = $input['project'] ?? null;
    if (!is_array($rawProject)) {
        api_json(['ok' => false, 'error' => 'Некорректные данные проекта'], 400);
    }

    $id = (int) ($rawProject['id'] ?? 0);
    $isNew = $id <= 0;
    $project = sanitize_project($rawProject, $isNew);

    if ($isNew) {
        $project['id'] = next_project_id($projects);
        $projects[] = $project;
    } else {
        $found = false;
        foreach ($projects as $i => $existing) {
            if (!is_array($existing)) {
                continue;
            }
            if ((int) ($existing['id'] ?? 0) === $project['id']) {
                $projects[$i] = $project;
                $found = true;
                break;
            }
        }
        if (!$found) {
            api_json(['ok' => false, 'error' => 'Проект не найден'], 404);
        }
    }

    if (!write_portfolio(['projects' => $projects])) {
        api_json(['ok' => false, 'error' => 'Не удалось сохранить файл'], 500);
    }

    api_json(['ok' => true, 'project' => $project, 'projects' => $projects]);
}

api_json(['ok' => false, 'error' => 'Неизвестное действие'], 400);
