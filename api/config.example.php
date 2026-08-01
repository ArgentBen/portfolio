<?php

/**
 * Шаблон настроек. При первой сборке копируется в config.php (если его ещё нет).
 *
 * Telegram: @BotFather → token, /start боту, chat_id через getUpdates
 * Email: дублирование заявок на почту
 * SMS: sms.ru → sms_ru_api_id (опционально)
 */
return [
    'telegram_bot_token' => 'YOUR_BOT_TOKEN',
    'telegram_chat_id' => 'YOUR_CHAT_ID',

    'notify_email' => 'your-email@example.com',
    'notify_from' => 'noreply@your-domain.ru',

    'notify_phone' => '',
    'sms_ru_api_id' => '',

    'admin_password' => 'change-me',
];
