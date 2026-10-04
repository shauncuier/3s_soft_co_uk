import sharp from 'sharp';
import potrace from 'potrace';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';

const trace = promisify(potrace.trace);
const SOURCE = 'brand-source/3s-soft-logo-source.png';
const { data, info } = await sharp(SOURCE).raw().toBuffer({ resolveWithObject: true });

const maskGreen = Buffer.alloc(info.width * info.height, 255);
const maskLowerS = Buffer.alloc(info.width * info.height, 255);
const maskThree = Buffer.alloc(info.width * info.height, 255);
const maskSoft = Buffer.alloc(info.width * info.height, 255);

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const idx = (y * info.width + x) * info.channels;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    
    // Smooth threshold for anti-aliased edge
    const isDark = (r < 225 || g < 225 || b < 225);
    if (!isDark) continue;

    const pIdx = y * info.width + x;

    if (y >= 320) {
      maskSoft[pIdx] = 0;
    } else if (x >= 255) {
      if (y <= 186) {
        maskGreen[pIdx] = 0;
      } else {
        maskLowerS[pIdx] = 0;
      }
    } else {
      maskThree[pIdx] = 0;
    }
  }
}

const traceOpts = {
  turdSize: 2,
  optTolerance: 0.15,
  alphaMax: 1.0,
};

async function getPath(maskBuffer) {
  const png = await sharp(maskBuffer, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toBuffer();
  const svg = await trace(png, traceOpts);
  const match = svg.match(/d="([^"]+)"/);
  return match ? match[1] : '';
}

const [pathGreen, pathLowerS, pathThree, pathSoft] = await Promise.all([
  getPath(maskGreen),
  getPath(maskLowerS),
  getPath(maskThree),
  getPath(maskSoft),
]);

console.log('Traced paths:', {
  greenLen: pathGreen.length,
  lowerSLen: pathLowerS.length,
  threeLen: pathThree.length,
  softLen: pathSoft.length,
});

// Build the dark-mode vector SVG:
// For dark mode:
// '3': clean platinum silver metallic gradient
// 'lowerS': matching platinum silver metallic gradient
// 'green': vibrant emerald green gradient (#22c55e to #16a34a)
// 'SOFT': precision styled geometric text or tracked path
const svgDark = `
<svg viewBox="35 85 435 305" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-auto h-full">
  <defs>
    <linearGradient id="logoGreenDark" x1="260" y1="90" x2="470" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22c55e" />
      <stop offset="60%" stop-color="#16a34a" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <linearGradient id="logoSilverDark" x1="40" y1="90" x2="470" y2="295" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="45%" stop-color="#d1d5db" />
      <stop offset="85%" stop-color="#9ca3af" />
      <stop offset="100%" stop-color="#f3f4f6" />
    </linearGradient>
  </defs>

  <!-- Numeral 3 -->
  <path d="${pathThree}" fill="url(#logoSilverDark)" />

  <!-- Upper S (Brand Green) -->
  <path d="${pathGreen}" fill="url(#logoGreenDark)" />

  <!-- Lower S (Silver) -->
  <path d="${pathLowerS}" fill="url(#logoSilverDark)" />

  <!-- Wordmark SOFT -->
  <g fill="#f8fafc">
    <text x="250" y="380" font-family="'Manrope Variable', -apple-system, BlinkMacSystemFont, sans-serif" font-size="62" font-weight="700" letter-spacing="0.44em" text-anchor="middle">SOFT</text>
  </g>
</svg>
`.trim();

// Light mode vector SVG (for light backgrounds / print)
const svgLight = `
<svg viewBox="35 85 435 305" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-auto h-full">
  <defs>
    <linearGradient id="logoGreenLight" x1="260" y1="90" x2="470" y2="190" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22c55e" />
      <stop offset="60%" stop-color="#1f8a4c" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <linearGradient id="logoGraphiteLight" x1="40" y1="90" x2="470" y2="295" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2d3330" />
      <stop offset="50%" stop-color="#4b5563" />
      <stop offset="100%" stop-color="#1f2422" />
    </linearGradient>
  </defs>

  <path d="${pathThree}" fill="url(#logoGraphiteLight)" />
  <path d="${pathGreen}" fill="url(#logoGreenLight)" />
  <path d="${pathLowerS}" fill="url(#logoGraphiteLight)" />

  <g fill="#1f2422">
    <text x="250" y="380" font-family="'Manrope Variable', -apple-system, BlinkMacSystemFont, sans-serif" font-size="62" font-weight="700" letter-spacing="0.44em" text-anchor="middle">SOFT</text>
  </g>
</svg>
`.trim();

await writeFile('src/assets/brand/3s-soft-logo-dark.svg', svgDark);
await writeFile('src/assets/brand/3s-soft-logo-light.svg', svgLight);

// Also generate a preview PNG on dark background to inspect
await sharp(Buffer.from(svgDark))
  .resize(600)
  .flatten({ background: '#090b0a' })
  .png()
  .toFile('/Users/jashedulislamshaun/.gemini/antigravity-ide/brain/3663819a-5287-42cf-9141-5085d3ebd2b2/scratch/preview-vector-dark-v2.png');

console.log('Saved clean vector SVGs and preview.');
