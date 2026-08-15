# templates/vue-admin

Scaffold frontend cho công cụ nội bộ. **Chỉ chứa hạ tầng** — không chứa màn hình của dự án nào.

```bash
node tools/new-app.mjs <slug> --install
cd projects/<slug>/app && npm run dev
```

## Stack

Vue 3.5 · TypeScript · Vite · Tailwind CSS 4 · shadcn-vue (copy-in) · Reka UI · lucide

## Vì sao template, không phải gói dùng chung

Chỉ tách phần **hạ tầng** — phần không có phán đoán thiết kế nên không có rủi ro tách sai.

**Thư viện component cố ý CHƯA tách thành gói dùng chung.** Với một dự án, tách gói là đoán mò cái trừu tượng: chưa biết phần nào thật sự chung, phần nào chỉ đúng với dự án này. Quy tắc: **chờ tới người dùng thứ ba** — dự án 2 cứ chép sang và ghi lại chỗ trùng lặp, tới dự án 3 thì đã biết chắc phải tách gì.

Và vì mỗi dự án có ngôn ngữ thị giác riêng (Stitch thiết kế tự do), ranh giới đúng là: **API và hành vi dùng chung, hình thức riêng từng dự án.**

| Ổn định mọi dự án | Đổi theo từng dự án |
|---|---|
| Cấu hình Vite/TS/alias/Tailwind | Giá trị token: màu, bo góc, thang chữ |
| `scripts/sync-design-system.mjs` | Hình thức component |
| `AppShell` — khung cố định (`RES-12`/`AP-19`) | Đôi khi cả hình dạng (badge vuông/tròn) |
| Hành vi + API component (Reka, a11y) | |

## Ba thứ quan trọng nhất trong scaffold

**1. `src/style.css` — cầu nối shadcn ← design system.**
`shadcn-vue init` mang theo theming riêng: bảng màu oklch riêng, `--radius` riêng, biến thể dark theo class `.dark`. Để nguyên là **hai nguồn sự thật cho màu**. Cầu nối bắt biến của shadcn **dẫn xuất từ token của mình**, và xoá hẳn khối `.dark` — token đã tự đổi theo `[data-theme]`.

**2. `scripts/sync-design-system.mjs` — dọn thứ CLI tự tiêm.**
Mỗi lần `npx shadcn-vue add …`, CLI lại tiêm import Google Fonts (phá tính chạy offline), khối `@layer base` trùng, và ghi đè `--font-heading`. Script sinh lại token rồi dọn sạch, và **thoát với mã lỗi nếu còn tài nguyên ngoài**. Đã gắn vào `npm run build`.

> **Sau mỗi `shadcn-vue add`, chạy `npm run sync`.** Không phải tuỳ chọn.

**3. `src/KitPage.vue` — trang "Bộ component".**
Hợp đồng giữa thiết kế và code. Mọi thứ thiết kế vẽ ra phải có mặt ở trang này. Thấy thành phần không có ở đó nghĩa là đang phát minh component mới → qua gate, không tự dựng ([docs/07 §12](../../docs/07-uiux-capability-and-eval.md)).
Trang này liệt kê sẵn **các trạng thái bắt buộc** (rỗng, lọc không ra, lỗi, không quyền) — phần bản thiết kế gần như không bao giờ vẽ.

## Quy trình hiệu chỉnh từ bản thiết kế Stitch

Chi phí **trả trước, không trả theo màn**. Màn đầu đắt, các màn sau rẻ.

**Màn 1 — hiệu chỉnh (làm một lần cho mỗi dự án):**
1. Nhận bản Stitch (HTML + Tailwind, hoặc Vue)
2. Rút ngôn ngữ thị giác: màu, bo góc, spacing, thang chữ → `projects/<slug>/design-overrides.json`
3. Chỉnh các component trong `src/components/ui/` cho khớp — shadcn là copy-in, sửa được thoải mái
4. `npm run sync` để sinh lại token

**Màn 2..N — ánh xạ (rẻ):**
1. Ánh xạ markup Stitch → component đã hiệu chỉnh
2. **Bù trạng thái** — Stitch chỉ vẽ happy path. Lấy từ `KitPage`
3. **Bù a11y** — Reka lo phần hành vi; kiểm nhãn, vùng bấm, focus
4. Chạy `tools/ui-eval` trên bản build

**Thước đo khách quan:** check `CMP-01` — *% vùng UI ánh xạ được về component*.
Sau hiệu chỉnh mà đạt **≥ 80%** thì cách này đúng. Liên tục **< 50%** nghĩa là thiết kế quá độc bản → xét lại việc dùng component.

## Ràng buộc không được phá

- **Không hard-code giá trị thị giác.** Mọi màu/spacing/bo góc qua token (`DS-01`, máy kiểm được).
- **Không tài nguyên ngoài.** Bản build phải chạy offline; script sync chặn việc này.
- **Giữ `AppShell`.** Nó cưỡng chế khung cố định — bỏ đi là lỗi `AP-19` quay lại.
- **Đủ trạng thái bắt buộc** theo pattern (`STATE-01…06`).
- Sàn a11y **WCAG 2.2 AA**, kiểm ở **cả hai theme**.

Chi tiết quy tắc: [knowledge/ui/](../../knowledge/ui/README.md) · Kiến trúc: [docs/07](../../docs/07-uiux-capability-and-eval.md)
