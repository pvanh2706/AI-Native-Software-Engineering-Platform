# Brief — S1 · Danh sách mẫu issue

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-03, FR-05, FR-06, FR-09, FR-11, NFR-07
- **Ngày:** 2026-08-10

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Người dùng là nhân viên nội bộ, mở công cụ này 20–30 lần mỗi ngày.
Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Người dùng chọn một mẫu issue rồi bấm tạo. Đây là việc họ làm nhiều lần mỗi ngày,
nên phải nhận ra và thao tác được thật nhanh. Từ lúc vào màn tới lúc tạo xong
issue không được quá 3 lần bấm.

BỐ CỤC TỔNG
- Thanh điều hướng bên trái: danh sách 3 dự án Jira (chọn 1), và các mục
  "Mẫu issue", "Lịch sử issue", "Cấu hình dự án". Dưới cùng thanh bên là
  khối tài khoản người dùng — phải luôn nhìn thấy được, không bị đẩy khỏi
  màn hình khi nội dung dài.
- Vùng nội dung chính: tiêu đề màn, danh sách mẫu, và bên dưới là danh sách
  issue vừa tạo gần đây.

DỮ LIỆU 1 — DANH SÁCH MẪU (thường 5–15 mẫu, tối đa 40)
Mỗi mẫu có:
- Tên mẫu
- Loại issue: Task / Bug / Story
- Sau khi tạo: "Tự động chuyển sang Done" hoặc "Để mở"
- Trạng thái: Đang bật / Nháp / Không hợp lệ
- Có phải mẫu mặc định của dự án không

Dữ liệu mẫu thật (dùng đúng những dòng này):
1. "Ghi nhận hỗ trợ đã xử lý" — Task — Tự động Done — Đang bật — LÀ MẪU MẶC ĐỊNH
2. "Cấp quyền truy cập" — Task — Tự động Done — Đang bật
3. "Sự cố cần theo dõi" — Bug — Để mở — Đang bật
4. "Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8" — Task — Để mở — Nháp
   (dòng này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
5. "Bàn giao thiết bị" — Task — Tự động Done — Không hợp lệ
   kèm dòng giải thích nhỏ: Field "Người bàn giao" không còn tồn tại trên Jira

Mẫu "Nháp" và "Không hợp lệ" thì KHÔNG dùng được — phải nhìn ra ngay là không
bấm được, và phải nói rõ vì sao.

DỮ LIỆU 2 — ISSUE VỪA TẠO (3–10 dòng)
Mỗi dòng có: mã issue, tên mẫu đã dùng, người tạo, thời điểm, kết quả tự động
chuyển trạng thái.

Dữ liệu mẫu thật:
- ITSUP-2482 — Ghi nhận hỗ trợ đã xử lý — Phạm Việt Anh — 10/08 09:41 — LỖI: chưa chuyển được sang Done
- ITSUP-2481 — Ghi nhận hỗ trợ đã xử lý — Phạm Việt Anh — 10/08 09:36 — Done
- ITSUP-2479 — Cấp quyền truy cập — Nguyễn Thị Hoa — 10/08 08:58 — Done

HÀNH ĐỘNG
- Chính (dùng nhiều nhất): chọn một mẫu để tạo issue
- Phụ: tạo mẫu mới — chỉ người có quyền quản trị dự án mới thấy
- Từ dòng issue lỗi: mở ra để xử lý

MÀN HÌNH PHỤ CẦN THIẾT KẾ THÊM
Trạng thái khi dự án chưa có mẫu nào: nói rõ vì sao trống và bước tiếp theo là gì,
kèm hành động tạo mẫu đầu tiên. Không viết "Không có dữ liệu".

CHẾ ĐỘ HIỂN THỊ
Thiết kế cả giao diện sáng và giao diện tối. Chế độ tối dùng nền đen.

MẬT ĐỘ
Ưu tiên nhìn được nhiều thông tin trên một màn. Người dùng mở nhiều lần mỗi ngày
nên tốc độ đọc quan trọng hơn sự thoáng đãng. Tránh để trống quá nửa màn hình.

KHÔNG ĐƯỢC LÀM (đây là công cụ nội bộ, không phải trang giới thiệu)
- Không gradient làm nền cho vùng có chữ
- Không ảnh bìa lớn, không khối hero
- Không animation trang trí
- Không dùng thẻ (card) chỉ để nhóm hai dòng chữ
- Không giấu hành động chính trong menu ba chấm
- Không dùng màu làm tín hiệu duy nhất — luôn kèm chữ hoặc biểu tượng
- Không xếp từ hai dải thông báo trở lên liên tiếp ở đầu màn
- Không viết hoa toàn bộ cụm quá 3 từ (tiếng Việt viết hoa hết rất khó đọc)

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
| Danh sách mẫu theo dự án | FR-03, FR-05 |
| Chọn mẫu → tạo issue, ≤ 3 lần bấm | FR-06, NFR-07 |
| Trạng thái "Không hợp lệ" + lý do | FR-02 |
| Nút "Tạo mẫu" chỉ hiện với quản trị | FR-11 |
| Dải issue vừa tạo | FR-09 (là **[BỔ SUNG UX]**, chưa có trong FR gốc) |
| Trạng thái rỗng | `STATE-01` |

### Cố ý KHÔNG đưa vào brief

- **Màu, bo góc, phong cách** — để Stitch tự quyết, đó là lý do dùng nó
- **Trạng thái lỗi / không quyền / đang tải** — sẽ bù từ `KitPage` khi convert. Bắt Stitch vẽ đủ 6 trạng thái cho mọi màn là gánh nặng vô lý
- **Chi tiết kỹ thuật Jira** (endpoint, PAT, transition) — không liên quan tới thiết kế màn này

### Nhận bản thiết kế về thì kiểm gì

1. **Dòng số 4 dài** có bị tràn hoặc cắt chữ không — nếu Stitch tự rút ngắn nó thì bản thiết kế chưa xử lý ca thật
2. **Dấu tiếng Việt** ở dòng chật có bị cắt không (ề, ộ, ữ)
3. **Mẫu Nháp / Không hợp lệ** có nhìn ra là không dùng được không, và **không dùng `opacity`** để thể hiện (lỗi `AP-11` — check tự động mù trước ca này)
4. **Khối tài khoản** ở đáy thanh bên có nằm trong khung nhìn không (`RES-12`)
5. **Đếm số lần bấm** để tạo một issue — phải ≤ 3
6. Có vi phạm mục nào trong danh sách "không được làm" không
7. Chạy `tools/ui-eval` sau khi convert, báo `CMP-01` (% dùng lại component)

### Sau vòng đầu

Ghi lại brief **thiếu gì** khiến Stitch đoán sai, sửa vào mẫu ở [README.md](README.md), rồi mới viết brief cho các màn còn lại.
