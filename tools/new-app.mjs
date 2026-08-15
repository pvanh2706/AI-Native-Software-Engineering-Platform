/**
 * Mở một app frontend mới từ templates/vue-admin.
 *
 *   node tools/new-app.mjs <slug> [--install]
 *
 * Ví dụ: node tools/new-app.mjs jira-issue-templates
 *        → tạo projects/jira-issue-templates/app/
 *
 * Chỉ chép HẠ TẦNG. Thư viện component CHƯA tách thành gói dùng chung —
 * cố ý, theo quy tắc "chờ tới người dùng thứ ba" (xem templates/vue-admin/README.md).
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TEMPLATE = path.join(ROOT, 'templates/vue-admin')

const slug = process.argv[2]
const doInstall = process.argv.includes('--install')

if (!slug || slug.startsWith('--')) {
  console.error('Cách dùng: node tools/new-app.mjs <slug> [--install]')
  process.exit(1)
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error('Slug chỉ gồm chữ thường, số và gạch nối.')
  process.exit(1)
}

const dest = path.join(ROOT, 'projects', slug, 'app')
if (fs.existsSync(dest)) {
  console.error(`Đã tồn tại: projects/${slug}/app — không ghi đè.`)
  process.exit(1)
}

// Chép, bỏ qua thứ sinh ra được
const SKIP = new Set(['node_modules', 'dist', '.vite'])
fs.cpSync(TEMPLATE, dest, {
  recursive: true,
  filter: (src) => !SKIP.has(path.basename(src)),
})

// Đặt tên gói theo slug
const pkgPath = path.join(dest, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.name = slug
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

console.log(`✓ Đã tạo projects/${slug}/app`)

if (doInstall) {
  console.log('\nĐang cài phụ thuộc…')
  execSync('npm install', { cwd: dest, stdio: 'inherit' })
  console.log('\nĐang sinh token từ design system…')
  execSync('npm run sync', { cwd: dest, stdio: 'inherit' })
}

console.log(`
Bước tiếp:
  cd projects/${slug}/app
  ${doInstall ? '' : 'npm install\n  npm run sync\n  '}npm run dev

Quy trình hiệu chỉnh từ bản thiết kế Stitch: xem templates/vue-admin/README.md
`)
