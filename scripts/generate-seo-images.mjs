#!/usr/bin/env node
/**
 * Генерирует favicon.ico, PNG-иконки и og-image для поисковиков (Яндекс, Google).
 * SVG favicon роботы часто не загружают — нужны ICO и PNG в корне сайта.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');

const FAVICON_SVG = path.join(publicDir, 'favicon.svg');
const HERO_FALLBACK_URL =
  'https://images.unsplash.com/photo-1769071167136-f25178b607dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBwcm9ncmFtbWVyJTIwZGFyayUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3Mzk5MDcyM3ww&ixlib=rb-4.1.0&q=80&w=1080';

function pngFromSvg(svgBuffer, size) {
  return sharp(svgBuffer, { density: Math.max(72, Math.ceil((size / 44) * 96)) })
    .resize(size, size)
    .png();
}

function buildOgSvg(faviconMarkup) {
  const logo = faviconMarkup.replace(/<\?xml[^>]*\?>/i, '').trim();
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#141418"/>
    </linearGradient>
    <radialGradient id="glow" cx="85%" cy="15%" r="55%">
      <stop offset="0%" stop-color="rgba(196,201,207,0.18)"/>
      <stop offset="100%" stop-color="rgba(196,201,207,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(72 165) scale(6.8)">
    ${logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
  <text x="400" y="250" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700">АРГЕНТУМ</text>
  <text x="400" y="320" fill="#c4c9cf" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400">Создание и доработка сайтов под ключ</text>
  <text x="400" y="380" fill="#808080" font-family="Arial, Helvetica, sans-serif" font-size="22">Веб-разработка под ключ</text>
</svg>`;
}

function buildHeroFallbackSvg(faviconMarkup) {
  const logo = faviconMarkup.replace(/<\?xml[^>]*\?>/i, '').trim();
  return `<svg width="900" height="1125" viewBox="0 0 900 1125" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="900" y2="1125" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#101014"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="rgba(196,201,207,0.12)"/>
      <stop offset="100%" stop-color="rgba(196,201,207,0)"/>
    </radialGradient>
  </defs>
  <rect width="900" height="1125" fill="url(#bg)"/>
  <rect width="900" height="1125" fill="url(#glow)"/>
  <g transform="translate(330 420) scale(5.5)">
    ${logo.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>
</svg>`;
}

async function writeHeroImage(faviconMarkup) {
  const heroPath = path.join(imagesDir, 'hero.png');

  try {
    const res = await fetch(HERO_FALLBACK_URL);
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf)
        .resize(1080, 1350, { fit: 'cover', position: 'centre' })
        .png({ quality: 90 })
        .toFile(heroPath);
      console.log('generate-seo-images: hero.png из Unsplash');
      return;
    }
  } catch {
    /* offline — fallback ниже */
  }

  const svg = buildHeroFallbackSvg(faviconMarkup);
  await sharp(Buffer.from(svg)).png().toFile(heroPath);
  console.log('generate-seo-images: hero.png (брендовый fallback)');
}

async function main() {
  if (!fs.existsSync(FAVICON_SVG)) {
    console.error('generate-seo-images: не найден public/favicon.svg');
    process.exit(1);
  }

  fs.mkdirSync(imagesDir, { recursive: true });
  const faviconMarkup = fs.readFileSync(FAVICON_SVG, 'utf8');
  const faviconBuffer = Buffer.from(faviconMarkup);

  const png16 = await pngFromSvg(faviconBuffer, 16).toBuffer();
  const png32 = await pngFromSvg(faviconBuffer, 32).toBuffer();
  const png48 = await pngFromSvg(faviconBuffer, 48).toBuffer();
  const png180 = await pngFromSvg(faviconBuffer, 180).toBuffer();
  const png192 = await pngFromSvg(faviconBuffer, 192).toBuffer();
  const png512 = await pngFromSvg(faviconBuffer, 512).toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), png512);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), await toIco([png16, png32, png48]));

  const ogSvg = buildOgSvg(faviconMarkup);
  await sharp(Buffer.from(ogSvg)).resize(1200, 630).png().toFile(path.join(imagesDir, 'og-image.png'));

  await writeHeroImage(faviconMarkup);

  const manifest = {
    name: 'АРГЕНТУМ',
    short_name: 'АРГЕНТУМ',
    description: 'Создание и доработка сайтов под ключ',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    lang: 'ru',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log('generate-seo-images: favicon.ico, PNG-иконки, og-image.png, site.webmanifest');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
