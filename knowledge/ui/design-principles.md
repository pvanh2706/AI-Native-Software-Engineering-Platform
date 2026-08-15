# Nguyên tắc thiết kế nền

Bảy nguyên tắc, cộng một quy tắc phân xử. Phần quan trọng nhất là **`PRIN-08` — thứ tự thắng khi xung đột**: đó là thứ biến nguyên tắc từ khẩu hiệu thành công cụ quyết định.

---

### `PRIN-01` — Màn hình phục vụ một việc

Mỗi màn hình có **đúng một** việc chính. Việc chính phải nhận ra được trong **3 giây** mà không cần đọc hết chữ.

*Kiểm:* chỉ ra được đúng một hành động/vùng nổi bật nhất. Hai thứ cùng nổi = không có thứ nào nổi.
*Ngoại lệ:* trang tổng quan (dashboard) — nhưng khi đó "xem tổng quan" chính là việc duy nhất, và mọi ô đều là đọc, không phải làm.

### `PRIN-02` — Mật độ là tính năng, không phải khuyết điểm

Công cụ dùng nhiều lần mỗi ngày thì **thấy nhiều hơn trên một màn** có giá trị hơn thoáng đãng. Cuộn là chi phí; khoảng trắng không mang thông tin là lãng phí diện tích.

*Kiểm:* vùng nội dung chính chiếm **≥ 60%** chiều cao khung nhìn ở 1440×900. Dưới mức đó là màn hình rỗng — xem `AP-04`.
*Ngoại lệ:* trạng thái rỗng và màn xác nhận, cố tình thoáng.

### `PRIN-03` — Thứ bậc bằng vị trí và kích thước trước, bằng màu sau

Mắt đọc theo vị trí và kích thước trước khi đọc màu. Dùng màu để tạo thứ bậc là cách rẻ tiền và hỏng ngay khi đổi theme hoặc gặp người mù màu.

*Kiểm:* chụp ảnh **grayscale**, thứ bậc vẫn phải đọc được.
*Hệ quả:* `A11Y-05` — màu không bao giờ là tín hiệu duy nhất.

### `PRIN-04` — Nhất quán thắng tối ưu cục bộ

Cùng một loại việc phải trình bày cùng một kiểu ở mọi màn. Một màn "đẹp hơn" nhưng lệch khỏi phần còn lại làm chậm toàn hệ thống, vì người dùng phải học lại.

*Kiểm:* cùng khái niệm → cùng component, cùng vị trí, cùng chữ. Vi phạm điển hình: `AP-03` (hai kiểu dropdown trong một màn).

### `PRIN-05` — Trạng thái không phải phần phụ

Rỗng, đang tải, lỗi, không quyền, hỏng nửa chừng là **một phần của thiết kế**, không phải việc dọn sau. Thiết kế chỉ có happy path là thiết kế chưa xong.

*Kiểm:* mọi pattern khai `requiredStates` và spec phải có đủ (`PAT-01`).

### `PRIN-06` — Không bắt người dùng đoán

Thứ bấm được phải **trông** bấm được. Thứ đọc được phải trông không bấm được. Thứ khoá phải nói rõ vì sao khoá và ai mở được.

*Kiểm:* mỗi phần tử tương tác có tín hiệu thị giác riêng (viền, mũi tên, con trỏ, lớp phủ hover). Vi phạm điển hình: `AP-03`, `AP-08`.

### `PRIN-07` — Trang trí phải trả tiền chỗ nó chiếm

Mọi hiệu ứng — bóng, gradient, animation, thẻ lồng thẻ — phải giải thích được nó giúp hiểu gì. Không giải thích được thì bỏ.

*Kiểm:* với mỗi hiệu ứng, trả lời "nó truyền đạt thông tin gì?". Không trả lời được → `AP-06`.

---

## `PRIN-08` — Thứ tự thắng khi xung đột

Nguyên tắc sẽ va nhau. Khi đó áp theo thứ tự này, **trên thắng dưới**:

```
1. Khả năng tiếp cận (A11Y)        — không thương lượng, kể cả khi xấu đi
2. Tính đúng đắn dữ liệu           — thà xấu còn hơn để người dùng hiểu sai số liệu
3. Hiệu quả tác vụ chính            — ít bước hơn thắng đẹp hơn
4. Nhất quán với phần đã có         — thắng "cách mới hay hơn"
5. Mật độ thông tin                 — thắng khoảng trắng
6. Thẩm mỹ
```

Ví dụ áp dụng thật:

| Xung đột | Thắng | Vì |
|---|---|---|
| Chữ xám nhạt đẹp hơn nhưng tương phản 3.8:1 | Chữ đậm hơn | 1 > 6 |
| Bảng compact khó đọc số tiền | Giãn dòng cho cột tiền | 2 > 5 |
| Thêm bước xác nhận cho thao tác thường xuyên | Bỏ bước xác nhận, thay bằng hoàn tác | 3 > tâm lý an toàn |
| Màn mới muốn dùng bố cục khác cho gọn | Theo bố cục cũ | 4 > 6 |
| Thêm khoảng trắng cho thoáng, phải cuộn thêm | Giữ compact | 5 > 6 |

**Judge phải nêu rõ đã áp bậc nào** khi trừ điểm ở một tiêu chí mà tiêu chí khác lại tốt lên.
