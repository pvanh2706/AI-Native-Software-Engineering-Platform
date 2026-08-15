# Brief — S5a · Cấu hình: danh sách dự án

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-05, FR-02, FR-11
- **Ngày:** 2026-08-11
- **Đã áp bài học vòng S1:** xem [§Khác gì brief S1](#khác-gì-brief-s1)

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Màn này thuộc khu vực quản trị, người dùng chỉ vào khi cần chỉnh cấu hình —
vài lần một tuần, không phải hằng ngày.
Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Cho người quản trị nhìn một lượt tất cả dự án mà hệ thống đang biết, thấy ngay
dự án nào chưa cấu hình xong hoặc dữ liệu đã cũ, rồi mở vào dự án cần sửa.
Đây là màn ĐIỀU HƯỚNG VÀ CHẨN ĐOÁN, không phải màn nhập liệu — mọi việc chỉnh
sửa nằm ở màn chi tiết.

ĐIỂM QUAN TRỌNG VỀ NGỮ CẢNH
Khu vực cấu hình này ĐỘC LẬP với dự án đang chọn ở thanh điều hướng chính.
Người dùng chọn dự án ngay trong danh sách của màn này. Đừng thiết kế bộ chọn
dự án thứ hai ở đầu màn — sẽ thành hai cách chọn song song gây rối.

BỐ CỤC TỔNG
- Thanh điều hướng bên trái: các mục "Mẫu issue", "Lịch sử issue", "Cấu hình
  dự án" (mục này đang được chọn). Dưới cùng thanh bên là khối tài khoản người
  dùng — phải luôn nhìn thấy được, không bị đẩy khỏi màn hình khi nội dung dài.
- Vùng nội dung chính: tiêu đề màn, và bảng danh sách dự án.

DỮ LIỆU — DANH SÁCH DỰ ÁN (thường 3–8 dự án, tối đa 10)
Mỗi dự án có:
- Mã dự án (viết tắt, ví dụ ITSUP) và tên đầy đủ
- Quyền của người đang đăng nhập: "Quản trị" hoặc "Chỉ xem"
- Đã đặt status đích cho việc tự động đóng issue hay chưa
- Số mẫu issue đang có
- Thời điểm lấy thông tin từ Jira gần nhất, và có bị quá hạn không
  (quá hạn nghĩa là đã hơn 24 tiếng)

Dữ liệu mẫu thật (dùng đúng những dòng này):
1. ITSUP — "Hỗ trợ nội bộ" — Quản trị — đã đặt status đích — 12 mẫu —
   lấy về lúc 11/08 08:30
2. HRQ — "Yêu cầu nhân sự" — Quản trị — CHƯA đặt status đích — 4 mẫu —
   lấy về lúc 11/08 07:15
3. INFRA — "Hạ tầng và vận hành hệ thống nội bộ khối văn phòng" — Chỉ xem —
   đã đặt status đích — 7 mẫu — lấy về lúc 10/08 16:02
   (tên dự án này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
4. DEVOPS — "Triển khai và vận hành" — Quản trị — đã đặt status đích — 9 mẫu —
   lấy về lúc 08/08 09:20 — ĐÃ QUÁ HẠN
5. LEGAL — "Pháp chế" — Chỉ xem — CHƯA đặt status đích — 0 mẫu —
   lần lấy gần nhất THẤT BẠI lúc 11/08 06:40, kèm dòng giải thích nhỏ:
   Jira không phản hồi — đang dùng dữ liệu cũ từ 09/08 18:00

Ba tình huống dưới đây phải NHÌN LÀ BIẾT NGAY, và mỗi cái phải nói rõ hệ quả:
- Chưa đặt status đích → mẫu bật tự động đóng sẽ không lưu được
- Dữ liệu đã quá hạn → cần lấy lại thông tin từ Jira
- Lần lấy gần nhất thất bại → đang hiển thị dữ liệu cũ, không phải mất dữ liệu

HÀNH ĐỘNG
- Chính: mở một dự án để xem và chỉnh cấu hình của nó
- Trên từng dòng: lấy lại thông tin từ Jira cho riêng dự án đó
- Trên toàn màn: lấy lại thông tin cho tất cả dự án

TRẠNG THÁI ĐANG LẤY THÔNG TIN — CẦN THIẾT KẾ THÊM
Việc lấy thông tin từ Jira có thể lâu quá 2 giây. Thiết kế thêm trạng thái
đang chạy: cho biết đang chạy tới đâu, và cho HUỶ giữa chừng.

MÀN HÌNH PHỤ CẦN THIẾT KẾ THÊM
Trạng thái khi hệ thống chưa kết nối dự án Jira nào: nói rõ vì sao trống và
bước tiếp theo là gì, kèm hành động kết nối dự án đầu tiên.
Không viết "Không có dữ liệu".

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
Ưu tiên nhìn được cả danh sách trên một màn, không phải cuộn. Số dự án ít
(dưới 10) nên mỗi dòng được phép cao thoáng hơn một bảng dữ liệu dày đặc,
nhưng vẫn phải so sánh được các dòng với nhau bằng mắt.

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

THÀNH PHẦN GIAO DIỆN ĐƯỢC DÙNG
Bảng, nút (chính/viền/mờ), nhãn trạng thái, ô nhập, ô chọn, hộp kiểm, công tắc,
tab, hộp thoại, menu thả xuống, thanh bên, thanh trên, thanh tiến trình.
Nếu cần một thành phần khác, hãy ghi chú lại — đừng tự thêm loại mới.

PHONG CÁCH
Tự do sáng tạo. Miễn là hợp với công cụ nội bộ dùng hằng ngày.
```

---

## Ghi chú cho ta — không dán vào Stitch

### Map về yêu cầu

| Phần trong brief | FR |
|---|---|
| Danh sách mọi dự án + quyền + số mẫu + thời điểm đồng bộ | FR-05 (tiêu chí 1) |
| Không phụ thuộc dự án đang chọn ở điều hướng chính | FR-05 (tiêu chí 3) |
| Cột "Chỉ xem" cho người không có quyền quản trị | FR-05 (tiêu chí 4), FR-11 |
| Nút lấy lại thông tin — một dự án / tất cả | FR-02 (tiêu chí 6, 8) |
| Đánh dấu quá hạn | FR-02 (tiêu chí 7) |
| Lấy thất bại → giữ dữ liệu cũ, không xoá cache | FR-02 (tiêu chí 9) |
| Trạng thái đang chạy > 2 giây, có huỷ | FR-02 (tiêu chí 8) |
| Trạng thái rỗng | `STATE-01` |

### Cố ý KHÔNG đưa vào brief

- **Màu, bo góc, phong cách** — để Stitch tự quyết, đó là lý do dùng nó
- **Việc màn này đọc từ CSDL chứ không gọi Jira** (FR-02 tiêu chí 5) — đó là
  ràng buộc kỹ thuật, không đổi gì trên giao diện. Đưa vào chỉ làm nhiễu
- **Chi tiết cấu hình từng dự án** — thuộc [S5b](s5b-cau-hinh-chi-tiet-du-an.md)

### Nhận bản thiết kế về thì kiểm gì

1. **Tên dự án dòng 3 dài** có bị tràn hoặc bị tự rút ngắn không
2. **Dấu tiếng Việt** ở dòng chật có bị cắt không (ề, ộ, ữ)
3. **Ba tình huống cảnh báo** (chưa đặt status đích / quá hạn / lấy thất bại) có
   phân biệt được với nhau không, hay bị gộp thành một kiểu cảnh báo chung
4. Dòng "Chỉ xem" có bị thể hiện bằng `opacity` không (`AP-11`)
5. **Khối tài khoản** ở đáy thanh bên có nằm trong khung nhìn không (`RES-12`)
6. Có sinh ra bộ chọn dự án thứ hai ở đầu màn không — nếu có là hiểu sai `PRIN-04`
7. Có vi phạm mục nào trong danh sách "không được làm" không

### Khác gì brief S1

Ba chỗ sửa từ bài học vòng S1 — xem [ghi chú bản thiết kế S1](../04-design/s1-danh-sach-mau/ghi-chu.md):

1. **Bỏ yêu cầu thiết kế giao diện tối.** S1 có ghi "thiết kế cả sáng và tối",
   Stitch trả về một màn tối **lệch hẳn nội dung** so với màn sáng (khác cột,
   thừa ô tìm kiếm, thiếu cột thao tác) — coi như bỏ đi. Nay chỉ xin bản sáng,
   bản tối ta tự dựng bằng token, đảm bảo hai bản không bao giờ lệch nội dung.
2. **Thêm "không dùng opacity cho trạng thái vô hiệu"** vào danh sách cấm. S1
   không ghi, và Stitch đã dùng `opacity-60` cho dòng Nháp → tương phản rơi
   xuống 2.24:1, đúng lỗi `AP-11` mà brief S1 đã dự đoán ở phần kiểm nhưng lại
   quên cấm ở phần dán.
3. **Nói thẳng "màn này KHÔNG phải màn nhập liệu"**. Không có ở S1 vì S1 chỉ có
   một việc. Ở đây ranh giới S5a/S5b dễ bị nhoè — không nói rõ thì Stitch sẽ
   nhét form cấu hình vào luôn màn danh sách, phá đúng lý do FR-05 tách hai màn.
