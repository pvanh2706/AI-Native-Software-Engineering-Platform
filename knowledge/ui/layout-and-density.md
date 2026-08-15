# Bố cục & mật độ

Token nói `spacing.6 = 24px`. File này nói **dùng bậc nào ở đâu, và khi nào được lệch**.

Mặc định: **nghiêng compact** — công cụ nội bộ mở nhiều lần mỗi ngày, tốc độ đọc thắng sự thoáng đãng (`PRIN-02`).

---

## Khung màn hình

### `LAY-01` — Một chiều rộng tối đa cho mỗi cột nội dung
Mọi khối trong cùng cột dùng **chung** một `max-width`. Muốn một khối rộng hơn thì đó phải là quyết định có chủ đích và lặp lại nhất quán.
*Vi phạm:* `AP-02` (mép phải răng cưa).

### `LAY-02` — Chiều rộng theo loại nội dung

| Loại | Rộng tối đa | Vì sao |
|---|---|---|
| Biểu mẫu | `layout.form-max` (840px) | Rộng hơn thì mắt quét ngang từ nhãn sang ô quá xa |
| Văn bản dài | `layout.reading-max` (72ch) | Quá 72 ký tự/dòng thì mất dòng khi xuống hàng |
| Bảng | hết chiều rộng cột | Bảng cần chiều ngang; đừng bó nó vào 840px |
| Lưới thẻ | hết chiều rộng cột | |

> Lỗi thường gặp: bó **bảng** vào `form-max` vì "cho đồng bộ". Sai — bảng và biểu mẫu có nhu cầu ngược nhau.

### `LAY-03` — Vùng nội dung chiếm ≥ 60% chiều cao
Ở 1440×900, nội dung thật phải chiếm ≥ 60% chiều cao khung nhìn. Dưới mức đó → `AP-04`.
*Cách sửa, theo thứ tự ưu tiên:* tăng mật độ → tận dụng chiều ngang → đưa nội dung liên quan lên → cuối cùng mới giảm chiều cao khối.

### `LAY-04` — Tối đa MỘT dải thông báo ở đầu màn
Từ 2 trở lên → `AP-01`. Thông tin phụ đặt cạnh thứ nó nói tới, không dồn lên đầu.

---

## Nhịp khoảng cách

### `LAY-05` — Bốn khoảng cách, không hơn
Trong một màn chỉ dùng bốn bậc:

| Vai trò | Token | Giá trị |
|---|---|---|
| Trong một cụm (nhãn ↔ ô, icon ↔ chữ) | `semantic.field-inner` | 8px |
| Giữa hai phần tử cùng nhóm | `semantic.inline-gap` / `cell-padding-y` | 8–12px |
| Giữa hai trường / hai hàng | `semantic.field-gap` | 24px |
| Giữa hai khu vực có tiêu đề | `semantic.section-gap` | 32px |

Dùng nhiều bậc hơn thì mắt không nhận ra nhóm nữa — khoảng cách mất chức năng phân nhóm.

### `LAY-06` — Khoảng cách nhóm mạnh hơn đường viền
Muốn nhóm mấy phần tử: **tăng khoảng cách quanh nhóm** trước. Chỉ dùng viền/nền khi khoảng cách không đủ (ví dụ nhóm nằm giữa hai nhóm khác cùng cỡ).
*Vi phạm:* `AP-07` (thẻ lồng thẻ).

### `LAY-07` — Khoảng cách trên tiêu đề lớn hơn khoảng cách dưới
Tiêu đề khu vực phải **dính vào nội dung của nó**: khoảng trên ≥ 2× khoảng dưới. Ngược lại thì tiêu đề trông như thuộc về khối phía trên.

---

## Căn chỉnh

### `LAY-08` — Ít trục căn nhất có thể
Mọi thứ trong một cột căn về **cùng một trục trái**. Mỗi trục mới là một việc cho mắt.

### `LAY-09` — Số căn phải, chữ căn trái
Cột số cần so sánh: căn phải, chữ số đều bề rộng. Vi phạm → `AP-14`.
Ngày tháng: căn trái nếu chỉ để đọc, căn phải nếu để so thứ tự.

### `LAY-10` — Hành động ở vị trí cố định
Hành động chính của màn: **góc trên phải**. Hành động của hộp thoại: **góc dưới phải, chính ngoài cùng bên phải**. Hành động của hàng bảng: **cột cuối**.
Cố định vị trí quan trọng hơn chọn vị trí nào — `PRIN-04`.

---

## Mật độ

### `LAY-11` — Ba mức mật độ, chọn theo tần suất dùng

| Mức | Đệm ô bảng | Chiều cao hàng | Dùng khi |
|---|---|---|---|
| **Compact** | 8px | 36px | Bảng dữ liệu, danh sách xem nhiều lần/ngày ← **mặc định** |
| **Vừa** | 12px | 44px | Màn hỗn hợp, biểu mẫu |
| **Thoáng** | 16px+ | 56px+ | Trạng thái rỗng, màn xác nhận, onboarding |

Một màn dùng **một** mức. Trộn mức trong cùng màn là dấu hiệu chưa quyết được màn này dành cho ai.

### `LAY-12` — Compact không được ăn vào vùng bấm
Mật độ cao vẫn phải giữ vùng bấm ≥ 24px (`A11Y-02`). Cách làm: giữ vùng bấm lớn nhưng **cho nó trong suốt**, không phải thu nhỏ nó lại.

### `LAY-13` — Lưới thẻ: chiều cao đều nhau
Thẻ trong cùng hàng phải cao bằng nhau; nội dung ngắn thì đẩy phần chân xuống đáy, **không** để khoảng trống lửng ở giữa.

---

## Ngoại lệ được phép

| Tình huống | Được lệch |
|---|---|
| Trạng thái rỗng | Dùng mật độ thoáng, cho phép chiếm < 60% chiều cao |
| Màn xác nhận thao tác nguy hiểm | Thoáng có chủ đích, để người dùng chậm lại |
| Bảng > 12 cột | Được vượt `content-max`, cuộn ngang trong khối riêng |
| Đồ thị | Được dùng gradient mã hoá giá trị (`AP-09` ngoại lệ) |

Mọi lệch khỏi quy tắc phải **ghi lý do trong `UiSpec`**. Lệch không ghi lý do = vi phạm.
