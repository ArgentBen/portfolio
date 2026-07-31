<?php

declare(strict_types=1);

function leads_file(): string
{
    return dirname(__DIR__) . '/data/leads.json';
}

/**
 * @param array<string, mixed> $lead
 */
function leads_save(array $lead): bool
{
    $file = leads_file();
    $dir = dirname($file);
    if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
        return false;
    }

    $existing = [];
    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = is_string($raw) ? json_decode($raw, true) : null;
        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }

    $existing[] = array_merge($lead, [
        'id' => uniqid('lead_', true),
        'createdAt' => gmdate('c'),
    ]);

    // Храним последние 500 заявок
    if (count($existing) > 500) {
        $existing = array_slice($existing, -500);
    }

    $json = json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return false;
    }

    return file_put_contents($file, $json . "\n") !== false;
}
