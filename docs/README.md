# AI-Native Software Engineering Platform — Specification

> **Trạng thái:** `v0.1 — DRAFT` · Đang thống nhất. Các quyết định còn mở được đánh dấu `⚠️ OPEN DECISION`.

Bộ tài liệu này định nghĩa **nền tảng kiến trúc phải ổn định lâu dài** của platform. Nguyên tắc: model AI mạnh lên, capability nhiều lên — nhưng bộ khung dưới đây **không đổi**.

## Nền tảng ổn định (5 trụ)

```
Capability  +  Eval  +  Autonomy  +  Knowledge  +  Engineering Lifecycle
```

## Thứ tự đọc

| # | Tài liệu | Nội dung |
|---|----------|----------|
| 00 | [Vision & Principles](00-vision-and-principles.md) | Mục tiêu, reframe, nguyên tắc, scope/non-goals, luận điểm autonomy |
| 01 | [Foundation Architecture](01-foundation-architecture.md) | 5 trụ ghép với nhau ra sao, layered architecture, ánh xạ .NET |
| 02 | [Capability & Artifact](02-capability-and-artifact.md) | **Hai contract lõi** — trái tim của platform |
| 03 | [Eval & Autonomy](03-eval-and-autonomy.md) | Cách đo chất lượng và cơ chế "tốt nghiệp" tự chủ |
| 04 | [Knowledge & Orchestration](04-knowledge-and-orchestration.md) | Tri thức project/org + vòng lặp điều phối lifecycle |
| 05 | [Tech Stack & Data Model](05-tech-stack-and-data-model.md) | .NET + Vue 3/TS/Tailwind, provider abstraction, data model |
| 06 | [Roadmap](06-roadmap.md) | Lộ trình P0→P4 với tiêu chí hoàn thành từng phase |
| 07 | [UI/UX Capability & UI Eval](07-uiux-capability-and-eval.md) | Nhóm capability `ui.*`, Design System như artifact, Component/Pattern Registry, UI Eval 2 lớp, Design Direction gate |
| 08 | [Review khoảng cách UI Capability](08-ui-capability-gap-review.md) | Kiểm kê "đã viết" vs "đang dùng", vì sao UI chưa cải thiện, thứ tự ưu tiên, chính sách nguồn ngoài — *chờ duyệt* |

## Tech stack (đã chốt)

- **Backend:** .NET (ASP.NET Core)
- **Frontend:** Vue 3 + TypeScript + Tailwind CSS
- **Model provider:** trừu tượng hóa, mặc định Claude (pluggable) — xem [05](05-tech-stack-and-data-model.md)

## Quy ước

- `⚠️ OPEN DECISION` — điểm cần bạn quyết trước khi code.
- `💡` — gợi ý/tùy chọn có thể bàn thêm.
- Định danh code (class, field) viết tiếng Anh; diễn giải viết tiếng Việt.
