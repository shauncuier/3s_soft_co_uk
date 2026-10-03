/**
 * Generates placeholder project visuals (SVG interface mockups rendered to JPG)
 * and detail crops used in case-study galleries.
 *
 * These are DEMO visuals only – replace them with real project screenshots
 * in src/assets/projects/ (keep the same file names, or update the
 * case-study frontmatter).
 *
 * Usage: node scripts/generate-mockups.mjs
 */
import sharp from 'sharp';

const OUT = 'src/assets/projects';
const FONT = "Helvetica Neue, Helvetica, Arial, sans-serif";
const GREEN = '#1f8a4c';

const t = (x, y, text, { size = 14, weight = 400, fill = '#1a1c1b', anchor = 'start', ls = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${ls}">${text}</text>`;

const chrome = (x, y, w, url, dark = false) => `
  <rect x="${x}" y="${y}" width="${w}" height="48" rx="14" fill="${dark ? '#1c201f' : '#f3f3f1'}"/>
  <rect x="${x}" y="${y + 30}" width="${w}" height="18" fill="${dark ? '#1c201f' : '#f3f3f1'}"/>
  <circle cx="${x + 26}" cy="${y + 24}" r="6" fill="${dark ? '#3a403e' : '#d5d5d1'}"/>
  <circle cx="${x + 46}" cy="${y + 24}" r="6" fill="${dark ? '#3a403e' : '#d5d5d1'}"/>
  <circle cx="${x + 66}" cy="${y + 24}" r="6" fill="${dark ? '#3a403e' : '#d5d5d1'}"/>
  <rect x="${x + w / 2 - 200}" y="${y + 11}" width="400" height="26" rx="13" fill="${dark ? '#121514' : '#ffffff'}"/>
  ${t(x + w / 2, y + 29, url, { size: 13, fill: dark ? '#7d8582' : '#8a8f8c', anchor: 'middle' })}
  <line x1="${x}" y1="${y + 48}" x2="${x + w}" y2="${y + 48}" stroke="${dark ? '#2a2f2d' : '#e6e6e2'}"/>`;

/* ---------------------------------------------------------------- */
/* 1. Product data / catalogue management (light, 1600×1200)          */
/* ---------------------------------------------------------------- */
async function productData() {
  const W = 1600, H = 1200, X = 120, Y = 150, BW = 1360, BH = 900;
  const field = (x, y, w, label, value) => `
    ${t(x, y, label, { size: 12, weight: 600, fill: '#7a7f7c', ls: 0.6 })}
    <rect x="${x}" y="${y + 10}" width="${w}" height="44" rx="8" fill="#fff" stroke="#e2e2de"/>
    ${t(x + 14, y + 38, value, { size: 15, fill: '#1a1c1b' })}`;
  const navItem = (y, label, active = false) => `
    ${active ? `<rect x="${X + 14}" y="${y - 20}" width="192" height="34" rx="8" fill="#e8f2ec"/>` : ''}
    <rect x="${X + 30}" y="${y - 9}" width="12" height="12" rx="3" fill="none" stroke="${active ? GREEN : '#9a9f9c'}" stroke-width="1.6"/>
    ${t(X + 54, y + 2, label, { size: 14, weight: active ? 600 : 400, fill: active ? GREEN : '#4b504d' })}`;
  const row = (y, sku, variant, stock, ok = true) => `
    <line x1="${X + 860}" y1="${y - 26}" x2="${X + BW - 40}" y2="${y - 26}" stroke="#ececE8"/>
    ${t(X + 876, y, sku, { size: 13, fill: '#4b504d' })}
    ${t(X + 1010, y, variant, { size: 13, fill: '#1a1c1b' })}
    ${t(X + 1150, y, stock, { size: 13, fill: '#4b504d' })}
    <rect x="${X + 1220}" y="${y - 15}" width="74" height="22" rx="11" fill="${ok ? '#e8f2ec' : '#f6eee4'}"/>
    ${t(X + 1257, y, ok ? 'Ready' : 'Review', { size: 12, weight: 600, fill: ok ? GREEN : '#a5651d', anchor: 'middle' })}`;

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#f1f0ec"/><stop offset="1" stop-color="#dcdbd6"/></radialGradient>
      <filter id="sh" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#2b2b25" flood-opacity="0.16"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g filter="url(#sh)"><rect x="${X}" y="${Y}" width="${BW}" height="${BH}" rx="14" fill="#fbfbfa"/></g>
    ${chrome(X, Y, BW, 'catalogue.example/products/HW-VS-1042')}
    <rect x="${X}" y="${Y + 49}" width="220" height="${BH - 49}" fill="#f5f5f2"/>
    <rect x="${X}" y="${Y + BH - 14}" width="220" height="14" rx="0" fill="#f5f5f2"/>
    <line x1="${X + 220}" y1="${Y + 49}" x2="${X + 220}" y2="${Y + BH}" stroke="#e6e6e2"/>
    ${t(X + 30, Y + 100, 'CATALOGUE', { size: 11, weight: 700, fill: '#9a9f9c', ls: 1.6 })}
    ${navItem(Y + 140, 'Overview')}
    ${navItem(Y + 180, 'Products', true)}
    ${navItem(Y + 220, 'Attributes')}
    ${navItem(Y + 260, 'Categories')}
    ${navItem(Y + 300, 'Media')}
    ${navItem(Y + 340, 'Channel feeds')}
    ${navItem(Y + 380, 'Imports')}

    ${t(X + 260, Y + 100, 'Home  /  Vases  /  Stoneware', { size: 13, fill: '#8a8f8c' })}
    ${t(X + 260, Y + 140, 'Striated Stoneware Vase', { size: 28, weight: 600, fill: '#141615', ls: -0.5 })}
    <rect x="${X + BW - 220}" y="${Y + 108}" width="180" height="42" rx="8" fill="#141615"/>
    ${t(X + BW - 130, Y + 135, 'Publish changes', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}

    <rect x="${X + 260}" y="${Y + 180}" width="560" height="420" rx="12" fill="#efeeea"/>
    <rect id="productSlot" x="${X + 260}" y="${Y + 180}" width="560" height="420" rx="12" fill="none"/>
    ${[0, 1, 2, 3].map((i) => `<rect x="${X + 260 + i * 146}" y="${Y + 620}" width="124" height="96" rx="8" fill="${i === 0 ? '#fff' : '#efeeea'}" stroke="${i === 0 ? GREEN : '#e2e2de'}" stroke-width="${i === 0 ? 2 : 1}"/>`).join('')}

    <rect x="${X + 260}" y="${Y + 746}" width="560" height="110" rx="12" fill="#fff" stroke="#e6e6e2"/>
    ${t(X + 284, Y + 782, 'Attribute completeness', { size: 14, weight: 600 })}
    ${t(X + 796, Y + 782, '18 / 20', { size: 14, weight: 600, fill: GREEN, anchor: 'end' })}
    <rect x="${X + 284}" y="${Y + 802}" width="512" height="8" rx="4" fill="#ececE8"/>
    <rect x="${X + 284}" y="${Y + 802}" width="460" height="8" rx="4" fill="${GREEN}"/>
    ${t(X + 284, Y + 836, 'Missing: care instructions, country of origin', { size: 13, fill: '#8a8f8c' })}

    ${field(X + 860, Y + 200, 230, 'SKU', 'HW-VS-1042')}
    ${field(X + 1110, Y + 200, 210, 'MATERIAL', 'Stoneware')}
    ${field(X + 860, Y + 290, 460, 'PRODUCT TITLE', 'Striated Stoneware Vase – Natural')}
    ${field(X + 860, Y + 380, 230, 'DIMENSIONS', '18 × 18 × 24 cm')}
    ${field(X + 1110, Y + 380, 210, 'WEIGHT', '1.2 kg')}
    ${t(X + 860, Y + 470, 'COLOURWAYS', { size: 12, weight: 600, fill: '#7a7f7c', ls: 0.6 })}
    ${['#e9e4da', '#c9b79c', '#2f4a3c', '#2b2b2b'].map((c, i) => `<circle cx="${X + 878 + i * 40}" cy="${Y + 502}" r="14" fill="${c}" stroke="${i === 0 ? GREEN : '#d8d8d4'}" stroke-width="${i === 0 ? 3 : 1}"/>`).join('')}

    ${t(X + 860, Y + 580, 'Variants', { size: 16, weight: 600 })}
    ${t(X + 876, Y + 620, 'SKU', { size: 11, weight: 700, fill: '#9a9f9c', ls: 1 })}
    ${t(X + 1010, Y + 620, 'VARIANT', { size: 11, weight: 700, fill: '#9a9f9c', ls: 1 })}
    ${t(X + 1150, Y + 620, 'STOCK', { size: 11, weight: 700, fill: '#9a9f9c', ls: 1 })}
    ${t(X + 1220, Y + 620, 'STATUS', { size: 11, weight: 700, fill: '#9a9f9c', ls: 1 })}
    ${row(Y + 664, 'HW-VS-1042-N', 'Natural', '42')}
    ${row(Y + 712, 'HW-VS-1042-S', 'Sand', '18')}
    ${row(Y + 760, 'HW-VS-1042-G', 'Forest', '7', false)}
    ${row(Y + 808, 'HW-VS-1042-C', 'Charcoal', '26')}
  </svg>`;

  // Crisp vector product shot for the image slot (and its thumbnail)
  const vase = (w, h) => `
    <svg width="${w}" height="${h}" viewBox="0 0 560 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f1ed"/><stop offset="1" stop-color="#e6e3dd"/></linearGradient>
        <linearGradient id="body" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b9b3a9"/><stop offset="0.35" stop-color="#ebe7df"/><stop offset="0.6" stop-color="#ddd8ce"/><stop offset="1" stop-color="#a59f95"/></linearGradient>
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#8d877c" stop-opacity="0.45"/><stop offset="1" stop-color="#8d877c" stop-opacity="0"/></radialGradient>
        <clipPath id="vc"><path d="M250 92 C250 112 236 122 214 140 C176 172 168 214 176 262 C186 318 222 346 280 346 C338 346 374 318 384 262 C392 214 384 172 346 140 C324 122 310 112 310 92 Z"/></clipPath>
      </defs>
      <rect width="560" height="420" rx="12" fill="url(#bgp)"/>
      <ellipse cx="296" cy="350" rx="150" ry="18" fill="url(#shadow)"/>
      <g clip-path="url(#vc)">
        <rect x="160" y="80" width="240" height="280" fill="url(#body)"/>
        ${Array.from({ length: 26 }, (_, i) => `<rect x="${172 + i * 8.6}" y="120" width="1.6" height="230" fill="#9c968b" opacity="0.35"/>`).join('')}
      </g>
      <ellipse cx="280" cy="92" rx="30" ry="7" fill="#cfc9bf"/>
      <ellipse cx="280" cy="92" rx="22" ry="4.5" fill="#8f897f"/>
    </svg>`;
  const rounded = await sharp(Buffer.from(vase(560, 420))).png().toBuffer();
  const thumb = await sharp(Buffer.from(vase(120, 90))).png().toBuffer();

  await sharp(Buffer.from(svg))
    .composite([
      { input: rounded, left: X + 260, top: Y + 180 },
      { input: thumb, left: X + 262, top: Y + 623 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(`${OUT}/product-data.jpg`);
}

/* ---------------------------------------------------------------- */
/* 2. Automation / inventory sync (dark, 1600×900)                    */
/* ---------------------------------------------------------------- */
async function automation() {
  const W = 1600, H = 900, X = 100, Y = 90, BW = 1400, BH = 720;
  const node = (x, y, title, sub, accent = false) => `
    <rect x="${x}" y="${y}" width="200" height="86" rx="12" fill="#1a1f1d" stroke="${accent ? GREEN : '#2c3230'}" stroke-width="${accent ? 1.6 : 1}"/>
    <rect x="${x + 16}" y="${y + 18}" width="28" height="28" rx="7" fill="${accent ? '#16352a' : '#232927'}"/>
    <circle cx="${x + 30}" cy="${y + 32}" r="5" fill="${accent ? '#3fbf7a' : '#6f7975'}"/>
    ${t(x + 56, y + 38, title, { size: 15, weight: 600, fill: '#eef1ef' })}
    ${t(x + 16, y + 68, sub, { size: 12, fill: '#7d8783' })}`;
  const link = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    return `<path d="M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}" fill="none" stroke="#33403b" stroke-width="2"/>
      <circle cx="${x2 - 2}" cy="${y2}" r="4" fill="${GREEN}"/>`;
  };
  const log = (y, time, msg, ok = true) => `
    <circle cx="${X + 1088}" cy="${y - 5}" r="4" fill="${ok ? '#3fbf7a' : '#d9a441'}"/>
    ${t(X + 1104, y, time, { size: 12, fill: '#6f7975' })}
    ${t(X + 1176, y, msg, { size: 13, fill: '#c9d0cd' })}`;

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="30%" cy="20%" r="90%"><stop offset="0" stop-color="#1b211f"/><stop offset="1" stop-color="#0b0d0c"/></radialGradient>
      <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#222826"/></pattern>
      <filter id="sh"><feDropShadow dx="0" dy="30" stdDeviation="30" flood-color="#000" flood-opacity="0.5"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g filter="url(#sh)"><rect x="${X}" y="${Y}" width="${BW}" height="${BH}" rx="14" fill="#121514" stroke="#262b29"/></g>
    ${chrome(X, Y, BW, 'automation.example/workflows/order-sync', true)}
    ${t(X + 40, Y + 104, 'Order &amp; Inventory Sync', { size: 24, weight: 600, fill: '#f3f5f4', ls: -0.4 })}
    <rect x="${X + 330}" y="${Y + 84}" width="86" height="26" rx="13" fill="#16352a"/>
    <circle cx="${X + 348}" cy="${Y + 97}" r="4" fill="#3fbf7a"/>
    ${t(X + 360, Y + 102, 'Active', { size: 12, weight: 600, fill: '#59d391' })}
    ${t(X + 40, Y + 134, 'Runs every 5 minutes  ·  4 connected channels', { size: 13, fill: '#7d8783' })}

    <rect x="${X + 40}" y="${Y + 160}" width="1000" height="510" rx="12" fill="url(#dots)" stroke="#222826"/>
    ${node(X + 70, Y + 300, 'New orders', 'Storefront webhook', true)}
    ${node(X + 320, Y + 300, 'Validate', 'Address · stock · rules')}
    ${node(X + 570, Y + 200, 'Inventory', 'Update stock levels')}
    ${node(X + 570, Y + 420, 'Fulfilment', 'Create shipment')}
    ${node(X + 820, Y + 200, 'Channels', 'Sync marketplace stock', true)}
    ${node(X + 820, Y + 420, 'Notify', 'Team &amp; customer')}
    ${link(X + 270, Y + 343, X + 320, Y + 343)}
    ${link(X + 520, Y + 343, X + 570, Y + 243)}
    ${link(X + 520, Y + 343, X + 570, Y + 463)}
    ${link(X + 770, Y + 243, X + 820, Y + 243)}
    ${link(X + 770, Y + 463, X + 820, Y + 463)}
    ${t(X + 70, Y + 630, 'Drag to rearrange  ·  Changes are versioned', { size: 12, fill: '#56605c' })}

    <rect x="${X + 1064}" y="${Y + 160}" width="296" height="510" rx="12" fill="#161a19" stroke="#222826"/>
    ${t(X + 1088, Y + 198, 'Activity', { size: 15, weight: 600, fill: '#eef1ef' })}
    ${log(Y + 240, '12:04', 'Order synced to fulfilment')}
    ${log(Y + 280, '12:04', 'Stock updated on 4 channels')}
    ${log(Y + 320, '11:59', 'Order synced to fulfilment')}
    ${log(Y + 360, '11:59', 'Low-stock alert sent', false)}
    ${log(Y + 400, '11:54', 'Stock updated on 4 channels')}
    ${log(Y + 440, '11:49', 'Feed validation passed')}
    ${log(Y + 480, '11:44', 'Order synced to fulfilment')}
    <line x1="${X + 1088}" y1="${Y + 520}" x2="${X + 1336}" y2="${Y + 520}" stroke="#262b29"/>
    ${t(X + 1088, Y + 556, 'LAST RUN', { size: 11, weight: 700, fill: '#6f7975', ls: 1.4 })}
    ${t(X + 1088, Y + 584, 'Completed without errors', { size: 14, fill: '#c9d0cd' })}
    ${t(X + 1088, Y + 626, 'NEXT RUN', { size: 11, weight: 700, fill: '#6f7975', ls: 1.4 })}
    ${t(X + 1088, Y + 654, 'In 3 minutes', { size: 14, fill: '#c9d0cd' })}
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}/automation.jpg`);
}

/* ---------------------------------------------------------------- */
/* 3. Corporate website (dark backdrop, light site, 1600×900)        */
/* ---------------------------------------------------------------- */
async function corporate() {
  const W = 1600, H = 900, X = 170, Y = 90, BW = 1260, BH = 760;
  const fins = Array.from({ length: 11 }, (_, i) =>
    `<rect x="${X + 760 + i * 40}" y="${Y + 196}" width="22" height="324" fill="${i % 2 ? '#c9c3b9' : '#ddd8cf'}"/>
     <rect x="${X + 778 + i * 40}" y="${Y + 196}" width="4" height="324" fill="#a8a298"/>`,
  ).join('');
  const service = (x, title, line) => `
    <line x1="${x}" y1="${Y + 590}" x2="${x + 340}" y2="${Y + 590}" stroke="#d9d6d0"/>
    <circle cx="${x + 12}" cy="${Y + 626}" r="11" fill="none" stroke="${GREEN}" stroke-width="1.6"/>
    ${t(x + 36, Y + 632, title, { size: 17, weight: 600, fill: '#161816' })}
    ${t(x, Y + 668, line, { size: 13, fill: '#6b706d' })}
    <rect x="${x}" y="${Y + 684}" width="${200}" height="8" rx="4" fill="#ebe8e3"/>`;

  const svg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#2a2e2c"/><stop offset="1" stop-color="#101211"/></radialGradient>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e5df"/><stop offset="1" stop-color="#cfcac1"/></linearGradient>
      <filter id="sh"><feDropShadow dx="0" dy="30" stdDeviation="34" flood-color="#000" flood-opacity="0.55"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <g filter="url(#sh)"><rect x="${X}" y="${Y}" width="${BW}" height="${BH}" rx="14" fill="#faf9f7"/></g>
    ${chrome(X, Y, BW, 'company.example')}
    <rect x="${X + 48}" y="${Y + 82}" width="22" height="22" rx="4" fill="#161816"/>
    <rect x="${X + 54}" y="${Y + 88}" width="10" height="10" fill="${GREEN}"/>
    ${t(X + 82, Y + 99, 'Company', { size: 16, weight: 700, fill: '#161816', ls: -0.2 })}
    ${['Solutions', 'Sectors', 'Projects', 'About'].map((l, i) => t(X + 620 + i * 110, Y + 99, l, { size: 14, fill: '#4b504d' })).join('')}
    <rect x="${X + BW - 168}" y="${Y + 76}" width="120" height="36" rx="18" fill="#161816"/>
    ${t(X + BW - 108, Y + 99, 'Contact', { size: 13, weight: 600, fill: '#fff', anchor: 'middle' })}

    ${t(X + 48, Y + 196, 'INDUSTRIAL SERVICES', { size: 12, weight: 700, fill: GREEN, ls: 2 })}
    ${t(X + 48, Y + 262, 'Precision engineering', { size: 50, weight: 600, fill: '#141615', ls: -1.6 })}
    ${t(X + 48, Y + 322, 'for modern industry.', { size: 50, weight: 600, fill: '#141615', ls: -1.6 })}
    ${t(X + 48, Y + 374, 'Placeholder supporting copy describing the organisation,', { size: 16, fill: '#5d625f' })}
    ${t(X + 48, Y + 400, 'its sectors and its approach to long-term partnerships.', { size: 16, fill: '#5d625f' })}
    <rect x="${X + 48}" y="${Y + 436}" width="170" height="48" rx="24" fill="#141615"/>
    ${t(X + 133, Y + 466, 'Our capabilities', { size: 14, weight: 600, fill: '#fff', anchor: 'middle' })}
    <rect x="${X + 232}" y="${Y + 436}" width="150" height="48" rx="24" fill="none" stroke="#cfccc6"/>
    ${t(X + 307, Y + 466, 'View projects', { size: 14, weight: 600, fill: '#141615', anchor: 'middle' })}

    <rect x="${X + 720}" y="${Y + 130}" width="500" height="420" rx="10" fill="url(#sky)"/>
    <rect x="${X + 740}" y="${Y + 176}" width="460" height="20" fill="#6e6a63"/>
    <rect x="${X + 740}" y="${Y + 196}" width="460" height="324" fill="#8f8a82"/>
    ${fins}
    <rect x="${X + 720}" y="${Y + 520}" width="500" height="30" fill="#6e6a63"/>
    <rect x="${X + 720}" y="${Y + 540}" width="500" height="10" rx="0" fill="#5c5852"/>

    ${service(X + 48, 'Engineering', 'Placeholder service description text.')}
    ${service(X + 448, 'Manufacturing', 'Placeholder service description text.')}
    ${service(X + 848, 'Maintenance', 'Placeholder service description text.')}
  </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(`${OUT}/corporate-website.jpg`);
}

/* ---------------------------------------------------------------- */
/* 4. Gallery detail crops from existing visuals                      */
/* ---------------------------------------------------------------- */
async function crops() {
  const crop = (src, out, area, width = 1400) =>
    sharp(`${OUT}/${src}`).extract(area).resize({ width }).jpeg({ quality: 86, mozjpeg: true }).toFile(`${OUT}/${out}`);
  await crop('shopify-storefront.jpg', 'shopify-storefront-detail.jpg', { left: 216, top: 244, width: 768, height: 540 });
  await crop('marketplace-operations.jpg', 'marketplace-operations-detail.jpg', { left: 246, top: 260, width: 864, height: 400 });
  await crop('mobile-commerce.jpg', 'mobile-commerce-detail.jpg', { left: 440, top: 180, width: 340, height: 560 }, 700);
  await crop('product-data.jpg', 'product-data-detail.jpg', { left: 960, top: 320, width: 520, height: 680 }, 800);
  await crop('automation.jpg', 'automation-detail.jpg', { left: 140, top: 250, width: 1040, height: 520 });
  await crop('corporate-website.jpg', 'corporate-website-detail.jpg', { left: 170, top: 90, width: 1260, height: 560 });
}

await productData();
await automation();
await corporate();
await crops();
console.log('Mockups generated.');
