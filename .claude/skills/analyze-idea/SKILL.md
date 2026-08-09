---
name: analyze-idea
description: Biến ý tưởng thô / yêu cầu thô / BA có sẵn / prototype / source code thành một bản phân tích yêu cầu có cấu trúc (RequirementSet) + danh sách câu hỏi còn thiếu (OpenQuestions). Dùng khi bắt đầu một dự án mới hoặc khi cần làm rõ yêu cầu từ thông tin chưa đầy đủ.
---

# Skill: Phân tích yêu cầu (analyze-idea)

Đây là một **capability** ở giai đoạn *Analysis* của platform. Mục tiêu: từ đầu vào ở bất kỳ độ chín nào, sinh ra hai artifact dạng file:
- `RequirementSet` — yêu cầu có cấu trúc, có ID, có tiêu chí chấp nhận.
- `OpenQuestions` — những điều còn thiếu/mơ hồ **cần con người hoặc khách hàng trả lời**.

## Nguyên tắc bắt buộc

1. **KHÔNG bịa yêu cầu.** Thông tin không đủ thì ghi vào `OpenQuestions`, không tự ý giả định để lấp đầy. Mọi giả định *bắt buộc phải dùng* thì phải đánh dấu rõ là **[GIẢ ĐỊNH]**.
2. **Mọi requirement phải có ID và tiêu chí chấp nhận** (acceptance criteria) đo được.
3. **Bám sát đầu vào**: không thêm tính năng ngoài phạm vi người dùng nêu; ý tưởng mở rộng để riêng ở mục "Đề xuất thêm".
4. **Dừng lại chờ review**: sau khi ghi file, tóm tắt và **dừng cho con người duyệt** — đây là một gate. Không tự động đi tiếp sang bước khác.

## Đầu vào chấp nhận

Người dùng có thể cung cấp một trong các dạng (skill tự nhận diện):
- Ý tưởng / yêu cầu thô (đoạn văn mô tả).
- Tài liệu BA có sẵn (đường dẫn file hoặc dán nội dung).
- Prototype có sẵn (mô tả, ảnh, hoặc file HTML).
- Source code hiện có (đường dẫn thư mục/repo).

Nếu đầu vào là BA/prototype/source: **đọc và trích xuất** yêu cầu ngầm định từ đó thay vì hỏi lại từ đầu.

## Quy trình

1. **Nhận diện loại đầu vào** và ghi nhận. Nếu là source code/BA/prototype, khảo sát nhanh để hiểu bối cảnh trước khi viết.
2. **Xác định**: bài toán cốt lõi, actor/người dùng, phạm vi.
3. **Soạn `RequirementSet`** theo template bên dưới.
4. **Soạn `OpenQuestions`**: liệt kê mọi chỗ thiếu thông tin, mơ hồ, hoặc cần quyết định nghiệp vụ. Ưu tiên câu hỏi theo mức độ chặn (blocking / nên có / tùy chọn).
5. **Ghi file** vào thư mục dự án (xem "Nơi lưu").
6. **Tự kiểm (self-check)** theo checklist cuối skill; nếu fail thì sửa trước khi trình.
7. **Tóm tắt cho người dùng** (số requirement, số câu hỏi blocking, giả định chính) và **dừng chờ review**.

## Nơi lưu (quy ước file)

Nếu chưa có, tạo thư mục dự án: `projects/<slug>/` (slug = tên ngắn không dấu, gạch nối).

Ghi:
- `projects/<slug>/01-requirements.md`
- `projects/<slug>/01-open-questions.md`
- Cập nhật/khởi tạo `projects/<slug>/PROJECT.md` (chỉ mục + trạng thái + truy vết). Nếu chưa có thì tạo theo mẫu trong `projects/README.md`.

## Template — `01-requirements.md`

```markdown
# RequirementSet — <Tên dự án>

- **Phiên bản:** v1
- **Nguồn đầu vào:** <idea thô | BA | prototype | source code> — <mô tả ngắn>
- **Ngày:** <yyyy-mm-dd>
- **Trạng thái:** Draft (chờ review)

## 1. Bối cảnh & Bài toán
<2–5 câu: vấn đề đang giải, vì sao cần>

## 2. Người dùng / Actor
| Actor | Mô tả | Mục tiêu chính |
|---|---|---|

## 3. Yêu cầu chức năng
> Mỗi yêu cầu: ID `FR-xx`, mô tả, độ ưu tiên (Must/Should/Could), tiêu chí chấp nhận đo được.

### FR-01 — <tên ngắn>
- **Ưu tiên:** Must | Should | Could
- **Mô tả:** <như một user story: Là <actor>, tôi muốn <hành động> để <giá trị>>
- **Tiêu chí chấp nhận:**
  - [ ] <điều kiện kiểm chứng được 1>
  - [ ] <điều kiện kiểm chứng được 2>

## 4. Yêu cầu phi chức năng
| ID | Loại (hiệu năng/bảo mật/UX/...) | Yêu cầu | Cách đo |
|---|---|---|---|

## 5. Giả định
> Chỉ liệt kê giả định *bắt buộc phải có* để tiếp tục. Đánh dấu **[GIẢ ĐỊNH]**.

## 6. Ngoài phạm vi (Out of scope)
- <điều rõ ràng KHÔNG làm ở phiên bản này>

## 7. Đề xuất thêm (tùy chọn — không tự ý đưa vào scope)
- <ý tưởng mở rộng, để người dùng cân nhắc>
```

## Template — `01-open-questions.md`

```markdown
# OpenQuestions — <Tên dự án>

> Những điều còn thiếu/mơ hồ. KHÔNG bịa — hỏi ở đây. Người dùng/khách hàng trả lời rồi mình cập nhật RequirementSet v2.

## Blocking (chặn — chưa trả lời thì không nên code)
- [ ] **Q1:** <câu hỏi> — *Vì sao quan trọng:* <...>  — *Ảnh hưởng tới:* FR-xx

## Nên có (làm rõ để chất lượng tốt hơn)
- [ ] **Q..:** <...>

## Tùy chọn (có thể quyết sau)
- [ ] **Q..:** <...>
```

## Self-check (eval-lite — chạy trước khi trình)

- [ ] Mọi `FR-xx` có ít nhất 1 tiêu chí chấp nhận đo được.
- [ ] Không có yêu cầu "mồ côi" (không rõ actor/giá trị).
- [ ] Mọi giả định đều được đánh dấu **[GIẢ ĐỊNH]**; không có giả định ngầm.
- [ ] Có ít nhất phần OpenQuestions (nếu đầu vào đủ rõ tới mức không còn câu hỏi nào, nêu rõ điều đó — hiếm khi xảy ra).
- [ ] Không thêm tính năng ngoài đầu vào (thứ mở rộng nằm ở mục "Đề xuất thêm").
- [ ] `PROJECT.md` đã cập nhật liên kết tới 2 file vừa tạo.

## Sau khi xong

Trình tóm tắt ngắn: *bao nhiêu FR, bao nhiêu câu hỏi blocking, các giả định chính*, kèm đường dẫn file. Rồi **dừng** và hỏi người dùng muốn: (a) trả lời câu hỏi blocking để ra v2, hay (b) đi tiếp sang bước prototype.
