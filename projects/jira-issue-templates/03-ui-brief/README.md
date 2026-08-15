# UI Brief — bản tóm tắt chức năng để đưa cho công cụ thiết kế

Mắt xích giữa `RequirementSet` và công cụ thiết kế bên ngoài (Stitch). Stitch không đọc được yêu cầu có cấu trúc — nó cần một prompt mô tả **màn hình này để làm gì, hiển thị dữ liệu gì, có hành động nào**.

```text
RequirementSet ──► UI Brief ──► Stitch ──► bản thiết kế ──► convert sang Vue ──► UI Eval
                   (ở đây)      (ngoài)                     (dùng bộ component)
```

> **Bước này nay là một skill:** [make-ui-brief](../../../.claude/skills/make-ui-brief/SKILL.md).
> Sáu brief dưới đây viết tay trước khi có nó — luật rút ra từ chúng đã nằm trong skill.
> Viết brief mới thì gọi skill, đừng chép file cũ: skill có thêm **Vòng 0** (ghim màu) và
> **bước chuẩn hoá 4 bước** mà các file này chưa có.

## Nguyên tắc: đặc tả CHẶT nội dung, THẢ hoàn toàn hình thức

Đây là điểm dễ sai nhất. Ta chọn "Stitch tự do sáng tạo" chính vì cần gu thẩm mỹ mà ta không có — nên **không mô tả màu, bo góc, phong cách, bố cục cụ thể**. Bó lại là mất phần giá trị nhất.

| Đặc tả CHẶT — Stitch không được tự nghĩ | THẢ — Stitch tự quyết |
|---|---|
| Màn hình này phục vụ việc gì | Màu sắc, bảng màu |
| Dữ liệu hiển thị: từng trường, kèm **giá trị mẫu tiếng Việt thật** | Bố cục, thứ tự khối |
| Hành động: chính / phụ / theo hàng | Kiểu chữ, cỡ chữ |
| Nền tảng, ngôn ngữ, mật độ | Bo góc, đổ bóng, icon |
| Component nào được dùng | Cách trình bày từng thành phần |
| Danh sách anti-pattern (thứ **không** được làm) | |

## Vì sao phải có giá trị mẫu tiếng Việt thật

Công cụ thiết kế mặc định dùng nội dung lý tưởng: tên ngắn, tiếng Anh, độ dài đều nhau. Giao diện trông đẹp cho tới khi gặp dữ liệu thật.

Brief **bắt buộc** kèm:
- Tên dài nhất có thể gặp — để thấy chỗ tràn
- Chữ có dấu chồng hai tầng (ề, ộ, ữ) — dấu bị cắt khi dòng quá chật
- Số lượng bản ghi điển hình **và** tối đa

## Vì sao phải liệt kê anti-pattern

Công cụ thiết kế AI được huấn luyện nhiều trên giao diện marketing: gradient, hero lớn, thẻ nổi khắp nơi, animation. Với công cụ nội bộ mở vài chục lần mỗi ngày, đó là những thứ làm giao diện **tệ đi**.

Danh sách rút gọn từ [knowledge/ui/anti-patterns.md](../../../knowledge/ui/anti-patterns.md), đưa thẳng vào prompt.

## Cấu trúc một brief

Mỗi file gồm hai phần:

1. **Khối dán vào Stitch** — đặt trong code fence, copy nguyên
2. **Ghi chú cho ta** — không dán: map về FR nào, nhận bản thiết kế về thì kiểm gì

## Danh sách brief

| Màn hình | File | Trạng thái |
|---|---|---|
| S1 — Danh sách mẫu issue | [s1-danh-sach-mau.md](s1-danh-sach-mau.md) | ✅ đã chạy, đã nhận bản thiết kế |
| S2 — Tạo issue từ mẫu | [s2-tao-issue-tu-mau.md](s2-tao-issue-tu-mau.md) | ✅ đã chạy — 4 màn, 1 màn phải tự dẫn xuất |
| S3 — Lịch sử issue | [s3-lich-su-issue.md](s3-lich-su-issue.md) | ✅ đã chạy — 2 màn, đã convert |
| S7 — Token Jira của tôi | ⛔ **chưa viết** | Phủ **FR-01 (Must)**. Có trong prototype v7 (màn S7) nhưng chưa qua đường ống thiết kế — xem §dưới |
| S4 — Soạn/sửa mẫu | [s4-soan-sua-mau.md](s4-soan-sua-mau.md) | ✅ đã chạy — 3 màn, đã convert |
| S5a — Cấu hình: danh sách dự án | [s5a-cau-hinh-danh-sach-du-an.md](s5a-cau-hinh-danh-sach-du-an.md) | ✅ đã chạy — 3 màn, dùng được |
| S5b — Cấu hình: chi tiết dự án | [s5b-cau-hinh-chi-tiet-du-an.md](s5b-cau-hinh-chi-tiet-du-an.md) | ✅ đã chạy — bản quản trị từ Stitch, bản chỉ xem ta tự dẫn xuất |

> Làm **một màn trước** rồi hãy viết tiếp. Vòng đầu sẽ lộ ra brief thiếu gì — sửa mẫu brief rồi mới nhân bản, không viết cả bộ rồi sửa cả bộ.

### Còn đúng một màn chưa qua đường ống: S7 — Token Jira của tôi

Đối chiếu 9 màn của [prototype v7](../02-prototype/README.md) với 6 brief ở trên thì khớp
hết, trừ một chỗ:

| Màn prototype | Đi về đâu trong đường ống thiết kế |
|---|---|
| S3 · S3b — kết quả tạo | gộp vào **S2** (hộp thoại tạo thành công / chuyển trạng thái lỗi) |
| S6 — lịch sử issue | thành **S3** |
| S8 — nhân bản mẫu | gộp vào **S4** (`nhan-ban.html`) |
| **S7 — Token Jira của tôi** | ⛔ **chưa có brief, chưa có thiết kế, chưa convert** |

FR-01 là **Must**, và mục *Thông tin tài khoản* ở đáy thanh bên hiện là **link chết** —
đó chính là chỗ của màn này. Cần đủ các trạng thái mà tiêu chí FR-01 đòi: chưa khai PAT
(chặn mọi màn cần Jira rồi dẫn về đây), đã khai (che `••••1234`), *Kiểm tra kết nối* trả
về tên tài khoản Jira, thu hồi, và **ba loại lỗi phân biệt được** (401 · 403 · timeout/5xx).
Kèm phần cấp hệ thống: base URL của Jira DC.

## Luật quan trọng nhất: đừng xin BIẾN THỂ trong cùng một prompt

Ba vòng, ba lần cùng một kiểu hỏng — đủ để coi là luật, không phải xui.

| Xin thêm gì trong cùng prompt | Kết quả |
|---|---|
| S1: bản giao diện tối | Lệch cột, thừa ô tìm kiếm, thiếu bảng *Issue gần đây* |
| S5b: bản chỉ xem | Mất cả ba phần FR-05 bắt buộc, tự bịa bốn khối mới, **phá cả ràng buộc âm** |

Nhưng xin thêm **trạng thái** thì lại tốt — S5a xin ba trạng thái (danh sách, chưa kết
nối, đang đồng bộ), cả ba đều dùng được.

Ranh giới thật — vòng S2 làm rõ thêm: vấn đề không nằm ở *trạng thái hay biến thể*, mà ở
chỗ **màn xin thêm có phải chép lại nội dung của màn khác hay không**.

| Màn xin thêm | Kết quả |
|---|---|
| Hộp thoại độc lập, nội dung riêng (rỗng, đang tải, tạo xong) | ✅ tốt |
| Phải vẽ lại toàn bộ màn chính (tạo thất bại, chỉ xem, bản tối) | ❌ Stitch dựng lại từ đầu và lệch hết |

Hễ một màn buộc phải chép lại nội dung của màn khác thì Stitch sẽ chép sai.

Cách đúng cho biến thể: lấy màn gốc rồi **tự dẫn xuất** — như bản tối của S1 dựng bằng
token — hoặc dùng `edit_screens` trên chính màn đó.

## Ba điều vòng S1 dạy lại

Ghi ở đây để brief sau khỏi vấp lại. Chi tiết ở [ghi chú bản thiết kế S1](../04-design/s1-danh-sach-mau/ghi-chu.md).

1. **Đừng xin giao diện tối.** S1 ghi "thiết kế cả sáng và tối"; Stitch trả về một màn tối **lệch hẳn nội dung** so với màn sáng — khác cột, thừa ô tìm kiếm, thiếu cột thao tác. Hai lượt sinh độc lập thì không có gì buộc chúng khớp nhau. Nay chỉ xin bản sáng, bản tối ta tự dựng bằng token: markup dùng chung nên không bao giờ lệch.

2. **Cấm `opacity` ngay trong phần dán.** Brief S1 có nhắc `AP-11` ở phần *kiểm*, nhưng quên cấm ở phần *dán* — Stitch dùng `opacity-60` cho dòng Nháp, tương phản rơi xuống 2.24:1. Thứ chỉ ghi ở ghi chú cho ta thì Stitch không đọc được.

3. **Ràng buộc âm phải nói thẳng.** Chỗ nào yêu cầu đã **đổi khác nguyên văn ban đầu** thì công cụ thiết kế sẽ tự khôi phục về mô hình quen thuộc. Phải cấm tường minh — xem khối "ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY" trong [S5b](s5b-cau-hinh-chi-tiet-du-an.md).
