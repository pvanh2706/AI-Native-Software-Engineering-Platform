# Biểu mẫu

Biểu mẫu là nơi công cụ nội bộ sống hoặc chết. Người dùng điền nó vài chục lần mỗi ngày.

---

## Nhãn

### `FORM-01` — Nhãn phải là `<label for>` thật
Không dùng `<span>`/`<div>` đặt tuyệt đối làm nhãn. Bấm nhãn phải focus vào ô.
*Vi phạm:* `AP-12`. **Lớp 1 kiểm được — để máy bắt.**

### `FORM-02` — Nhãn ở trên ô, căn trái
Không dùng nhãn nằm trong ô (placeholder-as-label): nhãn biến mất ngay khi bắt đầu gõ, và người dùng mất ngữ cảnh lúc soát lại.
Placeholder chỉ dùng cho **ví dụ định dạng** (`VD: PROJ-123`), không bao giờ thay nhãn.

### `FORM-03` — Đánh dấu trường bắt buộc, không đánh dấu trường tùy chọn
Dấu `*` cho bắt buộc. Nếu **đa số** trường là tùy chọn thì đảo lại và ghi rõ ở đầu biểu mẫu.

---

## Điều khiển

### `FORM-04` — Điều khiển phải trông đúng loại của nó
Dropdown **phải có mũi tên**. Ô nhập text có viền và con trỏ text. Nút bấm có nền hoặc viền.
Đây là `PRIN-06`. Vi phạm → `AP-03`.
> Cụ thể: đặt `appearance: none` lên `<select>` thì **bắt buộc** vẽ lại mũi tên. Bỏ qua bước này là lỗi nghiêm trọng nhất từng tìm thấy ở prototype.

### `FORM-05` — Chọn điều khiển theo số lựa chọn

| Số lựa chọn | Điều khiển |
|---|---|
| 2 | Switch (bật/tắt) hoặc 2 radio |
| 3–5 | Radio group — thấy hết, một lần bấm |
| 6–15 | Select |
| > 15 | Select có tìm kiếm |
| Nhiều giá trị | Checkbox group hoặc multi-select có chip |

### `FORM-06` — Không dùng ký tự giả làm điều khiển
`◉` `○` `☑` không phải radio/checkbox. Vi phạm → `AP-08`.

### `FORM-07` — Trường khoá phải nói rõ vì sao khoá
Trường chỉ đọc cần: hình thức khác trường sửa được, biểu tượng khoá, **và** một dòng nói ai/cái gì đang khoá nó (*"khoá bởi mẫu"*, *"do quản trị hệ thống đặt"*).
Không dùng `opacity` để thể hiện khoá — `AP-11`.

---

## Bố cục

### `FORM-08` — Một cột là mặc định
Biểu mẫu một cột đọc nhanh hơn và ít nhảy mắt hơn. Chỉ dùng hai cột cho **các trường ngắn có quan hệ cặp** (ngày bắt đầu / ngày kết thúc, tỉnh / huyện).
Không bao giờ để một trường dài nằm cạnh một trường ngắn trong cùng hàng.

### `FORM-09` — Nhóm theo nghĩa, tối đa 7 trường mỗi nhóm
Nhóm hơn 7 trường thì tách, có tiêu đề khu vực. Nhóm bằng khoảng cách trước, bằng đường kẻ sau (`LAY-06`).

### `FORM-10` — Thứ tự trường theo luồng nghĩ của người dùng
Không theo thứ tự cột trong database, không theo thứ tự API trả về.

### `FORM-11` — Nút hành động ở đáy, dính bên trái theo cột nội dung
Nút chính bên trái nhất trong cụm (biểu mẫu đọc từ trên xuống, tay đi tiếp từ trường cuối). Hộp thoại thì ngược lại — nút chính bên phải nhất (`LAY-10`).

---

## Validate & lỗi

### `FORM-12` — Validate khi rời ô, không phải khi đang gõ
Báo lỗi lúc đang gõ là mắng người dùng giữa câu. Ngoại lệ: kiểm độ mạnh mật khẩu và đếm ký tự còn lại — hai thứ này báo trực tiếp.

### `FORM-13` — Lỗi gắn vào đúng ô, kèm cách sửa
Thông báo phải nói **sửa thế nào**, không chỉ nói sai. *"Ngày kết thúc phải sau ngày bắt đầu"* chứ không phải *"Giá trị không hợp lệ"*.

### `FORM-14` — Lỗi cấp biểu mẫu chỉ dùng cho lỗi không thuộc trường nào
Lỗi hệ thống, lỗi mạng, lỗi quyền. Lỗi thuộc trường thì phải gắn vào trường (`FORM-13`), kể cả khi cũng hiện thêm ở đầu.

### `FORM-15` — Không mất dữ liệu đã nhập
Submit lỗi, mạng rớt, hết phiên — dữ liệu người dùng đã gõ **phải còn nguyên**.

### `FORM-16` — Chống submit trùng
Nút vô hiệu hoá ngay khi bấm, có tín hiệu đang chạy. Cùng một lần submit không được sinh hai bản ghi.

---

## Giá trị mặc định

### `FORM-17` — Điền sẵn được thì điền
Mỗi trường điền sẵn đúng là một thao tác tiết kiệm mỗi lần dùng. Nhưng mặc định **sai** đắt hơn không có mặc định, vì người dùng tin nó.

### `FORM-18` — Mặc định phải nhìn ra là mặc định
Giá trị hệ thống điền sẵn cần phân biệt được với giá trị người dùng gõ, ít nhất tới khi họ chạm vào trường.

### `FORM-19` — Trường bắt buộc không có mặc định thì phải nổi bật
Nếu biểu mẫu điền sẵn gần hết mà còn một trường bắt buộc trống, trường đó phải **được nhìn thấy ngay** — nếu không người dùng bấm Lưu rồi mới biết.
