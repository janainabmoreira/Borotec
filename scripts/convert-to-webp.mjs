import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const assetsDir = './src/assets';
const QUALITY = 82;

// Logos de clientes são pequenos (<20KB) — converter também não faz mal
const SKIP = ['hero-video.mp4', 'desktop.ini'];

const files = await readdir(assetsDir);
const images = files.filter(f => {
  const ext = extname(f).toLowerCase();
  return ['.png', '.jpg', '.jpeg'].includes(ext) && !SKIP.includes(f);
});

console.log(`Convertendo ${images.length} imagens para WebP (quality=${QUALITY})...\n`);

let savedTotal = 0;

for (const file of images) {
  const ext = extname(file);
  const name = basename(file, ext);
  const input = join(assetsDir, file);
  const output = join(assetsDir, `${name}.webp`);

  const meta = await sharp(input).metadata();
  const { size: before } = await import('fs').then(fs =>
    new Promise(res => fs.stat(input, (_, s) => res(s)))
  );

  await sharp(input)
    .webp({ quality: QUALITY })
    .toFile(output);

  const { size: after } = await import('fs').then(fs =>
    new Promise(res => fs.stat(output, (_, s) => res(s)))
  );

  const saved = before - after;
  savedTotal += saved;
  const pct = Math.round((saved / before) * 100);
  console.log(`${file.padEnd(40)} ${(before/1024).toFixed(0).padStart(6)} KB → ${(after/1024).toFixed(0).padStart(5)} KB  (-${pct}%)`);

  // Remove o original após conversão bem-sucedida
  await unlink(input);
}

console.log(`\nTotal economizado: ${(savedTotal / 1024 / 1024).toFixed(1)} MB`);
