# S5a — Cấu hình: danh sách dự án · ghi chú bản thiết kế

> **Đã chuẩn hoá ngày 11/08/2026** theo [QUYET-DINH.md](../QUYET-DINH.md) — 5 quyết định về
> app shell, design system, hành động theo dòng, chuẩn hoá bản light và nguồn sự thật.
> Bản Stitch gốc cất ở [goc-stitch/](../goc-stitch/). Số liệu tương phản dưới đây là **trước**
> khi chuẩn hoá; sau khi chuẩn hoá cả 8 màn đều về **0 chỗ không đạt**.


Sinh bằng `generate_screen_from_text` qua Stitch MCP ngày 11/08/2026, prompt lấy nguyên
khối dán từ [brief S5a](../../03-ui-brief/s5a-cau-hinh-danh-sach-du-an.md).
Session `13427682531761648602`.

Một prompt trả về **ba màn** — đúng cả ba trạng thái brief xin:

| File | Màn |
|---|---|
| `danh-sach.html` · `danh-sach.png` | Danh sách dự án |
| `rong.html` · `rong.png` | Chưa kết nối dự án nào |
| `dang-dong-bo.html` · `dang-dong-bo.png` | Đang lấy thông tin từ Jira |

## Ba điều học được về MCP của Stitch

1. **`generate_screen_from_text` KHÔNG ghi màn vào project.** Kết quả chỉ nằm trong
   session và trả về ngay trong phản hồi. Kiểm `list_screens` nhiều lần sau đó: project
   vẫn đúng 2 màn cũ. Nghĩa là **phải giữ lấy phản hồi** — mất là mất luôn, chạy lại chỉ
   ra bản khác vì sinh không tất định. Muốn màn nằm trong file Stitch thì phải dán prompt
   ở giao diện web.

2. **Tham số `designSystem` bị từ chối.** Truyền `assets/d4edd14ca533403eb465d4c395c545ca`
   (đúng tên tài nguyên mà `list_design_systems` trả về) thì server báo *"Request contains
   an invalid argument"*. Bỏ tham số đi thì chạy. Đã thử bỏ riêng `modelId` để loại trừ —
   không phải do nó. Hệ quả: **không ghim được bản thiết kế vào "Nexus Enterprise"**,
   Stitch tự chọn, nên khung app lệch so với S1 (xem dưới).

3. **Ảnh Stitch trả về là thumbnail 512×410** dù metadata khai `2560×2048`. Ba ảnh ở đây
   render lại từ HTML bằng Playwright, cùng thông số với S1 (1280×1024 @2x).

## Khung app: bốn màn, bốn kiểu

Đây là vấn đề lớn nhất, và nó **không tự hết** — cần chốt một phương án trước khi convert.

| Màn | Nút "Tạo mẫu mới" | Logo | Thanh trên |
|---|---|---|---|
| S1 danh sách mẫu | góc phải thanh trên | không | trống |
| S1 dự án trống | trong thanh bên | tròn | trống |
| S5a danh sách dự án | trong thanh bên | không | chuông, trợ giúp, avatar |
| S5a chưa kết nối | góc phải thanh trên | vuông | tìm kiếm, chuông, trợ giúp, avatar ảnh |

Hai màn **trong cùng một lượt sinh** đã lệch nhau, nên đây không phải chuyện sinh nhiều
lần. Khi convert, app shell phải là **một** component dùng chung.

## Đối chiếu 7 điểm kiểm của brief

| # | Điểm kiểm | Kết quả |
|---|---|---|
| 1 | Tên dự án dài | ❌ Cắt cụt thành "Hạ tầng & Vận hành…", lại còn tự đổi "và" → "&". Không có tooltip |
| 2 | Dấu tiếng Việt ở dòng chật | ✅ Không cắt |
| 3 | Ba tình huống cảnh báo phân biệt được | ✅ Tốt — mỗi cái một nhãn riêng kèm chữ giải thích hệ quả, không chỉ dùng màu |
| 4 | Dòng "Chỉ xem" có dùng opacity | ✅ Không dùng |
| 5 | Khối tài khoản trong khung nhìn (`RES-12`) | ✅ Đạt |
| 6 | Có bộ chọn dự án thứ hai không (`PRIN-04`) | ✅ Không có |
| 7 | Vi phạm "không được làm" | ❌ Hai chỗ, xem dưới |

### Ba lỗi phải sửa

1. **Cột "Thao tác" trống ở 3/5 dòng.** Chỉ DEVOPS và LEGAL có nút. Hành động **chính**
   của màn — mở một dự án — biến mất khỏi ba dòng còn lại. Nếu ý đồ là hiện khi rê chuột
   thì vẫn sai tinh thần "không giấu hành động chính".

2. **Lẫn tiếng Anh trong màn đang đồng bộ:** dòng
   *"Fetching workflow schemes and custom fields…"*. Brief ghi rõ toàn bộ giao diện tiếng
   Việt.

3. **Tiêu đề cột viết hoa toàn bộ quá 3 từ:** "LẦN CUỐI LẤY DỮ LIỆU", "TRẠNG THÁI CẤU
   HÌNH". Đây là **xung đột giữa brief và design system**: `DESIGN.md` của Nexus
   Enterprise lại quy định *"table headers use ALL CAPS"*. Phải chọn một bên rồi sửa bên
   kia, không để hai nguồn nói ngược nhau.

### Một chỗ chưa nhất quán

Dòng HRQ có câu giải thích "Mẫu tự động đóng sẽ không lưu được" dưới nhãn cảnh báo, nhưng
LEGAL cũng "CHƯA đặt status đích" thì lại không có. Cùng một tình huống, hai cách hiển thị.

## Stitch tự đề xuất làm tiếp

- Thiết kế màn hình Chi tiết cấu hình dự án ([brief S5b](../../03-ui-brief/s5b-cau-hinh-chi-tiet-du-an.md) đã sẵn)
- Điều chỉnh bảng danh sách dự án dày đặc hơn
- Thêm bộ lọc và tìm kiếm dự án

Đề xuất thứ ba nên bỏ qua: dưới 10 dự án thì lọc và tìm kiếm là thừa, thêm vào chỉ tốn
chỗ. Đề xuất thứ hai thì ngược lại với brief — brief đã nói rõ ít dự án nên cho phép dòng
cao thoáng.
