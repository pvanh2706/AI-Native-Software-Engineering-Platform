# Chữ trên giao diện — tiếng Việt

Chữ là phần giao diện AI sai nhiều nhất mà không có chuẩn nào bắt được. File này là chuẩn đó.

---

## Nguyên tắc

### `COPY-01` — Viết cho người đang làm việc, không viết cho người đang đọc
Người dùng đang giữa một tác vụ. Câu ngắn, động từ trước, bỏ chữ thừa.
> ❌ "Vui lòng nhấn vào nút bên dưới để tiến hành tạo mới một issue"
> ✅ "Tạo issue"

### `COPY-02` — Bỏ "Vui lòng"
Nó không làm câu lịch sự hơn, chỉ làm câu dài hơn. Giữ lại đúng một chỗ: khi hệ thống bắt người dùng làm thêm việc vì lỗi của hệ thống.

### `COPY-03` — Không dịch nửa vời thuật ngữ đã quen
Thuật ngữ người dùng gặp hằng ngày trong công cụ gốc thì **giữ nguyên**: `issue`, `sprint`, `commit`, `deploy`, `token`, `workflow`, `transition`.
Dịch được và nên dịch: `template` → mẫu, `settings` → cấu hình, `history` → lịch sử, `permission` → quyền, `status` → trạng thái.
> Nguyên tắc: nếu người dùng gõ từ đó khi nói chuyện với đồng nghiệp thì giữ nguyên.

### `COPY-04` — Nhất quán một thuật ngữ cho một khái niệm
Đã gọi "mẫu" thì không chỗ nào gọi "template", "biểu mẫu", "khuôn". Lập danh sách thuật ngữ trong `PROJECT.md` và bám theo.

### `COPY-05` — Xưng hô: gọi người dùng là "bạn", hệ thống không tự xưng
> ✅ "Token của bạn không đủ quyền đóng issue"
> ❌ "Chúng tôi không thể thực hiện thao tác này"

---

## Nút

### `COPY-06` — Nút là động từ + tân ngữ
"Lưu mẫu", "Tạo issue", "Thu hồi token" — không phải "OK", "Xác nhận", "Gửi".
Người dùng trình đọc màn hình nghe nút tách khỏi ngữ cảnh (`A11Y-09`).

### `COPY-07` — Nút huỷ nói rõ huỷ cái gì khi hậu quả lớn
Hộp thoại thường: "Huỷ" là đủ. Hộp thoại có thể mất dữ liệu: "Thoát, không lưu".

### `COPY-08` — Không dùng "Có/Không" cho hành động
> ❌ "Bạn có chắc muốn xoá?" → [Có] [Không]
> ✅ "Xoá mẫu «Ghi nhận hỗ trợ»?" → [Xoá mẫu] [Giữ lại]

---

## Thông báo lỗi

### `COPY-09` — Ba vế: chuyện gì · ảnh hưởng gì · làm gì tiếp
Thiếu vế ba → `AP-16`.
> ✅ "Issue đã tạo nhưng chưa đóng được. Đang dừng ở *In Progress*. Token của bạn không đủ quyền thực hiện bước này — nhờ quản trị dự án cấp quyền, hoặc bấm Thử lại sau khi được cấp."

### `COPY-10` — Không đổ lỗi cho người dùng
> ❌ "Bạn đã nhập sai định dạng ngày"
> ✅ "Ngày cần theo định dạng dd/mm/yyyy"

### `COPY-11` — Giữ nguyên văn lỗi hệ thống, kèm diễn giải
Lỗi từ Jira/API: hiện nguyên văn để tra cứu được, **cộng** một câu tiếng Việt giải thích. Không thay cái này bằng cái kia (`STATE-03`).

---

## Trạng thái rỗng

### `COPY-12` — Nói vì sao rỗng và làm gì tiếp
> ❌ "Không có dữ liệu"
> ✅ "Chưa có mẫu nào cho dự án này. Tạo mẫu đầu tiên để cả nhóm dùng chung." + nút

### `COPY-13` — Phân biệt rõ ba loại rỗng
"Chưa có mẫu nào" ≠ "Không có mẫu khớp bộ lọc" ≠ "Tất cả mẫu đã lưu trữ" (`STATE-01`).

---

## Chi tiết tiếng Việt

### `COPY-14` — Dấu câu
Không chấm cuối nhãn và cuối nút. Có chấm cuối câu trong đoạn mô tả và thông báo lỗi. Chấm than dùng tối đa một lần mỗi màn, hoặc không dùng.

### `COPY-15` — Viết hoa chỉ chữ đầu câu và danh từ riêng
Không viết hoa kiểu tiếng Anh ("Tạo Mẫu Mới"). Không viết hoa toàn bộ quá 3 từ (`VIS-04`).

### `COPY-16` — Số và đơn vị
Ngày `dd/mm/yyyy`. Giờ 24h `HH:mm`. Phân cách nghìn bằng dấu chấm (`1.234`), thập phân bằng dấu phẩy (`1.234,5`). Đơn vị cách số một khoảng: `5 mẫu`, `24 px`.

### `COPY-17` — Không dùng dấu ba chấm để tiết kiệm chỗ
"Đang tải" thay vì "Đang tải...". Ba chấm trên nút chỉ có một nghĩa quy ước: **mở hộp thoại hỏi thêm** ("Xuất dữ liệu…").

### `COPY-18` — Ngoặc kép tiếng Việt cho tên do người dùng đặt
Dùng « » hoặc " " nhất quán. Tên mẫu, tên dự án, tên file đều là dữ liệu người dùng — bọc lại để phân biệt với chữ giao diện.

---

## Cấm

| Cấm | Thay bằng |
|---|---|
| "Vui lòng thử lại sau" (không có gì khác) | Nói vì sao và khi nào thử lại được |
| "Đã xảy ra lỗi" | Nói lỗi gì |
| "Thành công!" đứng một mình | Nói cái gì thành công + kết quả (mã issue, tên bản ghi) |
| Chữ hài hước trong thông báo lỗi | Người đang gặp lỗi không thấy vui |
| "Click vào đây" | Đặt link lên chính cụm từ mang nghĩa |
| Viết tắt không giải thích lần đầu | Viết đủ lần đầu, kèm viết tắt trong ngoặc |
