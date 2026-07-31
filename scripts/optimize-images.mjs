#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imagesDir = path.join(root, 'public', 'images');
const portfolioDir = path.join(imagesDir, 'portfolio');

const avatarSource = fs
  .readdirSync(portfolioDir)
  .find((name) => /аватар/i.test(name) && /\.png$/i.test(name));

if (!avatarSource) {
  console.error('Avatar PNG not found in public/images/portfolio/');
  process.exit(1);
}

const avatarIn = path.join(portfolioDir, avatarSource);
const avatarWebp = path.join(imagesDir, 'avatar.webp');
const avatarJpg = path.join(imagesDir, 'avatar.jpg');

await sharp(avatarIn)
  .rotate()
  .resize(920, 920, { fit: 'cover', position: 'top' })
  .webp({ quality: 82, effort: 4 })
  .toFile(avatarWebp);

await sharp(avatarIn)
  .rotate()
  .resize(920, 920, { fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(avatarJpg);

console.log('avatar:', avatarWebp, avatarJpg);

for (const file of fs.readdirSync(portfolioDir)) {
  if (!/^\d+\.jpg$/i.test(file)) continue;
  const input = path.join(portfolioDir, file);
  const before = fs.statSync(input).size;
  const buffer = await sharp(input)
    .rotate()
    .resize(1400, 900, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(input, buffer);
  const after = buffer.length;
  console.log(`portfolio/${file}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`);
}

console.log('Done.');
