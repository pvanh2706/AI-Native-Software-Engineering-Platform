# S4 — Soạn / sửa mẫu · ghi chú bản thiết kế

> Đã chuẩn hoá theo [QUYET-DINH.md](../QUYET-DINH.md) ngay khi nhận.
> Bản Stitch gốc ở [goc-stitch/](../goc-stitch/). **Chưa convert sang Vue.**

Sinh bằng `generate_screen_from_text` ngày 11/08/2026, prompt lấy nguyên khối dán từ
[brief S4](../../03-ui-brief/s4-soan-sua-mau.md). Session `17798741992043552391`.

| File | Màn |
|---|---|
| `form.html` · `form.png` | Soạn/sửa mẫu — màn chính |
| `nhan-ban.html` · `.png` | Hộp thoại nhân bản sang dự án khác |
| `ngung-dung.html` · `.png` | Hộp thoại ngừng dùng mẫu |

## Đối chiếu 10 điểm kiểm

| # | Điểm kiểm | Kết quả |
|---|---|---|
| 1 | Bốn thứ trên mỗi dòng trường (tên · kiểu · giá trị · quyền) | ✅ Ba cột, đọc được cùng lúc, không phải mở từng dòng |
| 2 | Trường khoá thể hiện bằng gì | ✅ Biểu tượng ổ khoá, **không** dùng `opacity` |
| 3 | Tên trường dài | ❌ **Viết cụt** thành "Thời gian đã bỏ ra" — đã trả lại |
| 4 | Ô mô tả là wiki markup | ✅ Ghi rõ "Textarea (Wiki)", chữ monospace |
| 5 | Hộp thoại nhân bản liệt kê rõ từng thứ hỏng | ✅ Nêu đúng hai chỗ, không chỉ đếm số |
| 6 | Hộp thoại ngừng dùng phân biệt với xoá | ✅ Nói rõ lịch sử vẫn tra được |
| 7 | **Có công tắc auto-Done không** | ✅ **Có** — đúng FR-07, đối xứng với ràng buộc âm của S5b |
| 8 | Khối tài khoản trong khung nhìn | ✅ |
| 9 | App shell theo QĐ1 | ❌ Vẫn mọc nút "Tạo mẫu mới" ở thanh bên |
| 10 | Vi phạm "không được làm" | ❌ 6 hex tuỳ ý, xem dưới |

**Điểm 7 là thắng lợi của cách viết brief.** S5b cấm tuyệt đối công tắc auto-Done, S4 bắt
buộc phải có — và Stitch làm đúng cả hai. Ràng buộc âm ở màn này, ràng buộc dương ở màn kia,
cùng một bộ yêu cầu.

## Đã sửa khi chuẩn hoá

| Việc | Chi tiết |
|---|---|
| `QĐ1` | Gỡ nút "Tạo mẫu mới" khỏi thanh bên ở **cả 3 màn** |
| `QĐ6` | **6 hex tuỳ ý** → vai trò ngữ nghĩa (`#E3FCEF`, `#006644`, `#EBECF0`, `#F4F5F7`, `#a41717`, `#091E42`) |
| `QĐ6` | Stitch **tự bịa bộ token riêng** `status-success-bg` / `status-warning-text` → thay bằng vai trò của design system org |
| Dữ liệu | Trả lại tên trường bị viết cụt |
| Tương phản | 5 chỗ không đạt → **0** ở cả 3 màn |

**Tên trường bị viết cụt là lần thứ ba** Stitch tự sửa dữ liệu trong markup — sau tên dự án
ở S5a và tên trường ở S2. Đủ để coi là hành vi cố hữu: **luôn phải đối chiếu chuỗi dài giữa
brief và markup**, đừng tin vào ảnh.

**Nút thanh bên là lần thứ hai** Stitch tự thêm dù prompt đã liệt kê đủ thành phần thanh bên
và ghi rõ "đừng thêm bớt". Nói *không được có gì* thì nó nghe; thứ nó cho là hiển nhiên phải
có thì vẫn tự thêm. Lần sau nên cấm tường minh như cách làm với ràng buộc âm.

## Ca cố ý không xin — và vì sao

Ca **tên mẫu trùng** (FR-03 tiêu chí 4) không có trong brief. Nó là lỗi hiện ngay trên form,
tức màn phải vẽ lại toàn bộ form — đúng loại Stitch làm hỏng ở S2 (bản "tạo thất bại" ra một
form khác hẳn). Sẽ hiện thực thẳng bằng hành vi lúc convert.

## Việc tiếp

**Chưa convert sang Vue.** Registry hiện đã có gần đủ: `Input`, `Textarea`, `Select`,
`TagsInput`, `Switch`, `Table`, `Card`, `Notice`, `Dialog`, `Badge`. Nhiều khả năng còn thiếu
một component cho **ô khai giá trị theo kiểu field** — mười dòng, mỗi dòng một kiểu ô khác
nhau. Đó là ứng viên rõ nhất cho một `FieldValueInput` dùng chung.
