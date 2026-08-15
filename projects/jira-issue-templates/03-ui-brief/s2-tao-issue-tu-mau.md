# Brief — S2 · Tạo issue từ mẫu

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-06, FR-04, FR-07, FR-08, NFR-03, NFR-07
- **Ngày:** 2026-08-11
- **Khác brief trước:** đặc tả luôn app shell theo [QĐ1](../04-design/QUYET-DINH.md) — xem [§Khác gì brief trước](#khác-gì-brief-trước)

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Đây là màn được dùng NHIỀU NHẤT — mỗi người mở 20–30 lần mỗi ngày.
Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Người dùng đã chọn một mẫu, giờ xem lại các trường đã điền sẵn, sửa phần cần
sửa, rồi bấm tạo. Phần lớn lần dùng là KHÔNG SỬA GÌ, bấm tạo luôn.

Tính từ lúc vào màn tới lúc issue được tạo phải TỐI ĐA 3 LẦN BẤM. Hãy thiết kế
sao cho đếm được rõ ràng là bao nhiêu lần bấm. Đừng bắt người dùng cuộn xuống
cuối trang mới thấy nút tạo.

BỐ CỤC KHUNG — GIỮ ĐÚNG NHƯ MÔ TẢ, ĐỪNG THÊM BỚT
- Thanh bên trái cố định 240px: tên hệ thống "Jira Automation" kèm dòng phụ
  "Project Selector"; ba mục điều hướng "Mẫu issue", "Lịch sử issue",
  "Cấu hình dự án"; dưới cùng là khối "Thông tin tài khoản" — khối này phải
  LUÔN nhìn thấy được, không bị đẩy khỏi màn hình khi nội dung dài.
- Thanh trên cao 64px: bên trái là đường quay lại danh sách mẫu và tên mẫu
  đang dùng; bên phải KHÔNG có gì.
- KHÔNG có ô tìm kiếm toàn cục, KHÔNG chuông thông báo, KHÔNG nút trợ giúp,
  KHÔNG avatar trên thanh trên.
- Vùng nội dung chính: form tạo issue.

MẪU ĐANG DÙNG
"Ghi nhận hỗ trợ đã xử lý" — dự án ITSUP (Hỗ trợ nội bộ) — loại Task.
Mẫu này có bật chế độ tự động đóng issue sau khi tạo.

CÁC TRƯỜNG TRONG FORM (dùng đúng dữ liệu này)

Trường KHOÁ — đã điền sẵn, người tạo KHÔNG sửa được. Phải nhìn ra ngay là khoá,
và nói được VÌ SAO khoá (do mẫu quy định):
- Loại issue: Task
- Người được giao: Phạm Việt Anh
- Người báo cáo: Phạm Việt Anh

Trường CHO SỬA — điền sẵn, sửa được:
- Tiêu đề (một dòng): "Hỗ trợ người dùng khối văn phòng — xử lý sự cố đăng nhập
  và cấp lại quyền truy cập ngày 11/08/2026"
  (dòng này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
- Mô tả (nhiều dòng): soạn bằng cú pháp wiki của Jira, KHÔNG phải trình soạn
  thảo giàu định dạng. Cần chỗ gợi ý cú pháp cơ bản. Nội dung sẵn:
      h3. Nội dung đã xử lý
      * Kiểm tra tài khoản trên hệ thống
      * Cấp lại quyền truy cập
      Người thực hiện: Phạm Việt Anh
- Độ ưu tiên (chọn một): Thấp / Trung bình / Cao / Khẩn — đang chọn "Trung bình"
- Nhãn (chọn nhiều): đang có "hỗ-trợ-nội-bộ" và "đã-xử-lý"
- Hạn hoàn thành (ngày): 11/08/2026
- Thời gian thực tế đã bỏ ra để xử lý (số, BẮT BUỘC): đang TRỐNG
  (tên trường này CỐ Ý dài; và vì bắt buộc mà chưa có giá trị nên phải thấy rõ
  là chưa điền được thì không tạo được)
- Nhóm hỗ trợ (chọn hai tầng): "Khối văn phòng" → "Hà Nội"
- Người yêu cầu (chọn người): Nguyễn Thị Hoa

CHỖ CẦN NÓI RÕ
Hai trường Tiêu đề và Hạn hoàn thành có giá trị sinh tự động theo ngày hôm nay
và theo người đang đăng nhập. Người dùng cần hiểu đây là giá trị tự sinh chứ
không phải ai đó gõ vào.

HÀNH ĐỘNG
- Chính: tạo issue
- Phụ: quay lại danh sách mẫu, đặt lại các trường về mặc định của mẫu
- Mỗi lần bấm tạo ra ĐÚNG MỘT issue. Không tạo hàng loạt, không tạo issue con.
- Bấm tạo nhiều lần liên tiếp không được tạo issue trùng — nút phải có trạng
  thái đang xử lý, không cho bấm tiếp.

BA MÀN HÌNH TRẠNG THÁI CẦN THIẾT KẾ THÊM

1. TẠO THÀNH CÔNG, ĐÓNG TỰ ĐỘNG XONG
   Hiện mã issue "ITSUP-2483" kèm đường mở thẳng trên Jira, và cho biết issue
   đã được chuyển sang trạng thái "Đã xong". Cho làm tiếp việc kế: tạo issue
   nữa từ cùng mẫu, hoặc về danh sách mẫu.

2. TẠO THẤT BẠI
   Jira từ chối. Thông báo phải nêu NGUYÊN VĂN lỗi Jira trả về, và gắn lỗi vào
   ĐÚNG trường gây lỗi chứ không chỉ báo chung ở đầu trang. Dữ liệu người dùng
   đã nhập phải còn nguyên trên form, không bị xoá.
   Lỗi mẫu: trường "Thời gian thực tế đã bỏ ra để xử lý" — Jira báo
   "Field 'customfield_10312' is required."

3. TẠO XONG NHƯNG ĐÓNG TỰ ĐỘNG THẤT BẠI
   Đây là ca KHÁC HẲN ca số 2 và phải nhìn ra ngay là khác: issue ĐÃ được tạo
   thành công, chỉ là chưa kéo được sang trạng thái đích. Tuyệt đối không được
   làm người dùng tưởng là tạo hỏng.
   Phải nói rõ: issue "ITSUP-2484" đã tạo; đã đi được tới trạng thái "Chờ
   duyệt"; hỏng ở bước chuyển từ "Chờ duyệt" sang "Đã xong"; lý do Jira trả về
   là thiếu quyền thực hiện transition. Có nút thử lại việc chuyển trạng thái —
   thử lại đi tiếp từ trạng thái hiện tại, KHÔNG tạo issue mới.

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
Đây là màn thao tác hằng ngày, tốc độ đọc quan trọng hơn sự thoáng đãng. Ưu
tiên thấy được toàn bộ form và nút tạo trong một màn, không phải cuộn.

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
  (tiếng Việt viết hoa hết rất khó đọc)
- Không đặt nhãn ô nhập vào bên trong ô rồi để nó biến mất khi gõ
- Không đặt nút tạo ở cuối một trang phải cuộn mới tới

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
| Form điền sẵn mặc định, ≤ 3 lần bấm | FR-06 (tiêu chí 1), `NFR-07` |
| Trường khoá vs cho sửa | FR-04 (tiêu chí 5) |
| Mô tả dạng wiki markup Jira DC, có gợi ý cú pháp | FR-04 (tiêu chí 3) |
| Giá trị tự sinh theo ngày và theo người đăng nhập | FR-04 (tiêu chí 4) — `{{today}}`, `{{me}}` |
| Đủ kiểu field: số, ngày, chọn đơn, chọn nhiều, chọn hai tầng, chọn người | FR-04 (tiêu chí 2) |
| Trường bắt buộc chưa có giá trị thì chặn | FR-04 (tiêu chí 7) |
| Mã issue + link Jira | FR-06 (tiêu chí 3) |
| Đúng một issue mỗi lần, không bulk/subtask | FR-06 (tiêu chí 4) |
| Lỗi Jira nguyên văn, gắn đúng trường, giữ dữ liệu đã nhập | FR-06 (tiêu chí 5, 6) |
| Bấm nhiều lần không tạo trùng | `NFR-03` |
| Tạo xong nhưng auto-Done hỏng — phân biệt rõ với tạo hỏng | FR-08 (tiêu chí 1) |
| Đi được tới đâu, hỏng ở bước nào | FR-08 (tiêu chí 2) |
| Nút thử lại transition, không tạo issue mới | FR-08 (tiêu chí 4) |

### Cố ý KHÔNG đưa vào brief

- **Màu, bo góc, phong cách** — để Stitch tự quyết
- **Xem trước payload (dry-run)** và **quick-create một dòng** — nằm ở mục ý tưởng tương
  lai của requirements, chưa phải FR. Đưa vào là mở rộng phạm vi ngầm
- **Chuỗi transition nhiều bước, giới hạn 5 bước, phát hiện vòng lặp** (FR-07) — logic chạy
  nền. Chỉ *kết quả* của nó xuất hiện trên màn trạng thái số 3
- **Màn chọn mẫu** — đó là S1, đã có

### Vì sao ba trạng thái mà không phải một

FR-08 tồn tại chính vì ca "tạo xong nhưng không đóng được" rất dễ bị hiểu nhầm thành "tạo
hỏng". Nếu chỉ xin một màn, Stitch gần như chắc chắn gộp hai ca lỗi làm một — và đó đúng
là cái sai mà FR-08 sinh ra để chặn.

Ba trạng thái này là **nội dung khác nhau**, không phải biến thể của cùng một màn — đúng
loại việc mà Stitch làm tốt, xem [luật ở README](README.md).

### Nhận bản thiết kế về thì kiểm gì

1. **Đếm số lần bấm** để tạo một issue không sửa gì — phải ≤ 3 (`NFR-07`)
2. **Nút tạo** có nằm trong khung nhìn đầu tiên không, hay phải cuộn
3. **Tiêu đề dài và tên trường dài** có tràn hoặc bị tự rút ngắn không —
   S5a từng bị Stitch **viết cụt chuỗi ngay trong markup**, kiểm cả text lẫn `title`
4. **Trường khoá** thể hiện bằng gì — nếu bằng `opacity` là sai (`AP-11`)
5. **Ca lỗi số 2 và số 3** có nhìn ra là hai chuyện khác nhau không
6. **Ô mô tả** có bị vẽ thành trình soạn thảo giàu định dạng không — phải là wiki markup
7. **Khối tài khoản** ở đáy thanh bên có trong khung nhìn không (`RES-12`)
8. **App shell** có đúng đặc tả QĐ1 không — đây là lần đầu đưa đặc tả vào prompt, kết quả
   sẽ cho biết cách này có ăn không
9. Có vi phạm mục nào trong danh sách "không được làm" không

### Khác gì brief trước

**Đặc tả luôn app shell.** Ba brief trước thả cho Stitch tự nghĩ, kết quả là 6 màn 6 kiểu
khung và phải chuẩn hoá bằng tay sau đó. Nay [QĐ1](../04-design/QUYET-DINH.md) đã chốt nên
đưa thẳng vào prompt, kèm cả những thứ **không** được thêm.

Đây là chỗ hơi lệch khỏi nguyên tắc "thả hoàn toàn hình thức" ở [README](README.md), nhưng
có lý do: vị trí của điều hướng là **cấu trúc**, không phải thẩm mỹ. Và một khi đã có nhiều
màn thì app shell buộc phải là một component dùng chung — thả tự do chỗ này chỉ tạo việc
dọn dẹp về sau, không đổi lại được gu thẩm mỹ nào.

**Thêm ba mục cấm** rút từ ba vòng trước: không ẩn hành động theo hover, không viết hoa
tiêu đề cột, không đặt nút chính dưới đáy trang phải cuộn.
