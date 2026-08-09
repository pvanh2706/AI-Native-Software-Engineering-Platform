# 05 — Tech Stack & Data Model

## 1. Stack (đã chốt)

| Tầng | Công nghệ |
|---|---|
| Backend | **.NET (ASP.NET Core)** — REST + SignalR |
| ORM / DB | **EF Core** + **PostgreSQL** (kèm `pgvector` cho semantic search) |
| Frontend | **Vue 3 + TypeScript + Tailwind CSS** |
| Realtime | **SignalR** (gate/notification/tiến độ run) |
| Storage artifact | DB cho structured + metadata; **blob** (file/HTML/code) trên object storage/thư mục |
| Model provider | Abstraction, mặc định **Claude** (pluggable) |

### Frontend — thư viện đề xuất
`⚠️ OPEN DECISION` (đề xuất, bạn chốt):
- **Pinia** (state), **Vue Router**, **TanStack Query** (server state/cache).
- **shadcn-vue** hoặc **PrimeVue** cho component (đi cùng Tailwind).
- **Monaco Editor** cho xem/diff code & artifact.
- Render HTML `UiPrototype` trong **iframe sandbox** (an toàn) + link share cho customer.

### Backend — kiến trúc code
Clean/Onion đã mô tả ở [01 §4](01-foundation-architecture.md). Bổ sung:
- **MediatR** cho use-case/CQRS trong `Application` (tùy chọn).
- **Background worker** (Hosted Service / Channels) chạy `CapabilityRun` bất đồng bộ — run có thể lâu (LLM), không block request.
- **Polly** cho retry/timeout khi gọi provider.

## 2. Provider Abstraction (không khóa vào một model)

Một interface duy nhất; mọi capability gọi qua đây. Đổi model/nhà cung cấp = đổi adapter, không lan lên Core.

```csharp
public interface IModelProvider
{
    string Key { get; }                              // "claude", ...
    Task<ModelResponse> CompleteAsync(ModelRequest req, CancellationToken ct);
    IAsyncEnumerable<ModelChunk> StreamAsync(ModelRequest req, CancellationToken ct);
    Task<float[]> EmbedAsync(string text, CancellationToken ct);
}

public sealed record ModelRequest
{
    public required IReadOnlyList<ChatMessage> Messages { get; init; }
    public IReadOnlyList<ToolDef> Tools { get; init; } = [];
    public ModelTier Tier { get; init; } = ModelTier.Balanced;  // ánh xạ sang model cụ thể của provider
    public int? MaxTokens { get; init; }
    public JsonSchema? StructuredOutput { get; init; }          // ép output theo schema (cho OutputContract)
}

public enum ModelTier { Fast, Balanced, Deep }
```

**Ý tưởng `ModelTier`:** capability không nêu tên model cụ thể mà nêu *cấp độ*; provider ánh xạ. Nhờ vậy đổi provider không cần sửa capability.

Ánh xạ mặc định cho Claude (khởi điểm — sẽ xác minh lại khi code bằng tài liệu API mới nhất):

| Tier | Dùng cho | Model Claude (mặc định) |
|---|---|---|
| `Fast` | phân loại intake, check rẻ, tóm tắt | Haiku 4.5 (`claude-haiku-4-5-20251001`) |
| `Balanced` | phân tích yêu cầu, sinh code, judge | Sonnet 5 (`claude-sonnet-5`) |
| `Deep` | kiến trúc, review khó, đề xuất phương án | Opus 4.8 (`claude-opus-4-8`) |

> Khi bắt đầu code phần provider, sẽ nạp tài liệu Claude API mới nhất để chốt model id, giá, cách gọi tool & structured output. Bảng trên là placeholder có căn cứ, không phải cam kết cuối.

## 3. Data Model (PostgreSQL — khái niệm)

```mermaid
erDiagram
    PROJECT ||--o{ ARTIFACT : has
    PROJECT ||--o{ CAPABILITY_RUN : has
    PROJECT ||--o{ KNOWLEDGE_ITEM : "project-scope"
    CAPABILITY_RUN ||--|| EVAL_RESULT : produces
    CAPABILITY_RUN }o--|| CAPABILITY_DEF : instanceOf
    ARTIFACT ||--o{ ARTIFACT_EDGE : "from"
    ARTIFACT ||--o{ ARTIFACT_EDGE : "to"
    CAPABILITY_RUN ||--o{ RUN_EVENT : trace
    PROJECT ||--o{ GATE_ITEM : pending
    EVAL_RESULT ||--o| HUMAN_DECISION : mayHave

    PROJECT { uuid id; string name; string status; jsonb current_focus }
    CAPABILITY_DEF { string id; string stage; jsonb contract; string default_autonomy; string risk }
    CAPABILITY_RUN { uuid id; string capability_id; uuid project_id; string status; jsonb cost_actual; string effective_autonomy }
    ARTIFACT { uuid id; string type; uuid project_id; int version; uuid superseded_by; jsonb content_struct; string blob_ref; string status; jsonb provenance }
    ARTIFACT_EDGE { uuid id; uuid from_id; uuid to_id; string edge_type }
    EVAL_RESULT { uuid id; uuid run_id; jsonb checks; jsonb judge; float confidence }
    HUMAN_DECISION { uuid id; uuid eval_id; string decision; string notes; string actor; timestamptz at }
    KNOWLEDGE_ITEM { uuid id; string scope; uuid project_id; string[] tags; string kind; text body; vector embedding }
    GATE_ITEM { uuid id; uuid project_id; string kind; uuid target_ref; string status }
    RUN_EVENT { uuid id; uuid run_id; string type; jsonb data; timestamptz at }
```

Ghi chú:
- `ARTIFACT` bất biến: sửa = insert version mới + set `superseded_by` ở bản cũ.
- `RUN_EVENT` + `HUMAN_DECISION` là nền cho **audit** và **golden data**.
- `CAPABILITY_DEF` có thể lưu DB (chỉnh runtime) hoặc nạp từ file cấu hình khi khởi động — `⚠️ OPEN DECISION` (đề xuất: file-based, versioned trong git ở giai đoạn đầu để dễ review contract).

## 4. API bề mặt (phác thảo)

```
POST   /projects                      tạo project + nạp input
GET    /projects/{id}/state           trạng thái lifecycle + gates + cost
GET    /projects/{id}/artifacts       cây/đồ thị artifact
GET    /artifacts/{id}                chi tiết + version + edges
POST   /projects/{id}/runs            kích hoạt capability (nếu autonomy cho phép thủ công)
POST   /gates/{id}/decision           approve/reject + notes  → golden data
GET    /projects/{id}/eval            bảng eval + confidence + risk
POST   /prototypes/{id}/feedback      customer review → CustomerFeedback
Hub    /hub/projects                  SignalR: run tiến độ, gate mới, cost
```

## 5. Bảo mật & vận hành (v1, nhẹ)

- Auth: `⚠️ OPEN DECISION` — v1 nội bộ có thể dùng một provider OIDC đơn giản; đủ để gắn `actor` vào Event Log.
- Secrets provider (API key model): qua cấu hình/secret manager, không hard-code.
- Sandbox: HTML prototype render iframe sandbox; capability đụng source code hiện có chạy trong workspace cô lập (git worktree) — khớp `RiskClass.High` luôn gate.
