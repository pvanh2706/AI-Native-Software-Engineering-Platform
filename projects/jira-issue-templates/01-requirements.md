# RequirementSet — Jira Issue Templates

- **Phiên bản:** v3
- **Nguồn đầu vào:** idea thô — xem [00-input.md](00-input.md)
- **Ngày:** 2026-08-10
- **Trạng thái:** **Approved** — duyệt ngày 2026-08-10, gate Analysis đã qua
- **Đã qua vòng làm rõ:** 16 câu đã chốt / 0 câu blocking còn treo — xem [01-answers.md](01-answers.md)

## 1. Bối cảnh & Bài toán

Việc tạo issue trực tiếp trên Jira tốn nhiều thao tác lặp lại: mỗi lần phải chọn lại project, issue type, và điền lại những trường gần như không đổi giữa các issue cùng loại. Với các issue mang tính ghi nhận việc đã làm, người dùng còn phải mở issue vừa tạo và kéo tay sang trạng thái Done — thêm một vòng thao tác nữa.

Hệ thống là **web nội bộ đứng ngoài Jira**, gọi **Jira Data Center qua REST API v2** bằng **Personal Access Token riêng của từng người dùng**. Người quản trị dự án định nghĩa sẵn **mẫu issue gắn với một dự án Jira, có giá trị mặc định**; người dùng tạo issue từ mẫu trong **≤ 3 lần bấm**. Mẫu nào được đánh dấu auto-Done thì sau khi tạo, hệ thống **tự chạy chuỗi transition** đưa issue tới status đích đã cấu hình cho dự án đó.

**Ràng buộc kỹ thuật** (A-04, theo [README của platform](../../README.md)): backend **.NET / ASP.NET Core**, frontend **Vue 3 + TypeScript + Tailwind CSS**. Không có ràng buộc riêng về database hay môi trường mạng.

## 2. Người dùng / Actor

| Actor | Mô tả | Mục tiêu chính |
|---|---|---|
| **Người tạo issue** (Member) | Thành viên team, có tài khoản Jira và PAT riêng | Tạo issue đúng chuẩn trong ≤ 3 lần bấm, không phải mở Jira |
| **Quản trị dự án** (Project Admin) | Người có quyền `ADMINISTER_PROJECTS` trên dự án Jira tương ứng — **không phải vai trò riêng của hệ thống** (A-09) | Định nghĩa mẫu + giá trị mặc định + cấu hình auto-Done cho dự án mình quản |
| **Quản trị hệ thống** (System Admin) | Người vận hành hệ thống | Cấu hình URL Jira, quản lý tài khoản đăng nhập, theo dõi lỗi tích hợp |
| **Jira Data Center** (hệ thống ngoài) | Nguồn metadata và đích ghi, qua REST API v2 | (không phải người dùng; là ràng buộc tích hợp) |

## 3. Yêu cầu chức năng

### FR-01 — Kết nối Jira và xác thực bằng PAT của từng người
- **Ưu tiên:** Must · **Chốt từ:** A-01, A-02, A-03
- **Mô tả:** Là *Người tạo issue*, tôi muốn khai Personal Access Token Jira của riêng mình một lần, để mọi issue hệ thống tạo đều mang đúng tên tôi và đúng quyền của tôi.
- **Tiêu chí chấp nhận:**
  - [ ] *System Admin* khai được base URL của Jira DC ở cấp hệ thống; mỗi *người dùng* khai PAT riêng ở trang cá nhân.
  - [ ] Bấm "Kiểm tra kết nối" gọi `GET /rest/api/2/myself` và hiển thị tên tài khoản Jira nhận được trong ≤ 10 giây.
  - [ ] PAT hiển thị lại dạng che (`••••1234`) sau khi lưu; không có API nào trả về PAT dạng rõ.
  - [ ] Người dùng thu hồi/thay PAT của mình bất cứ lúc nào; thu hồi xong thì mọi thao tác Jira của người đó báo lỗi yêu cầu khai lại.
  - [ ] Lỗi phân biệt được: 401 (PAT sai/hết hạn), 403 (không đủ quyền), timeout/5xx (Jira không phản hồi) — mỗi loại một thông báo khác nhau.
  - [ ] Chưa khai PAT thì mọi màn hình cần Jira đều chặn lại và dẫn tới trang khai PAT, không hiện lỗi kỹ thuật thô.

### FR-02 — Đồng bộ metadata dự án Jira
- **Ưu tiên:** Must · **Chốt từ:** A-01, A-07, A-11
- **Mô tả:** Là *Quản trị dự án*, tôi muốn hệ thống lấy về metadata thật của dự án để tôi dựng mẫu dựa trên dữ liệu Jira thay vì gõ tay.
- **Tiêu chí chấp nhận:**
  - [ ] Lấy danh sách project mà người đăng nhập có quyền, hiển thị `key` + `name`.
  - [ ] Với project + issue type đã chọn, lấy field khả dụng từ `GET /rest/api/2/issue/createmeta`, đánh dấu field **bắt buộc**, và lấy đủ **kiểu field** (`schema.type`) để dựng đúng ô nhập.
  - [ ] Lấy danh sách status và toàn bộ transition của workflow áp dụng cho project.
  - [ ] Lấy được **field bắt buộc trên màn hình transition** (qua `GET /rest/api/2/issue/{key}/transitions?expand=transitions.fields`) để phục vụ FR-05.
  - [ ] **Mở màn hình KHÔNG gọi Jira.** Mọi màn đọc metadata từ CSDL của hệ thống. Kiểm chứng: mở lần lượt mọi màn cấu hình, log HTTP tới Jira phải **rỗng**.
  - [ ] Hệ thống chỉ gọi Jira lấy metadata khi: (a) người dùng bấm **Lấy lại thông tin từ Jira**, (b) lần đầu kết nối một dự án, (c) cache quá hạn `staleAfter` (mặc định 24 giờ) **và** người dùng thao tác cần metadata.
  - [ ] Hiển thị **thời điểm đồng bộ gần nhất của từng dự án**, và đánh dấu rõ khi đã quá hạn.
  - [ ] Đồng bộ chạy được cho **một dự án** hoặc **tất cả**; báo tiến độ nếu quá 2 giây và cho huỷ.
  - [ ] Đồng bộ thất bại → giữ nguyên dữ liệu cũ trong CSDL, báo lỗi, **không** xoá cache. Dữ liệu cũ dùng được vẫn hơn không có gì.
  - [ ] Mẫu tham chiếu tới field/status không còn tồn tại sau khi Jira đổi cấu hình → mẫu bị đánh dấu **không hợp lệ** kèm danh sách chỗ hỏng, và **không cho tạo issue** cho tới khi sửa.

### FR-03 — Tạo mẫu issue gắn với một dự án
- **Ưu tiên:** Must · **Chốt từ:** A-10
- **Mô tả:** Là *Quản trị dự án*, tôi muốn tạo mẫu issue gắn với đúng một dự án Jira, để team dùng lại thay vì điền form từ đầu.
- **Tiêu chí chấp nhận:**
  - [ ] Mẫu gồm tối thiểu: tên, mô tả mẫu, **đúng một** dự án Jira đích, issue type.
  - [ ] Một mẫu **không** dùng chung cho nhiều dự án; muốn dùng nơi khác thì nhân bản (FR-10).
  - [ ] Một dự án chứa nhiều mẫu; lọc/tìm được theo dự án và theo tên.
  - [ ] Tên mẫu không trùng trong cùng một dự án; vi phạm thì báo lỗi rõ ràng.
  - [ ] Mẫu lưu được ở trạng thái **nháp** (chưa cho dùng) và **đang dùng**.

### FR-04 — Đặt giá trị mặc định trong mẫu
- **Ưu tiên:** Must · **Chốt từ:** A-11, A-12, A-13
- **Mô tả:** Là *Quản trị dự án*, tôi muốn set sẵn giá trị mặc định cho các trường, để người tạo issue chỉ phải sửa phần thực sự khác nhau.
- **Tiêu chí chấp nhận:**
  - [ ] Set được mặc định cho field chuẩn: summary, description, priority, assignee, reporter, labels, components, due date.
  - [ ] Set được mặc định cho **custom field** dựa trên metadata Jira trả về, đúng theo kiểu field: text, số, ngày, select đơn, select nhiều, user picker, cascading select, array.
  - [ ] `description` soạn và lưu ở dạng **wiki markup của Jira DC**, gửi thẳng lên Jira không qua bước chuyển đổi; màn hình soạn có gợi ý cú pháp cơ bản.
  - [ ] Hỗ trợ **biến động** `{{today}}` (ngày hiện tại) và `{{me}}` (người đang đăng nhập); biến được thay đúng giá trị tại thời điểm **tạo issue**, không phải thời điểm lưu mẫu.
  - [ ] Mỗi trường đánh dấu được là **khoá** (người tạo không sửa) hay **cho sửa** (điền sẵn, sửa được lúc tạo).
  - [ ] Mở form tạo issue từ mẫu → mọi trường có mặc định đều hiện sẵn đúng giá trị.
  - [ ] Không lưu được mẫu nếu một field Jira đánh dấu bắt buộc vừa không có giá trị mặc định vừa không để cho người dùng nhập lúc tạo.

### FR-05 — Cấu hình cấp dự án
- **Ưu tiên:** Must · **Chốt từ:** A-05, A-07, A-10 · **Sửa từ:** phản hồi prototype v5 (xem Lịch sử thay đổi v3)
- **Mô tả:** Là *Quản trị dự án*, tôi muốn cấu hình những thứ dùng chung cho cả dự án, để mọi mẫu trong dự án hành xử nhất quán với workflow của dự án đó.
- **Tiêu chí chấp nhận:**
  - [ ] Khu vực cấu hình gồm **hai màn tách bạch**: **(1) danh sách dự án** — mọi dự án hệ thống biết, kèm quyền của người dùng, status đích đã đặt chưa, số mẫu, thời điểm đồng bộ gần nhất, nút **Lấy lại thông tin từ Jira**; **(2) chi tiết một dự án** — mở từ danh sách.
  - [ ] Màn danh sách **đọc hoàn toàn từ CSDL**, không gọi Jira (FR-02).
  - [ ] Khu vực cấu hình **không phụ thuộc dự án đang chọn ở điều hướng chính** — nó là khu vực quản trị riêng, chọn dự án ngay trong danh sách của nó.
  - [ ] Màn chi tiết gồm: **status đích của auto-Done**, **giá trị các field bắt buộc khi transition**, **mẫu mặc định**, **thứ tự hiển thị mẫu**, **bật/tắt từng mẫu**.
  - [ ] Người không có quyền quản trị dự án vẫn **mở được màn chi tiết ở chế độ chỉ đọc**, có giải thích (FR-11).
  - [ ] Status đích **chọn từ danh sách status thật** của workflow dự án (FR-02), không gõ tay chuỗi `"Done"`.
  - [ ] Khai được giá trị cho field bắt buộc của màn hình transition (ví dụ `Resolution = Done`); danh sách field lấy từ metadata transition, không gõ tay tên field.
  - [ ] Bật/tắt được từng mẫu ở cấp dự án mà không phải xoá mẫu.
  - [ ] Chọn được một mẫu mặc định cho mỗi dự án (mở sẵn khi người dùng chọn dự án đó).
  - [ ] Cấu hình dự án A đổi không ảnh hưởng dự án B — kiểm chứng bằng test.
  - [ ] **Bật/tắt auto-Done KHÔNG nằm ở đây** — nằm ở cấp mẫu (FR-07).

### FR-06 — Tạo issue từ mẫu
- **Ưu tiên:** Must · **Chốt từ:** A-13, A-14, A-16
- **Mô tả:** Là *Người tạo issue*, tôi muốn chọn mẫu, xem/sửa các trường cho sửa, rồi tạo issue trên Jira ngay trong hệ thống.
- **Tiêu chí chấp nhận:**
  - [ ] Chọn dự án → chọn mẫu → form hiện đầy đủ mặc định; tạo một issue không sửa gì mất **≤ 3 lần bấm** (đếm được, xem NFR-07).
  - [ ] Bấm "Tạo" gọi `POST /rest/api/2/issue` **bằng PAT của người đang đăng nhập**; issue trên Jira mang đúng tên người đó.
  - [ ] Hiển thị **issue key** kèm link mở trực tiếp trên Jira.
  - [ ] Mỗi lần tạo **đúng một issue** (v1 không bulk, không subtask).
  - [ ] Lỗi từ Jira hiển thị nguyên văn và gắn đúng vào trường gây lỗi khi Jira trả về tên trường.
  - [ ] Tạo thất bại → không có bản ghi issue "ma"; trạng thái ghi nhận là `Failed` kèm nguyên nhân; dữ liệu người dùng đã nhập được giữ nguyên trên form.
  - [ ] Bấm "Tạo" nhiều lần liên tiếp không tạo issue trùng (NFR-03).

### FR-07 — Tự động chuyển issue sang Done
- **Ưu tiên:** Must · **Chốt từ:** A-05, A-06, A-07
- **Mô tả:** Là *Quản trị dự án*, tôi muốn đánh dấu từng mẫu là "đóng ngay sau khi tạo", để issue ghi nhận việc đã làm không cần ai mở Jira kéo tay, còn issue báo việc mới thì vẫn nằm ở trạng thái khởi tạo.
- **Tiêu chí chấp nhận:**
  - [ ] **Bật/tắt auto-Done ở cấp MẪU**; hai mẫu trong cùng một dự án được phép khác nhau về việc này.
  - [ ] **Status đích lấy từ cấu hình cấp DỰ ÁN** (FR-05), không khai lại ở từng mẫu.
  - [ ] Mẫu bật auto-Done mà dự án chưa cấu hình status đích → chặn ngay lúc lưu mẫu, không để lỗi phát sinh lúc tạo issue.
  - [ ] Sau khi `POST issue` thành công, hệ thống gọi `POST /rest/api/2/issue/{key}/transitions` để đưa issue tới status đích.
  - [ ] Workflow không cho đi thẳng → hệ thống **tự tìm và chạy chuỗi transition nhiều bước** tới status đích, lần lượt từng bước.
  - [ ] Có **giới hạn số bước** (mặc định 5) và **phát hiện vòng lặp**; vượt giới hạn thì dừng và báo như FR-08, không quay vòng vô hạn.
  - [ ] Mỗi bước transition tự đính kèm giá trị field bắt buộc đã khai ở FR-05.
  - [ ] Trạng thái auto-Done của mỗi issue ghi nhận rõ: `Done` / `Không bật` / `Thất bại + lý do` / `Không tìm được đường đi`.
  - [ ] Mẫu tắt auto-Done → issue giữ nguyên status khởi tạo của workflow.

### FR-08 — Xử lý khi auto-Done thất bại
- **Ưu tiên:** Must · **Chốt từ:** A-06, A-07
- **Mô tả:** Là *Người tạo issue*, tôi muốn biết ngay khi issue đã tạo nhưng không kéo được sang Done, để tự xử lý thay vì tưởng nhầm là đã xong.
- **Tiêu chí chấp nhận:**
  - [ ] Issue tạo xong nhưng transition thất bại → **không rollback/xoá issue**; hiển thị cảnh báo phân biệt rõ với ca tạo thất bại.
  - [ ] Thất bại giữa chuỗi nhiều bước → báo rõ **đã đi được tới status nào** và **hỏng ở bước nào**, không chỉ báo "thất bại".
  - [ ] Thông báo nêu nguyên nhân từ Jira: thiếu field bắt buộc, không đủ quyền, transition không khả dụng, không tìm được đường đi.
  - [ ] Có nút **thử lại transition** cho issue đã tạo; thử lại tiếp tục từ status hiện tại, **không tạo issue mới**.
  - [ ] Mọi lần thất bại được ghi log truy vết theo issue key, gồm cả chuỗi bước đã thử.

### FR-09 — Lịch sử issue đã tạo qua hệ thống
- **Ưu tiên:** Should · **Chốt từ:** A-08
- **Mô tả:** Là *Người tạo issue*, tôi muốn xem lại các issue đã tạo qua hệ thống cùng kết quả auto-Done, để kiểm tra và xử lý những cái lỗi.
- **Tiêu chí chấp nhận:**
  - [ ] Danh sách hiển thị: issue key (link Jira), dự án, mẫu đã dùng, người tạo, thời điểm, trạng thái tạo, trạng thái auto-Done.
  - [ ] Lọc theo dự án, theo trạng thái (thành công / tạo lỗi / auto-Done lỗi), theo khoảng thời gian.
  - [ ] Từ dòng lỗi auto-Done bấm được thẳng vào nút thử lại của FR-08.
  - [ ] **Chỉ hiển thị issue do hệ thống tạo.** Không tìm kiếm JQL, không sửa/bình luận issue — việc đó để Jira.

### FR-10 — Quản lý vòng đời mẫu
- **Ưu tiên:** Should · **Chốt từ:** A-10
- **Mô tả:** Là *Quản trị dự án*, tôi muốn sửa, nhân bản và ngừng dùng mẫu, để duy trì bộ mẫu theo thay đổi của dự án.
- **Tiêu chí chấp nhận:**
  - [ ] Sửa được mẫu đang dùng; thay đổi chỉ áp dụng cho issue tạo **sau** thời điểm sửa.
  - [ ] **Nhân bản sang dự án khác** — thao tác chính để tái sử dụng mẫu (vì mẫu gắn một dự án). Hệ thống đối chiếu metadata dự án đích và **liệt kê rõ field/giá trị không tồn tại** trước khi người dùng xác nhận.
  - [ ] Nhân bản trong cùng dự án giữ nguyên toàn bộ giá trị mặc định.
  - [ ] Ngừng dùng (archive): mẫu biến khỏi danh sách chọn khi tạo issue nhưng lịch sử ở FR-09 vẫn tra cứu được.
  - [ ] Xoá mẫu cần xác nhận và không làm hỏng lịch sử ở FR-09.

### FR-11 — Phân quyền theo quyền Jira
- **Ưu tiên:** Must · **Chốt từ:** A-09, A-02
- **Mô tả:** Là *Quản trị hệ thống*, tôi muốn quyền quản trị mẫu bám thẳng theo quyền Jira, để không phải bảo trì thêm một bộ phân quyền riêng luôn bị lệch với thực tế.
- **Tiêu chí chấp nhận:**
  - [ ] Người dùng có quyền `ADMINISTER_PROJECTS` trên dự án Jira nào thì tạo/sửa/xoá được mẫu và cấu hình của **đúng dự án đó**.
  - [ ] Quyền kiểm qua Jira (`GET /rest/api/2/mypermissions?projectKey=...`) bằng PAT của chính người đó, và được **cache có thời hạn** (mặc định 15 phút).
  - [ ] Người không có quyền vẫn **xem và dùng** được mẫu của dự án, chỉ không sửa; nút sửa/xoá bị ẩn **và** API phía server cũng chặn (không chỉ ẩn ở giao diện).
  - [ ] Quyền trên Jira bị thu hồi → chậm nhất sau khi cache hết hạn, người đó mất quyền quản trị mẫu tương ứng.
  - [ ] Jira không trả lời được lời gọi kiểm quyền → **từ chối thao tác quản trị** (fail closed), không mặc định cho qua.

## 4. Yêu cầu phi chức năng

| ID | Loại | Yêu cầu | Cách đo |
|---|---|---|---|
| NFR-01 | Bảo mật | PAT của từng người mã hoá khi lưu, không ghi ra log, không trả về API dạng rõ | Rà log + response sau khi lưu PAT: không xuất hiện chuỗi bí mật; kiểm tra cột DB đã mã hoá |
| NFR-02 | Hiệu năng | Tạo issue từ mẫu **gồm cả chuỗi transition auto-Done** hoàn tất ≤ **5 giây** ở p95 | Đo p95 trên 100 lần tạo thật ở staging, với mẫu bật auto-Done đi 2 bước |
| NFR-03 | Độ tin cậy | Không tạo issue trùng khi bấm nhiều lần hoặc client retry | Gửi 5 request tạo đồng thời từ một lần submit → Jira chỉ sinh 1 issue |
| NFR-04 | Truy vết | Mọi lần tạo issue và transition ghi audit: ai, lúc nào, mẫu nào, kết quả, lỗi Jira nguyên văn | Kiểm tra 100% giao dịch trong test đều có bản ghi audit |
| NFR-05 | Tương thích | Chạy đúng trên **Jira Data Center** với REST API v2; không dùng endpoint/định dạng riêng của Cloud (ADF, `accountId`) | Chạy bộ test tích hợp trên instance Jira DC mục tiêu, 100% pass; grep mã nguồn không có `/rest/api/3/` |
| NFR-06 | Chịu lỗi | Jira không phản hồi hoặc trả 5xx → báo lỗi rõ, không treo UI, không mất dữ liệu form đang nhập | Giả lập timeout/5xx: UI trả lỗi trong ≤ 15 giây và giữ nguyên dữ liệu đã nhập |
| NFR-07 | UX | Tạo 1 issue từ mẫu **không sửa gì** trong **≤ 3 lần bấm**; người mới không cần đọc hướng dẫn | Đếm số lần bấm trên luồng chuẩn; test khả dụng với 3 người chưa dùng, cả 3 xong trong ≤ 2 phút |
| NFR-08 | Quy mô | Đáp ứng < 10 dự án, < 30 người dùng, < 100 issue/ngày bằng kiến trúc **gọi Jira đồng bộ**, không hàng đợi nền | Test tải ở mức 2× quy mô mục tiêu vẫn đạt NFR-02. Vượt **500 issue/ngày** hoặc **50 dự án** thì phải xem lại kiến trúc |

## 5. Giả định

**Không còn giả định nào.** Cả 5 giả định của v1 đã được gỡ trong vòng làm rõ:

| Giả định v1 | Gỡ bởi | Kết quả |
|---|---|---|
| #1 "Jira v2" = REST API v2 | A-01 | Xác nhận — Jira DC, API v2 là bản chính thức |
| #2 App ngoài Jira, không phải plugin | A-03 | Xác nhận — web nội bộ, tài khoản riêng |
| #3 "Dự án" = Jira project | A-10 | Xác nhận — mẫu gắn đúng 1 Jira project |
| #4 "Kéo Done" = workflow transition | A-06, A-07 | Xác nhận — transition, được đi nhiều bước |
| #5 Stack .NET + Vue 3 | A-04 | Xác nhận — theo platform |

## 6. Ngoài phạm vi (Out of scope)

- Hỗ trợ **Jira Cloud** (accountId, ADF) — v1 chỉ Data Center (A-01).
- **SSO** (Azure AD / Google / LDAP) — v1 dùng tài khoản riêng của hệ thống (A-03).
- Đóng gói thành **plugin cài trong Jira** (Forge / Connect / P2) (A-03).
- **Tìm kiếm issue bằng JQL**, xem chi tiết, sửa, bình luận, xoá issue — để Jira lo (A-08).
- **Tạo hàng loạt** nhiều issue, và mẫu sinh **issue cha + subtask** (A-14).
- **Đính kèm file** khi tạo issue (A-13).
- **Soạn thảo rich text** cho description — v1 dùng wiki markup trực tiếp (A-13).
- Biến động nâng cao trong mẫu: sprint hiện tại, epic đang mở (A-12).
- Đồng bộ hai chiều: nhận webhook từ Jira cập nhật ngược trạng thái về hệ thống.
- Quản lý sprint, board, backlog, epic hierarchy.
- Báo cáo, thống kê, dashboard năng suất.
- Tự động hoá bước khác ngoài chuyển Done (tự gán reviewer, tự log work).

## 7. Đề xuất thêm (tùy chọn — không tự ý đưa vào scope)

- **Xem trước payload (dry-run)**: hiện đúng JSON sẽ gửi lên Jira trước khi tạo — giúp Quản trị dự án kiểm mẫu, nhất là mẫu có custom field, mà không tạo issue rác.
- **Quick-create một dòng**: gõ `PROJ: sửa lỗi đăng nhập` là ra issue theo mẫu mặc định của dự án — đẩy tiếp mục tiêu ≤ 3 lần bấm xuống còn 1.
- **Mẫu tổ hợp** (cha + subtask) cho quy trình lặp như release checklist — đang ngoài scope theo A-14, để lại đây nếu sau này cần.
- **Thông báo Slack/Teams** khi auto-Done thất bại, để không ai bỏ sót issue dở dang.
- **Import/Export mẫu** dạng JSON, chuyển cấu hình giữa Jira staging và production.
- **Lịch sử phiên bản của mẫu**: ai sửa gì, lúc nào, khôi phục được — hợp với việc quyền quản trị bám theo Jira nên có thể nhiều người cùng sửa.

## Lịch sử thay đổi

### v3 — 2026-08-10 — `refines` từ phản hồi trên prototype

Đây là vòng lặp `UiPrototype → CustomerFeedback → refines RequirementSet` hoạt động đúng như thiết kế ([docs/04 §6](../../docs/04-knowledge-and-orchestration.md)): prototype làm lộ ra **thiếu sót trong yêu cầu**, không phải chỉ lộ ra lỗi giao diện.

- **FR-02 bổ sung 5 tiêu chí về việc KHI NÀO gọi Jira.** v2 chỉ nói "metadata được cache; có nút làm mới" — đọc kiểu nào cũng được, kể cả gọi Jira mỗi lần mở màn. Nay quy định rõ: **mở màn hình không gọi Jira**, chỉ gọi khi bấm làm mới / lần đầu kết nối / cache quá hạn; đồng bộ hỏng thì **giữ nguyên cache cũ**, không xoá.
- **FR-05 tách thành hai màn** — danh sách dự án và chi tiết một dự án. v2 gộp làm một, khiến màn đó làm hai việc cùng lúc (`PRIN-01`) và dài 1670px.
- **Khu vực cấu hình tách khỏi ngữ cảnh điều hướng chính** — trước đây nó bám dự án đang chọn ở thanh bên, tạo ra hai cách chọn dự án song song (`PRIN-04`).

### v2 — 2026-08-10
- Chốt **A-01…A-16** qua vòng làm rõ trong chat (16 câu / 5 lô) — xem [01-answers.md](01-answers.md).
- **Gỡ toàn bộ 5 [GIẢ ĐỊNH]** của v1; mục Giả định giờ trống.
- **FR-01** viết lại: từ "khai credential ở cấp hệ thống" → **PAT riêng của từng người dùng** trên Jira DC.
- **FR-05 / FR-07 tách lại theo A-05** — thay đổi lớn nhất so với v1 và **khác nguyên văn yêu cầu ban đầu**: bật/tắt auto-Done chuyển từ cấp dự án xuống **cấp mẫu**, cấp dự án chỉ giữ status đích + field transition.
- **FR-07** bổ sung: chạy **chuỗi transition nhiều bước**, giới hạn 5 bước, phát hiện vòng lặp.
- **FR-04** mở rộng: hỗ trợ **custom field tổng quát** theo metadata, biến `{{today}}`/`{{me}}`, description dạng **wiki markup**.
- **Thêm FR-11** — phân quyền bám theo quyền `ADMINISTER_PROJECTS` của Jira, fail closed.
- **FR-03 / FR-10** siết theo A-10: mẫu gắn đúng 1 dự án, nhân bản thành thao tác tái sử dụng chính.
- **FR-09** thu hẹp theo A-08: chỉ lịch sử issue do hệ thống tạo.
- **Thêm NFR-08** (quy mô nhỏ → kiến trúc đồng bộ, có ngưỡng phải xem lại); **NFR-07** chốt mốc ≤ 3 lần bấm.
- **Ngoài phạm vi** bổ sung 6 mục đã loại tường minh: Jira Cloud, SSO, JQL, bulk/subtask, đính kèm, rich text.

### v1 — 2026-08-10
- Bản đầu từ ý tưởng thô: 10 FR, 7 NFR, 5 giả định, 21 câu hỏi treo.
