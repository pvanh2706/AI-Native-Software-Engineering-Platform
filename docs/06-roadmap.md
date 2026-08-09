# 06 — Roadmap

Nguyên tắc: **nền (P0) phải ổn định trước; capability & autonomy mở rộng sau mà không phá nền.** Mỗi phase có *tiêu chí hoàn thành* rõ ràng để biết khi nào được đi tiếp.

## P0 — Nền tảng (Foundation)
**Mục tiêu:** khóa contract lõi + khung điều phối, chưa cần capability "thông minh".

- Domain model: `CapabilityDefinition`, `Artifact`, `ArtifactEdge`, `CapabilityRun`, `EvalResult`, `ProjectState` ([02](02-capability-and-artifact.md), [03](03-eval-and-autonomy.md)).
- Capability Registry (nạp definition từ file) + resolve `ExecutionBinding`.
- Artifact Graph service (bất biến + version + edges) trên EF Core/Postgres.
- Orchestrator loop tối giản (eligibility theo `InputContract`) + Event Log.
- Provider abstraction (`IModelProvider`) + **1 adapter Claude** thật + 1 stub để test.
- Khung API + SignalR + skeleton Vue dashboard (đọc state, chưa cần đẹp).

**Exit criteria:** chạy được một capability *giả* (echo/stub) end-to-end: tạo project → run → sinh artifact → hiện trên dashboard → gate → approve → event log đầy đủ. Đổi `Execution.Kind` không phá gì.

## P1 — Vertical Slice thật
**Mục tiêu:** chứng minh giá trị end-to-end với capability thật, gồm Customer Review gate.

Luồng: `RawInput (idea thô) → requirement.analyze → prototype.generate (HTML) → Customer Review gate → refines RequirementSet`.

- 3 capability thật (SinglePrompt): intake classify, requirement analyze, prototype generate.
- Structured output theo `OutputContract` (ép schema).
- Prototype viewer (iframe sandbox) + form thu `CustomerFeedback` + tạo cạnh `refines`.
- Traceability UI: req ↔ screen.

**Exit criteria:** từ một đoạn mô tả ý tưởng thô → ra được `RequirementSet` + prototype HTML bấm được → customer để lại feedback → sinh `RequirementSet v2`. Toàn bộ truy vết trên Artifact Graph.

## P2 — Eval Harness
**Mục tiêu:** biến "chạy được" thành "đo được".

- Deterministic + rubric checks cho 3 capability của P1.
- LLM-as-Judge + `EvalResult.Confidence`.
- Golden data từ mỗi `HumanDecision`; bảng eval + risk trên dashboard.
- Cost budget/actual + hiển thị chi phí lũy kế.

**Exit criteria:** mỗi artifact P1 có điểm eval + confidence; senior engineer thấy được vì sao (reasons/citations); golden data tích lũy.

## P3 — Mở rộng Capability
**Mục tiêu:** phủ thêm lifecycle mà không đổi nền.

- Thêm: domain research, solution proposal, architecture spec, code change, test suite, review report.
- Đầu vào đa dạng: bắt đầu từ **source code có sẵn** và **BA có sẵn** (không chỉ idea thô) — kiểm chứng NT2 & eligibility linh hoạt.
- Ít nhất một capability chuyển từ SinglePrompt → **MultiAgent** để chứng minh bất biến "đổi cách thực thi không phá contract".
- Workspace cô lập (git worktree) cho capability đụng source (`RiskClass.High`).

**Exit criteria:** một project đi từ source code có sẵn → review report, qua nhiều capability, có ≥1 capability multi-agent, không sửa Core.

## P4 — Autonomy Graduation
**Mục tiêu:** đóng vòng lặp "AI mạnh hơn → autonomy cao hơn".

- Autonomy Controller đầy đủ: eligibility theo eval track-record + risk + budget.
- Cơ chế promote L2→L3 và tự demote khi regression.
- Chắt lọc bài học project → org knowledge (có gate duyệt).

**Exit criteria:** ít nhất một capability `Low`-risk tốt nghiệp L3 dựa trên bằng chứng eval, tự chạy + cho veto; có case tự demote khi eval tụt.

---

## Thứ tự đề xuất tiếp theo (sau khi chốt spec)
1. Duyệt lại 4 `⚠️ OPEN DECISION` quan trọng (xem tổng hợp ở tin nhắn kèm theo).
2. Khởi tạo solution .NET + web skeleton (P0).
3. Dựng Orchestrator + Artifact Graph với capability stub → chứng minh end-to-end.
