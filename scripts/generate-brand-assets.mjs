/**
 * Generates web brand assets from the official 3s-Soft logo.
 *
 * Source:  brand-source/3s-soft-logo-source.png  (official logo, white background)
 * Outputs:
 *   src/assets/brand/3s-soft-logo.png   – trimmed logo with transparent background (header/footer)
 *   public/favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png
 *   public/og-default.png               – 1200×630 Open Graph image
 *
 * The logo artwork is never redrawn or distorted – it is only trimmed, padded
 * and scaled proportionally.
 *
 * Usage: node scripts/generate-brand-assets.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SOURCE = 'brand-source/3s-soft-logo-source.png';
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const PAPER = { r: 247, g: 247, b: 245, alpha: 1 };

await mkdir('src/assets/brand', { recursive: true });
await mkdir('public', { recursive: true });

/** Converts the white background to transparency with a soft anti-aliased edge. */
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const lum = Math.min(data[i], data[i + 1], data[i + 2]);
    if (lum >= 250) data[i + 3] = 0;
    else if (lum > 205) data[i + 3] = Math.round(((250 - lum) / 45) * 255);
  }
  return sharp(data, { raw: info }).png();
}

// 1. Trimmed, transparent logo (keeps original proportions)
const trimmed = await sharp(SOURCE).trim({ background: '#ffffff', threshold: 10 }).toBuffer();
const transparentLogo = await (await whiteToAlpha(trimmed)).toBuffer();
await sharp(transparentLogo)
  .resize({ height: 240, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile('src/assets/brand/3s-soft-logo.png');

// 2. "3S" mark only (rows above the SOFT wordmark) for small icons
const markArea = await sharp(SOURCE).extract({ left: 0, top: 80, width: 512, height: 222 }).toBuffer();
const mark = await sharp(markArea).trim({ background: '#ffffff', threshold: 10 }).toBuffer();

async function squareIcon(input, size, padRatio, bg = WHITE) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const resized = await sharp(input).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: resized, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const fav16 = await squareIcon(mark, 16, 0.04);
const fav32 = await squareIcon(mark, 32, 0.06);
const fav48 = await squareIcon(mark, 48, 0.06);
await writeFile('public/favicon-32.png', fav32);
await writeFile('public/apple-touch-icon.png', await squareIcon(trimmed, 180, 0.14));
await writeFile('public/icon-192.png', await squareIcon(trimmed, 192, 0.14));
await writeFile('public/icon-512.png', await squareIcon(trimmed, 512, 0.14));

// 3. favicon.ico containing PNG-encoded 16/32/48 images
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + images.length * 16;
  for (const { size, buf } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.buf)]);
}
await writeFile(
  'public/favicon.ico',
  buildIco([
    { size: 16, buf: fav16 },
    { size: 32, buf: fav32 },
    { size: 48, buf: fav48 },
  ]),
);

// 4. Open Graph image (1200×630)
const ogLogo = await sharp(transparentLogo).resize({ height: 150 }).toBuffer();
const ogSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#e4e4e0" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#f7f7f5"/>
  <rect width="1200" height="630" fill="url(#g)" opacity="0.7"/>
  <rect x="80" y="300" width="56" height="4" fill="#1f8a4c"/>
  <text x="80" y="380" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="600" fill="#141615" letter-spacing="-1.5">Digital Commerce &amp; Technology,</text>
  <text x="80" y="450" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="58" font-weight="600" fill="#141615" letter-spacing="-1.5">Built for Business.</text>
  <text x="80" y="550" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="#5b605d" letter-spacing="0.5">3s-Soft UK  ·  3s-soft.co.uk</text>
</svg>`;
await sharp(Buffer.from(ogSvg))
  .composite([{ input: ogLogo, left: 80, top: 90 }])
  .flatten({ background: PAPER })
  .png({ compressionLevel: 9 })
  .toFile('public/og-default.png');

console.log('Brand assets generated.');
