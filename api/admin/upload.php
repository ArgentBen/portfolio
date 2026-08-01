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

require_admin();

if (empty($_FILES['image']) || !is_array($_FILES['image'])) {
    api_json(['ok' => false, 'error' => 'Файл не передан'], 400);
}

$file = $_FILES['image'];
if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    api_json(['ok' => false, 'error' => 'Ошибка загрузки файла'], 400);
}

$tmp = (string) ($file['tmp_name'] ?? '');
if ($tmp === '' || !is_uploaded_file($tmp)) {
    api_json(['ok' => false, 'error' => 'Некорректный файл'], 400);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($tmp);
$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

if (!is_string($mime) || !isset($allowed[$mime])) {
    api_json(['ok' => false, 'error' => 'Допустимы JPG, PNG или WebP'], 400);
}

$id = (int) ($_POST['id'] ?? 0);
$filename = $id > 0 ? (string) $id : ('upload-' . time());
$ext = $allowed[$mime];
$destDir = dirname(__DIR__, 2) . '/images/portfolio';

if (!is_dir($destDir) && !mkdir($destDir, 0755, true)) {
    api_json(['ok' => false, 'error' => 'Не удалось создать папку для изображений'], 500);
}

$destPath = $destDir . '/' . $filename . '.' . $ext;
if (!move_uploaded_file($tmp, $destPath)) {
    api_json(['ok' => false, 'error' => 'Не удалось сохранить изображение'], 500);
}

$relative = 'images/portfolio/' . $filename . '.' . $ext;
api_json(['ok' => true, 'path' => $relative]);
