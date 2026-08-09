# 00 — Vision & Principles

## 1. Mục tiêu

Một nền tảng dùng chung cho team kỹ thuật, hỗ trợ **toàn bộ vòng đời phát triển phần mềm bằng AI** — từ ý tưởng thô đến code đã review.

Platform nhận đầu vào ở **bất kỳ độ chín nào**:

- ý tưởng / yêu cầu thô
- tài liệu BA có sẵn
- prototype có sẵn
- source code hiện có

Và AI có thể: tìm hiểu nghiệp vụ → nghiên cứu giải pháp → phân tích yêu cầu → đề xuất phương án → thiết kế UI prototype → thiết kế kiến trúc → code → test → review.

## 2. Reframe cốt lõi: "1 senior engineer được khuếch đại"

> Mỗi dự án thường chỉ có **một người** làm. Vì vậy platform **không mô phỏng một team AI**; nó là **buồng lái (cockpit) cho một senior engineer**.

Con người giữ ba vai trò không nhượng: **điều phối, quyết định, và gác cổng rủi ro**. AI làm phần nặng nhọc (BA, research, design, code, test). Hệ quả thiết kế:

- **Multi-Agent chỉ là chi tiết thực thi bên trong một capability** (vd research fan-out), **vô hình ở tầng platform**. Có capability chỉ cần 1 prompt; có capability cần nhiều agent — platform không quan tâm.
- Giao diện chính không phải "chat với nhiều bot", mà là **bảng điều khiển dòng công việc**: đang ở giai đoạn nào, có artifact gì, chỗ nào cần review, rủi ro/eval ra sao.

## 3. Hai nguyên tắc bất biến

**NT1 — Capability-first, không phụ thuộc cấu trúc Agent.**
Platform được xây quanh *việc cần làm* (Capability), tách khỏi *cơ chế làm* (agent/prompt/tool/human). Đổi cách thực thi không được làm vỡ nền tảng.

**NT2 — Khám phá từ thông tin chưa đầy đủ.**
Platform **không giả định** luôn có BA/Designer/Architect. Nó phải tự khám phá yêu cầu & giải pháp từ đầu vào thiếu, và **chủ động nêu câu hỏi** khi thông tin không đủ (thay vì bịa giả định).

## 4. Luận điểm về Autonomy (đã tinh chỉnh)

Phiên bản gốc: *AI mạnh hơn → Eval tốt hơn → Autonomy tăng → platform tự làm nhiều hơn.*

Tinh chỉnh — tách hai lực:

- **Model mạnh hơn → nâng *trần* năng lực** (làm được việc khó hơn).
- **Eval tốt hơn → nâng *mức tự chủ an toàn*** (được phép tự chạy tới đâu).

> Eval không tự tốt lên theo model — **Eval là thứ ta phải xây**. Chính Eval mới là "moat", cho phép nâng Autonomy mà kiểm soát được rủi ro. Một capability chỉ "tốt nghiệp" lên mức tự chủ cao hơn khi **hồ sơ eval của nó vượt ngưỡng tin cậy** (xem [03](03-eval-and-autonomy.md)).

Vòng lặp học đóng kín: **quyết định review của senior engineer trở thành golden data cho Eval**.

## 5. Scope & Non-goals (v1)

**Trong phạm vi:**
- Điều phối lifecycle theo capability, có gate con người.
- Artifact có kiểu, có version, truy vết được (Idea → … → Code).
- HTML/UI prototype + Customer Review gate.
- Eval harness + autonomy ladder.
- Knowledge store cấp project và cấp org.
- Provider abstraction (không khóa vào một model).

**Ngoài phạm vi (v1):**
- Tự deploy/vận hành production (CI/CD, infra) — chỉ sinh artifact, chưa tự bấm nút prod.
- Multi-tenant SaaS thương mại hóa — v1 là công cụ nội bộ team.
- Fine-tuning model riêng.
- Real-time collaborative editing nhiều người trên cùng artifact.

## 6. Glossary

| Thuật ngữ | Nghĩa |
|-----------|-------|
| **Capability** | Một đơn vị công việc kỹ thuật platform thực hiện được, có contract input/output/eval/autonomy. |
| **Artifact** | Sản phẩm có kiểu, có version do capability sinh ra (reqs, prototype, code…). |
| **Artifact Graph** | Đồ thị liên kết & truy vết giữa các artifact. |
| **Gate** | Điểm dừng bắt buộc/tùy chọn cần con người phê duyệt. |
| **Autonomy Level** | Mức tự chủ (L0–L3) của một capability. |
| **Eval** | Cơ chế đo chất lượng output của capability. |
| **Orchestrator** | Bộ điều phối chạy capability theo lifecycle, tôn trọng gate & autonomy. |
| **Knowledge Store** | Kho tri thức project + org mà capability đọc/ghi. |
