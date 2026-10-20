/**
 * Brand asset build.
 *
 * Source of truth: brand-source/3s-soft-logo-source.png (official mark on white).
 * Produces, without recolouring the mark on light surfaces:
 *   src/assets/brand/logo.png          trimmed, transparent, original colours (header/footer)
 *   src/assets/brand/logo-white.png    single-colour white version for graphite bands
 *   public/favicon-32.png, public/apple-touch-icon.png (180), public/icon-192.png, public/icon-512.png
 *   public/og-default.png              1200x630 social card on paper
 *
 * Run: node scripts/build-brand-logos.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SOURCE = 'brand-source/3s-soft-logo-source.png';
const PAPER = { r: 0xf7, g: 0xf6, b: 0xf2, alpha: 1 };

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const original = Buffer.alloc(width * height * 4);
const white = Buffer.alloc(width * height * 4);

for (let i = 0; i < width * height; i++) {
  const s = i * channels;
  const d = i * 4;
  const r = data[s], g = data[s + 1], b = data[s + 2];
  const minC = Math.min(r, g, b);
  // Background is pure white; anti-aliased edges sit between 225 and 250.
  let alpha = 0;
  if (minC >= 250) alpha = 0;
  else if (minC >= 225) alpha = Math.round(((250 - minC) / 25) * 255);
  else alpha = 255;

  original[d] = r; original[d + 1] = g; original[d + 2] = b; original[d + 3] = alpha;
  white[d] = 255; white[d + 1] = 255; white[d + 2] = 255; white[d + 3] = alpha;
}

const raw = { width, height, channels: 4 };
const trimmedOriginal = await sharp(original, { raw }).trim().png().toBuffer();
const trimmedWhite = await sharp(white, { raw }).trim().png().toBuffer();
const meta = await sharp(trimmedOriginal).metadata();
console.log(`Trimmed mark: ${meta.width}x${meta.height}`);

await mkdir('src/assets/brand', { recursive: true });
await sharp(trimmedOriginal).png({ compressionLevel: 9 }).toFile('src/assets/brand/logo.png');
await sharp(trimmedWhite).png({ compressionLevel: 9 }).toFile('src/assets/brand/logo-white.png');

// Square icons: mark centred on paper with padding.
async function icon(size, file, pad = 0.12) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(trimmedOriginal).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png()
    .toFile(file);
}
await icon(32, 'public/favicon-32.png', 0.04);
await icon(180, 'public/apple-touch-icon.png');
await icon(192, 'public/icon-192.png');
await icon(512, 'public/icon-512.png');

// Social card: mark left, text right, on paper.
const ogW = 1200, ogH = 630;
const markH = 300;
const markBuf = await sharp(trimmedOriginal).resize({ height: markH, fit: 'inside' }).png().toBuffer();
const markMeta = await sharp(markBuf).metadata();
const textSvg = Buffer.from(`
<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .brand { font: 600 30px 'Helvetica Neue', Helvetica, Arial, sans-serif; fill: #1f8a4c; letter-spacing: 2px; }
    .h { font: 400 54px Georgia, 'Times New Roman', serif; fill: #1b1f1d; }
    .sub { font: 500 26px 'Helvetica Neue', Helvetica, Arial, sans-serif; fill: #474e4a; }
    .url { font: 600 22px 'Helvetica Neue', Helvetica, Arial, sans-serif; fill: #6a726e; letter-spacing: 1px; }
  </style>
  <text x="470" y="215" class="brand">3S-SOFT UK</text>
  <text x="470" y="290" class="h">One UK team for your website,</text>
  <text x="470" y="356" class="h">your store and your listings.</text>
  <text x="470" y="420" class="sub">Shopify · Amazon &amp; eBay · Automation · Websites</text>
  <text x="470" y="520" class="url">3S-SOFT.CO.UK</text>
</svg>`);
await sharp({ create: { width: ogW, height: ogH, channels: 4, background: PAPER } })
  .composite([
    { input: markBuf, left: Math.round(110 + (300 - markMeta.width) / 2), top: Math.round((ogH - markH) / 2) },
    { input: textSvg, left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og-default.png');

console.log('Brand assets written.');
