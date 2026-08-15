# 08 — Review khoảng cách: UI/UX Capability

> **Loại:** Review, không phải spec. Kết luận ở đây sẽ được gộp ngược vào [07](07-uiux-capability-and-eval.md) sau khi duyệt.
> **Ngày:** 2026-08-10 · **Trạng thái:** ✅ **ĐÃ DUYỆT** (2026-08-10) — cả 7 mục ở §7. Đã gộp vào [07](07-uiux-capability-and-eval.md): thứ tự pattern-trước-component (§10 Lớp 0), judge chấm trên ảnh (§8 Lớp 2), chính sách từng nguồn (§10).
> §4.6 đã được **chứng minh bằng thực nghiệm** — xem [báo cáo eval prototype v4](../projects/jira-issue-templates/02-prototype/ui-eval-report.md) và [harness](../tools/ui-eval/README.md).

## 1. Trạng thái thực tế — kiểm chứng, không phỏng đoán

Toàn bộ repo, không tính `.git`:

```
21 file .md   ·   8 file .json (design token)   ·   1 file .html (prototype)
0 file .cs · 0 .ts · 0 .vue · 0 .csproj · 0 package.json
```

MCP server đã cấu hình: **`mcpServers` rỗng ở cả cấp global lẫn cấp project.** Không có `.mcp.json` trong repo.

> **Kết luận thẳng: chưa có implementation nào của UI/UX Design Capability.** Không có code để review. `docs/07` là spec viết cách đây một lượt; `design-system/` mới dựng trong cùng phiên này.
>
> Vì vậy tiền đề *"UI/UX Design Capability đã được xây dựng nhưng chất lượng chưa cải thiện"* không đúng với thực tế. Nó chưa được xây. Quan sát *"chất lượng chưa cải thiện rõ rệt"* thì **đúng** — và §3 giải thích vì sao.

## 2. Trả lời 8 câu hỏi của bạn

| # | Câu hỏi | Trả lời |
|---|---|---|
| 1 | Review code hiện tại | **Không có code.** 0 file mã nguồn trong toàn repo. |
| 2 | Phần nào đã có | Spec ([07](07-uiux-capability-and-eval.md)) · Design tokens + 2 theme · 3 skill dạng prompt · 1 prototype HTML viết tay |
| 3 | Phần nào mới chỉ có trong documentation | Toàn bộ capability `ui.*` · Component Registry · Pattern Registry · UI Eval · `knowledge/ui/` · Autonomy cho UI |
| 4 | Phần nào **thực sự chạy ở runtime** | **Chỉ 3 file `.claude/skills/*/SKILL.md`.** Xem §2b — đây là phát hiện quan trọng nhất. |
| 5 | Vì sao UI chưa đẹp hơn | §3 |
| 6 | Đề xuất thay đổi | §5, §6, §7 |
| 7 | Chưa sửa code | Đã tuân thủ |
| 8 | Trình bày để duyệt | File này |

### 2b. Phát hiện quan trọng nhất — Design System **chưa được nối vào runtime**

`design-system/tokens/*.json` và `themes/*.json` **không có tiến trình tự động nào đọc**. Màu trong prototype v4 là do tôi **chép tay** sang CSS trong lượt trước.

Hệ quả cụ thể: nếu chạy `/make-prototype` cho một dự án mới ngay bây giờ, nó sẽ **hỏi lại 4 câu hướng thiết kế và tự chế bảng màu**, hoàn toàn bỏ qua `design-system/`. Skill không biết thư mục đó tồn tại.

| Tài sản | Có file? | Có tiến trình nào đọc lúc chạy? |
|---|---|---|
| `.claude/skills/*.md` | ✅ | ✅ nạp vào context khi gọi skill |
| `design-system/tokens/` + `themes/` | ✅ | ✅ **đã sửa 2026-08-10** — `tools/design-tokens/build-css.mjs` sinh CSS; skill bắt buộc chạy lệnh, cấm chép tay |
| `docs/07` (spec capability) | ✅ | ✅ skill tham chiếu §10 Lớp 0 khi chọn pattern |
| `knowledge/ui/` | ✅ | ✅ **đã sửa 2026-08-10** — skill có §Nguồn bắt buộc, nạp theo loại màn hình |
| Component / Pattern Registry | ❌ | ❌ |
| UI Eval | ✅ `tools/ui-eval` | ✅ **đã sửa 2026-08-10** — bước 7–8 trong quy trình skill, không trình khi lớp 1 chưa PASS |
| Nguồn ngoài (shadcn/Reka/PrimeVue/21st.dev) | ❌ | ❌ |
| Shadcn MCP | ❌ | ❌ chưa kết nối |

> Đây là **khoảng cách giữa "đã viết ra" và "đang được dùng"**. Viết thêm tài liệu không thu hẹp được khoảng cách này.

## 3. Vì sao UI chưa đẹp hơn — nguyên nhân thật

Prototype đã đi qua 4 phiên bản. Chỉ v4 liên quan tới Design System, và **v4 chỉ đổi màu**. Layout, mật độ, thứ bậc, cách chia màn hình — không đổi một dòng.

Màu chi phối *ấn tượng đầu*. Cảm giác "dùng thấy đúng" đến từ những thứ chưa hề tồn tại: quy tắc mật độ, thứ bậc thông tin, pattern màn hình, microcopy.

### Đối chiếu với khuyết điểm thật của prototype

| Khuyết điểm đã ghi nhận | Nguồn component ngoài có cứu được không? |
|---|---|
| Không hỏi hướng thiết kế, tự chọn phong cách | ❌ |
| Màn Cấu hình dự án không có chỗ chọn dự án | ❌ — lỗi bố cục màn hình |
| Menu biến mất khi thiếu quyền thay vì hiện chế độ chỉ đọc | ❌ — thiếu pattern `read-only-permission` |
| Chỉ có happy path, thiếu trạng thái rìa | ❌ — thiếu `requiredStates` |
| `.only-admin{display:block}` ghi đè `display:flex` | ❌ — lỗi CSS |
| Đổi dự án không re-render | ❌ — lỗi logic |
| Bảng màu tím không hợp ngữ cảnh | ⚠️ một phần — nhưng Design System đã giải quyết |

**6/7 khuyết điểm không liên quan gì tới chất lượng widget.** Chúng là lỗi *soạn màn hình* và *phủ trạng thái*. Một `DataTable` của shadcn-vue vẫn sẽ nằm trên một màn hình không có chỗ chọn dự án.

## 4. Ý kiến riêng — nơi tôi không đồng ý với prompt

### 4.1. Chẩn đoán "thiếu nguồn component ngoài" không phải nguyên nhân chính

Xem bảng §3. Nguyên nhân là **thiếu tầng quyết định soạn màn hình** (pattern, quy tắc, eval), không phải thiếu nguồn widget.

### 4.2. Thêm nguồn vào lúc này sẽ làm tệ hơn, không phải tốt hơn

Chưa có Registry, chưa có Pattern Library, chưa có Eval — thêm 6 nguồn nữa nghĩa là **thêm 6 cách để không nhất quán**. Nguồn là bộ khuếch đại; khuếch đại một quy trình chưa có trọng tài thì khuếch đại phần nhiễu.

Thứ tự đúng: **trọng tài trước, nguồn sau.**

### 4.3. Thứ tự ưu tiên của bạn bị đảo ở phần đầu

Bạn xếp `3. Existing approved UI pattern` **dưới** component. Ngược rồi. Pattern quyết định *hình dạng màn hình*; component chỉ *lấp vào ô* mà pattern đã định. Chọn component trước rồi ghép thành màn hình chính là cách sinh ra "excessive cards" — thứ nằm trong chính danh sách lỗi bạn viết.

Đề xuất tách làm **hai pha**:

```text
PHA 1 — HÌNH DẠNG (chọn đúng MỘT)
  1. Pattern đã có trong dự án
  2. Pattern trong Company Pattern Registry
  3. Pattern tham khảo từ ngoài (21st.dev — chỉ lấy bố cục)
  4. Pattern mới  ← luôn gate

PHA 2 — LẤP Ô (cho từng ô mà pattern định nghĩa)
  1. Component đã có trong dự án
  2. Component Company Design System
  3. shadcn-vue
  4. Reka UI primitive (khi cần hành vi, không cần hình thức)
  5. PrimeVue (chỉ widget thật sự khó)
  6. Vue Bits (chỉ khi animation là yêu cầu nghiệp vụ)
  7. Component mới  ← luôn gate
```

### 4.4. 21st.dev là mục rủi ro nhất trong danh sách

Nội dung ở đó nghiêng hẳn về **thẩm mỹ trang giới thiệu**: gradient, hero lớn, animation nhiều, thẻ nổi khắp nơi. Đó đúng bằng danh sách lỗi bạn liệt kê — *excessive gradients / excessive cards / excessive animations*.

Với công cụ nội bộ dùng cả ngày, lấy cảm hứng từ 21st.dev **không lọc** sẽ làm giao diện xấu đi theo đúng nghĩa bạn đang phàn nàn.

Đề xuất giới hạn: chỉ dùng cho **bố cục màn hình dày dữ liệu**; cấm lấy hiệu ứng thị giác. Và bắt buộc đi qua bộ lọc anti-pattern trước khi vào `UiCandidateSet`.

### 4.5. Trộn shadcn-vue với PrimeVue là rủi ro nhất quán có thật

shadcn-vue là copy-in, styling bằng Tailwind, dùng token của mình. PrimeVue có **hệ theming riêng**. Trộn hai thứ = hai nguồn sự thật cho spacing/radius/màu, và giao diện sẽ lệch ở chỗ hai hệ gặp nhau.

Đề xuất: **shadcn-vue + Reka UI làm nền**; PrimeVue chỉ cho widget thật sự khó (bảng ảo hoá, tree table, scheduler), bắt buộc bọc wrapper + cầu nối token, và **ghi nhận là nợ kỹ thuật**, không coi là bình thường.

### 4.6. ★ Điểm quan trọng nhất — UI Eval đọc chữ thì không chấm được cái đẹp

Cả [07](07-uiux-capability-and-eval.md) lẫn sơ đồ của bạn đều để UI Eval chấm **`UiSpec`** — tức một mô tả có cấu trúc dạng văn bản.

Một model đọc *chữ mô tả về giao diện* **không thể** đánh giá: thứ bậc thị giác, căn chỉnh, mật độ, "thẻ dùng quá nhiều", "gradient thừa". Những thứ đó chỉ tồn tại khi **đã render ra pixel**.

Đây là lỗ hổng trong spec của tôi ở lượt trước, không phải của bạn. Bổ sung bắt buộc:

```text
UiSpec ──► render headless ──► screenshot (light + dark, ≥2 breakpoint)
                                     │
                                     ▼
                        Judge ĐA PHƯƠNG THỨC chấm trên ẢNH
                        (thứ bậc · mật độ · căn chỉnh · trang trí thừa)
                                     │
                    ┌────────────────┴────────────────┐
              deterministic trên spec            judge trên ảnh
              (token, a11y, state)               (thẩm mỹ, khả dụng)
```

Đây là **đòn bẩy lớn nhất và rẻ nhất** trong toàn bộ danh sách: cần một headless browser + một lần chụp ảnh + một lần gọi model đa phương thức. Không cần platform, không cần Registry, không cần MCP. **Áp dụng được cho prototype hiện tại ngay hôm nay.**

Và nó trả lời trực tiếp yêu cầu của bạn: *"UI technically correct nhưng xấu phải bị FAIL"*. Chỉ có judge nhìn được ảnh mới nói được câu đó.

## 5. Thứ tự ưu tiên đề xuất

Xếp theo **mức cải thiện chất lượng trên một đơn vị công sức**:

| # | Việc | Vì sao xếp ở đây | Công sức |
|---|---|---|---|
| **1** | **Vòng render → chụp ảnh → judge đa phương thức** | Thứ duy nhất chấm được cái đẹp. Chạy được ngay, không phụ thuộc gì | Nhỏ |
| **2** | **`knowledge/ui/`** — mật độ, thứ bậc, anti-pattern, microcopy Việt | Cho judge **căn cứ** để chấm thay vì chấm theo cảm tính. Đi cặp với #1 | Vừa |
| **3** | **Nối Design System vào skill** (§2b) | Tài sản đã có nhưng chưa ai đọc. Rẻ nhất trong danh sách | Rất nhỏ |
| **4** | **Pattern Registry** + `requiredStates` | Sửa gốc 3/7 khuyết điểm ở §3 | Vừa |
| **5** | Component Registry | Cần thiết, nhưng chỉ có giá trị khi đã có dự án thật để quét | Lớn |
| **6** | Shadcn MCP | Chống bịa API, không cải thiện thẩm mỹ. Cần Registry trước | Nhỏ |
| **7** | 21st.dev / PrimeVue / Vue Bits | Chỉ sau khi có bộ lọc anti-pattern, nếu không sẽ làm tệ hơn | Vừa |

**Trực giác của bạn khi nói "đi tiếp sang `knowledge/ui/`" là đúng.** Prompt về nguồn ngoài là một đường vòng — nên làm, nhưng ở bước 6–7, không phải bây giờ.

## 6. Shadcn MCP — trạng thái và cách tích hợp

**Trạng thái: chưa kết nối.** `mcpServers` rỗng ở mọi cấp; không có `.mcp.json`.

Cách nối khi tới bước 6 — tạo `.mcp.json` ở gốc repo để cấu hình đi cùng git, cả nhóm dùng chung:

```jsonc
{ "mcpServers": { "shadcn": { "command": "npx", "args": ["-y", "shadcn@latest", "mcp"] } } }
```

**Ba cảnh báo trước khi đặt cược vào nó:**

1. **Phải xác minh hỗ trợ Vue.** Registry shadcn gốc là React. `shadcn-vue` là bản port cộng đồng với registry riêng. Cần kiểm MCP có phục vụ được registry Vue không **trước khi** thiết kế capability dựa vào nó — nếu không sẽ nhận về code React cho một dự án Vue.
2. **Giá trị là *chống bịa*, không phải *làm đẹp*.** Nó giữ cho model không tự nghĩ ra tên prop không tồn tại. Đó là thắng lợi về tính đúng, không phải về thẩm mỹ. Đừng kỳ vọng giao diện đẹp lên nhờ nó.
3. **MCP là nguồn cho Registry, không phải cho Capability.** Theo bất biến ở [07 §10](07-uiux-capability-and-eval.md), capability không được biết tên vendor. Luồng đúng: `MCP → adapter IComponentSource → ComponentRegistry → capability`. Nối MCP thẳng vào bước thiết kế là phá bất biến đó.

## 7. Cần bạn duyệt

| # | Quyết định | Đề xuất của tôi |
|---|---|---|
| 1 | Chấp nhận rằng "nguồn ngoài" **không** phải nguyên nhân chính? | Có — bằng chứng ở §3 |
| 2 | Đảo thứ tự ưu tiên thành **pattern trước, component sau**? | Có — §4.3 |
| 3 | Thêm **vòng render → ảnh → judge đa phương thức** vào UI Eval? | Có — đòn bẩy lớn nhất, §4.6 |
| 4 | Hoãn shadcn MCP / 21st.dev / PrimeVue tới bước 6–7? | Có — §5 |
| 5 | Giới hạn 21st.dev chỉ ở bố cục, cấm hiệu ứng thị giác? | Có — §4.4 |
| 6 | Nền component: **shadcn-vue + Reka UI**, PrimeVue là ngoại lệ có ghi nợ? | Có — §4.5 |
| 7 | Làm tiếp `knowledge/ui/` ngay bây giờ? | Có — đúng thứ tự |
