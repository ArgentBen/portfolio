import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicConfig = path.join(root, 'public', 'api', 'config.php');
const distConfig = path.join(root, 'dist', 'api', 'config.php');
const cacheConfig = path.join(root, 'scripts', '.config-cache.php');
const exampleConfig = path.join(root, 'public', 'api', 'config.example.php');

const mode = process.argv[2] ?? 'post';

function copyFile(from, to) {
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

if (mode === 'pre') {
  if (fs.existsSync(distConfig)) {
    copyFile(distConfig, cacheConfig);
    console.log('ensure-config: сохранён dist/api/config.php перед сборкой');
  }
  process.exit(0);
}

// post — после vite build
if (fs.existsSync(publicConfig)) {
  if (!fs.existsSync(distConfig)) {
    copyFile(publicConfig, distConfig);
  }
  console.log('ensure-config: config.php в dist/ (из public/api/)');
} else if (fs.existsSync(cacheConfig)) {
  copyFile(cacheConfig, distConfig);
  console.log('ensure-config: config.php восстановлен в dist/ из кэша');
} else if (fs.existsSync(exampleConfig)) {
  copyFile(exampleConfig, publicConfig);
  copyFile(publicConfig, distConfig);
  console.log('ensure-config: создан public/api/config.php из config.example.php — заполните настройки');
} else {
  console.warn('ensure-config: config.php не найден');
}
