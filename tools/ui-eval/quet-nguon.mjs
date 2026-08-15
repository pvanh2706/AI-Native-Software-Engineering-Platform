/**
 * Quét MÃ NGUỒN tìm những mẫu bị cấm — thứ mà đo trên trang chạy không bắt được
 * cho tới khi có màn nào đó dẫm phải.
 *
 *   node quet-nguon.mjs <thu-muc> [<thu-muc> …]
 *
 * Vì sao có file này: `disabled:opacity-50` đã xuất hiện ở BA component khác
 * nhau của registry, và mỗi lần đều phải đợi một màn dùng tới mới lộ:
 *
 *   · Button        — lộ khi convert S1 (nút "Tạo issue" bị khoá, 2.5:1)
 *   · Input         — lộ khi convert S2 (ba trường khoá của form)
 *   · SelectTrigger — lộ khi convert S5b (chữ "Đã xong" ở bản chỉ xem, 3.34:1)
 *
 * Ba lần cùng một lỗi, ba lần phát hiện muộn. Quét nguồn thì bắt được cả những
 * component chưa màn nào dùng tới.
 */
import fs from 'node:fs'
import path from 'node:path'

const CAM = [
  {
    ma: 'AP-11',
    ten: 'dùng độ mờ để báo trạng thái không dùng được',
    re: /\b(disabled|data-disabled|aria-disabled)[:\-][^\s"'`]*opacity-\d+/g,
    vi_sao: 'chữ mờ đi thì không đọc nổi — dùng token màu riêng (bg-surface-variant / text-on-surface-variant)',
  },
  {
    ma: 'AP-11b',
    ten: 'ẩn hành động cho tới khi rê chuột',
    re: /opacity-0\s+group-hover:opacity-100/g,
    vi_sao: 'bàn phím và màn cảm ứng không rê chuột được; đo ra 1.0:1 tức vô hình',
  },
  {
    ma: 'DS-01',
    ten: 'màu hard-code ngoài hệ token',
    re: /(?:bg|text|border|ring|fill|stroke)-\[#[0-9a-fA-F]{3,8}\]|(?:bg|text|border)-(?:red|green|blue|yellow|amber|slate|gray|zinc|emerald)-\d{2,3}\b/g,
    vi_sao: 'đổi nhận diện là phải đi sửa tay từng chỗ; dùng vai trò ngữ nghĩa của design system',
  },
]

const BO_QUA = /node_modules|[/\\]dist[/\\]|\.ui-eval/
const DUOI = /\.(vue|ts|tsx|js|jsx|css)$/

function* diFile(d) {
  for (const t of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, t.name)
    if (BO_QUA.test(p)) continue
    if (t.isDirectory()) yield* diFile(p)
    else if (DUOI.test(t.name)) yield p
  }
}

const thuMuc = process.argv.slice(2)
if (!thuMuc.length) { console.error('Thiếu thư mục. Ví dụ: node quet-nguon.mjs ../../projects/jira-issue-templates/app/src'); process.exit(1) }

let tong = 0
for (const c of CAM) {
  const hit = []
  for (const d of thuMuc) {
    for (const f of diFile(d)) {
      const noiDung = fs.readFileSync(f, 'utf8')
      // Bỏ dòng chú thích — một chú thích NHẮC TỚI mẫu cấm không phải vi phạm.
      noiDung.split('\n').forEach((dong, i) => {
        const sach = dong.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '')
        for (const m of sach.matchAll(c.re)) hit.push({ f: path.relative(process.cwd(), f), dong: i + 1, khop: m[0] })
      })
    }
  }
  tong += hit.length
  console.log(`\n${hit.length ? '❌' : '✅'} ${c.ma} — ${c.ten}: ${hit.length} chỗ`)
  if (hit.length) {
    console.log(`   ${c.vi_sao}`)
    hit.slice(0, 12).forEach((h) => console.log(`   · ${h.f}:${h.dong}  ${h.khop}`))
    if (hit.length > 12) console.log(`   … và ${hit.length - 12} chỗ nữa`)
  }
}

console.log(`\n${tong ? '❌ CÓ VI PHẠM' : '✅ nguồn sạch'}`)
process.exit(tong ? 1 : 0)
