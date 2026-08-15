# Brief — S3 · Lịch sử issue đã tạo

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-09, FR-08
- **Ngày:** 2026-08-11

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Màn này để xem lại những issue đã tạo qua hệ thống và xử lý những cái bị lỗi.
Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Tìm nhanh những issue bị lỗi rồi xử lý ngay tại đây, không phải mở Jira. Phần
lớn lần vào màn là để làm đúng việc đó, nên các dòng lỗi phải nổi bật và thao
tác sửa phải nằm ngay trên dòng.

ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY
Đây KHÔNG phải màn tìm kiếm issue của Jira. Không có ô nhập JQL, không sửa
nội dung issue, không bình luận, không đổi trạng thái tay. Chỉ hiển thị những
issue do CHÍNH hệ thống này tạo ra. Mọi việc khác để người dùng mở Jira.

BỐ CỤC KHUNG — GIỮ ĐÚNG NHƯ MÔ TẢ, ĐỪNG THÊM BỚT
- Thanh bên trái cố định 240px: tên hệ thống "Jira Automation"; danh sách 3 dự
  án Jira (chọn một); ba mục "Mẫu issue", "Lịch sử issue", "Cấu hình dự án";
  dưới cùng là khối "Thông tin tài khoản" — phải LUÔN nhìn thấy được.
- Thanh trên cao 64px: bên trái là tiêu đề màn; bên phải KHÔNG có gì.
- KHÔNG có ô tìm kiếm toàn cục, KHÔNG chuông thông báo, KHÔNG nút trợ giúp,
  KHÔNG avatar trên thanh trên.
- Thanh bên trái KHÔNG chứa nút hành động nào.

BỘ LỌC
Ba bộ lọc, đặt ngay trên bảng:
- Dự án: Tất cả / ITSUP / HRQ / INFRA — đang chọn "Tất cả"
- Kết quả: Tất cả / Thành công / Tạo lỗi / Đóng tự động lỗi — đang chọn "Tất cả"
- Khoảng thời gian: từ ngày đến ngày — đang là 04/08/2026 đến 11/08/2026

Cần cho biết đang có bao nhiêu dòng khớp bộ lọc.

DỮ LIỆU — BẢNG LỊCH SỬ (dùng đúng những dòng này)
Mỗi dòng có: mã issue (mở được trên Jira), dự án, mẫu đã dùng, người tạo,
thời điểm, kết quả tạo, kết quả đóng tự động.

1. ITSUP-2482 — ITSUP — "Ghi nhận hỗ trợ đã xử lý" — Phạm Việt Anh —
   11/08 09:41 — tạo THÀNH CÔNG — đóng tự động THẤT BẠI:
   đã đi tới trạng thái "Chờ duyệt", hỏng ở bước sang "Đã xong",
   lý do là thiếu quyền thực hiện transition
2. ITSUP-2481 — ITSUP — "Ghi nhận hỗ trợ đã xử lý" — Phạm Việt Anh —
   11/08 09:36 — tạo THÀNH CÔNG — đóng tự động XONG
3. HRQ-318 — HRQ — "Đề nghị tuyển dụng" — Nguyễn Thị Hoa — 11/08 08:58 —
   tạo THÀNH CÔNG — mẫu này KHÔNG BẬT đóng tự động
4. (chưa có mã issue) — ITSUP — "Yêu cầu cấp quyền truy cập hệ thống cho nhân
   sự mới vào tháng 8" — Trần Thị Bích — 10/08 17:20 — TẠO LỖI:
   Jira trả về "Field 'customfield_10312' is required."
   (tên mẫu ở dòng này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
5. INFRA-902 — INFRA — "Sự cố hạ tầng" — Lê Văn Cường — 10/08 14:05 —
   tạo THÀNH CÔNG — đóng tự động XONG

BỐN KẾT QUẢ PHẢI PHÂN BIỆT ĐƯỢC NGAY, KHÔNG ĐƯỢC GỘP
  a. tạo xong, đóng tự động xong          → việc đã trọn vẹn
  b. tạo xong, mẫu không bật đóng tự động → bình thường, KHÔNG phải lỗi
  c. tạo xong nhưng đóng tự động thất bại → issue ĐÃ có trên Jira, chỉ kẹt trạng thái
  d. tạo lỗi                              → KHÔNG có issue nào trên Jira

Ca (b) hay bị nhầm thành lỗi, và ca (c) hay bị nhầm thành (d). Phải nhìn là
phân biệt được, và mỗi ca nói rõ hệ quả.

HÀNH ĐỘNG TRÊN TỪNG DÒNG
- Mở issue trên Jira — với dòng có mã issue
- Thử lại việc chuyển trạng thái — CHỈ với ca (c). Thử lại đi tiếp từ trạng
  thái hiện tại, không tạo issue mới.
- Xem lại và tạo lại — chỉ với ca (d)

MÀN HÌNH PHỤ CẦN THIẾT KẾ THÊM
Trạng thái khi bộ lọc không khớp dòng nào: nói rõ đang lọc theo gì và gợi ý nới
bộ lọc. Không viết "Không có dữ liệu".

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
Bảng có thể dài hàng trăm dòng. Ưu tiên xem được nhiều dòng cùng lúc và so sánh
theo cột. Mỗi dòng một thẻ to là sai với màn này.

KHÔNG ĐƯỢC LÀM (đây là công cụ nội bộ, không phải trang giới thiệu)
- Không gradient làm nền cho vùng có chữ
- Không ảnh bìa lớn, không khối hero
- Không animation trang trí
- Không dùng thẻ (card) chỉ để nhóm hai dòng chữ
- Không giấu hành động chính trong menu ba chấm
- Không để hành động của một dòng chỉ hiện khi rê chuột — phải hiện thường trực
- Không dùng màu làm tín hiệu duy nhất — luôn kèm chữ hoặc biểu tượng
- Không dùng độ mờ (opacity) để thể hiện trạng thái không dùng được
- Không viết hoa toàn bộ cụm quá 3 từ, kể cả tiêu đề cột trong bảng
- Không đặt nhãn ô nhập vào bên trong ô rồi để nó biến mất khi gõ

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
| Cột hiển thị: key, dự án, mẫu, người tạo, thời điểm, kết quả tạo, kết quả auto-Done | FR-09 (tiêu chí 1) |
| Ba bộ lọc: dự án · kết quả · khoảng thời gian | FR-09 (tiêu chí 2) |
| Nút thử lại ngay trên dòng lỗi auto-Done | FR-09 (tiêu chí 3), FR-08 (tiêu chí 4) |
| Chỉ issue do hệ thống tạo, không JQL, không sửa | FR-09 (tiêu chí 4) — **ràng buộc âm** |
| Bốn kết quả phân biệt được | FR-07 (tiêu chí 8), FR-08 (tiêu chí 1) |
| Trạng thái lọc không khớp | `STATE-01` |

### Vì sao có khối ràng buộc âm

FR-09 tiêu chí 4 nói thẳng: *"Không tìm kiếm JQL, không sửa/bình luận issue — việc đó để
Jira."* Một màn "lịch sử issue" là chỗ công cụ thiết kế **rất dễ** tự thêm ô tìm kiếm nâng
cao và nút sửa, vì mọi bảng issue nó từng thấy đều có. Đây là bài học từ S5b: chỗ nào yêu
cầu **cấm** thì phải cấm tường minh trong phần dán, không để ở ghi chú.

### Nhận bản thiết kế về thì kiểm gì

1. **Có mọc ô JQL / nút sửa issue / nút bình luận không** — kiểm đầu tiên
2. **Bốn kết quả** có phân biệt được không, nhất là (b) *không bật đóng tự động* có bị vẽ
   thành lỗi không, và (c) có bị nhầm thành (d) không
3. **Nút thử lại** có nằm ngay trên dòng không, và **chỉ** xuất hiện ở ca (c)
4. **Dòng 4 không có mã issue** — có xử lý được ô trống đó không hay để trống trơn
5. **Tên mẫu dài ở dòng 4** có bị tràn hoặc **viết cụt ngay trong markup** không — Stitch đã
   làm thế **ba lần** (S5a, S2, S4), kiểm cả text lẫn `title`
6. **Khối tài khoản** ở đáy thanh bên có trong khung nhìn không (`RES-12`)
7. **Nút ở thanh bên** — S2 và S4 đều tự mọc nút dù đã cấm; lần này cấm bằng một câu riêng
8. Có vi phạm mục nào trong danh sách "không được làm" không

### Đây là chỗ date picker đáng làm

Ghi chú convert S2 từng để lại: date picker chưa làm vì chỉ được **một trường trên một màn**.
Màn này có **bộ lọc khoảng thời gian** — hai ô ngày, và cần so sánh từ/đến. Nếu convert S3
thấy `input[type=date]` không đủ thì đây là lúc chi phí thêm `calendar` + `popover` chia được
cho hai màn.
