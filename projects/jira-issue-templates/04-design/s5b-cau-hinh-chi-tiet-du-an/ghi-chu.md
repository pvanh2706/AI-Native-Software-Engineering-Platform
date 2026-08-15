# S5b — Cấu hình: chi tiết dự án · ghi chú bản thiết kế

> **Đã chuẩn hoá ngày 11/08/2026** theo [QUYET-DINH.md](../QUYET-DINH.md) — 5 quyết định về
> app shell, design system, hành động theo dòng, chuẩn hoá bản light và nguồn sự thật.
> Bản Stitch gốc cất ở [goc-stitch/](../goc-stitch/). Số liệu tương phản dưới đây là **trước**
> khi chuẩn hoá; sau khi chuẩn hoá cả 8 màn đều về **0 chỗ không đạt**.


Sinh bằng `generate_screen_from_text` qua Stitch MCP ngày 11/08/2026, prompt lấy nguyên
khối dán từ [brief S5b](../../03-ui-brief/s5b-cau-hinh-chi-tiet-du-an.md).
Session `14506073584033544933`.

| File | Màn | Từ đâu ra |
|---|---|---|
| `quan-tri.html` · `quan-tri.png` | Bản quản trị | Stitch sinh — dùng được |
| `chi-xem.html` · `chi-xem.png` | Bản chỉ xem | **Ta tự dẫn xuất từ `quan-tri.html`** — bản Stitch sinh đã bỏ |

## Bản quản trị: đạt

Đối chiếu 8 điểm kiểm của brief:

| # | Điểm kiểm | Kết quả |
|---|---|---|
| 1 | **Có mọc công tắc auto-Done cấp dự án không** | ✅ Không. Chỉ có ô chọn trạng thái đích kèm câu giải thích |
| 2 | Tên field và tên mẫu dài | ✅ Xuống dòng đủ chữ, **không cắt cụt** |
| 3 | Dấu tiếng Việt | ✅ Không cắt |
| 4 | Ô trạng thái đích là ô chọn hay ô gõ | ✅ Ô chọn, đang chọn "Đã xong" |
| 5 | Bản chỉ xem có giải thích thật | ✅ Có — nhưng xem mục dưới |
| 6 | Mẫu không hợp lệ nói rõ hỏng chỗ nào | ✅ Nêu đúng tên field hỏng |
| 7 | Khối tài khoản trong khung nhìn | ✅ Đạt |
| 8 | Vi phạm "không được làm" | ✅ Không có |

**Điểm 1 là thắng lợi đáng kể.** Khối "ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY" đã chặn được
đúng cái sai dự đoán trước. Điểm 2 cũng khá hơn hẳn [S5a](../s5a-cau-hinh-danh-sach-du-an/ghi-chu.md),
nơi tên dự án dài bị cắt thành "Hạ tầng & Vận hành…".

Hai chi tiết làm tốt mà brief không cần nhắc: dòng mẫu đang tắt **không** hiện link "Đặt
mặc định" (đúng ràng buộc "mẫu đang tắt không được chọn làm mặc định"), và tay cầm kéo thả
hiện rõ ở mỗi dòng.

## Bản chỉ xem hiện tại: tự dẫn xuất

`chi-xem.html` **không phải** bản Stitch sinh — bản đó đã bỏ (lý do ở mục kế tiếp). Bản
đang dùng dẫn xuất từ `quan-tri.html`, cùng cách đã làm với bản tối của S1: **giữ nguyên
cấu trúc, chỉ khoá tương tác**. Nhờ vậy hai bản không thể lệch nội dung.

Đã làm:

| Việc | Chi tiết |
|---|---|
| Dải giải thích | Nói rõ *vì sao* không sửa được và liên hệ ai — không chỉ làm mờ mọi thứ |
| Nút Lưu / Huỷ | Bỏ, thay bằng chip "Chỉ xem" có biểu tượng khoá |
| Nhãn vai trò | "Quản trị" → "Chỉ xem" |
| 2 ô chọn, 1 ô nhập, 1 ô ghi chú | `disabled` |
| Nút "Đặt mặc định" ×3 | Thay bằng "—" |
| Cột "Hành động" | Bỏ hẳn — không còn hành động nào thì để cột trống là vô nghĩa |
| Nút "+ Thêm mẫu" | Bỏ |
| Nút "Tạo mẫu mới" ở thanh bên | Bỏ — chỉ quản trị mới được (FR-11) |
| Kéo thả | Bỏ tay cầm, đổi câu mô tả |
| Lời báo lỗi trường bắt buộc | Đổi cho đúng đối tượng — câu cũ bảo *người đọc* đi điền |

**Chỗ dễ sai nhất: trình duyệt tự làm mờ ô `disabled`.** Mặc định Chrome hạ opacity của
control bị khoá — đúng lỗi `AP-11` mà brief cấm. Đã ép `opacity: 1` và chỉ định
`-webkit-text-fill-color` tường minh trong khối `<style>`.

Script dựng đặt assert cho từng phép thay thế. Hai lần chạy đầu **fail đúng chỗ nên
được**: nút "Đặt mặc định" hoá ra chỉ nút đầu có thuộc tính `title`, và ô hành động dòng
thứ năm không dùng `opacity-0` như bốn dòng kia. Nguồn đổi mà script im lặng bỏ qua thì
còn tệ hơn báo lỗi.

### Kiểm chứng

Ba phần FR-05 bắt buộc và cả 5 dòng dữ liệu mẫu đều còn nguyên — kiểm bằng script, không
nhìn bằng mắt.

Tương phản chữ WCAG (tính trên nền thực tế, cộng dồn opacity tổ tiên, và với ô bị khoá thì
đọc `-webkit-text-fill-color` chứ không phải `color`):

| Màn | Số chỗ không đạt |
|---|---|
| `quan-tri.html` (Stitch sinh) | 8 |
| `chi-xem.html` (ta dẫn xuất) | 1 |

Chỗ duy nhất còn lại là dấu `•` phân cách metadata ở đầu màn (4.08:1) — kế thừa từ bản
quản trị, thuần trang trí.

**8 chỗ của bản quản trị** đáng chú ý: nút "Đặt mặc định" chỉ đạt 1.62:1 (dùng
`text-outline-variant` trên nền trắng), các tay cầm kéo thả ~1.6:1, và nút sửa mỗi dòng ra
đúng 1.0:1 vì bị `opacity-0` che tới khi rê chuột. Cần sửa ở bản quản trị trước khi convert.

## Vì sao bỏ bản chỉ xem do Stitch sinh

Nó **không phải** bản chỉ xem của màn quản trị. Nó là một màn khác hẳn, tự bịa nội dung:

| | Bản quản trị | Bản "chỉ xem" |
|---|---|---|
| Trạng thái đích | có | **mất** |
| Giá trị trường bắt buộc | có | **mất** |
| Danh sách mẫu của dự án | có | **mất** |
| Thông tin chung (tên, key, mô tả) | không | tự thêm |
| Loại issue được hỗ trợ | không | tự thêm |
| Luật tự động hoá | không | **tự thêm — xem dưới** |
| Phân quyền | không | tự thêm |
| Tên dự án | "Hỗ trợ nội bộ" | "IT Support Services" |

**Cả ba phần mà FR-05 bắt buộc đều biến mất.** Thay vào đó là bốn khối không ai yêu cầu.

### Nghiêm trọng: ràng buộc âm bị phá ở đúng màn này

Khối "Luật Tự động hoá" trong bản chỉ xem có hai công tắc cấp dự án, trong đó
**"Đóng issue Inactive — sau 14 ngày không tương tác"** chính là một luật tự động đóng
issue đặt ở cấp dự án — đúng thứ brief cấm tuyệt đối, và đúng mô hình đã bị bác bỏ khi
chuyển auto-Done từ cấp dự án xuống cấp mẫu (A-05).

Ràng buộc âm giữ được ở màn chính nhưng **vỡ ở màn biến thể**.

### Lỗi phụ

- **Tiếng Anh lọt vào**: tên dự án đổi thành "IT Support Services", còn "Nguyen Van A" mất
  hết dấu.
- **Nút "Tạo mẫu mới" hiện hai lần** (thanh trên và đáy thanh bên) trên một màn **chỉ
  xem** — mà đó lại là hành động chỉ quản trị mới được làm (FR-11).

## Bài học: đừng xin biến thể trong cùng một prompt

Đây là **lần thứ ba** cùng một kiểu hỏng:

| Lần | Xin gì thêm trong cùng prompt | Kết quả |
|---|---|---|
| S1 | bản giao diện tối | Lệch cột, thừa ô tìm kiếm, thiếu bảng issue gần đây |
| S5a | — | (ba màn đều dùng được, vì là ba **trạng thái** khác nhau chứ không phải biến thể của cùng một màn) |
| S5b | bản chỉ xem | Mất cả ba phần bắt buộc, tự bịa bốn khối mới, phá ràng buộc âm |

Quy luật rút ra: xin thêm **trạng thái khác** của màn (rỗng, đang tải, đang đồng bộ) thì
Stitch làm tốt — đó là những màn nội dung vốn dĩ khác nhau. Nhưng xin **biến thể của cùng
một màn** (tối/sáng, chỉ xem/sửa được) thì nó sinh lại từ đầu và lệch nội dung, vì không
có gì buộc hai lượt sinh phải khớp nhau.

Cách đúng cho biến thể: lấy màn gốc rồi **tự dẫn xuất** — như bản tối của S1 dựng bằng
token — hoặc dùng `edit_screens` trên chính màn đó thay vì mô tả trong prompt gốc.

## Khung app vẫn chưa nhất quán

Hai màn này thêm hai kiểu nữa vào bộ sưu tập: bản quản trị có ô tìm kiếm + breadcrumb, bản
chỉ xem có "Tạo mẫu mới" ở cả hai chỗ. Tổng cộng **6 màn, 6 kiểu khung**. Xem bảng đối
chiếu ở [ghi chú S5a](../s5a-cau-hinh-danh-sach-du-an/ghi-chu.md).

Một chi tiết nhỏ nhưng cần chốt: tiêu đề cột ở màn này **không** viết hoa toàn bộ, còn ở
S5a thì có. Hai màn cùng một hệ thống đang làm hai kiểu.

## Việc tiếp

Bản quản trị dùng được luôn. Bản chỉ xem nên dựng lại bằng cách lấy `quan-tri.html` rồi
khoá các ô nhập và bỏ nút lưu — giữ nguyên cấu trúc, đúng cách đã làm với bản tối của S1.

Stitch tự đề xuất: popup xác nhận khi lưu, màn Lịch sử issue có bộ lọc, hiệu ứng kéo thả.
Đề xuất thứ ba trái với brief — "không animation trang trí".
