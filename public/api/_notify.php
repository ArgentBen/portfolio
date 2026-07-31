<?php

declare(strict_types=1);

function notify_log(string $message): void
{
    $file = dirname(__DIR__) . '/data/notify.log';
    $dir = dirname($file);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $line = gmdate('c') . ' ' . $message . "\n";
    file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
}

/**
 * @param array<string, mixed> $config
 * @return array{response: ?string, http_code: int, curl_error: string}
 */
function notify_http_post_json(string $url, string $payload, int $timeout = 20): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_CONNECTTIMEOUT => 12,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT => 'ArgentumWeb/1.0',
    ]);

    $response = curl_exec($ch);
    $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    return [
        'response' => is_string($response) ? $response : null,
        'http_code' => $httpCode,
        'curl_error' => $curlError,
    ];
}

/**
 * @param array<string, mixed> $config
 */
function notify_has_telegram(array $config): bool
{
    return trim($config['telegram_bot_token'] ?? '') !== ''
        && trim((string) ($config['telegram_chat_id'] ?? '')) !== '';
}

/**
 * @param array<string, mixed> $config
 */
function notify_has_email(array $config): bool
{
    $email = trim($config['notify_email'] ?? '');

    return $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * @param array<string, mixed> $config
 */
function notify_has_sms(array $config): bool
{
    return trim($config['sms_ru_api_id'] ?? '') !== ''
        && trim($config['notify_phone'] ?? '') !== '';
}

/**
 * @param array<string, mixed> $config
 */
function notify_via_telegram(string $text, array $config): bool
{
    if (!notify_has_telegram($config)) {
        return false;
    }

    $botToken = trim($config['telegram_bot_token']);
    $chatId = trim((string) $config['telegram_chat_id']);

    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    if ($payload === false) {
        return false;
    }

    $http = notify_http_post_json("https://api.telegram.org/bot{$botToken}/sendMessage", $payload);

    if ($http['response'] === null) {
        notify_log("telegram FAIL curl: {$http['curl_error']} http={$http['http_code']}");
        return false;
    }

    /** @var array{ok?: bool, description?: string} $result */
    $result = json_decode($http['response'], true) ?? [];

    if (empty($result['ok'])) {
        $desc = $result['description'] ?? $http['response'];
        notify_log("telegram FAIL api: {$desc}");
        return false;
    }

    return true;
}

/**
 * @param array<string, mixed> $config
 */
function notify_via_email(string $subject, string $body, array $config, ?string $replyTo = null): bool
{
    if (!notify_has_email($config)) {
        return false;
    }

    $to = trim($config['notify_email']);
    $from = trim($config['notify_from'] ?? 'noreply@argentum-web.ru');
    if ($from === '' || !str_contains($from, '@')) {
        $from = 'noreply@argentum-web.ru';
    }

    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        'From: Argentum <' . $from . '>',
    ];

    if ($replyTo !== null && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . $replyTo;
    }

    return @mail($to, $encodedSubject, $body, implode("\r\n", $headers));
}

/**
 * @param array<string, mixed> $config
 */
function notify_via_email_logged(string $subject, string $body, array $config, ?string $replyTo = null): bool
{
    $ok = notify_via_email($subject, $body, $config, $replyTo);
    if (!$ok) {
        notify_log('email FAIL mail() returned false for ' . ($config['notify_email'] ?? ''));
    }

    return $ok;
}

/**
 * @param array<string, mixed> $config
 */
function notify_via_sms(string $text, array $config): bool
{
    if (!notify_has_sms($config)) {
        return false;
    }

    $apiId = trim($config['sms_ru_api_id']);
    $phone = preg_replace('/\D+/', '', (string) $config['notify_phone']) ?? '';
    if ($phone === '') {
        return false;
    }

    if (str_starts_with($phone, '8') && strlen($phone) === 11) {
        $phone = '7' . substr($phone, 1);
    }

    $msg = mb_substr($text, 0, 160);

    $url = 'https://sms.ru/sms/send?' . http_build_query([
        'api_id' => $apiId,
        'to' => $phone,
        'msg' => $msg,
        'json' => 1,
    ]);

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_CONNECTTIMEOUT => 10,
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        return false;
    }

    /** @var array{status?: string, status_code?: int} $result */
    $result = json_decode($response, true) ?? [];

    return ($result['status'] ?? '') === 'OK' || (int) ($result['status_code'] ?? 0) === 100;
}

/**
 * @param array<string, mixed> $config
 * @return array{telegram: bool, email: bool, sms: bool}
 */
function notify_all(string $telegramText, string $emailSubject, string $emailBody, string $smsText, array $config, ?string $replyTo = null): array
{
    return [
        'telegram' => notify_via_telegram($telegramText, $config),
        'email' => notify_via_email_logged($emailSubject, $emailBody, $config, $replyTo),
        'sms' => notify_via_sms($smsText, $config),
    ];
}

/**
 * mail() на shared-хостинге часто возвращает true, хотя письмо не уходит.
 * Если Telegram настроен — считаем успехом только Telegram или SMS.
 *
 * @param array{telegram: bool, email: bool, sms: bool} $results
 * @param array<string, mixed> $config
 */
function notify_delivery_ok(array $results, array $config): bool
{
    if (!empty($results['telegram']) || !empty($results['sms'])) {
        return true;
    }

    if (notify_has_telegram($config)) {
        return false;
    }

    return !empty($results['email']);
}

/**
 * @param array{telegram: bool, email: bool, sms: bool} $results
 * @param array<string, mixed> $config
 */
function notify_error_message(array $results, array $config): string
{
    if (notify_has_telegram($config) && empty($results['telegram'])) {
        return 'Не удалось отправить заявку. Попробуйте позже.';
    }

    if (notify_has_sms($config) && empty($results['sms']) && empty($results['telegram'])) {
        return 'Не удалось отправить заявку. Попробуйте позже.';
    }

    return 'Не удалось отправить заявку. Попробуйте позже.';
}
