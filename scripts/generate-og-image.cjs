/**
 * Gera public/og-borotec.jpg (1200x630) com identidade visual BOROTEC.
 * Executa: node scripts/generate-og-image.cjs
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, '..', 'public', 'og-borotec.jpg');

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background gradient: charcoal → navy-dark -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#141B26"/>
      <stop offset="100%" stop-color="#0F1A2E"/>
    </linearGradient>

    <!-- Cyan text gradient -->
    <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0EA5B8"/>
      <stop offset="100%" stop-color="#06D6E1"/>
    </linearGradient>

    <!-- Right-side glow -->
    <radialGradient id="glowRight" cx="85%" cy="40%" r="35%">
      <stop offset="0%"   stop-color="#06D6E1" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#06D6E1" stop-opacity="0"/>
    </radialGradient>

    <!-- Bottom-left glow -->
    <radialGradient id="glowLeft" cx="15%" cy="80%" r="30%">
      <stop offset="0%"   stop-color="#E87722" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#E87722" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Base background -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Glow orbs -->
  <rect width="${W}" height="${H}" fill="url(#glowRight)"/>
  <rect width="${W}" height="${H}" fill="url(#glowLeft)"/>

  <!-- Subtle tech dot grid (top-right quadrant) -->
  <g opacity="0.06">
    ${Array.from({ length: 12 }, (_, row) =>
      Array.from({ length: 20 }, (_, col) =>
        `<circle cx="${640 + col * 30}" cy="${40 + row * 30}" r="1.5" fill="#06D6E1"/>`
      ).join('')
    ).join('')}
  </g>

  <!-- Top cyan accent bar -->
  <rect x="0" y="0" width="${W}" height="4" fill="url(#cyanGrad)"/>

  <!-- Left vertical cyan bar -->
  <rect x="64" y="100" width="4" height="320" fill="url(#cyanGrad)" rx="2"/>

  <!-- BOROTEC wordmark -->
  <text
    x="96" y="230"
    font-family="Arial Black,Arial,Helvetica,sans-serif"
    font-size="110"
    font-weight="900"
    letter-spacing="-2"
    fill="url(#cyanGrad)"
  >BOROTEC</text>

  <!-- INDUSTRIAL subtitle -->
  <text
    x="100" y="278"
    font-family="Arial,Helvetica,sans-serif"
    font-size="28"
    font-weight="400"
    letter-spacing="14"
    fill="#ffffff"
    opacity="0.55"
  >INDUSTRIAL</text>

  <!-- Divider line -->
  <rect x="96" y="308" width="520" height="1.5" fill="#ffffff" opacity="0.12"/>

  <!-- Tagline -->
  <text
    x="96" y="358"
    font-family="Arial,Helvetica,sans-serif"
    font-size="30"
    font-weight="400"
    fill="#ffffff"
    opacity="0.85"
  >Tecnologia de Ponta para</text>
  <text
    x="96" y="396"
    font-family="Arial,Helvetica,sans-serif"
    font-size="30"
    font-weight="700"
    fill="#ffffff"
  >Inspeção Industrial</text>

  <!-- Stats row -->
  <g transform="translate(96, 480)">
    <!-- Stat 1 -->
    <text x="0" y="0"
      font-family="Arial Black,Arial,sans-serif"
      font-size="42" font-weight="900"
      fill="url(#cyanGrad)">+20</text>
    <text x="0" y="28"
      font-family="Arial,sans-serif"
      font-size="16" fill="#ffffff" opacity="0.5">Anos de Experiência</text>

    <!-- Divider -->
    <rect x="132" y="-40" width="1" height="72" fill="#ffffff" opacity="0.15"/>

    <!-- Stat 2 -->
    <text x="152" y="0"
      font-family="Arial Black,Arial,sans-serif"
      font-size="42" font-weight="900"
      fill="url(#cyanGrad)">+500</text>
    <text x="152" y="28"
      font-family="Arial,sans-serif"
      font-size="16" fill="#ffffff" opacity="0.5">Clientes Atendidos</text>

    <!-- Divider -->
    <rect x="318" y="-40" width="1" height="72" fill="#ffffff" opacity="0.15"/>

    <!-- Stat 3 -->
    <text x="338" y="0"
      font-family="Arial Black,Arial,sans-serif"
      font-size="42" font-weight="900"
      fill="url(#cyanGrad)">+2000</text>
    <text x="338" y="28"
      font-family="Arial,sans-serif"
      font-size="16" fill="#ffffff" opacity="0.5">Equipamentos</text>
  </g>

  <!-- Right-side decorative circle (partial) -->
  <circle cx="1080" cy="315" r="240"
    fill="none" stroke="#06D6E1" stroke-width="1" opacity="0.08"/>
  <circle cx="1080" cy="315" r="170"
    fill="none" stroke="#06D6E1" stroke-width="1" opacity="0.06"/>
  <circle cx="1080" cy="315" r="100"
    fill="none" stroke="#06D6E1" stroke-width="1" opacity="0.10"/>

  <!-- Borotec.com.br URL -->
  <text
    x="${W - 48}" y="${H - 28}"
    font-family="Arial,Helvetica,sans-serif"
    font-size="18" fill="#06D6E1" opacity="0.7"
    text-anchor="end">borotec.com.br</text>

  <!-- Bottom glow line -->
  <rect x="0" y="${H - 3}" width="${W}" height="3" fill="url(#cyanGrad)" opacity="0.6"/>
</svg>
`.trim();

async function main() {
  const outDir = path.dirname(OUT);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(OUT);

  const { size } = fs.statSync(OUT);
  console.log(`✓ ${OUT} (${(size / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error('Erro ao gerar OG image:', err.message);
  process.exit(1);
});
