# Design System — bộ gốc dùng chung

- **Artifact type:** `DesignSystem` (xem [docs/07](../docs/07-uiux-capability-and-eval.md))
- **Phiên bản:** v0.1 — DRAFT
- **Source:** `Bootstrapped` — công ty chưa có bộ nhận diện sẵn, platform dựng từ đầu
- **Scope:** **Org** — mọi dự án kế thừa; dự án được override có kiểm soát (§ Override)
- **Trạng thái:** `Draft` — chưa qua Human Gate, nên `ui.design.*` **chưa đủ điều kiện chạy tự động**
- **Ngày:** 2026-08-10

> Đây là **nguồn sự thật thị giác** của mọi giao diện platform sinh ra. Không màn hình nào được dùng giá trị màu/spacing/radius nằm ngoài đây — đó là check `DS-01`, blocking, máy kiểm được.

## Trạng thái hoàn thành

| Nhóm token | File | Trạng thái |
|---|---|---|
| Typography | [tokens/typography.json](tokens/typography.json) | ✅ v0.1 |
| Spacing | [tokens/spacing.json](tokens/spacing.json) | ✅ v0.1 |
| Radius | [tokens/radius.json](tokens/radius.json) | ✅ v0.1 |
| Elevation | [tokens/elevation.json](tokens/elevation.json) | ✅ v0.1 |
| Motion | [tokens/motion.json](tokens/motion.json) | ✅ v0.1 |
| Color (palette gốc) | [tokens/color.json](tokens/color.json) | ✅ v0.1 — seed **`#2563EB` Xanh dương** |
| Theme sáng | [themes/light.json](themes/light.json) | ✅ v0.1 — 10/10 cặp tương phản đạt |
| Theme tối | [themes/dark.json](themes/dark.json) | ✅ v0.1 — nền **đen tuyệt đối**, 10/10 đạt |
| Component | `components/` | ⏳ P3 |
| Pattern | `patterns/` | ⏳ P3 |

## Kiến trúc token hai tầng

```text
tokens/color.json          ← palette GỐC: các thang tông, KHÔNG mang ngữ nghĩa
        │                     blue.10..95 · neutral.0..100 · red/green/amber
        ▼
themes/light.json          ← vai trò NGỮ NGHĨA → trỏ về palette
themes/dark.json              primary · surface · outline · on-* …
        ▼
component / màn hình       ← CHỈ được dùng tên vai trò
```

**Component không bao giờ chạm palette gốc.** Chạm thẳng thì màu đó không đổi được theo theme — đúng cái lỗi phải đi sửa tay khi thêm chế độ tối vào một giao diện đã dựng xong.

Hai theme phải khai **đúng cùng tập vai trò**; thiếu một cái là lỗi `DS-02` (theme parity), blocking.

## Quyết định thị giác đã chốt

Skill và capability **đọc mục này thay vì hỏi lại người dùng**.

| Trục | Đã chốt | Ngày | Ghi chú |
|---|---|---|---|
| **Phong cách** | **Atlassian / Jira** | 2026-08-10 | Quyết định J1, thay cho Material 3. Lý do: người dùng chuyển qua lại giữa công cụ này và Jira hàng chục lần mỗi ngày — giống nhau thì không phải đổi não. Kéo theo **đổi token hình dạng**: bo góc 3px thay thang 4–28px, thang chữ nhỏ hơn (headline 20px), bóng nhẹ hơn, ô bảng 8px |
| **Màu gốc (seed)** | **Xanh dương `#2563EB`** | 2026-08-10 | Quy ước công cụ doanh nghiệp; gần Jira nên người dùng đỡ lệch ngữ cảnh |
| **Chế độ hiển thị** | **Sáng + tối, có nút chuyển** | 2026-08-10 | Chế độ tối dùng nền **đen tuyệt đối** `#000000` |
| **Mật độ** | **Compact** | 2026-08-10 | Xem [`LAY-11`](../knowledge/ui/layout-and-density.md) |
| **Phạm vi áp dụng** | Công cụ nội bộ / doanh nghiệp | 2026-08-10 | Giao diện hướng khách hàng cuối cần bộ riêng |

Đổi bất kỳ dòng nào ở trên là **`RiskClass.High`** — đụng nhận diện, luôn cần Human Gate ([docs/07 §12](../docs/07-uiux-capability-and-eval.md)).

> **Bài học từ lần đổi Material 3 → Atlassian:** phong cách **không** chỉ là màu. Một design system có bo góc 28px cho hộp thoại và nút dạng viên **không thể biểu đạt** phong cách Atlassian, dù giữ nguyên bảng màu. Đổi phong cách kéo theo đổi token *hình dạng* — bo góc, thang chữ, độ nổi, mật độ. Chỉ token *màu* là giữ nguyên.

## Dùng token trong sản phẩm

```bash
node tools/design-tokens/build-css.mjs              # in ra stdout
node tools/design-tokens/build-css.mjs --out x.css  # ghi ra file
```

Bộ sinh giải mọi tham chiếu `{a.b.c}`, xuất `:root` (token không phụ thuộc theme) + hai khối theme, và **tự chặn `DS-02`**: thiếu một vai trò ở một theme là thoát với mã lỗi, không sinh ra file lệch.

> **Không chép giá trị bằng tay.** Chép tay là chỗ token và giao diện bắt đầu lệch nhau mà không ai biết. Đây từng là khoảng cách thật: `design-system/` tồn tại nhưng không tiến trình nào đọc, màu trong prototype là chép tay.

## Định dạng

Theo **[W3C Design Tokens Community Group](https://tr.designtokens.org/format/)** (`$type` / `$value` / `$description`), lý do ở [docs/07 §5](../docs/07-uiux-capability-and-eval.md).

Token là **trung lập**, xuất ra nhiều đích:

```text
design-system/tokens/*.json
        ├─► CSS custom properties   → prototype HTML tự chứa
        ├─► tailwind.config.js      → app Vue thật
        ├─► JSON phẳng              → bảng tra cho UI Eval check DS-01
        └─► Figma tokens            → khi có nhà thiết kế tham gia
```

Không đi ngược chiều: **không** lấy `tailwind.config.js` làm nguồn sự thật, vì nó không biểu diễn được token đa theme và không đọc được bởi Eval.

## Nguyên tắc đặt tên

```
<nhóm>.<vai trò>[.<biến thể>]
```

Đặt theo **vai trò**, không theo hình thức. `color.surface` chứ không phải `color.trang`; `spacing.section` chứ không phải `spacing.24`. Lý do: đổi giá trị thì tên vẫn đúng, còn tên theo hình thức sẽ nói dối ngay lần đầu chỉnh.

Ngoại lệ: thang có thứ tự (`spacing.1..12`, `elevation.0..5`) giữ số vì bản thân thứ tự là ngữ nghĩa.

## Override ở cấp dự án

Dự án **được** override, nhưng phải khai báo tường minh trong `projects/<slug>/design-overrides.json`, kèm lý do. Không override ngầm bằng cách hard-code trong component.

```jsonc
{
  "extends": "org@0.1",
  "overrides": { "color.primary": { "$value": "…", "$reason": "khách hàng yêu cầu màu thương hiệu riêng" } }
}
```

UI Eval so bản dự án với bản org; mỗi override không có `$reason` là một lỗi `DS-01`.

## Việc còn lại trước khi `Approved`

- [x] Chốt màu gốc → sinh `tokens/color.json` + `themes/{light,dark}.json`
- [x] Kiểm tương phản (`A11Y-01`) toàn bộ cặp màu, cả 2 theme — xem `contrastReport` trong mỗi theme file
- [ ] **Human Gate duyệt** → chuyển `Draft` → `Approved`
- [ ] Publish vào Knowledge Store (org scope, tag `design-system`) để RAG truy xuất
- [ ] Viết `knowledge/ui/` (nguyên tắc, a11y, anti-patterns, microcopy tiếng Việt) — xem [docs/07 §5](../docs/07-uiux-capability-and-eval.md)

## Nơi đang được dùng

| Nơi | Cách dùng | Override |
|---|---|---|
| [jira-issue-templates — prototype HTML](../projects/jira-issue-templates/02-prototype/) | 2 khối token CSS sinh từ `themes/*.json` | không |
| [jira-issue-templates — app Vue](../projects/jira-issue-templates/app/) | `npm run sync` → `src/styles/tokens.css` (prefix `ds`), rồi cầu nối sang biến của shadcn-vue | không |
| [templates/vue-admin](../templates/vue-admin/README.md) | Scaffold cho mọi dự án mới | — |

## Lõi bất biến vs phần thả lỏng

Vì mỗi dự án thiết kế tự do (bản Stitch riêng), bộ gốc này **không ép mọi dự án trông giống nhau**. Nó ép chúng **dùng giống nhau**:

| Bất biến — mọi dự án phải theo | Thả lỏng — dự án tự quyết qua `design-overrides.json` |
|---|---|
| Thang spacing gốc 4px | Bảng màu, màu gốc |
| Sàn a11y WCAG 2.2 AA, kiểm cả 2 theme | Bo góc |
| Mật độ compact cho công cụ nội bộ | Thang chữ, font |
| Trạng thái bắt buộc theo pattern | Hình thức component |
| Không hard-code giá trị thị giác (`DS-01`) | |

Người dùng nhận ra công ty qua **cách vận hành** nhiều hơn qua màu sắc.
