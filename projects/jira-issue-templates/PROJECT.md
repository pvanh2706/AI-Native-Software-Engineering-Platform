# Jira Issue Templates

- **Slug:** jira-issue-templates
- **Tạo ngày:** 2026-08-10
- **Trạng thái lifecycle:** Prototype → **Design** (gate Analysis đã qua 2026-08-10)
- **Nguồn đầu vào:** idea thô

## Một dòng

Web nội bộ gọi **Jira Data Center** qua REST API v2 bằng **PAT riêng của từng người**: định nghĩa mẫu issue gắn với một dự án (có giá trị mặc định, custom field, biến `{{today}}`/`{{me}}`), tạo issue trong ≤ 3 lần bấm, và tự chạy chuỗi transition đưa issue tới status Done của dự án khi mẫu bật auto-Done.

## Artifact hiện có

| Artifact | File | Phiên bản | Trạng thái | Sinh ra từ |
|---|---|---|---|---|
| Input | [00-input.md](00-input.md) | v1 | Ghi nhận | mô tả trực tiếp của người dùng |
| RequirementSet | [01-requirements.md](01-requirements.md) | **v3** | Approved v2; **v3 chờ duyệt lại** | 00-input.md + 01-answers.md + phản hồi prototype (`refines`) |
| Answers | [01-answers.md](01-answers.md) | v1 | 16 câu đã chốt | vòng làm rõ trong chat, 2026-08-10 |
| OpenQuestions | [01-open-questions.md](01-open-questions.md) | v2 | 2 câu cần kiểm tra + 5 câu tùy chọn · **0 blocking** | 00-input.md |
| DesignSystem | [design-system/](../../design-system/README.md) | v0.1 | Draft (chờ Human Gate) | `ui.system.bootstrap` — **org scope**, dùng chung mọi dự án |
| UiPrototype | [02-prototype/](02-prototype/README.md) | **v7** | Draft (chờ review) · ✅ **qua UI Eval** | 01-requirements.md v3 (`realizedBy`) + DesignSystem v0.1 (`informs`) |
| UiEvalReport | [02-prototype/ui-eval-report.md](02-prototype/ui-eval-report.md) | v7 | PASS — lớp 1 sạch **16/16 ảnh** | UiPrototype v7 |
| UiBrief | [03-ui-brief/](03-ui-brief/README.md) | v1 | **6/7 màn đã viết và đã chạy** · ⛔ thiếu **S7 — Token Jira của tôi** (FR-01) | 01-requirements.md v3 |
| DesignInput | [04-design/](04-design/README.md) | — | **6 màn đã nhận từ Stitch và đã chuẩn hoá** theo [QUYET-DINH.md](04-design/QUYET-DINH.md) | Stitch (ngoài hệ thống) |
| App (Vue) | [app/](app/) | — | **6/6 màn đã convert**, `CMP-01` 81.3–93.1%, `vue-tsc` + build sạch | templates/vue-admin + 04-design/ |
| UiEvalReport (app) | [app/.ui-eval/bao-cao.json](app/.ui-eval/) | — | Lớp 1: **16/17 URL đạt**, 5/5 luồng đạt · ❌ `s5a-rong` 79.7% · **judge lớp 2 chưa chạy** | `tools/ui-eval/measure.mjs` |

## Câu hỏi còn treo

- [ ] **Q22** — Jira DC phiên bản nào? PAT chỉ có từ 8.14+. *Tạm dùng:* giả định ≥ 8.14.
- [ ] **Q23** — Workflow có bắt field nào khác `Resolution` khi đóng issue không? *Tạm dùng:* chỉ `Resolution`.
- [ ] Q17–Q21 — tùy chọn (thông báo, webhook, i18n, import/export mẫu, lịch sử phiên bản mẫu).

## Quyết định chính (chi tiết ở [01-answers.md](01-answers.md))

| # | Quyết định | Ghi chú |
|---|---|---|
| A-01 | Jira **Data Center**, REST API v2 | PAT, wiki markup, không dính ADF |
| A-02 | **PAT riêng từng người**, không dùng tài khoản dịch vụ chung | Issue mang đúng tên người tạo |
| A-05 | Auto-Done: **bật/tắt ở cấp mẫu**, status đích ở cấp dự án | **Khác nguyên văn yêu cầu ban đầu** |
| A-06 | Tự đi **nhiều bước** transition tới Done | Chấp nhận lịch sử ghi các bước trung gian |
| A-07 | Khai sẵn giá trị field bắt buộc khi transition | Chặn ca lỗi phổ biến nhất (`Resolution`) |
| A-09 | Phân quyền **bám theo `ADMINISTER_PROJECTS` của Jira** | Không dựng bộ phân quyền riêng |
| A-10 | Mẫu gắn **đúng 1 dự án**, nhân bản để tái dùng | Giá trị mặc định luôn hợp lệ |
| A-11 | Hỗ trợ **custom field tổng quát** theo metadata | Phần nặng nhất của frontend |
| A-15 | Quy mô nhỏ → **gọi Jira đồng bộ**, không hàng đợi | Ngưỡng xem lại: >500 issue/ngày hoặc >50 dự án |

## Còn phải làm để đóng giai đoạn thiết kế

| # | Việc | Ai quyết |
|---|---|---|
| 1 | **S7 — Token Jira của tôi** (FR-01, Must): brief → Stitch → chuẩn hoá → convert → eval | — |
| 2 | **Cổng `CMP-01` đang đỏ**: `s5a-rong` 79.7%, phần "viết tay" còn lại 100% là `AppShell`. Ba phương án ở [convert-ghi-chu S3](04-design/s3-lich-su-issue/convert-ghi-chu.md) | **người** |
| 3 | **DesignSystem v0.1 vẫn `Draft`** chờ Human Gate. [docs/07 §4](../../docs/07-uiux-capability-and-eval.md) đặt `DesignSystem.status == Approved` làm precondition của `ui.design.*` — cả 6 màn đang dựng trên artifact chưa duyệt. Còn thiếu vai trò `warning` trần | **người** |
| 4 | **Judge lớp 2 chưa chạy cho bản Vue.** `UiEvalReport` v7 chỉ có cho prototype HTML; app Vue mới có lớp 1 | — |
| 5 | **`DS-01` chưa quét được app thật** — mới quét HTML tự chứa, cần quét `.vue`/`.css` | — |
| 6 | **RequirementSet v3 vẫn "chờ duyệt lại"** (mới `Approved` tới v2) | **người** |

## Nhật ký quyết định

- 2026-08-11 — **Convert S3 (Lịch sử issue) — màn thứ 6 và là màn cuối có thiết kế.** `CMP-01` 92.7% (danh sách) / 85.9% (lọc không khớp), 0 lỗi a11y+responsive, luồng `FR-09` 1 lần bấm. Không thêm component mới. Ba thứ lộ ra khi đo: (a) `input[type=date]` vẽ theo locale **trình duyệt** chứ không theo `lang` của trang, nên máy en-US đọc ngược ngày — bù bằng caption ghi lại khoảng ngày `dd/mm/yyyy`; (b) **`s5a-rong` có lỗi thật** — hiện thông báo rỗng mà vẫn liệt kê đủ 5 dự án, và chính 5 dòng thừa đó đẩy `CMP-01` từ 79.7% lên 89.3% ảo; (c) `RES-01b` báo nhầm mọi `sr-only` là "nội dung bị cắt", tức phép đo đang đẩy người ta bỏ `sr-only` đi — đã sửa ở `measure.mjs`. Sửa **QĐ1**: bộ chọn dự án ở thanh bên **không** chi phối *Lịch sử issue*, vì brief S3 đòi lựa chọn "Tất cả" mà bộ chọn đó không diễn đạt được.
- 2026-08-10 — Chạy skill `analyze-idea` trên ý tưởng thô. Sinh RequirementSet **v1** (10 FR, 7 NFR) + OpenQuestions v1 (21 câu, 7 blocking, 5 giả định).
- 2026-08-10 — Cải tiến luồng skill: chuyển từ "ghi câu hỏi vào file chờ người dùng sửa tay" sang **hỏi trực tiếp trong chat**; thêm skill `answer-questions` để gỡ câu treo qua chat.
- 2026-08-10 — Chạy **vòng làm rõ** theo luồng mới: 16 câu / 5 lô, chốt hết. RequirementSet lên **v2**: 11 FR, 8 NFR, **0 giả định**, 0 câu blocking. Thay đổi lớn nhất: auto-Done chuyển bật/tắt xuống cấp mẫu (A-05) — lệch với nguyên văn yêu cầu ban đầu, cần người dùng xác nhận khi review.
- 2026-08-10 — **Gate Analysis: DUYỆT.** RequirementSet v2 → `Approved`. Lifecycle chuyển sang Prototype.
- 2026-08-10 — **UiPrototype v7 — dựng lại từ đầu theo phong cách Atlassian (J1).** Review báo khối tài khoản ở thanh bên bị đẩy khỏi khung nhìn; sửa bằng **app-shell** và biến thành quy tắc `AP-19`/`RES-12` **có check máy**. Bản sửa đầu tiên của tôi vẫn sai (hardcode 38px trong khi thanh cao 53px) và chính check đó bắt được. Đổi phong cách kéo theo **đổi token hình dạng** — bo góc 3px, headline 20px, ô bảng 8px — vì màu không đủ để biểu đạt một phong cách. Mở rộng eval 6 → **16 ảnh**, lập tức lộ 3 lỗi ở màn chưa từng chụp, trong đó có `AP-20` (link rơi về màu mặc định trình duyệt, chỉ lộ ở theme tối). Lớp 1 sạch 16/16 **ngay lần chạy đầu** — lần đầu điều đó xảy ra.
- 2026-08-10 — **RequirementSet v3 + UiPrototype v6 — prototype bắt được thiếu sót trong YÊU CẦU.** Review đề nghị tách Cấu hình dự án thành 2 màn (danh sách + chi tiết) và chỉ gọi Jira khi bấm làm mới. Ý thứ hai lộ ra **FR-02 v2 không hề quy định khi nào hệ thống gọi Jira** — đọc kiểu nào cũng được. Bổ sung 5 tiêu chí vào FR-02, tách FR-05 thành 2 màn, và tách khu vực cấu hình khỏi ngữ cảnh thanh bên (trước đó có hai cách chọn dự án song song). Đây là vòng `UiPrototype → refines → RequirementSet` chạy đúng thiết kế. Eval: 8/8 ảnh lớp 1 sạch, judge 0.84.
- 2026-08-10 — **UiPrototype v5 — lần đầu qua UI Eval.** Nối `design-system/` + `knowledge/ui/` vào skill `make-prototype` (bộ sinh token `tools/design-tokens`, §Nguồn bắt buộc, bước eval bắt buộc trước khi trình), rồi sửa 9 lỗi thị giác + 3 nhóm lỗi lớp 1 theo mã quy tắc. **Đo được: lớp 1 từ 19 → 0 lỗi, judge từ 0.58 → 0.81.** Hai bài học ghi lại: (a) sửa `AP-08` sinh ra 5 lỗi `A11Y-02` mới nên phải chạy lại eval sau mỗi vòng sửa; (b) `DS-01` từng báo 57 lỗi giả do regex của chính harness — check tự động cũng hỏng và hỏng im lặng.
- 2026-08-10 — **Chốt kiến trúc UI/UX Capability** ([docs/07](../../docs/07-uiux-capability-and-eval.md)): gốc của việc "giao diện chưa ưng" là AI phải tự phát minh hệ thống thị giác vì không có `DesignSystem` để bám. Dựng **Design System v0.1 dùng chung cho mọi dự án** (công ty chưa có bộ nhận diện sẵn — quyết định E1), seed **Xanh dương `#2563EB`** (F1). **UiPrototype v4**: màu nay sinh từ `design-system/themes/*.json`, thay đổi duy nhất trong `index.html` là 2 khối token.
- 2026-08-10 — **UiPrototype v3** — vòng review đầu tiên. Người dùng yêu cầu nền chế độ tối là **đen tuyệt đối**, và báo **không tìm thấy dự án nào để cấu hình** ở màn Cấu hình dự án. Cái thứ hai là lỗi thiết kế thật: màn đó bám dự án đang chọn ở sidebar mà không hiện ngữ cảnh, không cho đổi dự án, và bị ẩn hẳn khi thiếu quyền admin → thêm bảng tổng quan mọi dự án + dải "đang cấu hình" + cho vào xem ở chế độ chỉ đọc thay vì ẩn. Rà lại còn tìm thêm 2 lỗi có từ v1: `pick()` không gọi `render()` khi đổi dự án, và `.only-admin{display:block}` ghi đè display của phần tử flex.
- 2026-08-10 — **Sửa luồng skill lần 2:** `make-prototype` tự chọn phong cách thiết kế rồi dựng luôn — người dùng chỉ ra đây là tự quyết thứ thuộc thẩm quyền của họ và đắt để làm lại. Bổ sung vào skill: 4 trục bắt buộc hỏi (nguồn tham chiếu → phong cách → độ chín → điều hướng), danh mục 10 phong cách phổ biến của ngành, và quy tắc dùng `preview` để so sánh trực quan. Chốt **D1 = Flat / Material 3**, **D2 = sáng + tối có nút chuyển** → **UiPrototype v2** dựng lại toàn bộ lớp trình bày, giữ nguyên 9 màn hình và độ phủ FR.
- 2026-08-10 — Tạo skill `make-prototype` (capability giai đoạn Prototype, chưa từng tồn tại) rồi chạy cho dự án này. Sinh **UiPrototype v1**: 9 màn hình, phủ 100% FR Must, luồng tạo issue **2 thao tác** (ràng buộc NFR-07 là ≤ 3). Prototype soi ra **3 câu cần review** (phạm vi lịch sử ở FR-09, field bắt buộc không mặc định đụng trần NFR-07, độ phủ FR-10) và **5 mục [BỔ SUNG UX]** ứng viên cho RequirementSet v3.
