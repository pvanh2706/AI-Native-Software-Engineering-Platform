# S4 — convert sang Vue · kết quả

Ngày 11/08/2026. Convert từ `form.html` sang
[`S4SoanSuaMau.vue`](../../app/src/screens/S4SoanSuaMau.vue).

## Số đo — cao nhất trong 5 màn

| Chỉ số | Kết quả |
|---|---|
| **`CMP-01`** | **93.1%** — cao nhất, so với S1 85.2% · S2 81.3% · S5a 83.2% · S5b 89.5% |
| `A11Y-01/02/03`, `RES-01/01b/12` | **0 lỗi** ở cả sáng lẫn tối |
| Luồng `FR-04` | 1 lần bấm đổi một trường từ *Cho sửa* sang *Khoá* |

Toàn bộ **14 URL × 7 check + 4 luồng** đều đạt.

## `FieldValueInput` — component đã dự đoán là sẽ cần

Ghi chú thiết kế đã đoán trước: *"nhiều khả năng còn thiếu một component cho ô khai giá trị
theo kiểu field"*. Đúng vậy — 10 dòng, 8 kiểu field khác nhau (chữ 1 dòng, wiki, chọn người,
chọn một, chọn nhiều, ngày, số, chọn 2 tầng). Không tách ra thì mỗi dòng là một chuỗi `v-if`
viết tay ngay trong màn.

Đã thêm [`field-value-input/FieldValueInput.vue`](../../app/src/components/ui/field-value-input/FieldValueInput.vue):
nhận `kieu` rồi tự chọn dạng ô. Đây cũng là **chỗ duy nhất biết kiểu field nào dựng bằng ô
nào**, nên Jira thêm kiểu mới chỉ phải sửa một file.

Nó hiện **0%** trong bảng đóng góp `CMP-01` — không phải lỗi: nó chỉ bọc mỏng, còn DOM thật
do `Input` / `Select` / `Textarea` / `TagsInput` render, nên vùng được quy về các component
đó. Đúng như thiết kế của phép đo.

## Ca "tên mẫu trùng": hiện thực bằng hành vi, không xin Stitch vẽ

Brief cố ý không xin màn này (lý do ở [ghi chú thiết kế](ghi-chu.md)). Ở Vue nó là một
`computed` đối chiếu với tên mẫu đã có trong dự án — gõ trùng thì hiện lỗi ngay dưới ô và
khoá nút Lưu. Không cần màn riêng, và không thể lệch nội dung với form.

Tương tự, ràng buộc **FR-04 tiêu chí 7** (bắt buộc + không mặc định + khoá ⇒ không lưu được)
là một `computed` khác, hiện thành dải `Notice` ở đầu màn kèm tên đúng những trường đang
kẹt. Bấm nút *Cho sửa* của trường đó là dải biến mất — quan hệ nhân quả thấy được ngay.

## Điểm mù mới phát hiện của `CMP-01`

Bốn URL của S4 (form, form tối, hai hộp thoại) cho **cùng một con số 93.1%** và cùng bảng
đóng góp. Ban đầu tưởng hộp thoại không mở, kiểm bằng Playwright thì chúng mở thật.

Nguyên nhân: `Dialog` của reka-ui render qua **portal gắn thẳng vào `body`**, nằm **ngoài
`#app`** — mà `CMP-01` chỉ duyệt trong `#app`. Nội dung hộp thoại **không được đếm**.

Chưa sửa, vì đổi phạm vi quét sang `body` sẽ kéo theo cả lớp nền che và cần xem lại mẫu số.
Ghi lại để người sau biết: **con số `CMP-01` của một màn có hộp thoại chỉ phản ánh phần nền,
không phản ánh hộp thoại.** `A11Y-01` thì không dính vì nó vốn duyệt `body *`.

## Còn lệch so với bản thiết kế

- Bản thiết kế để bộ chọn dự án ở **đầu thanh bên** dạng dropdown; bản convert dùng **danh
  sách 3 dự án** theo QĐ1. Giữ QĐ1.
- Cột "Quyền" dùng **nút có chữ** (Khoá / Cho sửa) thay vì chỉ biểu tượng như thiết kế —
  để không vi phạm "không dùng màu hoặc hình làm tín hiệu duy nhất", và để vùng bấm đạt
  24×24.
