# Brief Vòng 0 — chốt ngôn ngữ thị giác

- **Mục đích:** ghim **bảng màu** cho cả sản phẩm trước khi thiết kế màn nghiệp vụ nào. Xem [SKILL §Bước 0](../../../.claude/skills/make-ui-brief/SKILL.md).
- **Ngày:** 2026-08-13
- **Project Stitch:** `8915115124044208786` — *Jira Issue Templates — thiết kế lại v2*
- **Không** yêu cầu màn nghiệp vụ nào. Một màn đại diện, nội dung chung chung, nhưng **dùng đủ mọi vai trò màu** để trích ra bảng đầy đủ.

---

## Phần dán vào Stitch

```text
Thiết kế MỘT màn hình đại diện cho một công cụ nội bộ của doanh nghiệp.

Mục đích của lần thiết kế này là chốt NGÔN NGỮ THỊ GIÁC cho cả sản phẩm —
không phải thiết kế một chức năng cụ thể. Hãy tự do chọn bảng màu, kiểu chữ,
bo góc, cách phân lớp bề mặt. Đây là phần tôi muốn ở bạn.

BỐI CẢNH SẢN PHẨM
Công cụ nội bộ cho nhân viên IT của một doanh nghiệp Việt Nam. Người dùng mở
nó nhiều lần mỗi ngày để làm việc lặp lại: xem danh sách, lọc, điền biểu mẫu
ngắn, xử lý các bản ghi bị lỗi. Không phải trang giới thiệu, không phải sản
phẩm tiêu dùng. Người dùng thạo việc và muốn nhanh.

Chỉ chạy trên máy tính bàn/laptop, màn hình 1440x900. Không cần điện thoại.
Toàn bộ giao diện bằng TIẾNG VIỆT.

MẬT ĐỘ
Cao. Ưu tiên xem được nhiều dòng cùng lúc và so sánh theo cột. Mỗi bản ghi một
thẻ to là sai với loại sản phẩm này.

MÀN ĐẠI DIỆN CẦN CHỨA ĐỦ NHỮNG THỨ SAU
Nội dung bên dưới là nội dung chung chung, cố ý không gắn với chức năng thật.
Điều tôi cần là thấy bạn chọn màu và hình dạng thế nào cho TỪNG loại thành phần.

1. Khung ứng dụng
   - Thanh bên trái cố định 240px: tên hệ thống, một danh sách chọn một mục,
     ba mục điều hướng, và một khối thông tin tài khoản ở ĐÁY — khối này phải
     luôn nhìn thấy được, không bị đẩy khỏi khung nhìn.
   - Thanh trên cao 64px: tiêu đề màn bên trái, đúng MỘT nút hành động chính
     bên phải.
   - KHÔNG có ô tìm kiếm toàn cục, KHÔNG chuông thông báo, KHÔNG nút trợ giúp,
     KHÔNG avatar trên thanh trên.

2. Một dải thông báo ở đầu vùng nội dung
   "Bản ghi cuối cùng được đồng bộ lúc 09:41 hôm nay."

3. Ba bộ lọc đặt ngay trên bảng
   - Một ô chọn: Tất cả / Nhóm A / Nhóm B
   - Một ô chọn: Tất cả / Đang chạy / Tạm dừng
   - Một ô nhập tìm theo tên
   Kèm dòng cho biết đang có bao nhiêu bản ghi khớp.

4. Một bảng dữ liệu 6 dòng, mỗi dòng có: tên, người phụ trách, thời điểm,
   một nhãn trạng thái, và hành động theo dòng.
   Bốn loại nhãn trạng thái PHẢI trông khác nhau rõ rệt:
   - "Hoàn tất"     — việc đã xong trọn vẹn
   - "Đang chạy"    — bình thường, chưa xong
   - "Cần xem lại"  — cảnh báo, chưa hỏng
   - "Thất bại"     — hỏng thật
   Dùng dữ liệu tiếng Việt thật. Bắt buộc có:
   - Một dòng tên CỐ Ý DÀI: "Quy trình rà soát và cấp lại quyền truy cập hệ
     thống cho nhân sự chuyển bộ phận trong tháng 8" — để tôi thấy chỗ tràn chữ
   - Một dòng có ô trống ở cột người phụ trách
   - Tên người có dấu chồng hai tầng: Nguyễn Thị Hoà, Đặng Vũ Tuấn Kiệt,
     Trương Thị Mỹ Duyên

5. Một biểu mẫu ngắn bên dưới bảng, 4 trường: một ô nhập chữ, một ô chọn,
   một công tắc bật/tắt, một vùng nhập nhiều dòng. Kèm nút chính và nút phụ.

6. Một dòng hiển thị lỗi của biểu mẫu, ví dụ: "Trường này không được để trống."

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

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Bản tối tôi tự dẫn xuất.

TƯƠNG PHẢN
Mọi chữ phải đạt WCAG 2.2 AA trên nền thật của nó (4.5:1 với chữ thường,
3:1 với chữ lớn). Đây là ràng buộc cứng, không phải gợi ý.

PHONG CÁCH
Tự do sáng tạo. Miễn là hợp với một công cụ nội bộ mở hằng ngày.
```

---

## Ghi chú cho ta — không dán vào Stitch

### Vì sao màn đại diện phải có đủ 6 khối trên

Vòng 0 chỉ chạy **một lần**, và thứ trích ra từ nó là bảng màu dùng cho mọi màn. Khối nào
không xuất hiện ở đây thì vai trò màu tương ứng **không có dữ liệu để trích**, và màn nghiệp
vụ đầu tiên cần tới nó sẽ phải bịa — đúng cái Vòng 0 sinh ra để chặn.

| Khối | Vai trò màu nó ép Stitch phải quyết |
|---|---|
| Khung ứng dụng | `surface`, `surface-container-*`, `outline` |
| Dải thông báo | `surface-variant` / `info` |
| Bốn nhãn trạng thái | `success`, `primary`/`info`, `warning`, `error` + `on-*-container` |
| Nút chính / phụ | `primary`, `on-primary`, `secondary-container` |
| Biểu mẫu | nền ô nhập, viền nghỉ, viền focus |
| Dòng lỗi biểu mẫu | `error` ở vai trò **chữ**, khác với `error-container` ở vai trò nền |

### Nhận về thì kiểm gì

1. Đủ **bốn** nhãn trạng thái phân biệt được, không gộp "Cần xem lại" vào "Thất bại"
2. Chuỗi cố ý dài có bị **viết cụt ngay trong markup** không
3. Thanh bên có tự mọc nút không
4. Có `opacity-0 group-hover` ở hành động theo dòng không
5. Tiêu đề cột có bị `uppercase` không
6. Khối tài khoản ở đáy thanh bên có trong khung nhìn không

### Sau khi trích màu

Ghi `04-design-v2/vong-0/GHIM.md` + `design-overrides-v2.json`, **dừng chờ người duyệt**,
rồi mới `upload_design_md` → `create_design_system_from_design_md` → `apply_design_system`.
