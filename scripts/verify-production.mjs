#!/usr/bin/env node
/**
 * Проверяет, что на продакшене доступны favicon и og-image для поисковиков.
 * Запуск: node scripts/verify-production.mjs
 */
const SITE = 'https://argentum-web.ru';

const CHECKS = [
  { url: `${SITE}/favicon.ico`, label: 'favicon.ico (нужен Яндексу в поиске)' },
  { url: `${SITE}/favicon-32x32.png`, label: 'favicon-32x32.png' },
  { url: `${SITE}/apple-touch-icon.png`, label: 'apple-touch-icon.png' },
  { url: `${SITE}/images/og-image.png`, label: 'og-image.png (превью в поиске)' },
  { url: `${SITE}/favicon.svg`, label: 'favicon.svg (иконка во вкладке браузера)' },
];

async function check({ url, label }) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    const ok = res.ok;
    const type = res.headers.get('content-type') ?? '—';
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}`);
    console.log(`      ${url} → ${res.status} (${type})`);
    return ok;
  } catch (err) {
    console.log(`FAIL ${label}`);
    console.log(`      ${url} → ${err.message}`);
    return false;
  }
}

async function checkHtmlIcons() {
  const res = await fetch(SITE);
  const html = await res.text();
  const hasIco = html.includes('favicon.ico');
  const hasPng = html.includes('favicon-32x32.png');
  console.log(`${hasIco ? 'OK  ' : 'FAIL'} index.html содержит ссылку на favicon.ico`);
  console.log(`${hasPng ? 'OK  ' : 'FAIL'} index.html содержит ссылку на favicon-32x32.png`);
  return hasIco && hasPng;
}

console.log(`Проверка ${SITE}\n`);

let ok = true;
for (const item of CHECKS) {
  ok = (await check(item)) && ok;
}
ok = (await checkHtmlIcons()) && ok;

console.log('');
if (ok) {
  console.log('Всё в порядке. Яндекс подхватит иконку после переобхода (обычно 3–14 дней).');
} else {
  console.log('Нужен деплой: загрузите ВСЁ содержимое dist/ в корень сайта, включая:');
  console.log('  favicon.ico, favicon-32x32.png, apple-touch-icon.png, index.html, images/og-image.png');
  process.exitCode = 1;
}
