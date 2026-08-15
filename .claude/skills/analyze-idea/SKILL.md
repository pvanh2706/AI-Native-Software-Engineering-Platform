---
name: analyze-idea
description: Biến ý tưởng thô / yêu cầu thô / BA có sẵn / prototype / source code thành một bản phân tích yêu cầu có cấu trúc (RequirementSet). Skill CHỦ ĐỘNG HỎI LẠI trong chat để gỡ chỗ mơ hồ trước khi viết, thay vì đoán. Dùng khi bắt đầu một dự án mới hoặc khi cần làm rõ yêu cầu từ thông tin chưa đầy đủ.
---

# Skill: Phân tích yêu cầu (analyze-idea)

Đây là một **capability** ở giai đoạn *Analysis* của platform. Mục tiêu: từ đầu vào ở bất kỳ độ chín nào, sinh ra bản yêu cầu có cấu trúc — **sau khi đã hỏi cho rõ**, không phải sau khi đã đoán.

Artifact đầu ra:
- `RequirementSet` — yêu cầu có cấu trúc, có ID, có tiêu chí chấp nhận.
- `Answers` — nhật ký làm rõ: đã hỏi gì, chọn phương án nào, vì sao (truy vết).
- `OpenQuestions` — chỉ những câu **còn treo**: người dùng hoãn, hoặc cần hỏi khách hàng/bên thứ ba.

## Nguyên tắc bắt buộc

1. **KHÔNG bịa yêu cầu.** Thiếu thông tin thì **hỏi**, không tự lấp đầy.
2. **Hỏi trong chat, không đẩy câu hỏi vào file rồi chờ.** File md là nơi *lưu trữ*, không phải nơi *phỏng vấn*. Bắt người dùng mở file md điền câu trả lời là đặt câu hỏi vào chỗ khó trả lời nhất — đó là lỗi thiết kế, không phải sự cẩn thận.
3. **Chỉ ghi `RequirementSet` sau khi vòng làm rõ kết thúc.** Không viết requirement đầy giả định rồi mới đi hỏi.
4. **Giả định còn sót phải đánh dấu [GIẢ ĐỊNH]** và gắn với câu hỏi tương ứng.
5. **Mọi requirement phải có ID và tiêu chí chấp nhận** đo được.
6. **Bám sát đầu vào**: không thêm tính năng ngoài phạm vi; ý tưởng mở rộng để riêng ở mục "Đề xuất thêm".
7. **Dừng chờ review** sau khi ghi file — đây là gate duyệt RequirementSet. Không tự đi tiếp sang bước khác.

## Đầu vào chấp nhận

Ý tưởng/yêu cầu thô · tài liệu BA · prototype (mô tả, ảnh, file HTML) · source code có sẵn.

Nếu đầu vào là BA/prototype/source: **đọc và trích xuất trước**. Hỏi lại thứ đã nằm trong tài liệu là làm phiền người dùng.

## Quy trình

1. **Nhận diện đầu vào** và ghi `00-input.md` (nguyên văn + ý chính tách ra, chưa diễn giải).
2. **Khảo sát** — nếu là source/BA/prototype thì đọc để hiểu bối cảnh. Với ý tưởng thô: đọc `README.md` và `docs/` của platform để nắm ràng buộc sẵn có.
3. **Lập danh sách chỗ mơ hồ** (nội bộ, chưa ghi file). Phân loại: **Blocking** / **Nên có** / **Tùy chọn**.
4. **▶ VÒNG LÀM RÕ — hỏi trong chat.** Xem mục dưới. Đây là bước quan trọng nhất của skill.
5. **Soạn `RequirementSet`** với câu trả lời đã có. Mỗi câu trả lời phải thấy được dấu vết trong FR/NFR/tiêu chí chấp nhận.
6. **Ghi `01-answers.md`** (nhật ký làm rõ) và `01-open-questions.md` (chỉ câu còn treo).
7. **Tự kiểm** theo checklist cuối skill; fail thì sửa trước khi trình.
8. **Tóm tắt + dừng chờ review.**

---

## ▶ Vòng làm rõ (bước 4)

### Hỏi cái gì

Hỏi **Blocking** và **Nên có**. Câu **Tùy chọn** thì không hỏi — ghi thẳng vào `01-open-questions.md`.

**Trước khi thêm một câu vào danh sách hỏi, kiểm 3 điều:**
- Câu trả lời có **làm mình viết requirement khác đi** không? Không → bỏ, tự quyết và ghi chú.
- Mình có **tự tra ra được** không (đọc source, docs, README, git log)? Có → đi tra, đừng hỏi.
- Quyết sai có **sửa được rẻ** sau này không? Rẻ → tự chọn mặc định hợp lý, ghi vào mục Giả định. Đắt (đổi mô hình dữ liệu, đổi tầng tích hợp, đổi nghiệp vụ) → hỏi.

### Hỏi thế nào

Dùng tool **AskUserQuestion**. Mỗi lô tối đa **4 câu** (giới hạn của tool). Không giới hạn số vòng — nhưng mỗi vòng phải có tiến triển thật.

**Chuẩn của một câu hỏi tốt** — người dùng bấm chọn được, không phải viết luận:

- **Luôn kèm 2–4 phương án cụ thể.** Câu hỏi mở đẩy việc phân tích ngược về phía người dùng.
- **Mỗi phương án nêu rõ cái giá phải trả**, không chỉ nêu tên. Người dùng cần thấy hệ quả để chọn.
- **Khuyến nghị đặt đầu tiên**, gắn hậu tố `(Khuyến nghị)` vào label. Có ý kiến là một phần của công việc.
- **Nêu câu hỏi này chặn cái gì** — người dùng cần biết vì sao đáng trả lời.
- Tool tự thêm lựa chọn **"Other"** cho người dùng gõ tự do — không cần tự chế thêm phương án "khác".

<example>
Xấu:  "Anh muốn phân quyền như thế nào?"
Tốt:  "Ai được tạo/sửa mẫu issue?"
       (a) Ai cũng sửa được — làm nhanh, nhưng mẫu dùng chung dễ bị phá lẫn nhau  (Khuyến nghị nếu team < 10 người)
       (b) Chỉ người phụ trách từng dự án — cần thêm bảng phân quyền theo dự án, rất khó thêm sau
       (c) Chỉ 1 admin toàn hệ thống — đơn giản nhất, nhưng admin thành nút cổ chai
</example>

**Xếp thứ tự:** câu chặn nhiều FR nhất lên trước. Blocking hết rồi mới tới Nên có.

**Gom lô theo chủ đề** (hạ tầng/xác thực · nghiệp vụ · phạm vi · phi chức năng). Đừng trộn câu hạ tầng với câu nghiệp vụ trong cùng một lô nếu tránh được — người dùng đỡ phải nhảy ngữ cảnh.

### Điều khiển vòng lặp

- **Trước vòng đầu**, báo tổng số câu định hỏi và chia mấy lô, để người dùng ước lượng được công sức.
- Câu trả lời làm nảy sinh câu mới → được hỏi tiếp, nhưng **nói rõ vì sao phát sinh**.
- Người dùng chọn "để sau"/"chưa rõ" cho một câu → ghi vào `01-open-questions.md` trạng thái **Hoãn**, kèm giả định tạm dùng, **không hỏi lại câu đó**.
- Người dùng nói **"dừng hỏi"** → dừng toàn bộ vòng ngay, phần còn lại vào `01-open-questions.md`, đi tiếp bước 5.
- Đừng hỏi lại thứ người dùng đã trả lời, kể cả khi trả lời chưa thật đầy đủ — nếu cần rõ hơn thì hỏi câu **hẹp hơn**, đừng lặp câu cũ.

### Khi không hỏi được (phiên non-interactive, cron, headless)

AskUserQuestion không dùng được → quay về hành vi cũ: ghi **toàn bộ** câu hỏi vào `01-open-questions.md`, ghi rõ ở đầu file *"Chưa qua vòng làm rõ — phiên không tương tác"*, và nêu điều này trong phần tóm tắt.

---

## Nơi lưu (quy ước file)

Thư mục dự án `projects/<slug>/` (slug = tên ngắn không dấu, gạch nối). Ghi:

- `projects/<slug>/00-input.md` — đầu vào thô
- `projects/<slug>/01-requirements.md` — RequirementSet
- `projects/<slug>/01-answers.md` — nhật ký làm rõ
- `projects/<slug>/01-open-questions.md` — câu còn treo (nếu không còn câu nào: vẫn tạo file và ghi rõ "Không còn câu treo")
- `projects/<slug>/PROJECT.md` — chỉ mục + trạng thái + truy vết (mẫu ở `projects/README.md`)

Sửa lớn thì **lên phiên bản** (v1 → v2), không ghi đè im lặng — xem `projects/README.md`.

## Template — `01-requirements.md`

```markdown
# RequirementSet — <Tên dự án>

- **Phiên bản:** v1
- **Nguồn đầu vào:** <idea thô | BA | prototype | source code> — <mô tả ngắn>
- **Ngày:** <yyyy-mm-dd>
- **Trạng thái:** Draft (chờ review)
- **Đã qua vòng làm rõ:** <n câu đã hỏi / m câu còn treo> — xem [01-answers.md](01-answers.md)

## 1. Bối cảnh & Bài toán
<2–5 câu: vấn đề đang giải, vì sao cần>

## 2. Người dùng / Actor
| Actor | Mô tả | Mục tiêu chính |
|---|---|---|

## 3. Yêu cầu chức năng
> Mỗi yêu cầu: ID `FR-xx`, mô tả, độ ưu tiên (Must/Should/Could), tiêu chí chấp nhận đo được.

### FR-01 — <tên ngắn>
- **Ưu tiên:** Must | Should | Could
- **Mô tả:** Là <actor>, tôi muốn <hành động> để <giá trị>
- **Chốt từ:** A-xx  ← nếu nội dung này đến từ một câu đã làm rõ
- **Tiêu chí chấp nhận:**
  - [ ] <điều kiện kiểm chứng được 1>
  - [ ] <điều kiện kiểm chứng được 2>

## 4. Yêu cầu phi chức năng
| ID | Loại (hiệu năng/bảo mật/UX/...) | Yêu cầu | Cách đo |
|---|---|---|---|

## 5. Giả định
> Chỉ giả định *bắt buộc phải có* để tiếp tục, đánh dấu **[GIẢ ĐỊNH]**, mỗi cái gắn với câu hỏi còn treo (Q-xx).

## 6. Ngoài phạm vi (Out of scope)
- <điều rõ ràng KHÔNG làm ở phiên bản này>

## 7. Đề xuất thêm (tùy chọn — không tự ý đưa vào scope)
- <ý tưởng mở rộng, để người dùng cân nhắc>
```

## Template — `01-answers.md`

```markdown
# Nhật ký làm rõ — <Tên dự án>

> Đã hỏi gì, chốt gì, ngày nào. Đây là căn cứ truy vết cho RequirementSet.

## A-01 — <câu hỏi rút gọn>
- **Ngày:** <yyyy-mm-dd> · **Vòng:** 1
- **Câu hỏi:** <nguyên văn>
- **Chốt:** <phương án người dùng chọn, nguyên văn>
- **Lý do / ghi chú thêm của người dùng:** <nếu có>
- **Ảnh hưởng tới:** FR-xx, NFR-xx
```

## Template — `01-open-questions.md`

```markdown
# OpenQuestions — <Tên dự án>

> Chỉ những câu **còn treo**. Câu đã chốt nằm ở [01-answers.md](01-answers.md).
> Trả lời bằng cách gõ trong chat (skill `answer-questions`) — không cần sửa file này bằng tay.

## Hoãn (người dùng chọn quyết sau)
- [ ] **Q1:** <câu hỏi> — *Giả định đang tạm dùng:* <...> — *Ảnh hưởng tới:* FR-xx

## Cần hỏi bên ngoài (khách hàng / bên thứ ba)
- [ ] **Q..:** <...> — *Hỏi ai:* <...>

## Tùy chọn (quyết sau, không chặn)
- [ ] **Q..:** <...>
```

## Self-check (eval-lite — chạy trước khi trình)

- [ ] **Đã chạy vòng làm rõ trong chat** (hoặc đã ghi rõ lý do không chạy được).
- [ ] Không còn câu **Blocking** nào chưa hỏi mà cũng chưa được người dùng hoãn.
- [ ] Mọi `FR-xx` có ít nhất 1 tiêu chí chấp nhận đo được.
- [ ] Mọi câu trả lời trong `01-answers.md` đều **thấy được dấu vết** trong RequirementSet (qua trường "Chốt từ" hoặc nội dung tiêu chí).
- [ ] Không có yêu cầu "mồ côi" (không rõ actor/giá trị).
- [ ] Mọi giả định còn lại đánh dấu **[GIẢ ĐỊNH]** và trỏ tới một `Q-xx` đang treo.
- [ ] Không thêm tính năng ngoài đầu vào (thứ mở rộng nằm ở "Đề xuất thêm").
- [ ] `PROJECT.md` đã cập nhật liên kết tới các file vừa tạo + nhật ký quyết định.

## Sau khi xong

Tóm tắt ngắn: *bao nhiêu FR, bao nhiêu câu đã chốt, bao nhiêu câu còn treo, giả định chính nào còn lại*, kèm đường dẫn file. Rồi **dừng** và hỏi người dùng muốn: (a) đi tiếp sang bước prototype, hay (b) gỡ nốt câu còn treo bằng skill `answer-questions`.
