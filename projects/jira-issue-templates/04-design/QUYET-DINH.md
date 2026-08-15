# Quyết định thiết kế — chốt ngày 11/08/2026

Năm quyết định gỡ các mâu thuẫn tích lại sau ba vòng chạy Stitch (S1, S5a, S5b).
Đây là **nguồn tham chiếu cho bước convert sang Vue**. Chỗ nào mã nguồn và tài liệu
khác nói ngược lại thì file này thắng.

---

## QĐ1 — App shell: nút hành động chính nằm ở thanh trên

Trước khi chốt: 6 màn, 6 kiểu khung khác nhau.

**Đặc tả chuẩn — `AppShell` Vue phải dựng đúng thế này:**

| Vùng | Nội dung |
|---|---|
| Thanh bên (240px, cố định) | Tên hệ thống · **bộ chọn dự án Jira — danh sách, chọn một** · 3 mục điều hướng (Mẫu issue · Lịch sử issue · Cấu hình dự án) · khối tài khoản ở **đáy**, luôn trong khung nhìn (`RES-12`) |
| Thanh trên (64px) | Tiêu đề màn *hoặc* breadcrumb bên trái · **đúng một** nút hành động chính bên phải |

> **Sửa 11/08/2026 — bổ sung bộ chọn dự án.**
> [Brief S1](../03-ui-brief/s1-danh-sach-mau.md) yêu cầu *"thanh điều hướng bên trái: danh
> sách 3 dự án Jira (chọn 1)"*, nhưng bản Stitch chỉ để lại dòng chữ "Project Selector"
> tĩnh — **Stitch bỏ sót một yêu cầu**, và bản QĐ1 đầu tiên (đúc từ chính bản Stitch) kế
> thừa luôn chỗ sót đó. Phát hiện khi convert S1: `App.vue` bản prototype cũ vốn **có** bộ
> chọn này.
>
> Bộ chọn hiện: mã dự án + tên, biểu tượng khoá cho dự án người dùng không có quyền quản
> trị (FR-11). Nút "Tạo mẫu mới" ở thanh trên **ẩn** khi dự án đang chọn là loại chỉ xem.
>
> Lưu ý ranh giới: khu vực **Cấu hình dự án** (S5a/S5b) **không** phụ thuộc dự án đang chọn
> ở đây — nó tự chọn dự án trong danh sách riêng của nó (FR-05).
>
> **Sửa 11/08/2026 — *Lịch sử issue* cũng không phụ thuộc bộ chọn này.** Bản QĐ1 đầu tiên
> ghi bộ chọn chi phối *Mẫu issue* **và** *Lịch sử issue*; sai. [Brief S3](../03-ui-brief/s3-lich-su-issue.md)
> đòi một bộ lọc *Dự án* riêng **có thêm lựa chọn "Tất cả"** — thứ bộ chọn thanh bên
> (chọn đúng một dự án) không diễn đạt được. Phát hiện khi convert S3.
>
> Ranh giới đúng: bộ chọn thanh bên chi phối **chỉ *Mẫu issue*** (S1/S2). *Lịch sử issue*
> và khu *Cấu hình* đều có danh sách riêng. Hệ quả ở giao diện: khi đang ở S3, thanh bên
> **không tô sáng dự án nào** — tô sáng ITSUP trong khi bảng hiện cả 3 dự án là nói dối.

**Không có** ô tìm kiếm toàn cục, chuông thông báo, nút trợ giúp, avatar. Chưa FR nào
cần tới chúng — mỗi thứ thừa là một component phải dựng và phải bảo trì.

Nút "Tạo mẫu mới" **chỉ hiện với người có quyền quản trị dự án** (FR-11). Đó cũng là lý do
chọn thanh trên: để ở thanh bên thì lúc ẩn sẽ hở một khoảng ngay đầu thanh.

Màn chỉ xem của S5b **không có** nút này — đúng theo FR-11.

## QĐ2 — Design system: YAML là chuẩn, brief thắng khi mâu thuẫn về a11y

`DESIGN.md` mâu thuẫn với chính nó — YAML frontmatter và phần văn xuôi khai khác nhau:

| | YAML token | Văn xuôi |
|---|---|---|
| error | `#ba1a1a` | `#FF5630` |
| background (light) | `#faf9ff` | `#F4F5F7` |
| background (dark) | *(không khai)* | `#0747A6` |

**Luật đã chốt:**

1. **YAML token là chuẩn.** Văn xuôi chỉ là mô tả ý đồ, không phải giá trị thi hành.
2. **Khi brief và design system mâu thuẫn về khả năng tiếp cận thì brief thắng.**
   Áp dụng ngay: bỏ `ALL CAPS` ở tiêu đề cột — DESIGN.md bảo dùng, brief cấm viết hoa
   cụm quá 3 từ. Đã bỏ ở S5a.
3. **Bảng màu tối giữ navy** (`surface #0e1421`) do ta dẫn xuất theo M3, **không** dùng
   `#0747A6` của văn xuôi — xanh đậm làm nền cả trang thì quá chói cho công cụ mở hằng ngày.
4. **Màu success là `#008000`** ở giao diện sáng (không phải `#36B37E`). Giao diện tối
   dùng `#4bce97` cho đủ tương phản — cùng một token, hai giá trị theo theme.

## QĐ3 — Hành động theo dòng hiện thường trực

Trước khi chốt, S5a và S5b đều ẩn nút hành động bằng `opacity-0 group-hover:opacity-100`
— đo ra đúng **1.0:1**, tức vô hình cho tới khi rê chuột.

Sai hai lần: vi phạm "không giấu hành động chính" trong brief, và bàn phím lẫn màn cảm ứng
đều không tới được.

Đã bỏ ở cả 7 chỗ.

## QĐ4 — Chuẩn hoá bản light của S1, giữ bản Stitch làm mốc

Bản Stitch gốc có 3 lỗi nay đã sửa:

| Lỗi | Cách sửa |
|---|---|
| `opacity-60` ở dòng "Nháp" (`AP-11`) | Bỏ opacity. Trạng thái không dùng được vẫn nhận ra qua tên in nghiêng, nhãn "Nháp", nút không bấm được |
| Ô "Đang bật" đeo **hai** class màu chữ | Bỏ `text-secondary-container`, để `text-on-secondary-container` làm việc |
| `text-[green]` hard-code | Thành token `--success` |

Toàn bộ bản gốc Stitch cất ở [`goc-stitch/`](goc-stitch/) làm mốc đối chiếu.

## QĐ5 — Repo là nguồn sự thật, Stitch chỉ là máy sinh

`generate_screen_from_text` qua MCP **không ghi màn vào project Stitch** — kết quả chỉ nằm
trong session và trả về trong phản hồi. Project Stitch hiện vẫn chỉ có 2 màn của S1; 3 màn
S5a và 2 màn S5b **chỉ tồn tại trong repo này**.

Đúng bất biến đã đặt ở [04-design/README](README.md): không có output trôi nổi.

Hệ quả về quy trình: **phải giữ nguyên phản hồi của lần sinh** — mất là mất luôn, chạy lại
chỉ ra bản khác vì sinh không tất định.

---

## Kết quả sau khi áp cả 5 quyết định

Tương phản chữ WCAG, đo trên nền thực tế có cộng dồn opacity của tổ tiên:

| Màn | Trước | Sau |
|---|---|---|
| S1 — mẫu issue (sáng) | 10 | **0** |
| S1 — mẫu issue (tối) | — | **0** |
| S1 — dự án trống | — | **0** |
| S5a — danh sách dự án | 4 | **0** |
| S5a — chưa kết nối | — | **0** |
| S5a — đang đồng bộ | — | **0** |
| S5b — chi tiết (quản trị) | 8 | **0** |
| S5b — chi tiết (chỉ xem) | — | **0** |
| S2 — form tạo issue | 2 | **0** |
| S2 — tạo thất bại | 0 | **0** |
| S2 — chuyển trạng thái lỗi | 1 | **0** |
| S2 — tạo thành công | 7 | 5 — nền che modal, xem [ghi chú S2](s2-tao-issue-tu-mau/ghi-chu.md) |

Sửa kèm trong lúc chuẩn hoá:

- **Tên dự án bị Stitch viết cụt ngay trong markup** — `Hạ tầng &amp; Vận hành...` là chuỗi
  thật trong HTML, không phải CSS cắt. Dữ liệu bị đổi âm thầm; đã trả lại nguyên văn và bỏ
  `truncate` để nó xuống dòng.
- **Chuỗi tiếng Anh còn sót**: *"Fetching workflow schemes and custom fields…"* → tiếng Việt.
- **Dòng LEGAL thiếu câu giải thích** mà dòng HRQ cùng tình huống lại có — đã bổ sung.
- **Bốn chỗ `opacity-*` khác** làm nhạt chữ (`opacity-50` ở nhãn "Chỉ xem", `opacity-75`,
  `opacity-70`) — cùng loại lỗi `AP-11`, đã thay bằng token màu.

---

## QĐ6 — Token trạng thái: kế thừa từ design system cấp org

*Chốt 11/08/2026, sau khi phát hiện chỗ đặt token đúng.*

Ban đầu định thêm `success` / `warning` vào `DESIGN.md` của Stitch. **Sai chỗ.** Repo đã có
[`design-system/`](../../../design-system/) cấp org với kiến trúc token hai tầng, và các
vai trò đó **đã tồn tại sẵn, đã kiểm tương phản**:

| Vai trò | Light | Dark | Tương phản đã đo |
|---|---|---|---|
| `success-container` / `on-success-container` | `#B7F0C4` / `#002110` | `#0E5227` / `#B7F0C4` | 14.1 · 7.9 — đạt |
| `warning-container` / `on-warning-container` | `#FFDDB0` / `#2B1700` | `#5C3D00` / `#FFDDB0` | 12.8 · 8.4 — đạt |

Đã thay **15 chỗ màu Tailwind thô** ở `s5a/danh-sach.html` bằng bốn vai trò này. Không còn
màu thô nào trong toàn bộ bản thiết kế.

Bỏ luôn viền của nhãn trạng thái: `*-container` của org đậm hơn `green-50`/`yellow-50` nên
viền thành thừa — và org **không có vai trò `warning` trần** để làm màu viền cho cân với
`success`. Sự bất đối xứng đó là một khiếm khuyết nhỏ của bộ gốc, ghi lại ở mục cuối.

### Kèm theo: đã tạo `design-overrides.json`

[`design-system/README`](../../../design-system/README.md) quy định dự án **được** đổi bảng
màu nhưng **phải khai tường minh kèm lý do**, và "không hard-code giá trị thị giác" là bất
biến `DS-01`. File bắt buộc đó trước nay **chưa tồn tại**.

Đã sinh [`design-overrides.json`](../design-overrides.json) từ dữ liệu thật — so từng vai
trò giữa bộ org và bảng màu dự án:

- **18 override ở light, 22 ở dark**, mỗi cái kèm `$value`, `$orgValue` để đối chiếu, và `$reason`
- **Kế thừa nguyên** từ org: `success`, `warning`, spacing, radius, typography

Hai lý do override, cả hai đều nằm ở cột "thả lỏng" mà bộ gốc cho phép:

1. Bảng màu theo seed `#0052CC` (Jira Blue) thay vì `#2563EB` của org — người dùng thao tác
   song song với Jira nên màu hành động trùng Jira giúp nhận diện nhanh.
2. Nền tối dùng navy `#0e1421` thay vì đen tuyệt đối của org — đúng QĐ2.

### Một chỗ lệch quy ước đáng lưu ý khi convert

`primary-container` ở hai bộ mang vai trò **ngược nhau**:

| | org | dự án |
|---|---|---|
| `primary-container` | `#dbeafe` — nền nhạt | `#0052cc` — nền đậm |
| `on-primary-container` | `#0a1f52` — chữ đậm | `#c4d2ff` — chữ nhạt |

Không phải lỗi, nhưng component nào map thẳng theo tên vai trò sẽ ra kết quả đảo. Kiểm kỹ
lúc chỉnh `app/src/components/ui/`.

---

## Còn treo

**Bộ gốc org thiếu vai trò `warning` trần** (chỉ có `warning-container` / `on-warning-container`),
trong khi `success` và `error` đều có. Chưa cần gấp — đã đi đường vòng bằng cách bỏ viền
nhãn. Nhưng bộ gốc đang ở trạng thái `Draft` chờ Human Gate, nên đây là lúc hợp lý để bổ
sung cho cân.

**`CMP-01` phạt oan màn thưa nội dung** — phát hiện khi convert S3. `AppShell` bị loại khỏi
tử số (đúng, nếu không màn nào cũng 100%) nhưng vẫn nằm trong mẫu số, nên màn càng ít nội
dung thì khung app càng chiếm tỉ trọng lớn, và một màn **không còn dòng markup riêng nào**
vẫn trượt ngưỡng (`s5a-rong` 79.7%). Ba phương án và khuyến nghị ở
[ghi chú convert S3 §Còn treo](s3-lich-su-issue/convert-ghi-chu.md). Phương án khuyến nghị
**bắt đo lại toàn bộ bảng số trên**, nên chưa tự làm. Trong lúc chờ, `measure.mjs` thoát
khác 0.

**`NFR-07` — tạo một issue trong ≤ 3 lần bấm** đã nghiệm thu: **2 lần bấm, tới đích**, đo
bằng Playwright chứ không đếm tay. Xem [ghi chú convert S2](s2-tao-issue-tu-mau/convert-ghi-chu.md).

**Q22 trong [sổ câu hỏi treo](../01-open-questions.md)** — Jira DC bản nào. Không chặn thiết
kế nhưng chặn code xác thực: PAT chỉ có từ Jira 8.14, thấp hơn thì FR-01 phải lùi về Basic auth.

---

## Bốn màn đã có bản thiết kế

### Đã convert sang Vue

| Màn | `CMP-01` | Tương phản sáng/tối |
|---|---|---|
| S1 — Danh sách mẫu | **85.2%** | 0 / 0 |
| S2 — Tạo issue từ mẫu | **81.3%** | 0 / 0 |
| S3 — Lịch sử issue | **92.7%** | 0 / 0 |
| S3 — lọc không khớp | **85.9%** | 0 / 0 |
| S5a — Cấu hình: danh sách dự án | **83.2%** | 0 / 0 |
| S5a — chưa kết nối | ~~89.3%~~ → **79.7%** ❌ | 0 / — |
| S5b — chi tiết (quản trị) | **89.4%** | 0 / 0 |
| S5b — chi tiết (chỉ xem) | **88.7%** | 0 / 0 |
| S4 — Soạn/sửa mẫu | **93.1%** | 0 / 0 |

Ngưỡng `CMP-01` ≥ 80%. Đo bằng [`tools/ui-eval/measure.mjs`](../../../tools/ui-eval/measure.mjs).
Lý do phải đổi cách đo hai lần: xem
[ghi chú convert S2](s2-tao-issue-tu-mau/convert-ghi-chu.md).

> **`s5a-rong` 89.3% là số ảo.** Màn "chưa kết nối dự án nào" có lỗi: nó hiện câu thông báo
> rỗng **và liệt kê đủ 5 dự án** ngay bên dưới, và chính 5 dòng thừa đó đẩy `CMP-01` lên.
> Đã sửa khi convert S3; số thật là **79.7%**, trượt ngưỡng. Nhưng **100% phần "viết tay"
> còn lại là `AppShell`** — màn đó không còn markup riêng nào, nên không nâng số được bằng
> cách dùng thêm component. Đây là bất đối xứng của chính phép đo (`AppShell` bị loại khỏi
> tử số nhưng vẫn nằm trong mẫu số), xem
> [ghi chú convert S3 §Còn treo](s3-lich-su-issue/convert-ghi-chu.md).

| Màn | Thư mục | Số màn |
|---|---|---|
| S1 — Danh sách mẫu issue | [s1-danh-sach-mau/](s1-danh-sach-mau/) | 2 + bản tối |
| S2 — Tạo issue từ mẫu | [s2-tao-issue-tu-mau/](s2-tao-issue-tu-mau/) | 4 |
| S3 — Lịch sử issue | [s3-lich-su-issue/](s3-lich-su-issue/) | 2 |
| S4 — Soạn/sửa mẫu | [s4-soan-sua-mau/](s4-soan-sua-mau/) | 3 |
| S5a — Cấu hình: danh sách dự án | [s5a-cau-hinh-danh-sach-du-an/](s5a-cau-hinh-danh-sach-du-an/) | 3 |
| S5b — Cấu hình: chi tiết dự án | [s5b-cau-hinh-chi-tiet-du-an/](s5b-cau-hinh-chi-tiet-du-an/) | 2 |

**Đã convert hết 6 màn có thiết kế** — S1, S2, S3, S4, S5a, S5b. Không còn màn nào trong
`03-ui-brief/` chưa có bản Vue.

**Q22 trong [sổ câu hỏi treo](../01-open-questions.md)** — Jira DC bản nào. Không chặn thiết
kế nhưng chặn code xác thực: PAT chỉ có từ Jira 8.14, thấp hơn thì FR-01 phải lùi về Basic auth.
