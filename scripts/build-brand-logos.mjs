import sharp from 'sharp';

const SOURCE = 'brand-source/3s-soft-logo-source.png';
const { data, info } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });

// Bounds of the complete logo in source: minX=35, maxX=470, minY=86, maxY=387
const outDark = Buffer.alloc(info.width * info.height * 4);
const outOriginal = Buffer.alloc(info.width * info.height * 4);

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const sIdx = (y * info.width + x) * info.channels;
    const dIdx = (y * info.width + x) * 4;

    const r = data[sIdx], g = data[sIdx + 1], b = data[sIdx + 2];
    const minC = Math.min(r, g, b);
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;

    // True background in source image is pure white (> 248)
    // Edge anti-aliasing is between 225 and 250
    // Interior is solid opaque
    let alpha = 0;
    if (minC >= 250) {
      alpha = 0;
    } else if (minC >= 225) {
      alpha = Math.round((250 - minC) / 25 * 255);
    } else {
      alpha = 255;
    }

    if (alpha === 0) {
      outDark[dIdx + 3] = 0;
      outOriginal[dIdx + 3] = 0;
      continue;
    }

    const isGreen = (g - Math.max(r, b)) > 4 && (x >= 250) && (y < 230);

    // --- DARK THEME LOGO (For dark luxury backgrounds) ---
    if (isGreen) {
      // Emerald gradient
      const normG = (255 - luma) / 180;
      outDark[dIdx] = Math.round(20 + 15 * (1 - normG));
      outDark[dIdx + 1] = Math.round(180 + 55 * (1 - normG * 0.4));
      outDark[dIdx + 2] = Math.round(80 + 20 * normG);
      outDark[dIdx + 3] = alpha;
    } else {
      // Sleek Metallic Platinum Silver / White
      const normLuma = (luma - 65) / (225 - 65);
      const val = Math.min(255, Math.round(215 + normLuma * 40));
      outDark[dIdx] = val;
      outDark[dIdx + 1] = Math.min(255, val + 2);
      outDark[dIdx + 2] = Math.min(255, val + 4);
      outDark[dIdx + 3] = alpha;
    }

    // --- ORIGINAL THEME LOGO (Original graphite + green on transparent) ---
    outOriginal[dIdx] = r;
    outOriginal[dIdx + 1] = g;
    outOriginal[dIdx + 2] = b;
    outOriginal[dIdx + 3] = alpha;
  }
}

// Trim whitespace around both
const trimmedDark = await sharp(outDark, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png()
  .toBuffer();

const trimmedOrig = await sharp(outOriginal, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png()
  .toBuffer();

const meta = await sharp(trimmedDark).metadata();
console.log('Trimmed dimensions:', meta.width, 'x', meta.height);

// Save production assets
await sharp(trimmedDark).png().toFile('src/assets/brand/3s-soft-logo-dark.png');
await sharp(trimmedDark).png().toFile('src/assets/brand/3s-soft-logo.png');
await sharp(trimmedOrig).png().toFile('src/assets/brand/3s-soft-logo-light.png');
await sharp(trimmedDark).png().toFile('public/images/logo.png');

// Sharp Favicons & App Icons
await sharp(trimmedDark)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('public/favicon-32.png');

await sharp(trimmedDark)
  .resize(192, 192, { fit: 'contain', background: { r: 9, g: 11, b: 10, alpha: 1 } })
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('Successfully generated all clean, uncut, transparent brand assets.');
