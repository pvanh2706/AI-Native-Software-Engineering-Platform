/**
 * UI Eval harness — bản chứng minh khái niệm.
 * Lớp 1: deterministic checks chạy trong trang thật (không phải đọc mô tả).
 * Lớp 2: chụp ảnh để judge đa phương thức chấm trên PIXEL.
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const TARGET = process.argv[2];
const OUT = process.argv[3];
fs.mkdirSync(OUT, { recursive: true });

// Mọi màn chính × cả hai theme. Thiếu một tổ hợp là thiếu một chỗ lỗi có thể trốn.
const SCREENS = ['home', 'create', 'fail', 'editor', 'config', 'config-detail', 'history', 'pat'];
const SHOTS = ['light', 'dark'].flatMap((theme) => SCREENS.map((screen) => ({ theme, screen, w: 1440 })));
const BREAKPOINTS = [1440, 1280, 1024];

// ---------- Lớp 1: check chạy trong trang ----------
const IN_PAGE = () => {
  const lum = (c) => {
    const [r, g, b] = c.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => {
    const m = String(s).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((x) => parseFloat(x.trim()));
    return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
  };
  const ratio = (f, b) => {
    const L1 = lum(f), L2 = lum(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  };
  const effectiveBg = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c.a > 0.6) return c.rgb;
      n = n.parentElement;
    }
    const c = parse(getComputedStyle(document.body).backgroundColor);
    return c ? c.rgb : [255, 255, 255];
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.1;
  };

  // A11Y-01 — tương phản chữ
  const contrast = [];
  document.querySelectorAll('#app *').forEach((el) => {
    if (!visible(el)) return;
    const txt = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ');
    if (!txt) return;
    const s = getComputedStyle(el);
    const fg = parse(s.color); if (!fg) return;
    const size = parseFloat(s.fontSize), bold = +s.fontWeight >= 700;
    const large = size >= 24 || (bold && size >= 18.66);
    const need = large ? 3 : 4.5;
    const r = ratio(fg.rgb, effectiveBg(el));
    if (r < need) contrast.push({ text: txt.slice(0, 45), ratio: +r.toFixed(2), need, size, sel: el.className || el.tagName });
  });

  // A11Y-02 — kích thước vùng bấm
  const targets = [];
  document.querySelectorAll('#app button, #app a, #app select, #app input').forEach((el) => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    if (r.width < 24 || r.height < 24)
      targets.push({ tag: el.tagName, cls: String(el.className).slice(0, 30), w: +r.width.toFixed(1), h: +r.height.toFixed(1), text: (el.textContent || '').trim().slice(0, 25) });
  });

  // A11Y-03 — nhãn ô nhập
  const labels = [];
  document.querySelectorAll('#app input, #app select, #app textarea').forEach((el) => {
    if (!visible(el)) return;
    const has = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') ||
      (el.id && document.querySelector(`label[for="${el.id}"]`)) || el.closest('label');
    if (!has) labels.push({ tag: el.tagName, cls: String(el.className).slice(0, 30), value: String(el.value || '').slice(0, 25) });
  });

  // RES-12 — khung (thanh bên/thanh trên) phải nằm trong khung nhìn, không cuộn theo nội dung
  const frame = [];
  document.querySelectorAll('#side button, #side a, #proto-bar button, #proto-bar select').forEach((el) => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    if (r.bottom > window.innerHeight)
      frame.push({ text: (el.textContent || '').trim().slice(0, 30) || el.tagName, bottom: Math.round(r.bottom), viewport: window.innerHeight });
  });

  return { contrast, targets, labels, frame };
};

// ---------- chạy ----------
const browser = await chromium.launch({ executablePath: CHROME });
const report = { target: TARGET, shots: [], checks: {} };

for (const s of SHOTS) {
  const ctx = await browser.newContext({ viewport: { width: s.w, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file:///' + TARGET.replace(/\\/g, '/'));
  await page.evaluate(([t, sc]) => { applyTheme(t); go(sc); }, [s.theme, s.screen]);
  await page.waitForTimeout(200);
  // Check chạy TRƯỚC khi mở khoá cuộn — phải đo bố cục thật, không phải bố cục đã bị nới
  const res = await page.evaluate(IN_PAGE);

  // Với app-shell (khung cố định, nội dung cuộn trong), fullPage chỉ bằng khung nhìn.
  // Nới tạm overflow để chụp trọn nội dung cho judge nhìn.
  await page.evaluate(() => {
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';
    const app = document.getElementById('app'), main = document.getElementById('main'), side = document.getElementById('side');
    if (app) { app.style.overflow = 'visible'; app.style.minHeight = '0'; }
    if (main) main.style.overflow = 'visible';
    if (side) side.style.overflow = 'visible';
  });
  await page.waitForTimeout(80);
  const file = path.join(OUT, `${s.theme}-${s.screen}.png`);
  await page.screenshot({ path: file, fullPage: true });
  report.shots.push(path.basename(file));
  report.checks[`${s.theme}-${s.screen}`] = {
    'A11Y-01_contrast_fail': res.contrast.length, details: res.contrast.slice(0, 8),
    'A11Y-02_small_target_fail': res.targets.length, targetDetails: res.targets.slice(0, 8),
    'A11Y-03_missing_label_fail': res.labels.length, labelDetails: res.labels.slice(0, 8),
    'RES-12_frame_offscreen_fail': res.frame.length, frameDetails: res.frame.slice(0, 8),
  };
  await ctx.close();
}

// RES-01 — tràn ngang
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('file:///' + TARGET.replace(/\\/g, '/'));
report.checks['RES-01_overflow'] = {};
for (const w of BREAKPOINTS) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const sc of ['home', 'config', 'create']) {
    await page.evaluate((x) => go(x), sc);
    await page.waitForTimeout(120);
    const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
    if (o.sw > o.cw + 1) report.checks['RES-01_overflow'][`${w}px/${sc}`] = `tràn ${o.sw - o.cw}px`;
  }
}
if (!Object.keys(report.checks['RES-01_overflow']).length) report.checks['RES-01_overflow'] = 'PASS — không tràn ở 1440/1280/1024';
await ctx.close();
await browser.close();

// DS-01 — màu hard-code ngoài khối token
const css = fs.readFileSync(TARGET, 'utf8');
// Lọc MỌI khối :root (kể cả ':root {' có dấu cách và ':root' trần) — đó là nơi
// token được PHÉP chứa giá trị màu thật; phần còn lại thì không.
// Bỏ chú thích trước — một chú thích NHẮC TỚI mã màu không phải là vi phạm.
let body = css.replace(/\/\*[\s\S]*?\*\//g, '');
for (const m of body.matchAll(/:root[^{]*\{[\s\S]*?\n\}/g)) body = body.replace(m[0], '');
const hard = [...body.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g)].map((m) => m[0])
  .filter((v) => !/^rgba?\(\s*(var\(|0\s*,\s*0\s*,\s*0)/.test(v));
report.checks['DS-01_hardcoded_color'] = { count: hard.length, samples: [...new Set(hard)].slice(0, 12) };

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.checks, null, 2));
console.log('\nẢnh:', report.shots.join(', '));
