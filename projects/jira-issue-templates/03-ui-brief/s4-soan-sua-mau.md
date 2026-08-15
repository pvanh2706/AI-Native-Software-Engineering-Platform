# Brief — S4 · Soạn / sửa mẫu issue

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-03, FR-04, FR-07, FR-10
- **Ngày:** 2026-08-11
- **Đây là màn nặng nhất bộ** — xem [§Vì sao chỉ xin 3 màn](#vì-sao-chỉ-xin-3-màn)

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Màn này là nơi QUẢN TRỊ DỰ ÁN soạn ra những mẫu đó. Người dùng thường chỉ vào
đây khi lập mẫu mới hoặc sửa mẫu cũ — vài lần một tháng, không phải hằng ngày.
Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Khai sẵn giá trị cho các trường của issue, để người tạo issue sau này chỉ phải
sửa đúng phần thật sự khác nhau. Với mỗi trường, người soạn quyết định hai
việc: điền sẵn giá trị gì, và trường đó có cho người tạo sửa hay không.

BỐ CỤC KHUNG — GIỮ ĐÚNG NHƯ MÔ TẢ, ĐỪNG THÊM BỚT
- Thanh bên trái cố định 240px: tên hệ thống "Jira Automation"; danh sách 3 dự
  án Jira (chọn một); ba mục "Mẫu issue", "Lịch sử issue", "Cấu hình dự án";
  dưới cùng là khối "Thông tin tài khoản" — phải LUÔN nhìn thấy được.
- Thanh trên cao 64px: bên trái là đường quay lại danh sách mẫu và tên mẫu đang
  sửa; bên phải là hành động lưu.
- KHÔNG có ô tìm kiếm toàn cục, KHÔNG chuông thông báo, KHÔNG nút trợ giúp,
  KHÔNG avatar trên thanh trên.

PHẦN 1 — THÔNG TIN MẪU
- Tên mẫu: "Ghi nhận hỗ trợ đã xử lý"
- Mô tả mẫu (một dòng): "Dùng khi đã xử lý xong một yêu cầu hỗ trợ và chỉ cần
  ghi nhận lại trên Jira"
- Dự án Jira đích: ITSUP — Hỗ trợ nội bộ. CHỈ CHỌN ĐƯỢC MỘT. Cần một dòng nói
  rõ: muốn dùng mẫu này ở dự án khác thì phải nhân bản, không gán nhiều dự án.
- Loại issue: Task
- Trạng thái mẫu: Nháp / Đang dùng — đang chọn "Đang dùng". Nói rõ mẫu Nháp thì
  người tạo issue chưa thấy.
- Tự động đóng issue sau khi tạo: ĐANG BẬT.
  Kèm dòng giải thích: trạng thái đích lấy từ cấu hình của dự án, hiện là
  "Đã xong". Đây là công tắc của RIÊNG mẫu này, hai mẫu trong cùng dự án được
  phép khác nhau.

PHẦN 2 — GIÁ TRỊ MẶC ĐỊNH CỦA TỪNG TRƯỜNG
Đây là phần chiếm nhiều chỗ nhất và là lý do màn này tồn tại.

Mỗi dòng là một trường, và mỗi dòng cần thể hiện BỐN thứ:
  a. tên trường, có dấu hiệu nếu Jira bắt buộc
  b. kiểu dữ liệu của trường
  c. ô khai giá trị mặc định, đúng theo kiểu đó
  d. trường này KHOÁ (người tạo không sửa) hay CHO SỬA (điền sẵn, sửa được)

Dùng đúng những trường này:
1. Tiêu đề — chữ một dòng — BẮT BUỘC — "Hỗ trợ người dùng — {{today}}" — cho sửa
2. Mô tả — chữ nhiều dòng, soạn bằng cú pháp wiki của Jira, KHÔNG phải trình
   soạn thảo giàu định dạng — cho sửa. Nội dung sẵn:
       h3. Nội dung đã xử lý
       * Kiểm tra tài khoản trên hệ thống
       * Cấp lại quyền truy cập
3. Người được giao — chọn người — "{{me}}" — KHOÁ
4. Người báo cáo — chọn người — "{{me}}" — KHOÁ
5. Độ ưu tiên — chọn một — "Trung bình" — cho sửa
6. Nhãn — chọn nhiều — "hỗ-trợ-nội-bộ", "đã-xử-lý" — cho sửa
7. Hạn hoàn thành — ngày — "{{today}}" — cho sửa
8. Thời gian thực tế đã bỏ ra để xử lý — số — BẮT BUỘC — "30" — cho sửa
   (tên trường này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
9. Nhóm hỗ trợ — chọn hai tầng — "Khối văn phòng" / "Hà Nội" — KHOÁ
10. Người yêu cầu — chọn người — chưa có giá trị — cho sửa

HAI Ý PHẢI LÀM NGƯỜI ĐỌC HIỂU NGAY
- {{today}} và {{me}} là giá trị TỰ SINH lúc tạo issue, không phải chữ ai đó gõ
  vào. Cần chỗ nào đó cho biết còn biến nào dùng được.
- Một trường vừa BẮT BUỘC trên Jira, vừa KHÔNG có giá trị mặc định, vừa KHOÁ
  không cho người tạo nhập — thì mẫu KHÔNG lưu được. Phải nhìn ra ngay trường
  nào đang rơi vào thế đó. Trong dữ liệu trên, trường "Người yêu cầu" chưa có
  giá trị nhưng vẫn cho sửa nên vẫn hợp lệ.

HÀNH ĐỘNG
- Chính: lưu mẫu
- Phụ: lưu thành bản nháp, huỷ bỏ
- Trên toàn mẫu: nhân bản sang dự án khác, ngừng dùng mẫu

HAI HỘP THOẠI CẦN THIẾT KẾ THÊM

1. NHÂN BẢN SANG DỰ ÁN KHÁC
   Người dùng chọn dự án đích, hệ thống ĐỐI CHIẾU trước rồi mới cho xác nhận.
   Phải liệt kê rõ những gì KHÔNG mang sang được, không chỉ báo "có 3 vấn đề".
   Dữ liệu mẫu: chép sang dự án HRQ — Yêu cầu nhân sự. Kết quả đối chiếu:
     · trường "Thời gian thực tế đã bỏ ra để xử lý" không tồn tại ở HRQ
     · giá trị "Khối văn phòng" của trường Nhóm hỗ trợ không có trong HRQ
     · 7 trường còn lại mang sang nguyên vẹn
   Nói rõ chuyện gì xảy ra với những chỗ hỏng: chúng bị bỏ trống, mẫu mới sẽ ở
   trạng thái Nháp cho tới khi người dùng khai lại.

2. NGỪNG DÙNG MẪU
   Xác nhận trước khi làm. Phải nói rõ hệ quả: mẫu biến khỏi danh sách chọn khi
   tạo issue, NHƯNG lịch sử những issue đã tạo từ mẫu này vẫn tra cứu được.
   Đây là điểm hay bị hiểu nhầm thành xoá.

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
Danh sách trường dài (10 dòng, thực tế có thể tới 25). Ưu tiên xem được nhiều
dòng cùng lúc và so sánh chúng theo cột, hơn là mỗi trường một thẻ to.

KHÔNG ĐƯỢC LÀM (đây là công cụ nội bộ, không phải trang giới thiệu)
- Không gradient làm nền cho vùng có chữ
- Không ảnh bìa lớn, không khối hero
- Không animation trang trí
- Không dùng thẻ (card) chỉ để nhóm hai dòng chữ
- Không giấu hành động chính trong menu ba chấm
- Không để hành động của một dòng chỉ hiện khi rê chuột — phải hiện thường trực
- Không dùng màu làm tín hiệu duy nhất — luôn kèm chữ hoặc biểu tượng
- Không dùng độ mờ (opacity) để thể hiện trạng thái không dùng được —
  hãy dùng một màu chữ riêng, vì chữ mờ đi thì không đọc nổi
- Không viết hoa toàn bộ cụm quá 3 từ, kể cả tiêu đề cột trong bảng
- Không đặt nhãn ô nhập vào bên trong ô rồi để nó biến mất khi gõ
- Không đặt nút lưu ở cuối một trang phải cuộn mới tới

THÀNH PHẦN GIAO DIỆN ĐƯỢC DÙNG
Bảng, nút (chính/viền/mờ), nhãn trạng thái, ô nhập, ô chọn, hộp kiểm, công tắc,
tab, hộp thoại, menu thả xuống, thanh bên, thanh trên, dải thông báo.
Nếu cần một thành phần khác, hãy ghi chú lại — đừng tự thêm loại mới.

PHONG CÁCH
Tự do sáng tạo. Miễn là hợp với công cụ nội bộ dùng hằng ngày.
```

---

## Ghi chú cho ta — không dán vào Stitch

### Map về yêu cầu

| Phần trong brief | FR |
|---|---|
| Tên, mô tả, đúng một dự án, issue type | FR-03 (tiêu chí 1, 2) |
| Trạng thái Nháp / Đang dùng | FR-03 (tiêu chí 5) |
| Công tắc auto-Done ở cấp MẪU | FR-07 (tiêu chí 1) — **đối xứng với ràng buộc âm của S5b** |
| Giá trị mặc định đủ kiểu field | FR-04 (tiêu chí 1, 2) |
| Mô tả dạng wiki markup Jira DC | FR-04 (tiêu chí 3) |
| Biến `{{today}}`, `{{me}}` thay lúc tạo issue | FR-04 (tiêu chí 4) |
| Khoá / cho sửa từng trường | FR-04 (tiêu chí 5) |
| Bắt buộc + không mặc định + khoá ⇒ không lưu được | FR-04 (tiêu chí 7) |
| Nhân bản sang dự án khác, đối chiếu metadata trước | FR-10 (tiêu chí 2) |
| Ngừng dùng: mất khỏi danh sách chọn, lịch sử vẫn tra được | FR-10 (tiêu chí 4) |

### Vì sao chỉ xin 3 màn

Theo [luật ở README](README.md): xin thêm **màn có nội dung riêng** thì Stitch làm tốt; xin
thêm màn **phải vẽ lại toàn bộ màn chính** thì nó dựng lại từ đầu và lệch hết.

Nên brief này chỉ xin form + hai **hộp thoại** (nhân bản, ngừng dùng) — cả hai đều có nội
dung riêng, không phải chép lại form.

Ca **tên mẫu trùng** (FR-03 tiêu chí 4) *cố ý không xin*: nó là lỗi hiện ngay trên form,
tức phải vẽ lại toàn bộ form — đúng loại Stitch làm hỏng ở S2. Sẽ hiện thực thẳng bằng
hành vi lúc convert, như đã làm với màn "tạo thất bại" của S2.

### Cố ý KHÔNG đưa vào brief

- **Màu, bo góc, phong cách** — để Stitch tự quyết
- **Lọc/tìm mẫu theo tên** (FR-03 tiêu chí 3) — thuộc màn danh sách mẫu (S1), không phải màn soạn
- **Xoá mẫu** (FR-10 tiêu chí 5) — cùng dạng hộp thoại xác nhận với "ngừng dùng", không cần vẽ hai lần

### Nhận bản thiết kế về thì kiểm gì

1. **Bốn thứ trên mỗi dòng trường** (tên · kiểu · giá trị · khoá/cho sửa) có đọc được cùng
   lúc không, hay phải mở từng dòng ra mới thấy
2. **Trường khoá** thể hiện bằng gì — nếu bằng `opacity` là sai (`AP-11`)
3. **Tên trường dòng 8 dài** có tràn hoặc bị **viết cụt ngay trong markup** không — S5a và
   S2 đều từng dính, kiểm cả text lẫn `title`/`value`
4. **Ô mô tả** có bị vẽ thành trình soạn thảo giàu định dạng không — phải là wiki markup
5. **Hộp thoại nhân bản** có liệt kê rõ từng thứ không mang sang được không, hay chỉ đếm số
6. **Hộp thoại ngừng dùng** có phân biệt rõ với xoá không
7. **Công tắc auto-Done** có mặt ở đây không — S5b thì cấm, S4 thì bắt buộc phải có
8. **Khối tài khoản** ở đáy thanh bên có trong khung nhìn không (`RES-12`)
9. **App shell** có đúng đặc tả QĐ1 không — lần S2 Stitch vẫn tự thêm nút vào thanh bên dù
   đã liệt kê đủ thành phần
10. Có vi phạm mục nào trong danh sách "không được làm" không
