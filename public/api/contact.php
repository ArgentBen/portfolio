<?php

declare(strict_types=1);

require __DIR__ . '/_antispam.php';
require __DIR__ . '/_notify.php';
require __DIR__ . '/_leads.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Сервер не настроен. Создайте api/config.php']);
    exit;
}

/** @var array<string, mixed> $config */
$config = require $configPath;

if (!notify_has_telegram($config) && !notify_has_email($config) && !notify_has_sms($config)) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'error' => 'Укажите notify_email и/или Telegram, и/или sms_ru_api_id в config.php',
    ]);
    exit;
}

$raw = file_get_contents('php://input');
$input = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
if (!is_array($input)) {
    $input = $_POST;
}

$formType = trim((string) ($input['formType'] ?? 'contact'));
$name = trim((string) ($input['name'] ?? ''));
$contactMethod = trim((string) ($input['contactMethod'] ?? 'email'));
$contact = trim((string) ($input['contact'] ?? $input['email'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

$antispam = antispam_check($input);
if ($antispam === 'silent') {
    antispam_reject_silent();
}
if ($antispam === 'rate_limit') {
    antispam_reject_rate_limit();
}

/**
 * @return array{ok: true, label: string, value: string, reply_to: ?string}|array{ok: false, error: string}
 */
function contact_validate(string $method, string $value): array
{
    if ($value === '') {
        return ['ok' => false, 'error' => 'Укажите способ связи'];
    }

    if ($method === 'email') {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return ['ok' => false, 'error' => 'Укажите корректный email'];
        }

        return ['ok' => true, 'label' => 'Email', 'value' => $value, 'reply_to' => $value];
    }

    if ($method === 'phone') {
        $digits = preg_replace('/\D+/', '', $value) ?? '';
        if (strlen($digits) < 10 || strlen($digits) > 15) {
            return ['ok' => false, 'error' => 'Укажите корректный номер телефона'];
        }

        return ['ok' => true, 'label' => 'Телефон', 'value' => $value, 'reply_to' => null];
    }

    if ($method === 'telegram') {
        $tg = preg_replace('~^https?://(t\.me|telegram\.me)/~i', '', $value) ?? $value;
        $tg = ltrim($tg, '@');
        if (mb_strlen($tg) < 3) {
            return ['ok' => false, 'error' => 'Укажите @username или ссылку t.me/...'];
        }

        return ['ok' => true, 'label' => 'Telegram', 'value' => '@' . $tg, 'reply_to' => null];
    }

    return ['ok' => false, 'error' => 'Неверный способ связи'];
}

if ($formType === 'newsletter') {
    $validated = contact_validate('email', $contact);
    if (empty($validated['ok'])) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => $validated['error']]);
        exit;
    }

    $email = $validated['value'];
    $contactValue = $email;
    $contactMethod = 'email';
    $telegramText = "📬 Подписка на рассылку\n\nEmail: {$email}";
    $emailSubject = 'Подписка на рассылку — АРГЕНТУМ';
    $emailBody = "Новая подписка на рассылку\n\nEmail: {$email}\n\nСайт: argentum-web.ru";
    $smsText = "Подписка argentum-web.ru: {$email}";
    $replyTo = $email;
} else {
    if ($name === '' || mb_strlen($name) < 2) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Укажите имя']);
        exit;
    }

    $validated = contact_validate($contactMethod, $contact);
    if (empty($validated['ok'])) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => $validated['error']]);
        exit;
    }

    if ($message === '' || mb_strlen($message) < 5) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Сообщение слишком короткое']);
        exit;
    }

    $contactLabel = $validated['label'];
    $contactValue = $validated['value'];
    $replyTo = $validated['reply_to'];

    $contactIcon = match ($contactMethod) {
        'phone' => '📱',
        'telegram' => '✈️',
        default => '📧',
    };

    $telegramText = "📩 Новая заявка с сайта\n\n"
        . "👤 Имя: {$name}\n"
        . "{$contactIcon} {$contactLabel}: {$contactValue}\n\n"
        . "💬 Сообщение:\n{$message}";

    $emailSubject = 'Новая заявка с сайта — АРГЕНТУМ';
    $emailBody = "Новая заявка с сайта argentum-web.ru\n\n"
        . "Имя: {$name}\n"
        . "{$contactLabel}: {$contactValue}\n\n"
        . "Сообщение:\n{$message}";

    $smsText = "Заявка argentum-web.ru: {$name}, {$contactLabel}: {$contactValue}. "
        . mb_substr(preg_replace('/\s+/u', ' ', $message) ?? $message, 0, 60);
}

$results = notify_all($telegramText, $emailSubject, $emailBody, $smsText, $config, $replyTo);

leads_save([
    'formType' => $formType,
    'name' => $name,
    'contactMethod' => $contactMethod,
    'contact' => $contactValue ?? $contact,
    'message' => $message,
    'notify' => $results,
]);

if (!notify_delivery_ok($results, $config)) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => notify_error_message($results, $config)]);
    exit;
}

echo json_encode(['ok' => true]);
