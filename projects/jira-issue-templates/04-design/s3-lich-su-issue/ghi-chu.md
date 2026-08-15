# S3 — Lịch sử issue · ghi chú bản thiết kế

> Đã chuẩn hoá theo [QUYET-DINH.md](../QUYET-DINH.md). Bản Stitch gốc ở
> [goc-stitch/](../goc-stitch/). **Đã convert sang Vue** — kết quả ở
> [convert-ghi-chu.md](convert-ghi-chu.md).

Sinh ngày 11/08/2026 từ [brief S3](../../03-ui-brief/s3-lich-su-issue.md).

| File | Màn |
|---|---|
| `danh-sach.html` · `.png` | Bảng lịch sử + ba bộ lọc |
| `khong-khop.html` · `.png` | Bộ lọc không khớp dòng nào |

## Hai điều lần đầu Stitch làm đúng

**1. Ràng buộc âm giữ được ngay lần đầu.** Không có ô JQL, không nút sửa issue, không bình
luận — đúng FR-09 tiêu chí 4. Đây là màn dễ sai nhất về khoản này vì mọi bảng issue công cụ
từng thấy đều có tìm kiếm nâng cao. Cách viết — cấm tường minh thành một khối riêng trong
phần dán — đã ăn ở cả S5b, S4 và giờ S3.

**2. Tên mẫu dài KHÔNG bị viết cụt.** Ba vòng trước (S5a tên dự án, S2 và S4 tên trường)
Stitch đều tự rút gọn chuỗi ngay trong markup. Lần này giữ nguyên
*"Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8"*. Chưa đủ để kết luận
đã hết — vẫn phải đối chiếu mỗi lần.

**Bốn kết quả phân biệt được** đúng như brief đòi: *Thành công + Xong* · *Thành công + Không
bật* (in nghiêng, không phải lỗi) · *Thành công + Thất bại* (nêu lý do) · *Lỗi* (dòng nền đỏ,
cột mã issue để "(Trống)" vì chưa có issue nào trên Jira).

## Đã sửa khi chuẩn hoá

| Việc | Chi tiết |
|---|---|
| `QĐ1` | Gỡ nút ở thanh bên ở cả 2 màn |
| `QĐ3` | **4 biểu tượng "mở trên Jira" bị `opacity-0` tới khi rê chuột** — đo ra đúng 1.0:1 |
| `QĐ2` | Bỏ `uppercase` ở 8 tiêu đề cột (có cụm 4 từ: "Kết quả đóng tự động") |
| `QĐ6` | 1 hex tuỳ ý → token `scrim` |
| Tương phản | 6 chỗ không đạt → **0** ở cả 2 màn |
| Bố cục | Bảng bị **cắt mất cột cuối** — cho cuộn ngang, đúng lỗi `RES-01b` đã gặp ở S5b |

`opacity-0 group-hover` quay lại dù brief đã cấm — lần thứ hai sau S5a/S5b. Lần này nó dùng
biến thể `group-hover/link:` nên regex chuẩn hoá cũ trượt, phải sửa tay. Đáng đưa vào
[`quet-nguon.mjs`](../../../../tools/ui-eval/quet-nguon.mjs) dưới dạng khớp lỏng hơn.

## Việc còn lại — đã xong

**Đã convert sang Vue.** Đúng như dự đoán: registry đủ dùng, **không thêm component mới
nào**, và `CMP-01` ra **92.7%** — cao hơn S1 và S2. Chi tiết ở
[convert-ghi-chu.md](convert-ghi-chu.md).

**Date picker: đã chốt KHÔNG làm, dùng hai ô `input[type=date]`.** Nhưng lý do hoãn ghi ở
đây và ở ghi chú convert S2 (*"chỉ được một trường trên một màn"*, *"hình thức theo hệ điều
hành"*) hoá ra **chưa phải lý do quan trọng nhất**: Chrome vẽ ô ngày theo locale của trình
duyệt chứ không theo `lang` của trang, nên máy đặt en-US đọc ngược ngày. Đã bù bằng cách
nhắc lại khoảng ngày theo `dd/mm/yyyy` trong caption bảng — xem
[convert-ghi-chu.md §input[type=date]](convert-ghi-chu.md).
