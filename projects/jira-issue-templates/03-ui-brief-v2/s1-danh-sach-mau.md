# Brief — S1 · Danh sách mẫu issue

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v3 — FR-03, FR-10, FR-11, FR-02 (mẫu không hợp lệ), lối vào FR-06
- **Ngày:** 2026-08-13
- **Màu đã ghim:** [vong-0/GHIM.md](../04-design-v2/vong-0/GHIM.md)
- **Viết lại từ đầu** cho vòng kiểm chứng skill — không chép bản v1.

---

## Phần dán vào Stitch

```text
Thiết kế một màn hình web cho công cụ nội bộ của doanh nghiệp.

BỐI CẢNH
Công cụ giúp nhân viên IT tạo issue trên Jira nhanh hơn bằng mẫu có sẵn.
Mẫu là bộ giá trị điền sẵn cho một loại issue hay lặp lại. Mỗi mẫu gắn với
đúng MỘT dự án Jira.
Chạy trên máy tính bàn/laptop. Phải dùng tốt ở BA mức rộng: từ 1440px trở lên,
1024-1439px (phổ biến nhất, laptop 13-14 inch), và 768-1023px (chấp nhận giảm
tiện nghi, thanh bên thu thành icon). Dưới 768px không cần.
Chiều cao dùng được khoảng 900px — bảng phải thấy được ít nhất 6 dòng mà
không cuộn.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
Chọn một mẫu rồi tạo issue ngay. Phần lớn lần vào màn là để làm đúng việc đó,
nên nút tạo issue phải nằm ngay trên từng dòng, không giấu trong menu. Việc
soạn/sửa mẫu là việc phụ, ít người làm và làm không thường xuyên.

ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY
Đây KHÔNG phải màn quản lý issue của Jira. Không có ô nhập JQL, không danh
sách issue, không sửa nội dung issue, không bình luận. Màn này chỉ liệt kê
MẪU.

KHUNG ỨNG DỤNG — ĐÂY LÀ YÊU CẦU, KHÔNG PHẢI SỐ ĐO
Chiều rộng thanh bên, chiều cao thanh trên, bo góc, chiều cao dòng: bạn quyết,
đừng hỏi tôi. Những điều dưới đây thì phải đúng:
- Thanh bên trái chứa: tên hệ thống "Jira Automation"; bộ chọn dự án Jira —
  danh sách 3 dự án, chọn MỘT; ba mục điều hướng "Mẫu issue", "Lịch sử issue",
  "Cấu hình dự án"; và khối "Thông tin tài khoản" ở ĐÁY.
- Khối "Thông tin tài khoản" phải LUÔN nhìn thấy được, dù bảng dài bao nhiêu.
  Đây là ràng buộc cứng, không phải mong muốn.
- Thanh trên có tiêu đề màn bên trái. Bên phải chỉ ba thứ: đúng MỘT nút hành
  động chính "Tạo mẫu mới", một nút đổi giao diện sáng/tối, và ảnh đại diện
  người dùng.
- KHÔNG có ô tìm kiếm toàn cục, KHÔNG chuông thông báo, KHÔNG nút trợ giúp.
- Thanh bên trái KHÔNG chứa nút hành động nào.
- Mỗi mục điều hướng ở thanh bên có một biểu tượng. Mục đang chọn là một khối
  bo tròn nền nhạt, không phải một vạch mảnh ở mép.

DẢI TỔNG QUAN Ở ĐẦU VÙNG NỘI DUNG
Bốn ô đếm, đọc thẳng từ bảng bên dưới: Tổng 6 mẫu · Đang dùng 3 · Nháp 2 ·
Không hợp lệ 1. Mỗi ô bấm được để lọc bảng theo đúng nhóm đó.
Đây là chỗ dùng bố cục thẻ; phần còn lại của màn vẫn ưu tiên mật độ.

BỘ CHỌN DỰ ÁN Ở THANH BÊN
Ba dự án, đang chọn ITSUP:
- ITSUP — Hỗ trợ người dùng
- HRQ — Yêu cầu nhân sự
- INFRA — Hạ tầng & Vận hành
Dự án người dùng không có quyền quản trị hiện thêm một biểu tượng khoá nhỏ.

BỘ LỌC
Một ô nhập tìm theo tên mẫu, và một ô chọn trạng thái:
Tất cả / Đang dùng / Nháp / Không hợp lệ — đang chọn "Tất cả".
Cần cho biết đang có bao nhiêu mẫu khớp.

DỮ LIỆU — BẢNG MẪU CỦA DỰ ÁN ITSUP (dùng đúng những dòng này)
Mỗi dòng có: tên mẫu, loại issue, mô tả ngắn, người sửa gần nhất, trạng thái,
và hành động theo dòng.

1. "Ghi nhận hỗ trợ đã xử lý" — Task — "Dùng khi đã xử lý xong yêu cầu qua
   điện thoại hoặc trực tiếp" — Phạm Việt Anh — ĐANG DÙNG — mẫu này tự đóng
   issue ngay sau khi tạo
2. "Yêu cầu cấp quyền truy cập hệ thống cho nhân sự chuyển bộ phận trong
   tháng 8" — Task — "Kèm sẵn checklist các hệ thống cần rà" — Nguyễn Thị Hoà
   — ĐANG DÙNG — không tự đóng
   (tên mẫu ở dòng này CỐ Ý dài, để kiểm tra chỗ tràn chữ)
3. "Sự cố mạng nội bộ" — Bug — "Ghi nhận sự cố mạng tại văn phòng" —
   Đặng Vũ Tuấn Kiệt — ĐANG DÙNG — không tự đóng
4. "Bàn giao thiết bị" — Task — "Cấp phát laptop, màn hình cho nhân sự mới" —
   Trương Thị Mỹ Duyên — NHÁP — chưa dùng được
5. "Đề nghị mua sắm" — Task — "" — (không có người sửa) — NHÁP — chưa dùng được
6. "Kiểm tra định kỳ máy chủ" — Task — "Checklist kiểm tra hằng tháng" —
   Phạm Việt Anh — KHÔNG HỢP LỆ — trường "Nhóm hỗ trợ" mà mẫu này dùng đã bị
   xoá khỏi Jira, phải sửa mẫu rồi mới tạo issue được

BA TRẠNG THÁI PHẢI PHÂN BIỆT ĐƯỢC NGAY, KHÔNG ĐƯỢC GỘP
  a. Đang dùng     → tạo issue được ngay
  b. Nháp          → người soạn chưa cho dùng; KHÔNG phải lỗi
  c. Không hợp lệ  → cấu hình Jira đã đổi, mẫu hỏng, phải sửa mới dùng được
Ca (b) hay bị vẽ thành lỗi. Ca (c) mới là lỗi thật và cần nói rõ hỏng ở đâu.
Với (b) và (c), nút tạo issue phải ở trạng thái không bấm được — nhưng KHÔNG
được làm mờ chữ đi, vì làm mờ thì không đọc nổi lý do.

HÀNH ĐỘNG TRÊN TỪNG DÒNG
- Tạo issue — hành động chính, hiện thường trực trên mọi dòng
- Sửa mẫu
- Nhân bản mẫu
- Ngừng dùng mẫu
Ba hành động sau chỉ hiện với người có quyền quản trị dự án. Ở màn này người
dùng CÓ quyền, nên hiện đủ cả bốn.

MÀN HÌNH PHỤ CẦN THIẾT KẾ THÊM
Trạng thái khi dự án đang chọn chưa có mẫu nào: nói rõ đang xem dự án nào,
giải thích mẫu dùng để làm gì, và có lối tạo mẫu đầu tiên. Không viết
"Không có dữ liệu".

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
Một dự án có thể có vài chục mẫu. Ưu tiên xem được nhiều dòng cùng lúc và so
sánh theo cột. Mỗi mẫu một thẻ to là sai với màn này.

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
- Không tự rút ngắn chuỗi dữ liệu ở trên — giữ nguyên văn, cho xuống dòng nếu chật

THÀNH PHẦN GIAO DIỆN ĐƯỢC DÙNG
Bảng, nút (chính/viền/mờ), nhãn trạng thái, ô nhập, ô chọn, hộp thoại, menu
thả xuống, thanh bên, thanh trên, dải thông báo.
Nếu cần một thành phần khác, hãy ghi chú lại — đừng tự thêm loại mới.

PHONG CÁCH
Tự do sáng tạo. Miễn là hợp với công cụ nội bộ dùng hằng ngày.
```

---

## Ghi chú cho ta — không dán vào Stitch

### Map về yêu cầu

| Phần trong brief | FR / mã quy tắc |
|---|---|
| Mẫu gắn đúng 1 dự án; bộ chọn dự án ở thanh bên chi phối bảng | FR-03 (tiêu chí 2), QĐ1 |
| Lọc theo tên + trạng thái, đếm số mẫu khớp | FR-03 (tiêu chí 3) |
| Trạng thái Nháp / Đang dùng | FR-03 (tiêu chí 5) |
| Trạng thái **Không hợp lệ** + không cho tạo issue | FR-02 (tiêu chí cuối) |
| Nút Sửa / Nhân bản / Ngừng dùng theo dòng | FR-10 (tiêu chí 1, 2, 4) |
| Ba hành động quản trị chỉ hiện với người có quyền | FR-11 (tiêu chí 3) |
| Nút "Tạo issue" ngay trên dòng | FR-06 (tiêu chí 1) + NFR-07 |
| Trạng thái dự án chưa có mẫu | `STATE-01` |
| Cấm opacity cho trạng thái không dùng được | `AP-11` |
| **Dải tổng quan 4 ô đếm ở đầu trang** | **[BỔ SUNG UX]** — không FR nào đòi |

> **`[BỔ SUNG UX]` — dải tổng quan.** Chốt 13/08/2026: hướng thiết kế đổi sang admin hiện đại
> kiểu TailAdmin, và dải thống kê đầu trang là đặc trưng của dòng đó. Nó **không** đến từ yêu
> cầu — brief vòng trước còn cấm tường minh. Dựng thì dựng, nhưng phải nằm ở đây để thành ứng
> viên cho `RequirementSet` v4, không lặng lẽ đi vào sản phẩm như thể yêu cầu vẫn luôn có.
> Bốn ô đếm đọc từ chính bảng bên dưới nên không phát sinh lời gọi Jira nào (FR-02).

### Vì sao có khối ràng buộc âm

FR-09 và mục *Ngoài phạm vi* loại tường minh JQL, sửa/bình luận issue. Một màn tên là
"Mẫu issue" là chỗ công cụ thiết kế **rất dễ** tự thêm danh sách issue và ô tìm kiếm nâng
cao, vì mọi màn Jira nó từng thấy đều có. Thêm ô thống kê đầu trang cũng vậy — không FR nào
đòi, và mỗi ô là một component phải dựng rồi bảo trì.

### Ba chỗ cố ý đặt bẫy

| Bẫy | Bắt lỗi gì |
|---|---|
| Dòng 2 tên dài 89 ký tự | Stitch **viết cụt chuỗi ngay trong markup** — đã lặp 3 lần ở vòng trước |
| Dòng 5 thiếu người sửa và mô tả rỗng | Có xử lý ô trống không, hay để trống trơn |
| Ca (b) Nháp và ca (c) Không hợp lệ | Có gộp "chưa dùng được" với "hỏng" không |

### Nhận bản thiết kế về thì kiểm gì

1. **Có mọc ô JQL hay danh sách issue không** — kiểm đầu tiên
1b. **Bốn ô đếm có khớp bảng không** (6 · 3 · 2 · 1) — Stitch hay bịa số cho đẹp
1c. **Ở 1024px và 768px** bố cục có vỡ không, thanh bên có thu theo bậc không (`RES-05`)
2. **Ba trạng thái** có phân biệt được không; Nháp có bị vẽ thành lỗi không
3. **Nút tạo issue** có trên mọi dòng và hiện thường trực không (`AP-11b`)
4. Dòng 2 có bị **viết cụt trong markup** không — kiểm cả text lẫn `title`
5. Dòng 5 ô trống có được xử lý không
6. **Khối tài khoản** ở đáy thanh bên có trong khung nhìn không (`RES-12`)
7. **Bộ chọn dự án** ở thanh bên có phải danh sách chọn được thật không, hay chỉ là dòng chữ tĩnh — Stitch đã bỏ sót đúng chỗ này ở vòng v1
8. Thanh bên có tự mọc nút không
9. Tiêu đề cột có bị `uppercase` không
10. Có vi phạm mục nào trong 11 điều "không được làm" không
