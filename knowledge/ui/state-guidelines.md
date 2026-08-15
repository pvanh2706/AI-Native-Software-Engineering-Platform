# Trạng thái giao diện

Sáu trạng thái. **Không phải phần phụ, không phải việc dọn sau** (`PRIN-05`). Thiết kế chỉ có happy path là thiết kế chưa xong.

Mỗi pattern khai `requiredStates[]`; UI Eval check `PAT-01` bắt buộc có đủ.

---

## `STATE-01` — Rỗng (empty)

Ba loại rỗng **khác nhau**, không được dùng chung một màn hình:

| Loại | Chữ nói gì | Có hành động không |
|---|---|---|
| **Chưa có gì lần đầu** | Vì sao chỗ này trống + cái này để làm gì | ✅ hành động chính, nổi bật |
| **Lọc không ra kết quả** | Nói rõ **đang lọc gì** | ✅ "Xoá bộ lọc" |
| **Đã từng có, nay hết** | Nói vì sao hết (đã xử lý xong, đã lưu trữ) | ⚪ tuỳ |

**Cấm** *"Không có dữ liệu"* trần trụi → `AP-15`.
**Cấm** dùng chung một màn cho "chưa có gì" và "lọc không ra" — người dùng không phân biệt được là mình lọc sai hay hệ thống trống.

---

## `STATE-02` — Đang tải (loading)

| Thời gian dự kiến | Cách hiện |
|---|---|
| < 300ms | **Không hiện gì.** Nhấp nháy spinner còn tệ hơn chờ im lặng |
| 300ms – 2s | Skeleton đúng hình dạng nội dung sắp có |
| > 2s | Skeleton + chữ nói **đang làm gì** |
| Không đoán được | Thanh tiến độ + nút Huỷ |

**Cấm** skeleton sai hình dạng — nội dung nhảy khi tải xong còn khó chịu hơn không có skeleton.
**Cấm** che toàn màn khi chỉ một vùng đang tải.

---

## `STATE-03` — Lỗi (error)

Ba tầng, chọn theo phạm vi ảnh hưởng:

| Phạm vi | Cách hiện |
|---|---|
| Một trường | Gắn vào trường (`FORM-13`) |
| Một vùng | Thay nội dung vùng đó, phần còn lại vẫn dùng được |
| Cả màn | Dải lỗi + đường thoát |

Mọi thông báo lỗi phải có: **chuyện gì xảy ra** · **ảnh hưởng gì** · **làm gì tiếp**. Thiếu vế thứ ba → `AP-16`.

Lỗi từ hệ thống ngoài: hiện **nguyên văn** thông báo của nó (để tra cứu được) **cộng** một câu diễn giải cho người dùng. Không thay thế cái này bằng cái kia.

---

## `STATE-04` — Không có quyền (no-permission)

**Cấm ẩn hoàn toàn** chức năng chỉ vì người dùng không có quyền. Ẩn đi thì họ tưởng chức năng không tồn tại, rồi đi hỏi vòng quanh.

Đúng cách:
- Vào xem được, ở **chế độ chỉ đọc**
- Nói rõ **thiếu quyền gì** và **ai cấp được**
- Nút sửa ẩn hoặc vô hiệu hoá, **và server cũng chặn** — không chỉ khoá giao diện
- Không dùng `opacity` để thể hiện chỉ-đọc (`AP-11`)

**Ngoại lệ được ẩn:** khi chính sự tồn tại của chức năng là thông tin nhạy cảm.

> Bài học thật: menu "Cấu hình dự án" từng bị ẩn hẳn khi người dùng thiếu quyền trên dự án đang chọn — người dùng báo *"không tìm thấy dự án nào để cấu hình"*.

---

## `STATE-05` — Hỏng nửa chừng (partial failure)

Thao tác nhiều bước hỏng ở giữa. **Đây là trạng thái hay bị bỏ sót nhất.**

Bắt buộc có:
1. **Đã làm được tới đâu** — nêu cụ thể bước nào xong, bước nào hỏng
2. **Phần đã làm có bị huỷ không** — nói rõ; nếu giữ thì nói rõ là giữ
3. **Tiếp tục được không** — nút thử lại phải **tiếp tục từ điểm dừng**, không làm lại từ đầu
4. **Hậu quả nếu bỏ đó** — người dùng cần biết để quyết định

**Cấm** hiện "Thất bại" cho một thao tác đã thành công một phần. Đó là nói dối, và dẫn tới thao tác lặp gây trùng dữ liệu.

*Ví dụ đúng:* tạo issue thành công nhưng chuỗi chuyển trạng thái hỏng ở bước 2/2 → nói rõ issue **đã tạo**, đang dừng ở status nào, hỏng ở bước nào, vì sao, và nút thử lại tiếp tục từ đó.

---

## `STATE-06` — Chưa cấu hình xong (first-run)

Chức năng phụ thuộc một bước thiết lập chưa làm.

- Nói **thiếu bước nào** và **dẫn thẳng tới đó**, không bắt đi tìm
- **Cấm** hiện màn trống rồi để người dùng tự đoán
- Nếu thiếu quyền để tự thiết lập → nói rõ phải nhờ ai (giao với `STATE-04`)

---

## Ma trận bắt buộc theo pattern

| Pattern | rỗng | tải | lỗi | không quyền | hỏng nửa chừng | chưa cấu hình |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| `crud-list` | ✅ | ✅ | ✅ | ✅ | — | ⚪ |
| `detail-page` | — | ✅ | ✅ | ✅ | — | — |
| `create-edit-form` | — | ✅ | ✅ | ✅ | ⚪ | ⚪ |
| `search-filter` | ✅ | ✅ | ✅ | — | — | — |
| `settings` | — | ✅ | ✅ | ✅ | — | ✅ |
| `dashboard` | ✅ | ✅ | ✅ | ⚪ | — | ✅ |
| `wizard` | — | ✅ | ✅ | ✅ | ✅ | — |
| `async-result` | — | ✅ | ✅ | — | ✅ | — |
| `bulk-action` | — | ✅ | ✅ | ✅ | ✅ | — |

✅ bắt buộc · ⚪ tuỳ ngữ cảnh · — không áp dụng
