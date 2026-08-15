# Khả năng tiếp cận

**Sàn: WCAG 2.2 mức AA.** Không thương lượng — bậc 1 trong thứ tự thắng (`PRIN-08`), thắng cả thẩm mỹ.

Phần cuối (§Điểm mù) quan trọng ngang phần quy tắc: nó nói những chỗ **check tự động im lặng báo PASS trong khi thực tế hỏng**.

---

## Tương phản

### `A11Y-01` — Ngưỡng tương phản
| Đối tượng | Tỉ lệ tối thiểu |
|---|---|
| Chữ thường (< 24px, hoặc < 18.66px đậm) | **4.5:1** |
| Chữ lớn (≥ 24px, hoặc ≥ 18.66px đậm) | **3:1** |
| Viền ô nhập, icon mang nghĩa, ranh giới component | **3:1** |
| Chữ bị vô hiệu hoá | miễn trừ theo WCAG — **nhưng vẫn phải đọc được**, xem `A11Y-08` |

Kiểm ở **cả hai theme**. Một cặp màu đạt ở theme sáng có thể hỏng ở theme tối.

### `A11Y-05` — Màu không bao giờ là tín hiệu duy nhất
Mọi thông tin mã hoá bằng màu phải có **thêm** một kênh: chữ, icon, hình dạng, vị trí.
Áp cho: trạng thái (thành công/lỗi/cảnh báo), độ ưu tiên, phân loại, chuỗi bước.
*Cách kiểm nhanh:* chụp ảnh grayscale — thông tin vẫn phải đọc được (`PRIN-03`).

---

## Bàn phím & focus

### `A11Y-04` — Focus phải nhìn thấy được
Mọi phần tử focus được có style focus tương phản ≥ 3:1 với nền quanh nó. **Cấm** `outline: none` mà không thay bằng thứ khác.

### `A11Y-06` — Thứ tự tab theo thứ tự đọc
Không dùng `tabindex` dương. Nội dung hiện lên (hộp thoại, menu) phải nhận focus; đóng lại thì focus **trả về** phần tử đã mở nó.

### `A11Y-07` — Không có bẫy bàn phím
Vào được thì ra được. Hộp thoại: `Esc` đóng, và focus bị giữ trong hộp khi đang mở.

---

## Vùng bấm & nhãn

### `A11Y-02` — Vùng bấm ≥ 24×24px
Sàn WCAG 2.2 AA. Vùng bấm chính nên đạt 40px. Mật độ cao thì **mở rộng vùng bấm trong suốt**, không thu nhỏ nó (`LAY-12`).

### `A11Y-03` — Ô nhập phải có nhãn liên kết
`<label for>` thật, hoặc `aria-label`/`aria-labelledby`. Vi phạm → `AP-12`.

### `A11Y-09` — Chữ trên nút phải tự mô tả được việc
"Lưu mẫu" chứ không phải "OK". Người dùng trình đọc màn hình nghe nút tách khỏi ngữ cảnh.

---

## Chuyển động & thời gian

### `A11Y-10` — Tôn trọng `prefers-reduced-motion`
Bật thì tắt hết animation không thiết yếu.

### `A11Y-11` — Không có nội dung nháy > 3 lần/giây
Nguy cơ động kinh.

### `A11Y-12` — Không tự động hết hạn mà không báo
Phiên sắp hết phải cảnh báo trước và cho gia hạn.

---

## §Điểm mù — nơi check tự động im lặng báo PASS

Đây là lý do UI Eval **bắt buộc** có lớp judge nhìn ảnh, không chỉ lớp deterministic.

### `A11Y-08` — `opacity` của phần tử cha
`getComputedStyle(el).color` trả về màu **chưa nhân** `opacity` của khối cha. Một thẻ `opacity: .55` trên nền đen có chữ gần như không đọc được, mà check tương phản **báo 0 lỗi**.

> Đã xảy ra thật ở prototype v4: lớp 1 báo `A11Y-01 = 0 lỗi` ở màn tối, ảnh cho thấy hai thẻ mờ không đọc nổi.

**Quy tắc:** cấm dùng `opacity` để biểu đạt trạng thái (`AP-11`). Dùng vai trò màu đã kiểm tương phản, cộng nhãn chữ.

### Các điểm mù khác — judge phải tự soi

| Điểm mù | Vì sao máy không thấy |
|---|---|
| Chữ đè lên ảnh/gradient | Nền không đồng nhất, không có một giá trị màu để tính |
| Nhãn giả bằng `<span>` đặt tuyệt đối | Nhìn thì có nhãn; máy bắt được `A11Y-03` nhưng người rà bằng mắt lại **không** thấy vấn đề |
| Thứ tự đọc thị giác ≠ thứ tự DOM | CSS grid/flex `order` đảo vị trí; tab đi loạn xạ dù DOM đúng |
| Icon-only không có nhãn thấy được | `aria-label` đúng nhưng người dùng thường vẫn phải đoán nghĩa icon |
| Tương phản trạng thái hover/focus | Check thường chỉ chạy ở trạng thái nghỉ |
| `Esc` không đóng hộp thoại | Cần tương tác thật mới lộ |

**Judge nhìn ảnh chịu trách nhiệm phần này.** Deterministic check không phải là bằng chứng đạt chuẩn tiếp cận — nó chỉ là sàn.
