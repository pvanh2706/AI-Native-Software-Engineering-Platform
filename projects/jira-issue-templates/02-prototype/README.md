# UiPrototype — Jira Issue Templates

- **Phiên bản:** v7 — **dựng lại từ đầu theo phong cách Atlassian**. ✅ đã qua UI Eval (lớp 1 sạch trên **16 ảnh**). Xem [ui-eval-report.md](ui-eval-report.md)
- **Ngày:** 2026-08-10
- **Sinh ra từ:** [01-requirements.md](../01-requirements.md) **v3** — cạnh `realizedBy`
- **Trạng thái:** Draft (chờ review)
- **Mở thế nào:** double-click [index.html](index.html). Không cần server, không cần mạng, không gọi Jira.
- **Phong cách:** **Atlassian / Jira** (quyết định J1, thay cho Material 3 ở D1)
- **Design System:** [design-system/](../../../design-system/README.md) **v0.1**, seed **`#2563EB` Xanh dương** (quyết định F1). Màu trong prototype **sinh từ** `themes/light.json` + `themes/dark.json`, không tự chọn.
- **Chế độ hiển thị:** **sáng + tối, có nút chuyển** ở góc phải thanh prototype (quyết định D2). Chế độ tối dùng **nền đen tuyệt đối `#000000`**; các lớp surface nâng dần bằng xám gần đen (`#0D0D10` → `#242429`) vì trên nền đen tuyệt đối thì đổ bóng gần như không nhìn thấy, phải phân tầng bằng độ sáng. Lần đầu mở lấy theo cài đặt hệ điều hành, sau đó nhớ lựa chọn của bạn.
- **Độ chín:** gần giống thật (quyết định P1)
- **Trục điều hướng:** chọn dự án ở thanh bên cho việc hằng ngày (P2); **Cấu hình là khu vực quản trị riêng**, không bám ngữ cảnh đó
- **Màn hình đầu tiên:** danh sách mẫu của dự án đang chọn (P3)
- **Bố cục:** app-shell — khung cố định, chỉ vùng nội dung cuộn (`RES-12`)

> **Màu không còn do prototype tự quyết.** Hai khối token `:root[data-theme="light"]` / `[data-theme="dark"]` ở đầu `index.html` nay là **bản sinh ra từ** [design-system/themes/](../../../design-system/themes/), không sửa tay. Đổi nhận diện = sửa file nguồn rồi sinh lại 2 khối đó — cả 8 màn hình đổi theo, không đụng gì khác.

## Màn hình

| # | Màn hình | Phục vụ FR | Ghi chú |
|---|---|---|---|
| S1 | Danh sách mẫu của dự án (`crud-list`) | FR-03, FR-05, FR-06, FR-11 | Màn chính. **Bảng dày** thay cho lưới thẻ (`LAY-11`, `AP-07`). Lozenge phân biệt tự đóng / để mở / nháp / không hợp lệ. Kèm dải "Issue vừa tạo" |
| S2 | Form tạo issue từ mẫu (`create-edit-form`) | FR-04, FR-06, FR-07 | Trường khoá dùng **nền + viền nét đứt**, không dùng `opacity` (`AP-11`); biến `{{me}}`/`{{today}}` hiện giá trị đã thay |
| S3 | Kết quả tạo — thành công | FR-06, FR-07 | Vẽ chuỗi transition 2 bước tới Done |
| S3b | Kết quả tạo — transition lỗi | FR-08 | Chỉ rõ dừng ở status nào, hỏng bước nào, có nút thử lại |
| S4 | Soạn / sửa mẫu | FR-03, FR-04, FR-07, FR-10 | Công tắc auto-Done **ở cấp mẫu**; bảng giá trị mặc định có cột khoá/cho sửa |
| S5a | **Cấu hình — danh sách dự án** (`crud-list`) | FR-02, FR-05, FR-11 | Mọi dự án: quyền, status đích, số mẫu, **đồng bộ lần cuối**, nút Chi tiết. **Đọc từ CSDL, không gọi Jira**; chỉ nút *Lấy lại thông tin từ Jira* mới đồng bộ |
| S5b | **Cấu hình — chi tiết dự án** (`detail-page`) | FR-02, FR-05, FR-07, FR-11 | Status đích, giới hạn bước, field bắt buộc khi transition, thứ tự + bật/tắt mẫu. Chỉ-đọc nếu thiếu quyền trên **chính dự án đó** |
| S6 | Lịch sử issue đã tạo | FR-08, FR-09 | Có cả dòng tạo lỗi và dòng auto-Done lỗi, bấm sang được S3b |
| S7 | Token Jira của tôi | FR-01, FR-11 | PAT riêng từng người, kiểm tra kết nối, thu hồi |
| S8 | Nhân bản mẫu sang dự án khác | FR-10 | Modal, liệt kê 3 chỗ không khớp trước khi xác nhận |

Không có màn hình mồ côi — mọi màn đều truy ngược về ít nhất một FR, và hiện mã FR ngay trên giao diện dưới dạng chip.

## Luồng chính

1. **Tạo issue từ mẫu (luồng số đông)** — S1 → S2 → S3.
   Số thao tác với mẫu điền sẵn hết: **2** (bấm hàng mẫu → bấm "Tạo issue"). Ràng buộc NFR-07 là ≤ 3 → **đạt**.
   Bộ đếm ở góc phải thanh prototype đếm sống, reset mỗi khi về màn chính — nghiệm thu bằng mắt được.
2. **Xử lý issue kẹt** — S6 → S3b → thử lại transition.
3. **Quản trị mẫu** — S1 → S4 → (S8 nếu nhân bản).
4. **Chuẩn bị dùng lần đầu** — S7 khai PAT → S5 cấu hình dự án → S4 soạn mẫu.

## Ca lỗi đã dựng

| Ca lỗi | Xem ở đâu |
|---|---|
| Transition hỏng giữa chuỗi (không đủ quyền) | S2 → nút **"Tạo issue (giả lập transition lỗi)"** → S3b |
| Tạo issue thất bại vì thiếu field bắt buộc | S6, dòng thứ 4 (không có issue key) |
| Mẫu không hợp lệ do Jira đổi field | S1, hàng **"Bàn giao thiết bị"** — bấm vào bị chặn, có ghi lý do |
| Mẫu nháp chưa dùng được | S1, hàng **"Yêu cầu mua sắm thiết bị"** |
| Không có quyền quản trị dự án | Đổi **"Xem như" → Thành viên thường**, hoặc chọn dự án **CORE** (có 🔒) |

## Độ phủ requirement

| FR | Ưu tiên | Lên màn hình? | Ghi chú |
|---|---|---|---|
| FR-01 Kết nối + PAT từng người | Must | ✅ S7 | Đủ |
| FR-02 Đồng bộ metadata | Must | ✅ S5 + S1 | Thể hiện qua banner đồng bộ, nguồn field, và badge mẫu không hợp lệ |
| FR-03 Tạo mẫu gắn 1 dự án | Must | ✅ S1, S4 | Đủ |
| FR-04 Giá trị mặc định | Must | ✅ S4, S2 | Gồm custom field, khoá/cho sửa, biến động, wiki markup |
| FR-05 Cấu hình cấp dự án | Must | ✅ S5 | Đủ |
| FR-06 Tạo issue từ mẫu | Must | ✅ S2, S3 | Đủ |
| FR-07 Auto-Done | Must | ✅ S4, S5, S2, S3 | Cắt ngang 4 màn: bật/tắt ở mẫu, đích ở dự án, báo trước khi tạo, kết quả sau khi tạo |
| FR-08 Xử lý auto-Done lỗi | Must | ✅ S3b, S6 | Đủ |
| FR-11 Phân quyền theo Jira | Must | ✅ toàn cục | Công tắc "Xem như" + 🔒 trên dự án CORE + banner chỉ-đọc |
| FR-09 Lịch sử issue | Should | ✅ S6 | Đủ |
| FR-10 Vòng đời mẫu | Should | ⚠️ **một phần** | Chỉ dựng **nhân bản** (S8) vì đó là thao tác tái sử dụng chính theo A-10. **Sửa / archive / xoá chưa lên màn hình** — là CRUD thường, để bản sau nếu review thấy cần |

Mọi **FR Must** đều đã lên màn hình.

## Chỗ là giả (mock)

- Toàn bộ dữ liệu tĩnh trong JS: 3 dự án (ITSUP / WEBAPP / CORE), 9 mẫu, 5 dòng lịch sử.
- Không có lời gọi HTTP nào. Các endpoint Jira chỉ được **ghi ra để đối chiếu**, không chạy.
- "Kiểm tra kết nối", "Làm mới metadata", "Thử lại transition", "Lưu mẫu" → hiện hộp thoại mô tả, không làm gì thật.
- Nút đổi thứ tự mẫu ở S5b là nút thật nhưng chỉ hiện hộp thoại — kéo thả chưa dựng.
- Chỉ dựng 1 mẫu chi tiết ("Ghi nhận hỗ trợ đã xử lý") ở S2/S4; các mẫu khác dùng chung form đó, chỉ đổi tiêu đề và cờ auto-Done.

## [BỔ SUNG UX] — thứ prototype phải thêm mà requirement chưa có

1. **Trục điều hướng theo dự án** (sidebar chọn dự án). RequirementSet không nói gì về điều hướng — đây là quyết định của bước prototype (P2).
2. **Cách hiển thị mẫu "không hợp lệ"**. FR-02 nói mẫu bị đánh dấu không hợp lệ và không cho tạo issue, nhưng không nói hiện ở đâu. Prototype thêm badge đỏ + chặn bấm + ghi lý do ngay trên thẻ.
3. **Cách hiển thị mẫu "nháp"**. FR-03 có trạng thái nháp nhưng không mô tả UI.
4. **Giới hạn số bước transition cho quản trị sửa được**. FR-07 chỉ nói "mặc định 5", không nói có cho chỉnh không. Prototype cho chỉnh ở S5.
5. **Bộ lọc "Mọi người / Chỉ của tôi"** ở lịch sử — xem câu hỏi 1 bên dưới.

> Cả 5 mục là **ứng viên đưa vào RequirementSet v3**, chưa tự ý coi là đã có.

## Câu cần người review trả lời

1. **Lịch sử là của cá nhân hay của cả team?** FR-09 mô tả *"xem lại các issue **đã tạo qua hệ thống**"* nhưng tiêu chí chấp nhận lại có cột **người tạo** và không nói phạm vi. Prototype đang hiện issue của cả team (có dòng của `hoa.nguyen`, `minh.tran`) kèm bộ lọc "Chỉ của tôi". Cần chốt: mặc định thấy của ai?

2. **Mẫu có field bắt buộc không đặt mặc định thì luồng tạo mất bao nhiêu thao tác?** Mẫu demo để `Đơn vị yêu cầu` cho người tạo chọn — hợp lệ theo FR-04, nhưng đẩy luồng từ 2 lên 3–4 thao tác, chạm trần NFR-07. Cần chốt: có khuyến nghị/cảnh báo khi soạn mẫu để mọi field bắt buộc đều có mặc định không?

3. **FR-10 có cần lên prototype đầy đủ không?** Hiện chỉ dựng nhân bản. Sửa/archive/xoá là CRUD thường — bỏ qua ở prototype có chấp nhận được không, hay muốn xem cả luồng archive vì nó đụng tới lịch sử ở FR-09?

## Lịch sử thay đổi

### v7 — 2026-08-10 — dựng lại từ đầu theo phong cách Atlassian

Hai việc trong một bản: sửa một lỗi khung, và đổi hẳn phong cách.

**Lỗi khung (bạn báo):** khối tài khoản ở đáy thanh bên bị đẩy khỏi khung nhìn khi trang dài — menu chỉ có 4 mục mà vẫn phải cuộn mới thấy tên mình. Nguyên nhân: thanh bên giãn theo chiều cao tài liệu. Sửa bằng **app-shell** — khung cố định, chỉ vùng nội dung cuộn. Đã thành quy tắc `AP-19` / `RES-12` và **thành check máy**.

> Bản sửa **đầu tiên** của tôi cho lỗi này vẫn sai: tôi hardcode `38px` cho chiều cao thanh trên, trong khi nó cao **53px**. Chính check `RES-12` vừa viết bắt được. Nhìn mắt thì bản vá đó trông như đã xong.

**Đổi phong cách:** Material 3 → Atlassian. Điểm đáng ghi lại: **phong cách không chỉ là màu**. Design system với bo góc 28px cho hộp thoại và nút dạng viên không thể biểu đạt Atlassian, nên phải đổi cả token *hình dạng* — bo góc về 3px, thang chữ nhỏ hơn (headline 20px thay 24px), bóng nhẹ hơn, ô bảng 8px. Token *màu* giữ nguyên.

**Đổi cấu trúc theo `knowledge/ui/`:**
- Thanh prototype và nhận diện sản phẩm **gộp một hàng** — trước đây là hai dải chrome chồng nhau
- Lưới thẻ ở màn Mẫu issue → **bảng dày** (`LAY-11` compact, `AP-07` không dùng thẻ để nhóm hai dòng chữ)
- Huy hiệu chuyển sang **lozenge** kiểu Atlassian
- Ô bảng 8px, hàng 40px — trả nốt mục nợ `N-1` của v5

**Mở rộng eval từ 6 lên 16 ảnh** (8 màn × 2 theme) — và ngay lập tức bắt được 3 lỗi ở màn Soạn mẫu, màn chưa từng được chụp trước đó.

**Một lớp lỗi mới thành quy tắc `AP-20`:** link "cấu hình dự án" trong dải cảnh báo không khai màu nên rơi về màu mặc định của trình duyệt. Theme sáng đọc được nên **không ai để ý**; theme tối cho tương phản **1.05:1**, gần như tàng hình. Máy bắt được vì chạy trên **cả hai theme**.

### v6 — 2026-08-10 — tách Cấu hình thành hai màn, và sửa cả yêu cầu

Theo phản hồi review. Màn cấu hình cũ làm hai việc cùng lúc — chọn dự án *và* cấu hình dự án — vi phạm `PRIN-01` và dài 1670px. Bảng "Dự án của bạn" thêm ở v3 vốn chỉ là **bản vá cho lỗi discoverability**, không phải lời giải.

- **S5a — danh sách dự án** (`crud-list`): mọi dự án, quyền, status đích, số mẫu, **đồng bộ lần cuối**, nút Chi tiết.
- **S5b — chi tiết dự án** (`detail-page`): toàn bộ phần cấu hình, chỉ-đọc nếu thiếu quyền trên **chính dự án đó** (trước đây tính theo dự án đang chọn ở thanh bên — sai).
- **Cấu hình tách khỏi ngữ cảnh thanh bên**, chuyển sang nhóm "Quản trị". Trước đây tồn tại hai cách chọn dự án song song (`PRIN-04`).
- **Mở màn không gọi Jira.** Chỉ nút *Lấy lại thông tin từ Jira* mới đồng bộ.

**Phát hiện đáng giá nhất không nằm ở giao diện:** FR-02 cũ chỉ nói *"metadata được cache; có nút làm mới"* — không hề nói **khi nào** hệ thống gọi Jira, nên đọc kiểu nào cũng được. Đã bổ sung 5 tiêu chí và **RequirementSet lên v3**. Đây là vòng `UiPrototype → refines → RequirementSet` chạy đúng thiết kế.

**Một hồi quy bắt được nhờ nhìn ảnh:** cột "Thứ tự" vỡ hai dòng, do một script sửa lỗi trước đó **thoát giữa chừng trước khi ghi file** — markup có class `.order-cell` nhưng CSS thì không. Lớp 1 báo PASS suốt.

### v5 — 2026-08-10 — sửa theo `knowledge/ui/`, lần đầu qua được UI Eval

Bản đầu tiên được dựng **có bộ quy tắc để soi**, và là lần đầu có số liệu trước/sau.

| | v4 | v5 |
|---|---|---|
| Lỗi lớp 1 (blocking) | 19 | **0** |
| Điểm judge lớp 2 | 0.58 ⛔ | **0.81** ✅ |
| Lỗi thị giác | 9 | 0 (còn 2 mục nợ mức Thấp) |

Sửa 9/9 lỗi thị giác + 3 nhóm lỗi lớp 1, mỗi bản sửa gắn với một mã quy tắc — chi tiết ở [ui-eval-report.md](ui-eval-report.md).

**Hai chuyện đáng ghi lại từ quá trình sửa:**
- Sửa `AP-08` (radio giả → radio thật) **sinh ra 5 lỗi `A11Y-02` mới**, vì radio mặc định của trình duyệt chỉ 13×13px. Màn config *tệ đi* sau khi "sửa". → **Phải chạy lại eval sau mỗi vòng sửa**, không chỉ ở cuối.
- `DS-01` từng báo **57 lỗi giả** do regex của chính harness. → **Check tự động cũng hỏng, và hỏng im lặng theo cả hai chiều.**

**[BỔ SUNG UX]:** thêm dải "Issue vừa tạo ở dự án này" trên màn chính — dùng lại dữ liệu FR-09 để sửa `AP-04` theo đúng thứ tự khắc phục của `LAY-03`. Ứng viên cho RequirementSet v3.

### v4 — 2026-08-10 — màu chuyển sang lấy từ Design System

Không còn là "prototype tự chọn màu". Sau khi chốt kiến trúc ở [docs/07](../../../docs/07-uiux-capability-and-eval.md), dự án có `DesignSystem` thật:

- **Seed đổi từ tím baseline M3 sang `#2563EB` Xanh dương** (quyết định F1) — quy ước công cụ doanh nghiệp, gần Jira nên người dùng đỡ lệch ngữ cảnh khi chuyển qua lại.
- Hai khối token CSS nay **sinh từ** [design-system/themes/light.json](../../../design-system/themes/light.json) và [dark.json](../../../design-system/themes/dark.json), không sửa tay trong prototype nữa.
- **Kiến trúc token hai tầng:** palette gốc (`blue.10..95`, `neutral.0..100`) → vai trò ngữ nghĩa theo theme → component. Component không bao giờ chạm palette gốc.
- Bỏ `secondary` / `tertiary` — design system chỉ một hue, dùng bậc tone khác nhau. Tên cũ giữ lại làm bí danh để không phải sửa rải rác.
- **Tương phản đã kiểm:** 10/10 cặp đạt ở mỗi theme, ghi trong `contrastReport` của từng file theme. Đây là check `A11Y-01`, blocking.
- Chế độ tối giữ nền **đen tuyệt đối**, `outline-variant` sáng hơn bản M3 gốc (`#30343E`) để đường kẻ bảng không biến mất trên nền đen.

**Thay đổi duy nhất trong `index.html` là 2 khối token** — đúng lời hứa của Design System, và là bằng chứng nhỏ rằng kiến trúc ở docs/07 chạy được.

### v3 — 2026-08-10 — sửa theo góp ý review

**Theo yêu cầu:**
- **Chế độ tối chuyển sang nền đen tuyệt đối** `#000000`. Vì bóng đổ không đọc được trên nền đen, tầng surface được phân biệt lại bằng độ sáng (`#0D0D10` card → `#1B1B20` thẻ mẫu/dialog → `#242429`), và `outline-variant` sáng lên (`#38363F`) để đường kẻ bảng còn thấy.
- **Sửa màn Cấu hình dự án — không tìm thấy dự án nào để cấu hình.** Nguyên nhân: màn này bám theo dự án đang chọn ở sidebar nhưng không hiển thị đang cấu hình dự án nào, cũng không có chỗ đổi sang dự án khác; thêm nữa mục menu bị ẩn hoàn toàn khi dự án đang chọn là dự án bạn không có quyền admin. Sửa bằng:
  - Thêm **bảng "Dự án của bạn"** ngay đầu màn: mỗi dự án hiện quyền, status đích đã đặt chưa, số mẫu, và nút **Cấu hình**.
  - Thêm dải **"Đang cấu hình: `<key>` — `<tên>`"** để luôn rõ ngữ cảnh.
  - Mục menu **Cấu hình dự án không còn bị ẩn** khi thiếu quyền; thay vào đó vào được và thấy trạng thái **chỉ đọc** kèm giải thích — đúng tinh thần FR-11 hơn (ẩn nút sửa + server chặn) và không làm người dùng tưởng chức năng biến mất.

**Hai lỗi tìm thêm khi rà lại:**
- `pick()` đổi dự án nhưng **không gọi lại `render()`** → bấm sang dự án khác thì lưới mẫu vẫn là của dự án cũ. Lỗi có từ v1.
- `.only-admin{display:block}` **ghi đè `display:flex`/`inline-flex`** của chính phần tử mang class đó (nút "Mẫu mới" bị kéo dài thành khối, mục menu mất căn). Sửa thành chỉ đặt display cho trạng thái *ẩn*.

**Thêm cho khớp dữ liệu:** dự án WEBAPP nay để **chưa đặt status đích**, khớp với cảnh báo trong hộp thoại nhân bản mẫu, và làm hiện được trạng thái "Chưa cấu hình" trên bảng tổng quan.

### v2 — 2026-08-10
- **Dựng lại toàn bộ theo Material 3** sau khi người dùng chỉ ra rằng v1 chọn phong cách mà không hỏi. Bổ sung câu hỏi D1 (phong cách, kèm danh mục 10 phong cách phổ biến của ngành) và D2 (sáng/tối) vào vòng làm rõ.
- Áp dụng hệ thống của M3: color roles (`primary` / `surface-container` / `on-*`), thang chữ (headline / title / body / label), nút dạng viên 40px (filled · tonal · outlined · text), navigation drawer item bo 26px, text field outlined có nhãn khuyết, chip, dialog bo 28px, elevation 3 mức, state layer 8% khi hover.
- **Thêm chế độ sáng/tối** bằng biến CSS, nút chuyển ở thanh prototype, nhớ lựa chọn qua `localStorage`, lần đầu lấy theo `prefers-color-scheme`.
- Toàn bộ 9 màn hình, luồng, ca lỗi và độ phủ FR **giữ nguyên như v1** — chỉ đổi lớp trình bày.
- Sửa skill [make-prototype](../../../.claude/skills/make-prototype/SKILL.md): thêm 4 trục bắt buộc hỏi, danh mục phong cách tham chiếu, và quy tắc dùng `preview` để so sánh trực quan.

### v1 — 2026-08-10
- Bản đầu từ RequirementSet v2 (Approved). 9 màn hình, phủ 100% FR Must, FR-10 phủ một phần.
- Quyết định UX: P1 gần giống thật · P2 trục dự án · P3 lưới mẫu làm màn chính.
