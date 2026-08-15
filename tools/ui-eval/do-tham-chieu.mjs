/**
 * Đo ngôn ngữ thị giác của một trang tham chiếu ngoài — chụp ảnh + rút token THẬT
 * từ computed style, thay vì đoán từ ảnh hoặc chép từ tài liệu.
 *
 *   node do-tham-chieu.mjs <url> <thu-muc-ra>
 *
 * Vì sao có file này: tài liệu của template thường chỉ công bố bảng MÀU. Thứ làm nên
 * diện mạo — bo góc, đổ bóng, chiều cao dòng, cách vẽ thanh bên — không nằm ở đó.
 * Đo trên trang chạy thật thì lấy được cả ba.
 */
import { chromium } from 'playwright-core'
import fs from 'node:fs'
import path from 'node:path'

const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
const [url, outDir] = process.argv.slice(2)
if (!url || !outDir) { console.error('Dùng: node do-tham-chieu.mjs <url> <thu-muc-ra>'); process.exit(1) }
fs.mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

console.log('mở', url)
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2500)

await page.screenshot({ path: path.join(outDir, 'demo-1440.png') })
await page.screenshot({ path: path.join(outDir, 'demo-1440-full.png'), fullPage: true })

// Ba mức rộng theo RES-03, để xem template thật thu gọn thế nào
for (const w of [1280, 1024, 800]) {
  await page.setViewportSize({ width: w, height: 900 })
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(outDir, `demo-${w}.png`) })
}
await page.setViewportSize({ width: 1440, height: 900 })
await page.waitForTimeout(600)

const dulieu = await page.evaluate(() => {
  const S = el => getComputedStyle(el)
  const gon = el => {
    const s = S(el), r = el.getBoundingClientRect()
    return {
      the: el.tagName.toLowerCase(),
      class: (el.className || '').toString().slice(0, 110),
      rong: Math.round(r.width), cao: Math.round(r.height),
      nen: s.backgroundColor, chu: s.color,
      bo: s.borderRadius, vien: s.borderTopWidth + ' ' + s.borderTopStyle + ' ' + s.borderTopColor,
      bong: s.boxShadow === 'none' ? null : s.boxShadow,
      dem: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
      co: s.fontSize, dong: s.lineHeight, dam: s.fontWeight, font: s.fontFamily.split(',')[0],
    }
  }
  const dien = el => { const r = el.getBoundingClientRect(); return r.width * r.height }

  // thẻ / panel: phần tử có nền khác nền trang VÀ có bo góc hoặc đổ bóng
  const nenTrang = S(document.body).backgroundColor
  const ungVien = [...document.querySelectorAll('div,section,article,aside,header,nav,table,tr,button,a,span')]
  const the = ungVien
    .filter(el => {
      const s = S(el), r = el.getBoundingClientRect()
      if (r.width < 120 || r.height < 60) return false
      const coBo = parseFloat(s.borderRadius) >= 4
      const coBong = s.boxShadow !== 'none'
      return s.backgroundColor !== nenTrang && s.backgroundColor !== 'rgba(0, 0, 0, 0)' && (coBo || coBong)
    })
    .sort((a, b) => dien(b) - dien(a)).slice(0, 8).map(gon)

  const nut = [...document.querySelectorAll('button,a[class*=bg-],[role=button]')]
    .filter(el => { const r = el.getBoundingClientRect(); return r.width > 60 && r.height > 26 && r.height < 60 })
    .slice(0, 8).map(gon)

  const thanhBen = document.querySelector('aside') || document.querySelector('[class*=sidebar]')
  const dongBang = [...document.querySelectorAll('tbody tr')].slice(0, 3).map(gon)
  const oBang = [...document.querySelectorAll('tbody td')].slice(0, 3).map(gon)
  const nhan = [...document.querySelectorAll('span,div')]
    .filter(el => {
      const s = S(el), r = el.getBoundingClientRect(), t = (el.textContent || '').trim()
      return t.length > 1 && t.length < 22 && r.height > 16 && r.height < 34 && r.width < 130 &&
             s.backgroundColor !== 'rgba(0, 0, 0, 0)' && s.backgroundColor !== nenTrang &&
             parseFloat(s.borderRadius) > 2
    }).slice(0, 10).map(el => ({ ...gon(el), chuHien: el.textContent.trim() }))

  // đếm mọi giá trị bo góc và đổ bóng đang thực sự dùng
  const demBo = {}, demBong = {}, demFont = {}
  for (const el of document.querySelectorAll('*')) {
    const s = S(el), r = el.getBoundingClientRect()
    if (r.width < 8 || r.height < 8) continue
    const b = s.borderRadius
    if (b && b !== '0px') demBo[b] = (demBo[b] || 0) + 1
    if (s.boxShadow && s.boxShadow !== 'none') demBong[s.boxShadow] = (demBong[s.boxShadow] || 0) + 1
    demFont[s.fontFamily.split(',')[0].replace(/"/g, '')] = (demFont[s.fontFamily.split(',')[0].replace(/"/g, '')] || 0) + 1
  }
  const top = (o, n) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n)

  return {
    nenTrang,
    nenBody: S(document.documentElement).backgroundColor,
    the, nut, dongBang, oBang, nhan,
    thanhBen: thanhBen ? gon(thanhBen) : null,
    boGocHayDung: top(demBo, 8),
    doBongHayDung: top(demBong, 6),
    fontHayDung: top(demFont, 4),
  }
})

fs.writeFileSync(path.join(outDir, 'do-duoc.json'), JSON.stringify(dulieu, null, 2), 'utf8')

console.log('\n— nền trang:', dulieu.nenTrang, '· thanh bên:', dulieu.thanhBen?.nen, 'rộng', dulieu.thanhBen?.rong)
console.log('\n— bo góc hay dùng:'); for (const [v, n] of dulieu.boGocHayDung) console.log('   ', String(n).padStart(4), v)
console.log('\n— đổ bóng hay dùng:'); for (const [v, n] of dulieu.doBongHayDung) console.log('   ', String(n).padStart(4), v)
console.log('\n— font hay dùng:'); for (const [v, n] of dulieu.fontHayDung) console.log('   ', String(n).padStart(4), v)
console.log('\n— thẻ lớn nhất:'); for (const t of dulieu.the.slice(0, 4)) console.log('   ', t.rong + 'x' + t.cao, 'nền', t.nen, 'bo', t.bo, 'bóng', t.bong, 'đệm', t.dem)
console.log('\n— nhãn trạng thái:'); for (const n of dulieu.nhan.slice(0, 6)) console.log('   ', JSON.stringify(n.chuHien), 'nền', n.nen, 'chữ', n.chu, 'bo', n.bo, 'cỡ', n.co)
console.log('\n— dòng bảng:'); for (const d of dulieu.dongBang) console.log('   cao', d.cao, 'vien', d.vien)
console.log('\n— ô bảng:'); for (const o of dulieu.oBang) console.log('   đệm', o.dem, 'cỡ', o.co, 'dòng', o.dong)
console.log('\nghi:', path.join(outDir, 'do-duoc.json'))

await browser.close()
