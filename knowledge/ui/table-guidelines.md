# Bảng dữ liệu

Bảng là màn hình được mở nhiều nhất trong công cụ nội bộ. Mặc định mật độ **compact** (`LAY-11`).

---

## Cột

### `TBL-01` — Căn theo loại dữ liệu
| Loại | Căn | Ghi chú |
|---|---|---|
| Chữ, tên, mô tả | Trái | |
| Số so sánh được (số lượng, tiền, %) | **Phải** | Chữ số đều bề rộng (`VIS-07`). Vi phạm → `AP-14` |
| Ngày giờ | Trái nếu để đọc, phải nếu để so thứ tự | Nhất quán trong cùng bảng |
| Trạng thái, nhãn | Trái | |
| Hành động | Phải, cột cuối | `LAY-10` |

### `TBL-02` — Cột quan trọng nhất đứng thứ hai
Cột đầu là cột định danh (mã, tên). Cột thứ hai là thứ người dùng thực sự đến để xem. Đừng để nó ở cuối, khuất sau cuộn ngang.

### `TBL-03` — Tối đa 7 cột nhìn thấy mặc định
Nhiều hơn thì cho ẩn/hiện cột, hoặc tách sang trang chi tiết. Bảng 15 cột là dấu hiệu chưa quyết được người dùng cần gì.

### `TBL-04` — Nhãn cột nói nội dung, không nói tên trường database
`Người tạo` chứ không phải `created_by`.

---

## Hàng

### `TBL-05` — Không animation trên hàng
Danh sách 50 hàng có animation vào là 50 chuyển động cho một lần mở màn. `AP-10`.

### `TBL-06` — Hàng bấm được thì phải trông bấm được
Nếu cả hàng là link tới chi tiết: có tín hiệu hover, con trỏ pointer, và cột định danh trông như link. `PRIN-06`.

### `TBL-07` — Kẻ ngang, không kẻ dọc
Đường kẻ ngang mảnh (`outline-variant`) đủ để mắt bám hàng. Kẻ dọc đầy đủ biến bảng thành lưới ô, đọc chậm hơn.
Ngoại lệ: bảng nhiều cột số cần đối chiếu theo cột.

### `TBL-08` — Không tô sọc xen kẽ nếu đã kẻ ngang
Chọn một. Dùng cả hai là hai hệ thống phân tách chồng lên nhau.

---

## Hành động

### `TBL-09` — Hành động chính của hàng phải nhìn thấy được
Không giấu hành động thường dùng trong menu `…` (`AP-17`). Menu tràn chỉ dành cho hành động hiếm.

### `TBL-10` — Hành động có nhãn chữ
Cột hành động chỉ có icon buộc người dùng đoán, nhất là khi có 2 icon trở lên.

### `TBL-11` — Hành động nguy hiểm cần xác nhận hoặc hoàn tác, chọn một
Thao tác **hoàn tác được** thì làm ngay + cho hoàn tác — nhanh hơn nhiều so với hỏi mỗi lần.
Thao tác **không hoàn tác được** thì bắt buộc xác nhận, và hộp xác nhận phải nói rõ **cái gì sẽ mất**.

---

## Lọc, sắp xếp, phân trang

### `TBL-12` — Bộ lọc đang bật phải nhìn thấy được
Không giấu trong panel đóng. Người dùng phải biết mình đang xem tập con — nếu không họ kết luận sai về dữ liệu.

### `TBL-13` — Phân biệt "chưa có dữ liệu" với "lọc không ra"
Hai trạng thái rỗng khác nhau, hai thông điệp khác nhau (`STATE-01`).

### `TBL-14` — Phân trang cho dữ liệu cần đối chiếu, cuộn vô hạn cho dữ liệu duyệt
Công cụ nội bộ hầu như luôn thuộc loại đầu: người dùng cần biết "còn bao nhiêu" và quay lại đúng chỗ cũ.

### `TBL-15` — Hiện tổng số bản ghi
"Hiển thị 1–25 trong 342". Người dùng cần biết quy mô để quyết định lọc tiếp hay không.

---

## Bảng rộng

### `TBL-16` — Cuộn ngang trong khối riêng, không cuộn cả trang
Trang không bao giờ được cuộn ngang (`RES-02`). Bảng rộng cuộn trong container của nó.

### `TBL-17` — Cột định danh dính bên trái khi cuộn ngang
Không có nó thì cuộn sang phải là mất ngữ cảnh hàng.

### `TBL-18` — Bảng rộng được vượt `content-max`
Bó bảng vào chiều rộng biểu mẫu là ép sai nhu cầu (`LAY-02`).
