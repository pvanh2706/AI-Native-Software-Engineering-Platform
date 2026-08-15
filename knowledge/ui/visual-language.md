# Ngôn ngữ thị giác — dùng chữ và màu thế nào

Token nói *có những cấp nào*. File này nói *dùng cấp nào ở đâu*.
Nguồn giá trị: [typography.json](../../design-system/tokens/typography.json) · [themes/](../../design-system/themes/)

---

## Chữ

### `VIS-01` — Tối đa 4 cấp chữ trên một màn
Nhiều hơn thì thang chữ mất chức năng phân cấp. Cấu hình điển hình: `headline` (tiêu đề màn) → `title-md` (tiêu đề khu vực) → `body-md` (nội dung) → `body-sm` (chú thích).

### `VIS-02` — Một `headline` mỗi màn
Hai tiêu đề cùng cỡ = màn hình có hai việc = vi phạm `PRIN-01`.

### `VIS-03` — Nhấn bằng `medium` (500), không bằng `bold` (700)
`bold` dành cho số liệu cần đọc lướt và tiêu đề lớn. Dùng bold để nhấn trong đoạn văn làm mặt chữ lổn nhổn.

### `VIS-04` — Không viết hoa toàn bộ quá 3 từ
Tiếng Việt viết hoa toàn bộ mất dấu phụ về mặt nhận dạng hình dáng chữ, đọc chậm hẳn. `overline` chỉ dùng cho nhãn cột và tiêu đề nhóm ngắn.

### `VIS-05` — Kích thước không phải cách duy nhất tạo thứ bậc
Thứ tự công cụ nên dùng: **vị trí** → **khoảng cách** → **độ đậm** → **kích thước** → **màu**. Nhảy thẳng sang tăng cỡ chữ là phản xạ lười và làm màn hình ồn.

### `VIS-06` — Dòng văn bản dài không quá 72 ký tự
Vượt thì mắt lạc dòng khi xuống hàng (`LAY-02`).

### `VIS-07` — Chữ số so sánh phải đều bề rộng
Cột số, mã, thời gian: dùng `font.family.mono` hoặc `font-variant-numeric: tabular-nums`. Chữ số không đều làm cột số nhấp nhô.

---

## Màu

### `VIS-08` — Chỉ dùng vai trò, không dùng palette gốc
Component chạm `palette.blue.40` là sai. Phải qua vai trò (`color.primary`). Palette gốc không đổi theo theme — chạm thẳng là khoá cứng một theme.

### `VIS-09` — `primary` dành cho hành động, không dành cho trang trí
Mỗi màn nên có **đúng một** vùng dùng `primary` đậm. Dùng nhiều chỗ thì không chỗ nào nổi.
Không dùng `primary` cho tiêu đề, đường kẻ, hay nền vùng lớn.

### `VIS-10` — Bốn màu ngữ nghĩa, không hơn
`success` · `error` · `warning` · `primary(info)`. Không phát minh màu thứ năm cho "trạng thái đặc biệt" — dùng chữ, đừng dùng màu.

### `VIS-11` — Màu ngữ nghĩa chỉ dùng đúng nghĩa
Không dùng đỏ cho nút xoá **thông thường** (xoá có hoàn tác được không?), không dùng xanh lá cho "đã chọn". Màu lỗi dùng cho thứ không phải lỗi làm người dùng mất niềm tin vào tín hiệu.

### `VIS-12` — Phân tầng bề mặt bằng độ sáng trước, bóng sau
Trên nền tối gần đen, **bóng gần như vô hình**. Mọi tầng độ nổi phải gắn với một bậc `surface-container-*`; bóng chỉ là lớp phụ trợ.
Ràng buộc này đã mã hoá trong [elevation.json](../../design-system/tokens/elevation.json) → `noShadowOnlyHierarchyInDarkTheme`.

### `VIS-13` — Trạng thái tương tác bằng lớp phủ, không bằng màu riêng
Hover/focus/pressed dùng lớp phủ `state-layer-base` với độ mờ 8%/10%/12%. Không khai màu hover riêng — khai riêng là phải bảo trì hai bộ cho hai theme.

### `VIS-14` — Cấm gradient trên vùng có chữ
Tương phản đổi dọc theo bề mặt → không kiểm được `A11Y-01`. Ngoại lệ duy nhất: đồ thị nơi gradient mã hoá giá trị (`AP-09`).

### `VIS-15` — Đường kẻ dùng `outline-variant`, viền tương tác dùng `outline`
Hai vai trò khác nhau: đường kẻ phân cách chỉ cần thấy mờ; viền ô nhập là **thành phần UI**, phải đạt 3:1.

---

## Icon

### `VIS-16` — Icon đi kèm chữ, trừ khi cực kỳ quy ước
Icon một mình chỉ chấp nhận cho: đóng (×), tìm kiếm, menu, quay lại. Mọi thứ khác phải có chữ — nhất là giao diện tiếng Việt, nơi ẩn dụ icon phương Tây không phải lúc nào cũng khớp.

### `VIS-17` — Icon không mang nghĩa thì ẩn khỏi trình đọc màn hình
Icon trang trí đặt `aria-hidden`. Icon mang nghĩa phải có nhãn.
