---
name: answer-questions
description: Gỡ các câu hỏi còn treo (OpenQuestions) của một dự án bằng cách hỏi lại trong chat, rồi tự cập nhật RequirementSet lên phiên bản mới. Dùng khi người dùng muốn trả lời câu hỏi đang treo, hoặc khi họ gõ thẳng câu trả lời dạng "Q3: ..." — để không ai phải sửa file md bằng tay.
---

# Skill: Trả lời câu hỏi còn treo (answer-questions)

Bổ trợ cho [analyze-idea](../analyze-idea/SKILL.md). Mục đích duy nhất: **câu hỏi treo trong file được gỡ qua chat**, và mọi artifact liên quan tự cập nhật theo — người dùng không phải mở file md sửa tay.

Kích hoạt khi người dùng:
- gọi `/answer-questions` (có thể kèm slug dự án),
- gõ câu trả lời theo mã câu hỏi: *"Q3: Jira Cloud"*, *"Q5 chọn phương án b"*,
- hoặc nói đại ý "trả lời mấy câu còn treo đi".

## Nguyên tắc bắt buộc

1. **Không tự trả lời thay người dùng.** Skill này gỡ câu hỏi bằng cách *hỏi*, không bằng cách đoán.
2. **Không hỏi lại câu đã chốt.** Đọc `01-answers.md` trước; câu đã có ở đó thì bỏ qua.
3. **Mỗi câu chốt phải để lại dấu vết trong RequirementSet.** Chốt xong mà requirement không đổi gì là dấu hiệu câu hỏi đó vô nghĩa — nêu ra cho người dùng biết.
4. **Lên phiên bản, không ghi đè im lặng.** Requirement đổi thì bump `v(n)` → `v(n+1)` kèm mục lịch sử thay đổi.
5. **Dừng chờ review** sau khi cập nhật.

## Quy trình

1. **Xác định dự án.** Người dùng nêu slug thì dùng slug đó. Không nêu: nếu chỉ có 1 dự án trong `projects/` thì lấy dự án đó; nhiều dự án thì hỏi chọn (AskUserQuestion).
2. **Đọc trạng thái**: `PROJECT.md`, `01-open-questions.md`, `01-answers.md`, `01-requirements.md`.
3. **Nhận diện câu trả lời có sẵn trong tin nhắn.** Người dùng đã trả lời sẵn câu nào (dạng `Q3: ...`) thì ghi nhận luôn, **không hỏi lại**.
4. **Hỏi phần còn lại** — theo đúng chuẩn câu hỏi của `analyze-idea`:
   - Tool **AskUserQuestion**, mỗi lô tối đa 4 câu, không giới hạn số vòng.
   - Mỗi câu kèm 2–4 phương án cụ thể, **nêu rõ cái giá phải trả**, khuyến nghị đặt đầu tiên với hậu tố `(Khuyến nghị)`.
   - Ưu tiên câu chặn nhiều FR nhất; nhóm theo chủ đề.
   - Báo trước tổng số câu và số lô.
   - Người dùng chọn "để sau" → giữ ở `01-open-questions.md`, không hỏi lại trong phiên này.
   - Người dùng nói "dừng" → dừng ngay, cập nhật phần đã chốt được.
5. **Cập nhật `01-answers.md`**: mỗi câu chốt thành một mục `A-xx` (tiếp số hiện có, không đánh lại từ đầu).
6. **Cập nhật `01-requirements.md`** — đây là phần chính, không được làm qua loa:
   - Sửa/thêm/xoá FR, NFR, tiêu chí chấp nhận theo điều đã chốt.
   - **Gỡ [GIẢ ĐỊNH]** nào vừa được xác nhận hoặc bác bỏ. Giả định bị bác bỏ mà đã lan vào tiêu chí chấp nhận thì phải sửa hết chỗ đó.
   - Cập nhật "Ngoài phạm vi" nếu câu trả lời đẩy thứ gì ra/vào scope.
   - Bump **Phiên bản** và thêm mục **Lịch sử thay đổi** ở cuối file (nội dung cũ tra bằng git).
   - Điền trường **Chốt từ:** `A-xx` cho các FR bị ảnh hưởng.
7. **Cập nhật `01-open-questions.md`**: xoá câu đã chốt, giữ câu hoãn kèm giả định tạm dùng. Không còn câu nào thì ghi rõ "Không còn câu treo".
8. **Cập nhật `PROJECT.md`**: bảng artifact (phiên bản mới), danh sách câu blocking còn treo, và một dòng nhật ký quyết định.
9. **Tự kiểm** theo checklist dưới.
10. **Tóm tắt + dừng chờ review.**

## Mẫu mục lịch sử thay đổi (thêm vào cuối `01-requirements.md`)

```markdown
## Lịch sử thay đổi

### v2 — <yyyy-mm-dd>
- Chốt A-01…A-07 (xem [01-answers.md](01-answers.md)).
- Gỡ [GIẢ ĐỊNH] #1, #3 — đã được xác nhận.
- Sửa FR-07: <tóm tắt thay đổi thực chất, không viết "cập nhật theo câu trả lời">.
- Thêm FR-11: <lý do phát sinh>.
- Đưa <X> ra khỏi scope theo A-05.
```

## Self-check

- [ ] Không hỏi lại câu nào đã có trong `01-answers.md`.
- [ ] Mỗi câu vừa chốt **đều** có thay đổi tương ứng trong `01-requirements.md`, hoặc có ghi chú nêu rõ vì sao không đổi gì.
- [ ] Không còn `[GIẢ ĐỊNH]` nào đã được câu trả lời làm sáng tỏ.
- [ ] Không còn `[GIẢ ĐỊNH]` mồ côi (không trỏ tới `Q-xx` đang treo).
- [ ] Tiêu chí chấp nhận từng nói "chưa chốt / xem Q-xx" nay đã có nội dung thật.
- [ ] Số câu treo trong `PROJECT.md` khớp với `01-open-questions.md`.
- [ ] Phiên bản RequirementSet đã bump và có mục lịch sử thay đổi.

## Sau khi xong

Tóm tắt: *chốt bao nhiêu câu, RequirementSet lên phiên bản mấy, thay đổi đáng kể nào, còn bao nhiêu câu treo*. Rồi **dừng** và hỏi người dùng muốn (a) duyệt để đi tiếp sang bước sau, hay (b) gỡ nốt câu còn treo.
