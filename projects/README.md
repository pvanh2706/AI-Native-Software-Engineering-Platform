# Projects — quy ước lưu artifact

Mỗi dự án là một thư mục `projects/<slug>/`. **Mọi sản phẩm của skill là file** trong này (không có output trôi nổi). File là dạng lưu trữ; sau này web app chỉ việc đọc lên hiển thị — nên không mất công làm lại.

## Cấu trúc một dự án

```
projects/<slug>/
  PROJECT.md              # chỉ mục + trạng thái + truy vết (bảng liên kết artifact)
  00-input.md             # đầu vào thô (idea/BA/prototype/source) — do intake ghi lại
  01-requirements.md      # RequirementSet (skill: analyze-idea)
  01-open-questions.md    # OpenQuestions (skill: analyze-idea)
  02-prototype/           # UiPrototype (skill: make-prototype) — sẽ thêm sau
  ...
```

Nguyên tắc:
- **Không ghi đè** khi sửa lớn: tạo phiên bản mới (`01-requirements.md` → giữ, thêm ghi chú "v2" hoặc file mới), và ghi lại thay đổi ở PROJECT.md.
- **Truy vết**: PROJECT.md giữ bảng "artifact nào sinh ra từ đâu" để review lần theo được.

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
| RequirementSet | 01-requirements.md | v1 | Draft/Approved | 00-input.md |
| OpenQuestions | 01-open-questions.md | v1 | Open | 00-input.md |

## Câu hỏi đang chờ (blocking)
- [ ] <tóm tắt câu hỏi blocking còn treo>

## Nhật ký quyết định
- <yyyy-mm-dd> — <quyết định + lý do>
```
