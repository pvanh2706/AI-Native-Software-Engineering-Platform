# Quy tắc responsive

Bối cảnh: công cụ nội bộ, gần như luôn dùng trên máy tính bàn/laptop. **Không** thiết kế mobile-first cho loại này — đó là tối ưu cho trường hợp hiếm và trả giá bằng mật độ ở trường hợp thường.

---

## `RES-03` — Ba breakpoint, không hơn

| Tên | Rộng | Thực tế là gì | Ưu tiên |
|---|---|---|---|
| `wide` | ≥ 1440px | Màn ngoài, laptop lớn | **Thiết kế cho mức này trước** |
| `base` | 1024–1439px | Laptop 13–14" — **phổ biến nhất** | Bắt buộc hoạt động tốt |
| `narrow` | 768–1023px | Cửa sổ chia đôi màn, tablet ngang | Dùng được, cho phép giảm tiện nghi |

Dưới 768px: **không cam kết**. Nếu một màn thật sự cần dùng trên điện thoại thì đó là yêu cầu riêng, thiết kế riêng — không cố co màn desktop lại.

---

## `RES-02` — Trang không bao giờ cuộn ngang

Ở mọi breakpoint đã cam kết. Nội dung rộng (bảng, biểu đồ, khối mã) cuộn **trong khối của nó** (`TBL-16`).
*Kiểm được bằng máy:* `documentElement.scrollWidth > clientWidth` → fail.

---

## `RES-04` — Thứ tự hy sinh khi thu hẹp

Khi không đủ chỗ, bỏ theo đúng thứ tự này. Đây là phần quan trọng nhất của file — nó biến "responsive" từ cảm tính thành quyết định.

```
1. Khoảng trắng trang trí          ← bỏ trước
2. Cột phụ trong bảng               (ẩn, cho bật lại)
3. Nhãn chữ cạnh icon               (giữ icon, thêm tooltip)
4. Thanh bên                        (thu thành icon, rồi thành menu bật)
5. Nội dung phụ                     (đưa xuống dưới, không xoá)
─────────────────────────────────────────────────────────
   KHÔNG BAO GIỜ HY SINH:
   · hành động chính
   · thông báo lỗi
   · cột định danh của bảng
   · nhãn ô nhập
```

---

## `RES-05` — Thanh bên thu theo bậc

`wide` hiện đầy đủ → `base` hiện đầy đủ → `narrow` thu còn icon → dưới 768px thành menu bật.
Không nhảy thẳng từ đầy đủ sang ẩn hẳn.

## `RES-06` — Biểu mẫu hai cột về một cột ở `narrow`
Không bao giờ ép hai cột vào chỗ hẹp — nhãn và ô sẽ dính vào nhau.

## `RES-07` — Lưới thẻ tự xuống dòng, không đặt số cột cứng
Dùng `minmax()` theo chiều rộng tối thiểu của thẻ. Đặt cứng 3 cột thì ở `narrow` thẻ bị bóp méo.

## `RES-08` — Không đổi thứ tự đọc theo breakpoint
`order` của CSS làm thứ tự thị giác lệch khỏi thứ tự DOM → thứ tự tab đi loạn (`A11Y-06`), và đây là điểm mù của check tự động.

## `RES-09` — Kiểm ở cả hai theme, mọi breakpoint
Tổ hợp bắt buộc kiểm: 3 breakpoint × 2 theme = **6 lần** cho mỗi màn chính. Không suy ra được từ nhau: `outline-variant` ở theme tối mảnh hơn về mặt cảm nhận, dễ mất đường kẻ khi hẹp.

---

## Chiều cao

### `RES-10` — Thiết kế cho chiều cao 900px
Laptop 13" còn khoảng 750–800px chiều cao dùng được sau khi trừ thanh trình duyệt. Nội dung quan trọng nhất phải nằm trong khoảng đó mà không cuộn.

### `RES-12` — Khung phải nằm trong khung nhìn
Thanh bên, thanh trên, thanh trạng thái là **khung**, không cuộn theo nội dung. Ở 1440×900, **mọi mục điều hướng và khối tài khoản phải nằm trong 900px đầu tiên** dù trang dài bao nhiêu.
Cách làm: `position:sticky` + `height:calc(100vh - <chiều cao thanh trên>)` + `overflow-y:auto` riêng cho thanh bên.
Vi phạm → `AP-19`.

### `RES-11` — Thanh công cụ không được vỡ dòng
Ở mọi breakpoint đã cam kết. Vỡ dòng → `AP-05`. Thu gọn theo `RES-04` bậc 3 trước khi để nó xuống dòng.
