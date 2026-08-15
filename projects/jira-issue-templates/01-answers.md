# Nhật ký làm rõ — Jira Issue Templates

> Đã hỏi gì, chốt gì, ngày nào. Đây là căn cứ truy vết cho [01-requirements.md](01-requirements.md).
> Vòng làm rõ chạy trong chat (skill `analyze-idea`), 16 câu / 5 lô, ngày 2026-08-10.

---

## A-01 — Bản Jira đang dùng
- **Ngày:** 2026-08-10 · **Lô:** 1 · **Mã cũ:** Q1
- **Câu hỏi:** Jira của bạn là bản nào?
- **Chốt:** **Jira Server / Data Center (tự host)**
- **Hệ quả kỹ thuật:** Xác thực bằng Personal Access Token (hoặc user/password). Định danh người dùng bằng `name`/`key`, **không** phải `accountId` của Cloud. Trường description dùng **wiki markup**, không dính ADF. REST API v2 là bản chính thức trên DC — khớp tự nhiên với yêu cầu "jira v2".
- **Ảnh hưởng tới:** FR-01, FR-02, FR-04, NFR-05 · **Gỡ [GIẢ ĐỊNH] #1**

## A-02 — Danh nghĩa gọi Jira
- **Ngày:** 2026-08-10 · **Lô:** 1 · **Mã cũ:** Q2
- **Câu hỏi:** Hệ thống gọi Jira bằng danh nghĩa ai?
- **Chốt:** **Credential riêng của từng người dùng** (mỗi người tự nhập PAT của mình)
- **Hệ quả kỹ thuật:** Issue trên Jira mang đúng tên người tạo. Quyền thao tác bám đúng quyền Jira thật của từng người — hệ thống không cần tự dựng lại mô hình quyền. Đổi lại phải mã hoá lưu nhiều bí mật và có màn hình cho mỗi người tự quản token.
- **Ảnh hưởng tới:** FR-01, FR-06, FR-07, FR-11, NFR-01, NFR-04 · Là tiền đề cho A-09

## A-03 — Nơi chạy và cách đăng nhập
- **Ngày:** 2026-08-10 · **Lô:** 1 · **Mã cũ:** Q15
- **Câu hỏi:** Hệ thống chạy ở đâu, người dùng đăng nhập bằng gì?
- **Chốt:** **Web nội bộ, tài khoản riêng của hệ thống** (không SSO ở v1, không phải plugin Jira)
- **Ảnh hưởng tới:** FR-01, FR-11, NFR-01 · **Gỡ [GIẢ ĐỊNH] #2**

## A-04 — Tech stack
- **Ngày:** 2026-08-10 · **Lô:** 1 · **Mã cũ:** Q16
- **Câu hỏi:** Tech stack theo platform (.NET + Vue 3 + TypeScript + Tailwind) đúng chứ?
- **Chốt:** **Đúng — theo platform**, không có ràng buộc hạ tầng đặc biệt
- **Ảnh hưởng tới:** toàn bộ kiến trúc · **Gỡ [GIẢ ĐỊNH] #5**

---

## A-05 — Cấp cấu hình của auto-Done
- **Ngày:** 2026-08-10 · **Lô:** 2 · **Mã cũ:** Q3
- **Câu hỏi:** Cấu hình bật/tắt auto-Done nằm ở cấp nào?
- **Chốt:** **Bật/tắt ở cấp MẪU; status đích ở cấp DỰ ÁN**
- **Vì sao đáng chú ý:** Đây là điểm khác với nguyên văn yêu cầu ban đầu ("tự kéo done theo từng dự án"). Tách ra vì hai thứ có bản chất khác nhau: *status đích* phụ thuộc workflow nên thuộc dự án; còn *có đóng ngay hay không* là nghiệp vụ của từng loại issue nên thuộc mẫu. Nhờ vậy một dự án chứa được cả mẫu "ghi nhận việc đã làm" (đóng ngay) lẫn mẫu "báo bug mới" (không đóng).
- **Ảnh hưởng tới:** FR-05, FR-07

## A-06 — Đường đi tới Done khi workflow không cho đi thẳng
- **Ngày:** 2026-08-10 · **Lô:** 2 · **Mã cũ:** Q4
- **Câu hỏi:** Nếu workflow không cho chuyển thẳng sang Done, hệ thống được làm gì?
- **Chốt:** **Tự đi nhiều bước liên tiếp tới Done** (hệ thống tự tìm đường)
- **Đánh đổi đã chấp nhận:** Lịch sử issue trên Jira sẽ ghi các bước trung gian diễn ra trong cùng một thời điểm.
- **Ảnh hưởng tới:** FR-07, FR-08

## A-07 — Xử lý field bắt buộc của màn hình transition
- **Ngày:** 2026-08-10 · **Lô:** 2 · **Mã cũ:** Q5
- **Câu hỏi:** Transition sang Done thất bại vì màn hình đóng issue bắt buộc điền field (ví dụ Resolution) thì xử lý sao?
- **Chốt:** **Khai sẵn giá trị các field đó trong cấu hình dự án** (ví dụ Resolution = Done), hệ thống gửi kèm khi transition
- **Ảnh hưởng tới:** FR-02, FR-05, FR-07, FR-08

---

## A-08 — Phạm vi của "quản lý issue"
- **Ngày:** 2026-08-10 · **Lô:** 3 · **Mã cũ:** Q6
- **Câu hỏi:** Chữ "quản lý issue" trong yêu cầu gồm những gì?
- **Chốt:** **Chỉ lịch sử issue đã tạo qua hệ thống** — xem/sửa chi tiết vẫn để Jira lo
- **Ảnh hưởng tới:** FR-09, mục "Ngoài phạm vi"

## A-09 — Phân quyền quản trị mẫu
- **Ngày:** 2026-08-10 · **Lô:** 3 · **Mã cũ:** Q7
- **Câu hỏi:** Ai được tạo/sửa mẫu và cấu hình dự án?
- **Chốt:** **Theo quyền Jira** — ai là admin dự án trên Jira thì quản mẫu + cấu hình của dự án đó
- **Hệ quả kỹ thuật:** Không dựng bảng phân quyền riêng. Hệ thống hỏi Jira quyền `ADMINISTER_PROJECTS` của người đang đăng nhập (khả thi vì mỗi người dùng credential riêng — A-02) và cache kết quả.
- **Ảnh hưởng tới:** FR-11, FR-03, FR-05, FR-10, danh sách Actor

## A-10 — Phạm vi của một mẫu
- **Ngày:** 2026-08-10 · **Lô:** 3 · **Mã cũ:** Q13
- **Câu hỏi:** Một mẫu có được dùng chung cho nhiều dự án không?
- **Chốt:** **Mỗi mẫu gắn đúng 1 dự án**; muốn dùng ở dự án khác thì **nhân bản**
- **Hệ quả:** Giá trị mặc định luôn hợp lệ với dự án đó. "Tạo mẫu theo dự án" và "cấu hình mẫu theo dự án" là **hai việc khác nhau**: mẫu thuộc dự án (FR-03), còn cấu hình cấp dự án là mẫu mặc định + thứ tự + auto-Done (FR-05). Nhân bản sang dự án khác trở thành thao tác quan trọng, phải cảnh báo field không tồn tại ở đích.
- **Ảnh hưởng tới:** FR-03, FR-05, FR-10 · **Gỡ [GIẢ ĐỊNH] #3**

---

## A-11 — Custom field
- **Ngày:** 2026-08-10 · **Lô:** 4 · **Mã cũ:** Q8
- **Câu hỏi:** Mẫu có cần set giá trị mặc định cho custom field không?
- **Chốt:** **Có — hỗ trợ tổng quát theo metadata Jira trả về** (đọc `createmeta`, tự dựng ô nhập theo kiểu field)
- **Lưu ý khối lượng:** Đây là phần nặng nhất của frontend. Mỗi kiểu field (select, multi-select, số, ngày, user picker, cascading, array) có cách render và cách đóng gói payload khác nhau.
- **Ảnh hưởng tới:** FR-02, FR-04

## A-12 — Giá trị mặc định động
- **Ngày:** 2026-08-10 · **Lô:** 4 · **Mã cũ:** Q9
- **Câu hỏi:** Giá trị mặc định là tĩnh hay có biến động?
- **Chốt:** **Có biến cơ bản**: hôm nay (`{{today}}`) và người đang đăng nhập (`{{me}}`). Không làm biến nâng cao (sprint/epic) ở v1.
- **Ảnh hưởng tới:** FR-04

## A-13 — Định dạng mô tả & đính kèm
- **Ngày:** 2026-08-10 · **Lô:** 4 · **Mã cũ:** Q14
- **Câu hỏi:** Mô tả trong mẫu cần định dạng gì, có cần đính kèm file?
- **Chốt:** **Wiki markup của Jira DC**, gửi thẳng không chuyển đổi. **Không** đính kèm file ở v1.
- **Ảnh hưởng tới:** FR-04, FR-06, mục "Ngoài phạm vi"

## A-14 — Tạo nhiều issue
- **Ngày:** 2026-08-10 · **Lô:** 4 · **Mã cũ:** Q10
- **Câu hỏi:** Có cần tạo nhiều issue một lúc từ một mẫu không?
- **Chốt:** **Không — v1 mỗi lần một issue.** Bulk và parent+subtask để sau.
- **Ảnh hưởng tới:** FR-06, mục "Ngoài phạm vi"

---

## A-15 — Quy mô
- **Ngày:** 2026-08-10 · **Lô:** 5 · **Mã cũ:** Q11
- **Câu hỏi:** Quy mô thực tế bao nhiêu dự án / người dùng / issue mỗi ngày?
- **Chốt:** **Nhỏ** — dưới 10 dự án Jira, dưới 30 người dùng, dưới 100 issue/ngày
- **Hệ quả kiến trúc:** Gọi Jira **đồng bộ ngay trong request**, không cần hàng đợi nền, không cần lo rate limit. Metadata cache đơn giản là đủ. Ngưỡng phải xem lại kiến trúc: **> 500 issue/ngày** hoặc **> 50 dự án**.
- **Ảnh hưởng tới:** NFR-02, NFR-06, kiến trúc tổng thể

## A-16 — Cách đo "nhanh hơn"
- **Ngày:** 2026-08-10 · **Lô:** 5 · **Mã cũ:** Q12
- **Câu hỏi:** Mục tiêu "nhanh hơn" đo bằng gì để nghiệm thu?
- **Chốt:** **Đếm số thao tác** — tạo 1 issue từ mẫu (không sửa gì) trong **≤ 3 lần bấm**. Không ràng buộc chỉ tiêu thời gian so với baseline.
- **Ảnh hưởng tới:** FR-06, NFR-07
