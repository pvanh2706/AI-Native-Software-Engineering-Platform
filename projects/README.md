# Projects — quy ước lưu artifact

Mỗi dự án là một thư mục `projects/<slug>/`. **Mọi sản phẩm của skill là file** trong này (không có output trôi nổi). File là dạng lưu trữ; sau này web app chỉ việc đọc lên hiển thị — nên không mất công làm lại.

## Cấu trúc một dự án

```
projects/<slug>/
  PROJECT.md              # chỉ mục + trạng thái + truy vết (bảng liên kết artifact)
  00-input.md             # đầu vào thô (idea/BA/prototype/source) — do intake ghi lại
  01-requirements.md      # RequirementSet (skill: analyze-idea)
  01-answers.md           # nhật ký làm rõ: đã hỏi gì, chốt gì (skill: analyze-idea)
  01-open-questions.md    # chỉ những câu CÒN TREO (skill: analyze-idea)
  02-prototype/           # UiPrototype: index.html + README.md (skill: make-prototype)
  03-ui-brief/            # UiBrief: prompt đặc tả từng màn (skill: make-ui-brief)
  04-design/              # NƠI ĐẨY BẢN THIẾT KẾ LÊN (Stitch): mã nguồn + ảnh
    vong-0/GHIM.md        # màu đã ghim lên project Stitch — chạy MỘT LẦN mỗi dự án
  app/                    # Frontend thật (Vue/Vite) — sinh từ templates/vue-admin
  design-overrides.json   # Token riêng của dự án, extends bộ gốc org
  ...
```

Đường ống thiết kế: `RequirementSet → 03-ui-brief → (công cụ ngoài) → 04-design → app/ → ui-eval`

Từ `RequirementSet` tới bản thiết kế đã chuẩn hoá là skill [make-ui-brief](../.claude/skills/make-ui-brief/SKILL.md) — chạy **từng màn một**, và lần đầu mỗi dự án phải qua **Vòng 0** ghim màu trước.

## Mở frontend cho một dự án

```bash
node tools/new-app.mjs <slug> --install
cd projects/<slug>/app && npm run dev
```

Chép hạ tầng từ [templates/vue-admin](../templates/vue-admin/README.md): Vite · TS · Tailwind 4 · shadcn-vue · Reka UI, kèm cầu nối token và trang "Bộ component".
**Thư viện component cố ý chưa tách thành gói dùng chung** — chờ tới dự án thứ ba mới biết chắc phải tách gì.

Nguyên tắc:
- **Không ghi đè** khi sửa lớn: bump phiên bản trong chính file (`v1` → `v2`) và ghi mục "Lịch sử thay đổi" ở cuối file; nội dung cũ tra bằng git. Ghi lại thay đổi ở PROJECT.md.
- **Truy vết**: PROJECT.md giữ bảng "artifact nào sinh ra từ đâu" để review lần theo được. Requirement sinh ra từ một câu đã làm rõ thì ghi `Chốt từ: A-xx`.
- **Không sửa file md bằng tay để trả lời câu hỏi.** Câu hỏi được hỏi và trả lời **trong chat**; file chỉ là nơi lưu kết quả. Gõ `Q3: ...` hoặc gọi skill `answer-questions` để gỡ câu treo — skill sẽ tự cập nhật requirements + open-questions + PROJECT.md.

## Mẫu `PROJECT.md`

```markdown
# <Tên dự án>

- **Slug:** <slug>
- **Tạo ngày:** <yyyy-mm-dd>
- **Trạng thái lifecycle:** Analysis | Prototype | Architecture | Build | Test | Review
- **Nguồn đầu vào:** <idea thô | BA | prototype | source code>

## Artifact hiện có
| Artifact | File | Phiên bản | Trạng thái | Sinh ra từ |
|---|---|---|---|---|
| RequirementSet | 01-requirements.md | v1 | Draft/Approved | 00-input.md + 01-answers.md |
| Answers | 01-answers.md | v1 | <n câu đã chốt> | vòng làm rõ trong chat |
| OpenQuestions | 01-open-questions.md | v1 | <n câu còn treo> | 00-input.md |

## Câu hỏi còn treo
- [ ] <tóm tắt câu còn treo + giả định đang tạm dùng>

## Nhật ký quyết định
- <yyyy-mm-dd> — <quyết định + lý do>
```
