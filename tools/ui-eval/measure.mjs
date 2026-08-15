/**
 * UI Eval — đo một app đang chạy thật.
 *
 *   node measure.mjs --config <file.json> [--out thu-muc-anh] [--json bao-cao.json]
 *   node measure.mjs <url> [<url> …]                    # chỉ check theo màn
 *
 * Đo sáu thứ, một lần chạy, một mã thoát:
 *
 *   CMP-01   % vùng UI ánh xạ về component registry        ≥ 80%
 *   A11Y-01  tương phản chữ WCAG 2.2 AA                    0 lỗi
 *   A11Y-02  vùng bấm ≥ 24×24                              0 lỗi
 *   A11Y-03  ô nhập có nhãn                                0 lỗi
 *   RES-01   không tràn ngang ở 1440 / 1280 / 1024         0 lỗi
 *   RES-12   khung (thanh bên / thanh trên) trong khung nhìn  0 lỗi
 *   + kiểm LUỒNG: đếm số lần bấm thật của một tác vụ (vd NFR-07 ≤ 3)
 *
 * Vì sao `CMP-01` phải có script riêng: docs/07 chỉ cho NGƯỠNG mà không cho
 * CÁCH ĐO, và hai cách đo đầu tiên đều hỏng theo kiểu im lặng — xem README.
 */
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const CHROME = process.env.CHROME_PATH || 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
const args = process.argv.slice(2)
const opt = (k, d) => { const i = args.indexOf(k); return i < 0 ? d : args[i + 1] }
const CONFIG = opt('--config', null)
const OUT = opt('--out', null)
const JSON_OUT = opt('--json', null)

let urls = args.filter((a, i) => !a.startsWith('--') && !['--out', '--json', '--config'].includes(args[i - 1]))
let luongs = []
if (CONFIG) {
  const c = JSON.parse(fs.readFileSync(CONFIG, 'utf8'))
  urls = c.urls ?? urls
  luongs = c.luong ?? []
}
if (!urls.length && !luongs.length) {
  console.error('Thiếu url hoặc --config. Ví dụ: node measure.mjs --config ui-eval.config.json')
  process.exit(1)
}

const BREAKPOINTS = [1440, 1280, 1024]

/* ── check chạy trong trang ─────────────────────────────────────────────── */
const TRONG_TRANG = () => {
  const root = document.getElementById('app') || document.body
  const nhinThay = (el) => {
    const r = el.getBoundingClientRect(); const s = getComputedStyle(el)
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'
  }

  /* CMP-01 — % vùng UI ánh xạ về component registry.
     Ba điểm then chốt, mỗi cái sửa một cách đo đã sai trước đó:
       1. chỉ tính phần tử MANG NỘI DUNG — tính cả thẻ bọc thì cha con chồng nhau;
       2. quy về component registry GẦN NHẤT trên chuỗi sở hữu — nhờ vậy
          Select/Dialog (bọc mỏng quanh reka-ui) vẫn được tính đúng;
       3. AppShell KHÔNG phải đích quy — nó bọc toàn màn, quy về nó thì luôn 100%. */
  const mangNoiDung = (el) => {
    if (/^(SVG|INPUT|SELECT|TEXTAREA|IMG)$/.test(el.tagName)) return true
    return [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
  }
  const laRegistry = (f) => /[/\\]components[/\\]ui[/\\]/.test(f) && !/AppShell\.vue$/.test(f)
  const chuVung = (el) => {
    let c = el.__vueParentComponent, duoi = null
    while (c) {
      const f = c.type?.__file || ''
      if (duoi === null) duoi = f || '(khong ro)'
      if (laRegistry(f)) return f
      c = c.parent
    }
    return duoi ?? '(khong ro)'
  }
  const dienTich = (el) => { const r = el.getBoundingClientRect(); return Math.max(0, r.width) * Math.max(0, r.height) }
  let tong = 0, phu = 0
  const theoComp = {}, vietTay = {}
  root.querySelectorAll('*').forEach((el) => {
    if (!mangNoiDung(el)) return
    const a = dienTich(el); if (a <= 0) return
    const f = chuVung(el); const ten = f.split(/[/\\]/).slice(-2).join('/')
    tong += a
    if (laRegistry(f)) { phu += a; theoComp[ten] = (theoComp[ten] || 0) + a }
    else vietTay[ten] = (vietTay[ten] || 0) + a
  })
  const pc = (o) => Object.fromEntries(Object.entries(o).sort((x, y) => y[1] - x[1]).map(([k, v]) => [k, +(v / tong * 100).toFixed(1)]))

  /* A11Y-01 — tương phản. Cộng dồn opacity của tổ tiên, và với ô bị khoá thì
     đọc -webkit-text-fill-color chứ không phải color (trình duyệt vẽ bằng cái đó). */
  const lum = (c) => { const [r, g, b] = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
  const doc = (s) => { const m = String(s).match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat); return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 } }
  const tron = (fg, bg, a) => fg.map((v, i) => v * a + bg[i] * (1 - a))
  const nenCua = (el) => {
    let n = el, chong = []
    while (n && n !== document.documentElement) { const c = doc(getComputedStyle(n).backgroundColor); if (c && c.a > 0) chong.push(c); if (c && c.a >= 0.999) break; n = n.parentElement }
    let nen = [255, 255, 255]
    for (let i = chong.length - 1; i >= 0; i--) nen = tron(chong[i].rgb, nen, chong[i].a)
    return nen
  }
  const tuongPhan = [], daThay = new Set()
  document.querySelectorAll('body *').forEach((el) => {
    const s = getComputedStyle(el)
    if (s.display === 'none' || s.visibility === 'hidden') return
    let txt = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(' ')
    if (!txt && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) txt = el.tagName === 'SELECT' ? (el.options[el.selectedIndex]?.text || '') : (el.value || el.placeholder || '')
    if (!txt) return
    const fill = s.webkitTextFillColor && s.webkitTextFillColor !== 'currentcolor' ? s.webkitTextFillColor : s.color
    const fg = doc(fill); if (!fg) return
    let o = parseFloat(s.opacity), p = el.parentElement
    while (p && p !== document.documentElement) { o *= parseFloat(getComputedStyle(p).opacity); p = p.parentElement }
    const nen = nenCua(el)
    const eff = o < 1 ? tron(fg.rgb, nen, o) : fg.rgb
    const r = (Math.max(lum(eff), lum(nen)) + 0.05) / (Math.min(lum(eff), lum(nen)) + 0.05)
    const co = parseFloat(s.fontSize), dam = +s.fontWeight >= 700
    const can = (co >= 24 || (dam && co >= 18.66)) ? 3 : 4.5
    const khoa = txt.slice(0, 28) + '|' + r.toFixed(2)
    if (r < can && !daThay.has(khoa)) { daThay.add(khoa); tuongPhan.push({ chu: txt.slice(0, 40), tyLe: +r.toFixed(2), can }) }
  })

  /* A11Y-02 — vùng bấm ≥ 24×24 (WCAG 2.2 AA, tiêu chí 2.5.8). */
  const vungBam = []
  root.querySelectorAll('button, a[href], select, input:not([type=hidden]), textarea, [role=button]').forEach((el) => {
    if (!nhinThay(el)) return
    const r = el.getBoundingClientRect()
    if (r.width < 24 || r.height < 24)
      vungBam.push({ the: el.tagName, chu: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 30), w: +r.width.toFixed(1), h: +r.height.toFixed(1) })
  })

  /* A11Y-03 — ô nhập phải có nhãn nối được bằng máy. */
  const thieuNhan = []
  root.querySelectorAll('input:not([type=hidden]), select, textarea').forEach((el) => {
    if (!nhinThay(el)) return
    const co = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') ||
      (el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`)) || el.closest('label')
    if (!co) thieuNhan.push({ the: el.tagName, kieu: el.getAttribute('type') || '', gtri: String(el.value || el.placeholder || '').slice(0, 30) })
  })

  /* RES-01b — nội dung bị CẮT trong container mà không cuộn được.
     Bản đầu của RES-01 chỉ đo scrollWidth của documentElement, nên mù trước ca
     này: bảng tràn BÊN TRONG một Card có overflow-hidden thì trang không hề
     cuộn, mà một cột vẫn biến mất khỏi màn. Gặp thật ở S5b bản chỉ xem. */
  const biCat = []
  root.querySelectorAll('*').forEach((el) => {
    // Bỏ qua thẻ nhập: <input> một dòng vốn cắt chữ của chính nó, nhưng người
    // dùng vẫn tới được bằng con trỏ và bàn phím — không phải nội dung mất.
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
    const s = getComputedStyle(el)
    // Bỏ qua chỗ ẩn-chỉ-cho-trình-đọc (`sr-only`): ô 1×1 định vị tuyệt đối và bị
    // clip là CỐ Ý — chữ ở đó dành cho trình đọc màn hình, không phải nội dung
    // bị mất khỏi màn. Không lọc thì mọi `sr-only` đều báo "bị cắt ~200px".
    if ((el.clientWidth <= 1 || el.clientHeight <= 1) && /absolute|fixed/.test(s.position)
      && (s.clipPath !== 'none' || s.clip !== 'auto')) return
    if (!/hidden|clip/.test(s.overflowX)) return
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0)
      biCat.push({ the: el.tagName, lop: String(el.className || '').slice(0, 40), thua: el.scrollWidth - el.clientWidth })
  })

  /* RES-12 — khung cố định phải nằm trong khung nhìn. Đây là lỗi hay gặp nhất:
     khối tài khoản ở đáy thanh bên bị đẩy khỏi màn khi nội dung dài. */
  const khungTran = []
  document.querySelectorAll('aside button, aside a, header button, header a').forEach((el) => {
    if (!nhinThay(el)) return
    const r = el.getBoundingClientRect()
    if (r.bottom > window.innerHeight + 1)
      khungTran.push({ chu: (el.textContent || '').trim().slice(0, 30) || el.tagName, day: Math.round(r.bottom), khungNhin: window.innerHeight })
  })

  return {
    cmp01: { pct: tong ? +(phu / tong * 100).toFixed(1) : 0, theoComp: pc(theoComp), vietTay: pc(vietTay) },
    a11y01: tuongPhan, a11y02: vungBam, a11y03: thieuNhan, res12: khungTran, res01b: biCat,
  }
}

/* ── chạy ───────────────────────────────────────────────────────────────── */
if (OUT) fs.mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ executablePath: CHROME })
const baoCao = { man: [], luong: [] }
let rot = false
const ten = (u) => (new URL(u).search || '?mac-dinh').slice(1).replace(/[&=]/g, '-')

for (const url of urls) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1024 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  const r = await page.evaluate(TRONG_TRANG)

  // RES-01 — tràn ngang. Phải đo ở nhiều bề rộng, không chỉ một.
  const res01 = []
  for (const w of BREAKPOINTS) {
    await page.setViewportSize({ width: w, height: 900 })
    await page.waitForTimeout(180)
    const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }))
    if (o.sw > o.cw + 1) res01.push({ rong: w, tran: o.sw - o.cw })
  }
  await page.setViewportSize({ width: 1280, height: 1024 })
  await page.waitForTimeout(180)
  if (OUT) await page.screenshot({ path: path.join(OUT, ten(url) + '.png') })
  await ctx.close()

  const loi = r.a11y01.length + r.a11y02.length + r.a11y03.length + r.res12.length + res01.length + r.res01b.length
  const dat = r.cmp01.pct >= 80 && loi === 0
  if (!dat) rot = true
  baoCao.man.push({ url, ...r, res01, dat })

  console.log(`\n${dat ? '✅' : '❌'} ${ten(url)}`)
  console.log(`   CMP-01  ${String(r.cmp01.pct).padStart(5)}%   (≥ 80%)`)
  const d = (ma, arr, ghi) => {
    console.log(`   ${ma.padEnd(7)} ${String(arr.length).padStart(5)}    ${arr.length ? '❌' : 'đạt'}`)
    arr.slice(0, 4).forEach((x) => console.log('        · ' + ghi(x)))
  }
  d('A11Y-01', r.a11y01, (x) => `${x.chu} — ${x.tyLe} (cần ${x.can})`)
  d('A11Y-02', r.a11y02, (x) => `${x.the} "${x.chu}" ${x.w}×${x.h}`)
  d('A11Y-03', r.a11y03, (x) => `${x.the}[${x.kieu}] "${x.gtri}"`)
  d('RES-01', res01, (x) => `${x.rong}px tràn ${x.tran}px`)
  d('RES-01b', r.res01b, (x) => `${x.the}.${x.lop} bị cắt ${x.thua}px, không cuộn được`)
  d('RES-12', r.res12, (x) => `"${x.chu}" đáy ${x.day} > khung ${x.khungNhin}`)
  console.log('   dùng lại:', Object.entries(r.cmp01.theoComp).map(([k, v]) => `${k} ${v}%`).join(' · ') || '—')
  const vt = Object.entries(r.cmp01.vietTay).map(([k, v]) => `${k} ${v}%`).join(' · ')
  if (vt) console.log('   viết tay:', vt)
}

/* Kiểm LUỒNG — đếm số lần bấm THẬT của một tác vụ.
   NFR-07 ("tạo 1 issue trong ≤ 3 lần bấm") trước nay phải đếm tay trên ảnh
   tĩnh; ở đây máy bấm thật rồi đếm. */
for (const l of luongs) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1024 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  await page.goto(l.url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(900)
  let bam = 0, loi = null
  try {
    for (const b of l.buoc) { await page.locator(b).first().click(); bam++; await page.waitForTimeout(350) }
    await page.locator(l.xong).first().waitFor({ state: 'visible', timeout: 4000 })
  } catch (e) { loi = String(e).split('\n')[0].slice(0, 110) }
  if (OUT) await page.screenshot({ path: path.join(OUT, `luong-${l.ma}.png`) })
  await ctx.close()

  const dat = !loi && bam <= l.toiDa
  if (!dat) rot = true
  baoCao.luong.push({ ...l, bam, dat, loi })
  console.log(`\n${dat ? '✅' : '❌'} ${l.ma} — ${l.ten}`)
  console.log(`   ${bam} lần bấm (tối đa ${l.toiDa})`)
  if (loi) console.log('   ❌ không tới được đích:', loi)
}

await browser.close()
if (JSON_OUT) { fs.writeFileSync(JSON_OUT, JSON.stringify(baoCao, null, 2)); console.log('\nĐã ghi', JSON_OUT) }
console.log(`\n${rot ? '❌ CÓ MỤC KHÔNG ĐẠT' : '✅ tất cả đạt'}`)
process.exit(rot ? 1 : 0)
