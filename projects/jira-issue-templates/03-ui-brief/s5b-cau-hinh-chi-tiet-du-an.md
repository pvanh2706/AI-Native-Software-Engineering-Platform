# Brief — S5b · Cấu hình: chi tiết một dự án

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-05, FR-07, FR-11
- **Ngày:** 2026-08-11
- **Mở từ:** [S5a — danh sách dự án](s5a-cau-hinh-danh-sach-du-an.md)

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Màn này thuộc khu vực quản trị, mở ra từ danh sách dự án. Người dùng chỉ vào
khi cần chỉnh cấu hình — vài lần một tuần, không phải hằng ngày.
Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Chỉnh những thứ dùng chung cho cả một dự án, để mọi mẫu issue trong dự án đó
hành xử nhất quán. Đây LÀ màn nhập liệu — khác với màn danh sách chỉ để xem.

BỐ CỤC TỔNG
- Thanh điều hướng bên trái: các mục "Mẫu issue", "Lịch sử issue", "Cấu hình
  dự án" (mục này đang được chọn). Dưới cùng thanh bên là khối tài khoản người
  dùng — phải luôn nhìn thấy được, không bị đẩy khỏi màn hình khi nội dung dài.
- Vùng nội dung chính: có đường quay lại danh sách dự án, tên dự án đang mở,
  rồi tới các phần cấu hình bên dưới.

DỰ ÁN ĐANG MỞ (dùng đúng dữ liệu này)
ITSUP — "Hỗ trợ nội bộ" — người đang xem có quyền Quản trị —
lấy thông tin từ Jira gần nhất lúc 11/08 08:30

PHẦN 1 — TRẠNG THÁI ĐÍCH KHI TỰ ĐỘNG ĐÓNG ISSUE
Chọn MỘT trạng thái từ danh sách trạng thái có thật trong quy trình của dự án.
Đây là ô CHỌN từ danh sách, tuyệt đối không phải ô gõ chữ tự do.

Danh sách chọn được: Cần làm / Đang làm / Chờ duyệt / Đã xong / Đã huỷ
Đang chọn: "Đã xong"

Cần một dòng giải thích ngắn: đây là trạng thái mà issue sẽ được chuyển tới
sau khi tạo, với những mẫu có bật chế độ tự động đóng.

PHẦN 2 — GIÁ TRỊ CHO CÁC TRƯỜNG BẮT BUỘC KHI CHUYỂN TRẠNG THÁI
Khi chuyển issue sang trạng thái đích, Jira bắt điền một số trường. Người quản
trị khai sẵn giá trị ở đây, một lần cho cả dự án.
Tên trường LẤY TỪ Jira, không cho gõ tay tên trường — người dùng chỉ chọn hoặc
nhập GIÁ TRỊ.

Dữ liệu mẫu thật:
- Trường "Resolution" (bắt buộc) — chọn từ danh sách — đang chọn "Done"
- Trường "Thời gian thực tế đã bỏ ra để xử lý" (bắt buộc) — nhập số —
  đang để trống, và ĐANG BÁO LỖI vì bắt buộc mà chưa có giá trị
  (tên trường này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
- Trường "Ghi chú bàn giao" (không bắt buộc) — nhập chữ — đang để trống

PHẦN 3 — DANH SÁCH MẪU CỦA DỰ ÁN
Ở đây làm ba việc: chọn mẫu mặc định, đổi thứ tự hiển thị, bật/tắt từng mẫu.
Đổi thứ tự bằng cách kéo thả.

Dữ liệu mẫu thật (đang xếp theo đúng thứ tự này):
1. "Ghi nhận hỗ trợ đã xử lý" — đang bật — LÀ MẪU MẶC ĐỊNH
2. "Cấp quyền truy cập" — đang bật
3. "Sự cố cần theo dõi" — đang bật
4. "Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8" — đang tắt
   (dòng này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
5. "Bàn giao thiết bị" — đang bật — nhưng KHÔNG HỢP LỆ, kèm dòng giải thích nhỏ:
   Field "Người bàn giao" không còn tồn tại trên Jira

Chỉ được có ĐÚNG MỘT mẫu mặc định. Mẫu đang tắt thì không được chọn làm mặc định.

ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY
Không có công tắc bật/tắt "tự động đóng issue" ở màn này. Việc đó nằm ở từng
mẫu, không phải ở cấp dự án. Màn này chỉ khai trạng thái đích dùng chung.

HÀNH ĐỘNG
- Chính: lưu thay đổi
- Phụ: huỷ bỏ thay đổi, quay lại danh sách dự án
- Trên từng dòng mẫu: bật/tắt, đặt làm mặc định, kéo để đổi thứ tự

MÀN HÌNH PHỤ CẦN THIẾT KẾ THÊM — CHẾ ĐỘ CHỈ XEM
Người KHÔNG có quyền quản trị dự án vẫn mở được màn này, nhưng không sửa được
gì. Thiết kế thêm bản chỉ xem: mọi ô đều không sửa được, không có nút lưu, và
có một lời giải thích rõ VÌ SAO không sửa được cùng gợi ý liên hệ ai.
Đừng chỉ làm mờ mọi thứ đi rồi thôi.

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
Màn này có ba phần rõ rệt, ưu tiên đọc hiểu và điền đúng hơn là nhồi nhiều
thông tin. Nhưng vẫn phải thấy được cả ba phần mà không cuộn quá một màn rưỡi.

KHÔNG ĐƯỢC LÀM (đây là công cụ nội bộ, không phải trang giới thiệu)
- Không gradient làm nền cho vùng có chữ
- Không ảnh bìa lớn, không khối hero
- Không animation trang trí
- Không dùng thẻ (card) chỉ để nhóm hai dòng chữ
- Không giấu hành động chính trong menu ba chấm
- Không dùng màu làm tín hiệu duy nhất — luôn kèm chữ hoặc biểu tượng
- Không dùng độ mờ (opacity) để thể hiện trạng thái không dùng được —
  hãy dùng một màu chữ riêng, vì chữ mờ đi thì không đọc nổi
- Không xếp từ hai dải thông báo trở lên liên tiếp ở đầu màn
- Không viết hoa toàn bộ cụm quá 3 từ (tiếng Việt viết hoa hết rất khó đọc)
- Không đặt nhãn ô nhập vào bên trong ô rồi để nó biến mất khi gõ

THÀNH PHẦN GIAO DIỆN ĐƯỢC DÙNG
Bảng, nút (chính/viền/mờ), nhãn trạng thái, ô nhập, ô chọn, hộp kiểm, công tắc,
tab, hộp thoại, menu thả xuống, thanh bên, thanh trên.
Nếu cần một thành phần khác, hãy ghi chú lại — đừng tự thêm loại mới.

PHONG CÁCH
Tự do sáng tạo. Miễn là hợp với công cụ nội bộ dùng hằng ngày.
```

---

## Ghi chú cho ta — không dán vào Stitch

### Map về yêu cầu

| Phần trong brief | FR |
|---|---|
| Status đích chọn từ danh sách thật, không gõ tay | FR-05 (tiêu chí 5, 8) |
| Giá trị field bắt buộc khi transition, tên field lấy từ metadata | FR-05 (tiêu chí 6) |
| Mẫu mặc định, thứ tự hiển thị, bật/tắt từng mẫu | FR-05 (tiêu chí 3, 9, 10) |
| Không có công tắc auto-Done ở cấp dự án | FR-05 (tiêu chí 12) — **ràng buộc âm** |
| Chế độ chỉ xem cho người không có quyền | FR-05 (tiêu chí 4), FR-11 |
| Mẫu không hợp lệ kèm lý do | FR-02 (tiêu chí 10) |

### Cố ý KHÔNG đưa vào brief

- **Màu, bo góc, phong cách** — để Stitch tự quyết
- **Chuỗi transition nhiều bước, giới hạn 5 bước, phát hiện vòng lặp** (FR-07) —
  là logic chạy nền, không có mặt trên màn cấu hình này
- **Trạng thái đang tải / lỗi mạng** — bù từ `KitPage` khi convert

### Vì sao phải nói "ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY"

Đây là **ràng buộc âm** duy nhất trong cả bộ brief, và nó là chỗ dễ sai nhất của
cả dự án. Lịch sử thay đổi v2→v3 ghi rõ: bật/tắt auto-Done từng nằm ở cấp dự án,
sau chuyển xuống cấp mẫu theo A-05 — **khác nguyên văn yêu cầu ban đầu**.

Công cụ thiết kế đọc "cấu hình tự động đóng issue" thì gần như chắc chắn sẽ vẽ
thêm một công tắc bật/tắt cho tiện. Không cấm thẳng thì bản thiết kế sẽ tái lập
đúng mô hình đã bị bác bỏ, và cái sai đó sẽ đi thẳng vào code.

### Nhận bản thiết kế về thì kiểm gì

1. **Có mọc ra công tắc auto-Done cấp dự án không** — kiểm đầu tiên, quan trọng nhất
2. **Tên field dòng 2 và tên mẫu dòng 4 dài** có tràn hoặc bị tự rút ngắn không
3. **Dấu tiếng Việt** ở dòng chật có bị cắt không (ề, ộ, ữ)
4. **Ô status đích** có đúng là ô chọn không, hay bị vẽ thành ô gõ chữ tự do
5. **Bản chỉ xem** có lời giải thích thật không, hay chỉ làm mờ mọi thứ (`AP-11`)
6. **Mẫu không hợp lệ** có nói rõ hỏng chỗ nào không
7. **Khối tài khoản** ở đáy thanh bên có nằm trong khung nhìn không (`RES-12`)
8. Có vi phạm mục nào trong danh sách "không được làm" không

### Thứ tự làm

Làm [S5a](s5a-cau-hinh-danh-sach-du-an.md) trước. S5b thừa hưởng ngôn ngữ thị
giác của S5a — chạy hai màn cùng lúc thì hai bản dễ lệch nhau, đúng lỗi đã gặp
giữa bản sáng và bản tối của S1.
