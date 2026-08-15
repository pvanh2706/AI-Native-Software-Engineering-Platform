/**
 * Sinh CSS custom properties từ design-system/ (W3C DTCG).
 *
 *   node build-css.mjs [--out <file>]
 *
 * Đọc  : design-system/tokens/*.json + design-system/themes/*.json
 * Xuất : :root (token không phụ thuộc theme) + :root[data-theme="light"|"dark"]
 *
 * Mục đích: KHÔNG ai chép màu bằng tay nữa. Chép tay là chỗ token và giao diện
 * bắt đầu lệch nhau mà không ai biết.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DS = path.resolve(HERE, '../../design-system');
const read = (p) => JSON.parse(fs.readFileSync(path.join(DS, p), 'utf8'));

const color = read('tokens/color.json');
const spacing = read('tokens/spacing.json');
const radius = read('tokens/radius.json');
const typo = read('tokens/typography.json');
const elev = read('tokens/elevation.json');
const motion = read('tokens/motion.json');
const light = read('themes/light.json');
const dark = read('themes/dark.json');

// ---- Cây tra cứu toàn cục cho tham chiếu {a.b.c} ----
const GLOBAL = {
  palette: color.palette,
  spacing: spacing.spacing, layout: spacing.layout,
  radius: radius.radius,
  font: typo.font, typography: typo.typography,
  elevation: elev.elevation, 'state-layer': elev['state-layer'],
  duration: motion.duration, easing: motion.easing,
};

const REF = /^\{([^}]+)\}$/;
function resolve(v, depth = 0) {
  if (depth > 10) throw new Error('Tham chiếu token lặp vòng: ' + v);
  if (typeof v !== 'string') return v;
  const m = v.match(REF);
  if (!m) return v;
  const node = m[1].split('.').reduce((o, k) => (o == null ? o : o[k]), GLOBAL);
  if (node === undefined) throw new Error('Tham chiếu không tồn tại: ' + v);
  return resolve(node.$value !== undefined ? node.$value : node, depth + 1);
}

// --prefix ds  →  sinh --ds-color-primary thay vì --color-primary.
// Cần cho Tailwind v4: `@theme inline { --color-primary: var(--ds-color-primary) }`
// sẽ tự tham chiếu vòng nếu hai bên trùng tên.
const pIdx = process.argv.indexOf('--prefix');
const PREFIX = pIdx > -1 && process.argv[pIdx + 1] ? process.argv[pIdx + 1] + '-' : '';

const lines = { root: [], light: [], dark: [] };
const push = (b, name, val) => lines[b].push(`  --${PREFIX}${name}: ${val};`);

// ---------- :root — không phụ thuộc theme ----------
lines.root.push('  /* chữ */');
push('root', 'font-sans', resolve(typo.font.family.sans.$value).map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', '));
push('root', 'font-mono', resolve(typo.font.family.mono.$value).map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(', '));
for (const [k, t] of Object.entries(typo.typography)) {
  if (k.startsWith('$')) continue;
  const v = t.$value;
  push('root', `text-${k}-size`, resolve(v.fontSize));
  push('root', `text-${k}-lh`, resolve(v.lineHeight));
  push('root', `text-${k}-weight`, resolve(v.fontWeight));
  if (v.letterSpacing) push('root', `text-${k}-ls`, v.letterSpacing);
}

lines.root.push('', '  /* khoảng cách */');
for (const [k, t] of Object.entries(spacing.spacing)) if (!k.startsWith('$')) push('root', `space-${k}`, resolve(t.$value));
for (const [k, t] of Object.entries(spacing.semantic)) if (!k.startsWith('$')) push('root', `space-${k}`, resolve(t.$value));
for (const [k, t] of Object.entries(spacing.layout)) if (!k.startsWith('$')) push('root', `layout-${k}`, resolve(t.$value));

lines.root.push('', '  /* bo góc */');
for (const [k, t] of Object.entries(radius.radius)) if (!k.startsWith('$')) push('root', `radius-${k}`, resolve(t.$value));
for (const [k, t] of Object.entries(radius.semantic)) if (!k.startsWith('$')) push('root', `radius-${k}`, resolve(t.$value));

lines.root.push('', '  /* chuyển động */');
for (const [k, t] of Object.entries(motion.duration)) if (!k.startsWith('$')) push('root', `dur-${k}`, resolve(t.$value));
for (const [k, t] of Object.entries(motion.easing)) if (!k.startsWith('$')) push('root', `ease-${k}`, `cubic-bezier(${resolve(t.$value).join(', ')})`);

lines.root.push('', '  /* lớp phủ trạng thái */');
for (const [k, t] of Object.entries(elev['state-layer'])) if (!k.startsWith('$')) push('root', `state-${k}`, resolve(t.$value));

lines.root.push('', '  /* độ nổi — màu bóng là #000 ở cả hai theme nên đặt được ở :root */');
for (const [k, t] of Object.entries(elev.elevation)) {
  if (k.startsWith('$')) continue;
  const v = t.$value;
  if (v === 'none') { push('root', `elev-${k}`, 'none'); continue; }
  const css = v.map((s) => `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} rgba(0,0,0,${s.alpha})`).join(', ');
  push('root', `elev-${k}`, css);
}

// ---------- theme ----------
const themeRoles = (theme) => Object.entries(theme.color).filter(([k]) => !k.startsWith('$'));
const lightKeys = new Set(themeRoles(light).map(([k]) => k));
const darkKeys = new Set(themeRoles(dark).map(([k]) => k));

// DS-02 — theme parity, blocking
const onlyLight = [...lightKeys].filter((k) => !darkKeys.has(k));
const onlyDark = [...darkKeys].filter((k) => !lightKeys.has(k));
if (onlyLight.length || onlyDark.length) {
  console.error('❌ DS-02 THEME PARITY FAIL');
  if (onlyLight.length) console.error('   chỉ có ở light:', onlyLight.join(', '));
  if (onlyDark.length) console.error('   chỉ có ở dark :', onlyDark.join(', '));
  process.exit(1);
}

for (const [bucket, theme] of [['light', light], ['dark', dark]]) {
  for (const [k, t] of themeRoles(theme)) {
    let v = resolve(t.$value);
    const alpha = t.$extensions?.alpha;
    if (alpha !== undefined) {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(v.slice(i, i + 2), 16));
      v = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    push(bucket, `color-${k}`, v);
  }
  // rgb thô của state-layer-base để dùng với opacity
  const base = resolve(theme.color['state-layer-base'].$value);
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(base.slice(i, i + 2), 16));
  push(bucket, 'state-rgb', `${r}, ${g}, ${b}`);
}

const out = `/* ==========================================================================
   SINH TỰ ĐỘNG — KHÔNG SỬA TAY
   Nguồn : design-system/tokens/*.json + design-system/themes/*.json
   Lệnh  : node tools/design-tokens/build-css.mjs
   Đổi nhận diện = sửa file nguồn rồi chạy lại lệnh trên.
   ========================================================================== */
:root {
${lines.root.join('\n')}
}

:root[data-theme="light"] {
${lines.light.join('\n')}
}

:root[data-theme="dark"] {
${lines.dark.join('\n')}
}
`;

const outIdx = process.argv.indexOf('--out');
if (outIdx > -1 && process.argv[outIdx + 1]) {
  fs.writeFileSync(process.argv[outIdx + 1], out);
  console.error(`✅ DS-02 theme parity: ${lightKeys.size}/${lightKeys.size} vai trò khớp`);
  console.error('Đã ghi:', process.argv[outIdx + 1]);
} else {
  process.stdout.write(out);
}
