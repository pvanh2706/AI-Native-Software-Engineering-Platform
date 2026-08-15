# Anti-patterns — danh sách CẤM

Đây là **căn cứ để judge trừ điểm**. "Trông chưa ổn" không chấm được; "vi phạm `AP-03`" thì chấm được.

Mục có 🔬 là **rút ra từ lỗi thật đã xảy ra**, có ảnh chứng minh trong [báo cáo eval prototype v4](../../projects/jira-issue-templates/02-prototype/ui-eval-report.md). Loại này đáng tin hơn quy tắc chép từ sách.

---

## Nhóm A — Bố cục

### 🔬 `AP-01` — Banner xếp chồng
**Cấm:** từ **2 dải thông báo trở lên** nằm liên tiếp nhau ở đầu màn hình.
**Vì sao:** người dùng bỏ qua cả cụm. Hai banner = không banner nào được đọc.
**Thay bằng:** gộp thành một; hoặc đưa thông tin phụ vào đúng chỗ nó liên quan; hoặc thu thành một dòng chữ nhỏ.
*Đã xảy ra:* màn Cấu hình dự án có "Đang cấu hình…" + "Metadata đồng bộ…" liền nhau.

### 🔬 `AP-02` — Mép phải răng cưa
**Cấm:** trong cùng một cột nội dung, các khối có chiều rộng tối đa khác nhau (ví dụ banner tràn 1410px trong khi card dừng ở 840px).
**Vì sao:** mắt bám vào đường mép; hai đường mép khác nhau đọc như hai trang bị ghép.
**Thay bằng:** một chiều rộng tối đa cho cả cột. Muốn khối nào rộng hơn thì phải là quyết định có chủ đích, không phải sót.

### 🔬 `AP-03` — Hai kiểu cho cùng một loại điều khiển
**Cấm:** cùng một loại điều khiển (ví dụ dropdown) hiển thị hai kiểu khác nhau trong cùng một màn.
**Vì sao:** phá `PRIN-04` và `PRIN-06` cùng lúc — người dùng không biết cái nào bấm được.
*Đã xảy ra:* select "Status đích" bị `appearance:none` nên **mất mũi tên**, trông y hệt ô nhập text; trong khi select "Resolution" ngay dưới lại có mũi tên. **Đây là lỗi nghiêm trọng nhất tìm được ở v4.**

### 🔬 `AP-04` — Màn hình rỗng đáy
**Cấm:** nội dung chính chiếm **< 60%** chiều cao khung nhìn ở 1440×900 mà không có lý do.
**Vì sao:** phá `PRIN-02`; màn trông như đang tải dở hoặc thiếu dữ liệu.
**Thay bằng:** tăng mật độ, đưa nội dung liên quan lên, hoặc thu hẹp cột và tận dụng chiều ngang.

### 🔬 `AP-19` — Thanh điều hướng cao theo nội dung trang
**Cấm:** để thanh bên giãn chiều cao theo tài liệu.
**Vì sao:** trang dài thì thanh bên dài theo, và **mọi thứ ghim ở đáy thanh bên** — tài khoản người dùng, đăng xuất, phiên bản — bị đẩy ra khỏi khung nhìn. Người dùng phải cuộn hết một trang dài chỉ để bấm vào tên mình, dù menu chỉ có 4 mục.
**Thay bằng:** `position:sticky` + chiều cao bằng khung nhìn + tự cuộn riêng. Thanh bên là **khung**, không phải nội dung.
**Kiểm được bằng máy:** ở khung nhìn 900px, mọi mục điều hướng và khối tài khoản phải nằm trong 900px đầu tiên — xem `RES-12`.
*Đã xảy ra:* khối "Phạm Việt Anh" nằm ở đáy thanh bên; màn Cấu hình chi tiết cao 1300px nên phải cuộn 400px mới thấy. **Lớp 1 không bắt được** vì nó chỉ đo tràn ngang, không đo "có nằm trong khung nhìn không".

### 🔬 `AP-05` — Thanh công cụ vỡ dòng
**Cấm:** thanh trên cùng để phần tử rơi xuống dòng thứ hai ở độ rộng thiết kế.
**Vì sao:** tạo dải trống lệch ở vị trí dễ thấy nhất màn hình.
**Thay bằng:** thu gọn nhãn, gộp vào menu tràn, hoặc giảm số phần tử.

---

## Nhóm B — Trang trí thừa

### `AP-06` — Hiệu ứng không giải thích được
**Cấm:** bóng đổ, gradient, animation, viền màu mà không nói được nó truyền đạt thông tin gì.
*Câu hỏi kiểm:* "bỏ nó đi thì người dùng mất thông tin gì?" — không trả lời được thì bỏ.

### `AP-07` — Thẻ lồng thẻ
**Cấm:** quá **2 tầng** khối có nền/viền riêng lồng nhau. Cấm dùng thẻ chỉ để nhóm hai dòng chữ.
**Vì sao:** mỗi tầng ăn 16–24px đệm mỗi bên và thêm một đường viền cho mắt xử lý. Đây là nguồn số một của *excessive cards*.
**Thay bằng:** tiêu đề khu vực + khoảng cách. Khoảng trắng nhóm tốt hơn đường viền.

### `AP-08` — Ký tự giả làm điều khiển
**Cấm:** dùng ký tự (`◉` `○` `☑` `↕`) thay cho radio, checkbox, tay cầm kéo thả thật.
**Vì sao:** không bấm được, không focus được, trình đọc màn hình đọc thành chữ vô nghĩa.
*Đã xảy ra:* cột "Mặc định" trong bảng mẫu dùng `◉`/`○`. 🔬

### `AP-09` — Gradient trong công cụ nội bộ
**Cấm:** gradient làm nền cho vùng có chữ hoặc dữ liệu.
**Vì sao:** tương phản đổi dọc theo bề mặt → không kiểm được `A11Y-01`, và trên nền tối thường bị dải màu.
**Ngoại lệ:** đồ thị dữ liệu, nơi gradient *mã hoá giá trị*.

### `AP-10` — Animation trang trí
**Cấm:** animation khi vào trang, animation trên hàng bảng, chuyển động > 300ms.
**Vì sao:** công cụ dùng vài chục lần mỗi ngày thì mỗi 300ms chờ là thuế thu hằng ngày.
**Chỉ cho phép:** chuyển động **giải thích** thay đổi trạng thái (mở/đóng, vào/ra).

---

## Nhóm C — Khả năng đọc & tiếp cận

### 🔬 `AP-11` — Làm mờ để biểu đạt trạng thái
**Cấm:** dùng `opacity` trên khối cha để thể hiện "tắt", "nháp", "chỉ đọc".
**Vì sao:** hai lý do, cái thứ hai nguy hiểm hơn —
1. Trên nền tối, `opacity: .55` kéo chữ xuống dưới ngưỡng đọc được.
2. **Check tương phản tự động MÙ trước ca này** — `getComputedStyle().color` không tính `opacity` của cha, nên máy **báo PASS**.
**Thay bằng:** đổi sang vai trò màu có tương phản đã kiểm (`on-surface-variant`), cộng một nhãn chữ (`Nháp`, `Tắt`). Xem `A11Y-05`.
*Đã xảy ra ở v4 và **lọt qua lớp 1**.* Đây là ví dụ chuẩn cho việc vì sao phải có judge nhìn ảnh.

### 🔬 `AP-12` — Nhãn giả
**Cấm:** dùng `<span>`/`<div>` đặt tuyệt đối làm nhãn ô nhập thay cho `<label for>`.
**Vì sao:** nhìn thì có nhãn, nhưng trình đọc màn hình không nối được nhãn với ô, và bấm nhãn không focus vào ô.
*Đã xảy ra 11 chỗ ở v4.* Đây là loại lỗi lớp 1 bắt tốt — để máy bắt, đừng để người rà.

### 🔬 `AP-20` — Link rơi về màu mặc định của trình duyệt
**Cấm:** để thẻ `<a>` không khai màu.
**Vì sao:** màu mặc định `#0000EE` được thiết kế cho nền trắng. Đặt nó trên bất kỳ nền có màu nào — dải cảnh báo, dải lỗi, nền tối — là tương phản gần **1:1**, tức chữ gần như tàng hình.
**Thay bằng:** khai `a{color:var(--color-primary)}` làm lưới an toàn toàn cục; link **nằm trong dải màu** thì dùng `color:inherit` + gạch chân, để nó luôn khớp với màu chữ của dải đó.
**Kèm theo:** link trong đoạn văn thường chỉ cao bằng dòng chữ (~17px) → dưới sàn `A11Y-02`. Thêm đệm dọc cho đủ 24px.
*Đã xảy ra:* link "cấu hình dự án" trong dải cảnh báo — theme sáng thì đọc được nên **không ai để ý**, theme tối cho tỉ lệ **1.05:1**. Máy bắt được vì chạy check trên **cả hai theme**.

### `AP-13` — Chữ dưới 12.5px
**Cấm:** cỡ chữ nhỏ hơn `body-sm`, kể cả cho chú thích.

### `AP-14` — Cột số căn trái
**Cấm:** căn trái cột chứa số cần so sánh (số lượng, tiền, phần trăm).
**Vì sao:** không so sánh được theo hàng dọc.
**Thay bằng:** căn phải + chữ số đều bề rộng. 🔬 *Đã xảy ra ở cột "Mẫu".*

---

## Nhóm D — Nội dung

### `AP-15` — Trạng thái rỗng không có lối ra
**Cấm:** trạng thái rỗng chỉ ghi "Không có dữ liệu".
**Thay bằng:** nói **vì sao** rỗng và **làm gì tiếp**, kèm hành động chính. Xem `STATE-01`.

### `AP-16` — Thông báo lỗi không kèm hành động
**Cấm:** hiện lỗi thô từ hệ thống mà không nói người dùng làm được gì.

### `AP-17` — Hành động chính giấu trong menu tràn
**Cấm:** đặt hành động chính của màn hình trong menu `…`.

### 🔬 `AP-18` — Metadata nội bộ chiếm vị trí đắt
**Cấm:** đặt thông tin dành cho người phát triển (mã truy vết, cờ debug, nhãn phiên bản) ở vị trí ngay dưới tiêu đề màn hình.
**Vì sao:** đó là chỗ đắt nhất trên màn; người dùng đọc nó trước nội dung thật.
**Thay bằng:** đưa xuống chân, thu vào panel bật/tắt được.
*Đã xảy ra:* dải chip `FR-03 FR-05 FR-06…` nằm ngay dưới tiêu đề mọi màn.

---

## Cách judge dùng file này

1. Duyệt từng ảnh, đối chiếu danh sách.
2. Mỗi vi phạm ghi: **mã** · **màn hình** · **mô tả thấy gì trong ảnh** · **mức** (Nghiêm trọng / Cao / Vừa / Thấp).
3. Nhóm A và C mức Nghiêm trọng → **kéo điểm tiêu chí liên quan xuống ≤ 0.4**.
4. Không có vi phạm nào **không** đồng nghĩa điểm cao — danh sách này là sàn, không phải trần.
