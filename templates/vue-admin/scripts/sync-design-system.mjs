/**
 * Đồng bộ Design System vào app, và DỌN những gì shadcn-vue CLI tự tiêm vào.
 *
 *   npm run sync          (đã gắn vào `npm run build`)
 *
 * Phải chạy sau MỖI lần `npx shadcn-vue add …`. Lý do: CLI mỗi lần chạy đều
 * tiêm lại theming của riêng nó vào src/style.css —
 *   · @import Google Fonts (phá tính chạy offline, ghi đè font của design system)
 *   · khối @layer base trùng lặp
 *   · --font-heading trỏ về font của nó
 * Đây là chi phí bảo trì THẬT của chính sách copy-in, không phải sự cố ngẫu nhiên.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const APP = path.resolve(HERE, '..')

/** Tìm gốc repo bằng cách đi ngược lên tới thư mục có tools/design-tokens.
 *  Không hardcode số cấp — app có thể nằm ở độ sâu bất kỳ. */
function findRepoRoot(from) {
  let d = from
  for (let i = 0; i < 8; i++) {
    if (fs.existsSync(path.join(d, 'tools/design-tokens/build-css.mjs'))) return d
    const up = path.dirname(d)
    if (up === d) break
    d = up
  }
  throw new Error('Không tìm thấy gốc repo (thư mục chứa tools/design-tokens/build-css.mjs)')
}

const ROOT = findRepoRoot(APP)
const GEN = path.join(ROOT, 'tools/design-tokens/build-css.mjs')
const OVERRIDES = path.join(APP, '..', 'design-overrides.json')

// 1. Sinh lại token từ nguồn duy nhất
execSync(`node "${GEN}" --prefix ds --out "${path.join(APP, 'src/styles/tokens.css')}"`, { stdio: 'inherit' })
if (fs.existsSync(OVERRIDES)) {
  console.log('ℹ  Có design-overrides.json ở cấp dự án — nhớ áp sau khi sinh token.')
}

// 2. Dọn style.css
const F = path.join(APP, 'src/style.css')
let css = fs.readFileSync(F, 'utf8')
const before = css
const removed = []

// 2a. Bỏ mọi @import tài nguyên ngoài — bản build phải chạy offline
css = css.replace(/^\s*@import\s+url\(['"]https?:\/\/[^)]*\);?\s*$/gm, () => {
  removed.push('@import url(https://…) — font từ CDN')
  return ''
})

// 2b. Bỏ khối @layer base trùng mà CLI thêm ở CUỐI file
const dup = /@layer base \{\s*\*\s*\{\s*@apply border-border outline-ring\/50;\s*\}\s*body \{\s*@apply bg-background text-foreground;\s*\}\s*\}/g
css = css.replace(dup, () => { removed.push('@layer base trùng do CLI thêm'); return '' })

// 2c. --font-heading trỏ về font của design system
css = css.replace(/--font-heading:\s*[^;]+;/g, () => {
  removed.push('--font-heading → trỏ lại var(--ds-font-sans)')
  return '--font-heading: var(--ds-font-sans);'
})

css = css.replace(/\n{3,}/g, '\n\n').replace(/^\s*\n/, '')
if (css !== before) fs.writeFileSync(F, css)

console.log(removed.length
  ? `\n🧹 Đã dọn ${removed.length} thứ shadcn-vue CLI tiêm vào:\n` + removed.map(r => '   · ' + r).join('\n')
  : '\n✓ style.css sạch, không có gì phải dọn.')

// 3. Chốt chặn: không được còn tài nguyên ngoài nào
const ext = [...css.matchAll(/@import\s+url\(['"]?(https?:\/\/[^'")]+)/g)].map(m => m[1])
if (ext.length) { console.error('❌ Còn tài nguyên ngoài:', ext.join(', ')); process.exit(1) }
console.log('✓ Không còn tài nguyên ngoài trong style.css\n')
