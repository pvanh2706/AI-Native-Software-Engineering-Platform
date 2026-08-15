# S2 — Tạo issue từ mẫu · ghi chú bản thiết kế

> Đã chuẩn hoá theo [QUYET-DINH.md](../QUYET-DINH.md) ngay khi nhận. Bản Stitch gốc cất ở
> [goc-stitch/](../goc-stitch/).

Sinh bằng `generate_screen_from_text` qua Stitch MCP ngày 11/08/2026, prompt lấy nguyên khối
dán từ [brief S2](../../03-ui-brief/s2-tao-issue-tu-mau.md). Session `10694166722052380389`.

| File | Màn | Từ đâu ra |
|---|---|---|
| `form.html` · `form.png` | Form tạo issue | Stitch sinh |
| `tao-thanh-cong.html` · `.png` | Tạo xong, đã đóng tự động | Stitch sinh |
| `dong-tu-dong-loi.html` · `.png` | Tạo xong nhưng chuyển trạng thái hỏng | Stitch sinh |
| `tao-that-bai.html` · `.png` | Tạo thất bại | **Ta dẫn xuất từ `form.html`** — bản Stitch đã bỏ |

## Điểm sáng: FR-08 được hiểu đúng

Màn "tạo xong nhưng chuyển trạng thái hỏng" là chỗ khó nhất của cả bộ yêu cầu, và Stitch
làm đúng tinh thần:

- Tiêu đề dẫn bằng **thành công** — *"Issue ITSUP-2484 đã được tạo thành công"* — rồi mới
  nói phần hỏng. Đúng thứ FR-08 sinh ra để chặn: không được để người dùng tưởng tạo hỏng
- Dùng **vàng cảnh báo**, không dùng đỏ — tách hẳn khỏi màn tạo thất bại
- Nêu đủ ba thứ FR-08 đòi: đã đi tới *"Chờ duyệt"*, hỏng ở bước *"Chờ duyệt → Đã xong"*,
  lý do *thiếu quyền thực hiện transition*
- Có nút **thử lại việc chuyển trạng thái**, tách khỏi nút mở trên Jira

Form chính cũng đạt: ô mô tả đúng là **wiki markup** kèm bảng tra cú pháp bên cạnh (không
bị vẽ thành trình soạn thảo giàu định dạng), nút "Tạo issue" nằm ngay khung nhìn đầu tiên,
và hai trường sinh tự động có nhãn **"Tự sinh"** riêng.

## Đặc tả app shell vào prompt: ăn một nửa

Đây là lần đầu đưa [QĐ1](../QUYET-DINH.md) thẳng vào prompt thay vì để Stitch tự nghĩ.

| Yêu cầu trong prompt | Kết quả |
|---|---|
| Không ô tìm kiếm / chuông / trợ giúp / avatar | ✅ 3/4 màn sạch |
| Thanh bên chỉ có điều hướng + khối tài khoản | ❌ cả 4 màn vẫn mọc nút "Tạo mẫu mới" |
| Khối tài khoản ở đáy, trong khung nhìn | ✅ |

Kết luận: nói **không được có gì** thì Stitch nghe; nhưng thứ nó cho là hiển nhiên phải có
(nút hành động ở thanh bên) thì vẫn tự thêm dù đã liệt kê đủ thành phần thanh bên. Lần sau
nên cấm tường minh như cách đã làm với ràng buộc âm ở S5b.

Vẫn là tiến bộ rõ: ba vòng trước phải sửa cả ô tìm kiếm, chuông, trợ giúp, avatar và logo;
vòng này chỉ còn một thứ phải gỡ.

## Bản "tạo thất bại" phải dẫn xuất lại

Bản Stitch sinh **là một form khác hẳn**, không phải form của màn chính:

| | `form.html` | bản Stitch sinh |
|---|---|---|
| Dự án | ITSUP — Hỗ trợ nội bộ | "Tự động hóa hệ thống (AUTO)" |
| Tiêu đề | Hỗ trợ người dùng khối văn phòng… | "Khắc phục lỗi đồng bộ hóa dữ liệu…" |
| Người được giao | Phạm Việt Anh | "Nguyễn Văn A" |
| Khối trường khoá | có | **mất** |
| Bảng tra cú pháp wiki | có | **mất** |
| Nhãn, chọn hai tầng, người yêu cầu | có | **mất** |

Nhưng phần **xử lý lỗi thì lại chuẩn**: lỗi Jira nguyên văn `Field 'customfield_10312' is
required.`, gắn đúng vào trường gây lỗi, kèm dải báo ở đầu màn. Nên chỉ bỏ cái form, giữ
cách xử lý lỗi rồi ghép vào `form.html`.

### Điều này làm rõ thêm luật ở [README brief](../../03-ui-brief/README.md)

Trước nay luật là *"xin trạng thái thì được, xin biến thể thì hỏng"*. Vòng này cho thấy
ranh giới thật nằm ở chỗ khác:

| Loại trạng thái | Kết quả |
|---|---|
| Hộp thoại độc lập (`tao-thanh-cong`, `dong-tu-dong-loi`) | ✅ tốt — nội dung vốn ít, không cần chép lại màn chính |
| Trạng thái **phải vẽ lại toàn bộ màn chính** (`tao-that-bai`) | ❌ hỏng — Stitch dựng lại form từ đầu và lệch hết |

Nói gọn: **hễ một trạng thái buộc phải chép lại nội dung của màn khác thì Stitch sẽ chép
sai.** Cách đúng vẫn là tự dẫn xuất từ màn gốc.

## Đã sửa khi chuẩn hoá

| Việc | Chi tiết |
|---|---|
| `AP-11` | Khối **trường khoá** báo hiệu bằng `opacity-80` — đúng thứ brief cấm. Thay bằng nền + viền đặc |
| `AP-11` | `opacity-80` trên câu phụ đề màn chuyển trạng thái lỗi, và trên một ô nhập ở màn thất bại |
| `QĐ2` | Bỏ `uppercase` ở *"Trường cố định theo mẫu"* (4 từ) |
| `QĐ6` | 4 hex tuỳ ý ở màn thành công (`#E3FCEF`, `#C0EDD6`, `#006644`, `#091E42`) → vai trò ngữ nghĩa; thêm token `scrim` |
| `QĐ6` | Stitch **tự bịa bộ `warning` riêng** (`#e2b203`…) → đưa về đúng giá trị amber của design system org |
| Tương phản | Icon cảnh báo ⓘ dùng `text-warning` cho 1.8:1 → đổi sang `on-warning-container` |
| Dữ liệu | Tên trường bị rút gọn thành *"Thời gian thực tế (phút)"* → trả lại nguyên văn brief |
| Điều hướng | Mục đang chọn là *"Lịch sử issue"* → sửa thành *"Mẫu issue"* |
| `QĐ1` | Gỡ nút "Tạo mẫu mới" khỏi thanh bên ở cả 4 màn |

**Tên trường bị rút gọn là lần thứ hai** Stitch tự sửa dữ liệu trong markup — lần đầu ở S5a
với tên dự án. Nhưng lần này **tiêu đề dài thì còn nguyên** (`…cấp lại quyền truy cập ngày
11/08/2026`), chỉ bị ô một dòng che bớt về mặt thị giác. Nên khi kiểm phải soi **cả text lẫn
`value`**, đừng chỉ nhìn ảnh.

## Kiểm chứng

Tương phản chữ WCAG, đo trên nền thực tế có cộng dồn opacity:

| Màn | Trước | Sau |
|---|---|---|
| `form` | 2 | **0** |
| `tao-that-bai` | 0 | **0** |
| `dong-tu-dong-loi` | 1 | **0** |
| `tao-thanh-cong` | 7 | **5** — xem dưới |

**5 chỗ còn lại ở `tao-thanh-cong` đều nằm sau lớp nền mờ của modal** (`blur-[2px]` +
`opacity-60` trên toàn bộ khung app). Đây là nền che sau hộp thoại, không phải nội dung để
đọc — bộ đo không phân biệt được ngữ cảnh modal. Giữ nguyên: ép chúng lên 4.5:1 thì mất
luôn tác dụng của lớp che.

Ranh giới đang áp dụng: `opacity` **cấm** khi dùng để báo trạng thái không dùng được
(`AP-11`), **cho phép** ở nền che modal và ở hiệu ứng `hover:`.

Nội dung form giữa `form.html` và `tao-that-bai.html` kiểm bằng script — 7/7 mốc nội dung
trùng khớp.

## Còn treo

Không có gì chặn. `NFR-07` (≤ 3 lần bấm) phải đếm trên bản Vue chạy thật, không đếm được
trên ảnh tĩnh — để lại cho bước eval sau convert.
