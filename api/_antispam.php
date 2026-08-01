<?php

declare(strict_types=1);

/** Тихий ответ «успех» — только для явных ботов (honeypot, пустой UA). */
function antispam_reject_silent(): void
{
    echo json_encode(['ok' => true]);
    exit;
}

function antispam_reject_rate_limit(): void
{
    http_response_code(429);
    echo json_encode([
        'ok' => false,
        'error' => 'Слишком много попыток. Подождите час или напишите в Telegram.',
    ]);
    exit;
}

function antispam_client_ip(): string
{
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($keys as $key) {
        if (empty($_SERVER[$key])) {
            continue;
        }
        $raw = (string) $_SERVER[$key];
        $ip = trim(explode(',', $raw)[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }

    return '0.0.0.0';
}

function antispam_rate_file(): string
{
    return dirname(__DIR__) . '/data/form_rate.json';
}

function antispam_rate_limit(string $ip, int $maxAttempts = 5, int $windowSeconds = 3600): bool
{
    if ($ip === '0.0.0.0') {
        return false;
    }

    $file = antispam_rate_file();
    $now = time();
    $data = [];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = is_string($raw) ? json_decode($raw, true) : null;
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    $attempts = [];
    if (isset($data[$ip]) && is_array($data[$ip])) {
        foreach ($data[$ip] as $ts) {
            if (is_int($ts) && ($now - $ts) < $windowSeconds) {
                $attempts[] = $ts;
            }
        }
    }

    if (count($attempts) >= $maxAttempts) {
        return true;
    }

    $attempts[] = $now;
    $data[$ip] = $attempts;

    foreach ($data as $storedIp => $times) {
        if (!is_array($times)) {
            unset($data[$storedIp]);
            continue;
        }
        $fresh = array_values(array_filter($times, static fn ($ts) => is_int($ts) && ($now - $ts) < $windowSeconds));
        if ($fresh === []) {
            unset($data[$storedIp]);
        } else {
            $data[$storedIp] = $fresh;
        }
    }

    $dir = dirname($file);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    file_put_contents($file, json_encode($data));

    return false;
}

function antispam_has_spam_content(string $text): bool
{
    if ($text === '') {
        return false;
    }

    if (mb_strlen($text) > 8000) {
        return true;
    }

    if (preg_match_all('/https?:\/\/|www\./iu', $text) >= 4) {
        return true;
    }

    $patterns = [
        '/\b(viagra|cialis|casino|betting|forex|crypto\s*airdrop|porn|xxx)\b/iu',
        '/\b(заработок\s+без\s+вложений|быстрые\s+деньги|кредит\s+без\s+отказа)\b/iu',
        '/\[url=/iu',
        '/<script\b/iu',
    ];

    foreach ($patterns as $pattern) {
        if (preg_match($pattern, $text)) {
            return true;
        }
    }

    return false;
}

/**
 * @param array<string, mixed> $input
 * @return 'ok'|'silent'|'rate_limit'
 */
function antispam_check(array $input): string
{
    $hpA = trim((string) ($input['_hp_a'] ?? $input['website'] ?? ''));
    $hpB = trim((string) ($input['_hp_b'] ?? $input['company'] ?? ''));

    if ($hpA !== '' || $hpB !== '') {
        return 'silent';
    }

    $ua = trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''));
    if ($ua === '') {
        return 'silent';
    }

    if (preg_match('/(curl|wget|python-requests|scrapy|httpclient|libwww|spider|crawler)\b/i', $ua)) {
        return 'silent';
    }

    $name = trim((string) ($input['name'] ?? ''));
    $contact = trim((string) ($input['contact'] ?? $input['email'] ?? ''));
    $message = trim((string) ($input['message'] ?? ''));

    $blob = "{$name}\n{$contact}\n{$message}";

    if (antispam_has_spam_content($blob)) {
        return 'silent';
    }

    if (antispam_rate_limit(antispam_client_ip())) {
        return 'rate_limit';
    }

    return 'ok';
}

/**
 * @param array<string, mixed> $input
 * @deprecated use antispam_check()
 */
function antispam_is_bot(array $input): bool
{
    return antispam_check($input) !== 'ok';
}
