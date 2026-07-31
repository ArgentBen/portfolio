#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const siteUrl = 'https://argentum-web.ru';
const today = new Date().toISOString().slice(0, 10);

const blogPath = path.join(root, 'public', 'data', 'blog.json');
let blogUrls = '';

if (isFile(blogPath)) {
  const data = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
  const posts = Array.isArray(data.posts) ? data.posts : [];
  blogUrls = posts
    .map((post) => {
      const lastmod = post.publishedAt || today;
      return `  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
${blogUrls}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml updated (${today}, ${blogUrls ? 'with blog' : 'no blog'})`);

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}
