# knowledge/ui — Tri thức thiết kế giao diện

- **Scope:** Org — mọi dự án dùng chung
- **Chủ sở hữu:** con người. **AI không được tự sửa thư mục này** — sửa phải qua gate.
- **Phiên bản:** v0.1 · 2026-08-10

## Khác gì `design-system/`?

| | `design-system/` | `knowledge/ui/` |
|---|---|---|
| Trả lời | **Bao nhiêu** — `spacing.6 = 24px`, `primary = #1D4ED8` | **Khi nào và vì sao** — "biểu mẫu dùng 24px, bảng dùng 12px, lệch khỏi đó khi nào" |
| Dạng | JSON, máy đọc | Markdown, người viết, judge đọc |
| Ai sinh | AI sinh, người duyệt | **Người viết** |

Design System nói *màu và số đo*. Knowledge nói *bố cục, mật độ, thứ bậc, chữ nghĩa*. Prototype Jira v4 có Design System đầy đủ mà vẫn hỏng 9 điểm thị giác — vì thiếu đúng phần này ([báo cáo](../../projects/jira-issue-templates/02-prototype/ui-eval-report.md)).

## Danh mục

| File | Nội dung | Tiền tố mã |
|---|---|---|
| [design-principles.md](design-principles.md) | 7 nguyên tắc nền + **thứ tự thắng khi xung đột** | `PRIN` |
| [visual-language.md](visual-language.md) | Dùng thang chữ và vai trò màu thế nào | `VIS` |
| [layout-and-density.md](layout-and-density.md) | Bố cục, mật độ, căn chỉnh, khoảng trống | `LAY` |
| [form-guidelines.md](form-guidelines.md) | Biểu mẫu, ô nhập, nhãn, lỗi | `FORM` |
| [table-guidelines.md](table-guidelines.md) | Bảng, cột, hành động hàng | `TBL` |
| [state-guidelines.md](state-guidelines.md) | Rỗng, tải, lỗi, không quyền, hỏng nửa chừng | `STATE` |
| [accessibility.md](accessibility.md) | Sàn WCAG 2.2 AA + điểm mù của check tự động | `A11Y` |
| [responsive-rules.md](responsive-rules.md) | Breakpoint, thứ tự hy sinh khi hẹp | `RES` |
| [microcopy-vi.md](microcopy-vi.md) | Chữ trên giao diện tiếng Việt | `COPY` |
| [anti-patterns.md](anti-patterns.md) | **Danh sách CẤM** — căn cứ để judge trừ điểm | `AP` |

## Cách dùng

**Với `ui.design.*`** — nạp qua `KnowledgeRefs` (`scope: org`, tag `ui-principles` / `ui-anti-patterns`) trước khi soạn `UiSpec`.

**Với UI Eval** — judge lớp 2 chấm **có trích dẫn mã quy tắc**. Không được chấm "trông chưa ổn"; phải nói "vi phạm `AP-02`". Quy tắc nào không trích dẫn được trong một lần chấm thật thì quy tắc đó viết chưa đủ cụ thể — sửa nó, đừng để judge tự diễn giải.

## Quy ước viết quy tắc

1. **Kiểm được.** "Dùng khoảng trắng hợp lý" là vô dụng. "Hai banner liên tiếp trở lên là vi phạm" thì kiểm được.
2. **Có mã.** `LAY-04`. Để judge trích dẫn và để truy ngược khi tranh luận.
3. **Nêu lý do.** Quy tắc không có lý do sẽ bị bỏ qua khi gặp ca khó.
4. **Nêu ngoại lệ.** Quy tắc không có ngoại lệ sẽ bị vi phạm âm thầm.
5. **Ưu tiên rút từ lỗi thật.** Quy tắc sinh từ một lỗi đã xảy ra đáng giá hơn quy tắc chép từ sách.

## Hai quyết định nền — đã chốt 2026-08-10

- **Mật độ mặc định: `compact`.** Đệm ô bảng 8px, chiều cao hàng 36px. Người dùng là nhân sự nội bộ mở công cụ nhiều lần mỗi ngày; tốc độ đọc thắng sự thoáng đãng. Ba mức và ngoại lệ ở [`LAY-11`](layout-and-density.md).
- **Phạm vi: chỉ công cụ nội bộ / doanh nghiệp.** Trang giới thiệu và giao diện hướng khách hàng cuối **không** áp bộ này — nhiều quy tắc ở đây (`AP-09` cấm gradient, `AP-10` cấm animation trang trí, `PRIN-02` ưu tiên mật độ) sẽ **sai** với loại đó. Cần thì viết bộ thứ hai, đừng nới bộ này.

> Hai quyết định trên chi phối gần như mọi quy tắc còn lại. Đổi một trong hai thì phải rà lại toàn bộ thư mục, không phải sửa vài dòng.
