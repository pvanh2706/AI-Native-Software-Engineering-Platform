/**
 * Đồng bộ Design System vào app, và DỌN những gì shadcn-vue CLI tự tiêm vào.
 *
 *   node scripts/sync-design-system.mjs
 *
 * Phải chạy sau MỖI lần `npx shadcn-vue add …`. Lý do: CLI mỗi lần chạy đều
 * tiêm lại theming của riêng nó vào src/style.css —
 *   · @import Google Fonts (phá tính chạy offline, ghi đè font của design system)
 *   · khối @layer base trùng lặp
 *   · --font-heading trỏ về font của nó
 * Đây là chi phí bảo trì THẬT của chính sách copy-in, không phải lỗi ngẫu nhiên.
 */
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const APP = path.resolve(HERE, '..')
const GEN = path.resolve(APP, '../../../tools/design-tokens/build-css.mjs')

// 1. Sinh lại token từ nguồn duy nhất
const TOKENS = path.join(APP, 'src/styles/tokens.css')
execSync(`node "${GEN}" --prefix ds --out "${TOKENS}"`, { stdio: 'inherit' })

// 1b. Áp override cấp dự án.
// design-system/README bắt buộc: dự án đổi bảng màu thì phải khai tường minh ở
// design-overrides.json kèm $reason, không hard-code trong component (DS-01).
// Trước đây bước này chưa có, nên app chạy bằng bảng màu org chứ không phải
// bảng màu đã chốt của dự án.
const OVERRIDES = path.join(APP, '..', 'design-overrides.json')
if (fs.existsSync(OVERRIDES)) {
  const ov = JSON.parse(fs.readFileSync(OVERRIDES, 'utf8'))
  let css = fs.readFileSync(TOKENS, 'utf8')
  const missingReason = []
  let applied = 0

  // :root mang giá trị light mặc định, nên override light phải vào cả hai khối.
  const targets = { light: [':root', ':root[data-theme="light"]'], dark: [':root[data-theme="dark"]'] }

  for (const [theme, entries] of Object.entries(ov.overrides ?? {})) {
    for (const [key, spec] of Object.entries(entries)) {
      if (!spec.$reason) { missingReason.push(`${theme}/${key}`); continue }
      const role = key.replace(/^color\./, '')
      for (const sel of targets[theme] ?? []) {
        const block = new RegExp(`(${sel.replace(/[[\]"]/g, '\\$&')}\\s*\\{[^}]*?--ds-color-${role}:\\s*)([^;]+)(;)`)
        const next = css.replace(block, `$1${spec.$value}$3`)
        if (next !== css) { css = next; applied++ }
      }
    }
  }

  // DS-01: override không có $reason là lỗi, không phải cảnh báo.
  if (missingReason.length) {
    console.error(`❌ DS-01: ${missingReason.length} override thiếu $reason: ${missingReason.slice(0, 5).join(', ')}`)
    process.exit(1)
  }
  fs.writeFileSync(TOKENS, css)
  const n = Object.values(ov.overrides ?? {}).reduce((s, e) => s + Object.keys(e).length, 0)
  console.log(`🎨 Đã áp ${applied} giá trị từ design-overrides.json (${n} override, extends ${ov.extends})`)
} else {
  console.log('ℹ  Không có design-overrides.json — app dùng nguyên bảng màu org.')
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
