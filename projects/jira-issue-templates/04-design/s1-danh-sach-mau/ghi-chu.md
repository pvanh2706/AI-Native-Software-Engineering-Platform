# S1 — Danh sách mẫu · ghi chú bản thiết kế

> **Đã chuẩn hoá ngày 11/08/2026** theo [QUYET-DINH.md](../QUYET-DINH.md) — 5 quyết định về
> app shell, design system, hành động theo dòng, chuẩn hoá bản light và nguồn sự thật.
> Bản Stitch gốc cất ở [goc-stitch/](../goc-stitch/). Số liệu tương phản dưới đây là **trước**
> khi chuẩn hoá; sau khi chuẩn hoá cả 8 màn đều về **0 chỗ không đạt**.


Nguồn: Stitch, project `3112347405197341142`, màn *Mẫu issue - Jira Automation (Light)*
(`screens/113c69a89391489bb1ba0616b795e240`), đọc qua MCP ngày 10/08/2026.

| File | Là gì |
|---|---|
| `code.html` | Một file, chạy được cả hai theme |
| `sang.png` | 1280×1024 @2x, `?theme=light` |
| `toi.png` | 1280×1024 @2x, `?theme=dark` |
| `rong.png` | 1280×1024 @2x, màn *Dự án trống* (`screens/7da335c446124b73acc89a2673f120d7`) |
| `DESIGN.md` | Design system "Nexus Enterprise" tải từ Stitch, 180 dòng |

Cả ba ảnh render lại bằng Playwright từ HTML gốc với cùng thông số, **không** dùng ảnh
Stitch trả sẵn — ảnh của Stitch là JPEG (dù endpoint tên là `screenshot`), nén mất nét
chữ nhỏ và không đồng nhất thông số với hai ảnh còn lại.

## Màn trống dùng app shell khác màn chính

Cùng một hệ thống nhưng Stitch dựng hai thanh bên khác nhau:

| | Màn chính (`sang`/`toi`) | Màn trống (`rong`) |
|---|---|---|
| Nút "Tạo mẫu mới" | góc phải thanh trên | trong thanh bên, ngay dưới tên |
| Logo | không có | có, hình tròn cạnh tên |

Vẫn còn nguyên vì đây là chỗ **thiết kế** cần chốt, không phải lỗi kỹ thuật sửa được ở
tầng token. Khi convert sang Vue thì app shell phải là **một** component dùng chung, nên
phải chọn lấy một phương án trước. Nút "Tạo mẫu mới" chỉ hiện với quản trị (FR-11) — đặt
trong thanh bên thì lúc ẩn đi sẽ để lại khoảng trống ngay đầu thanh, đặt ở thanh trên thì
gọn hơn.

## Bản dark từ đâu ra

Stitch từng có sẵn một màn dark nhưng **nội dung lệch hẳn** so với bản light (khác cột,
có ô tìm kiếm và nút Lọc, mất cột Thao tác lẫn bảng *Issue gần đây*), nên đã bỏ và xóa
khỏi Stitch. Bản dark ở đây dựng lại từ chính bản light.

**Markup không đổi một ký tự.** Cách làm: chuyển bảng màu trong `tailwind.config` từ hex
cứng sang `rgb(var(--token) / <alpha-value>)`, rồi khai token trong `:root` và
`:root.dark`. Mọi utility sẵn có (`bg-surface`, `text-on-surface`, …) tự lật theo class
trên `<html>`.

Dùng dạng `rgb(var(…) / <alpha-value>)` chứ không phải `var(…)` trần, nếu không hai chỗ
`bg-surface-container-highest/20` và `bg-error-container/30` sẽ hỏng modifier opacity.

Token khai trong `:root` để [`tools/ui-eval`](../../../../tools/ui-eval/capture.mjs)
không tính là màu hard-code — check `DS-01` chỉ tha giá trị màu nằm trong khối `:root`,
nên phải viết `:root.dark`, không được viết `.dark` trần.

Đổi theme: `?theme=dark` trên URL, hoặc `setTheme('dark')` trong console. **Không thêm nút
bấm nào vào giao diện** — ảnh chụp phải đúng thiết kế, không lẫn chrome của công cụ.

### Đã gỡ 6 tiện ích `dark:` của Stitch

Bản gốc có 6 tiện ích `dark:` rải rác ở sidebar, viết từ hồi màu còn là hex cứng. Giờ
token tự lật thì giữ lại là **sai ngược**: `dark:bg-inverse-surface` sẽ cho sidebar màu
*sáng* khi ở dark. Đã gỡ, để token gốc làm việc.

Riêng mục nav đang chọn, bản gốc dùng `bg-secondary-fixed` — mà nhóm `fixed` theo đặc tả
M3 thì **không đổi** giữa hai theme, nên ở dark sẽ ra pill xanh nhạt trên nền tối. Đã tách
thành `--nav-active-bg` / `--nav-active-fg`; giá trị light đặt đúng bằng bản gốc.

### Hai chỗ phải lệch khỏi M3 thuần

M3 cho dark thì `*-container` lấy tone 30 (sẫm). Ở đây không dùng được vì markup dùng lẫn
vai trò nền và vai trò chữ:

| Token | M3 thuần | Ở đây | Vì sao |
|---|---|---|---|
| `primary-container` | `#0040a2` | `#93b0ff` | Vừa là nền nút (`bg-primary-container` + `text-on-primary`) vừa là màu chữ hover (`hover:text-primary-container`). Tone 30 cho nút **1.35:1** và link hover gần như tàng hình. Tone ~72 thì hover vẫn sáng lên mà chữ `on-primary` sẫm vẫn đọc được |
| `secondary-container` | `#00419d` | `#b1c6ff` | Trong markup **chỉ** dùng làm màu chữ (ô "Đang bật"), không hề làm nền. Tone 30 cho **1.97:1** |

## Kiểm chứng

So **computed style từng phần tử** giữa bản Stitch gốc và `code.html` ở chế độ light —
chính xác hơn diff ảnh vì bắt được cả màu, cỡ chữ, độ đậm, opacity:

```
114 phần tử  →  0 lệch
```

Tương phản chữ WCAG (tính trên nền thực tế, có cộng dồn opacity của tổ tiên):

| | Số chỗ không đạt |
|---|---|
| Light (đo trên **bản Stitch gốc**) | 11 |
| Dark (bản này) | 2 |

## Ba lỗi có sẵn trong bản light — chưa sửa

Đều là của bản Stitch, không phải do dựng dark. Chưa đụng vào vì sửa là **đổi diện mạo
bản light**, mà mốc so sánh đang cần giữ nguyên. Cần chốt trước khi convert sang Vue:

1. **`opacity-60` ở dòng "Nháp"** — đúng thứ [brief](../../03-ui-brief/s1-danh-sach-mau.md)
   đã cảnh báo ở `AP-11`. Kéo tương phản xuống 2.24:1 (light) và 2.9:1 (dark); đây chính
   là 2 chỗ không đạt còn lại của dark. Cách đúng là dùng token màu mờ, không dùng opacity.
2. **Ô "Đang bật" có hai class màu chữ** — `text-secondary-container` *và*
   `text-on-secondary-container` trên cùng một thẻ. Cái thắng là
   `text-secondary-container`, cho chữ xanh nhạt 2.47:1 trên nền gần trắng. Nhiều khả năng
   ý định ban đầu là `bg-`. Bỏ class thừa là đạt chuẩn ngay, nhưng bản light sẽ đổi màu.
3. **`text-[green]` hard-code** ở cột Kết quả — đã thay bằng token `--success`, giá trị
   light đặt đúng `#008000` nên nhìn không đổi; dark nâng lên `#4bce97` cho đủ tương phản.
   `DESIGN.md` của Stitch khai success là `#36B37E` — nên thống nhất một giá trị.

Ngoài ra `background` và `surface` trùng nhau ở cả hai theme (bản gốc đã vậy), nên hai
bảng chỉ tách khỏi nền bằng viền. `DESIGN.md` khuyên tách bằng lớp nền — cân nhắc khi
convert.
