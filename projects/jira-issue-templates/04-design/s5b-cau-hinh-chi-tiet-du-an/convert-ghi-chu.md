# S5a + S5b — convert sang Vue · kết quả

Ngày 11/08/2026. Convert từ bản thiết kế đã chuẩn hoá sang
[`S5aDanhSachDuAn.vue`](../../app/src/screens/S5aDanhSachDuAn.vue) và
[`S5bChiTietDuAn.vue`](../../app/src/screens/S5bChiTietDuAn.vue).

## Số đo — 10 màn, 12 mục, tất cả đạt

| Màn | `CMP-01` | 6 check còn lại |
|---|---|---|
| S1 sáng / tối | 85.2% | đạt |
| S2 sáng / tối | 81.3% | đạt |
| S5a danh sách sáng / tối | 83.2% | đạt |
| S5a chưa kết nối | 89.3% | đạt |
| S5b quản trị sáng / tối | **89.4%** | đạt |
| S5b chỉ xem | 88.7% | đạt |
| `NFR-07` tạo issue không sửa gì | 2 lần bấm (≤ 3) | đạt |
| `FR-05` mở cấu hình một dự án | 1 lần bấm (≤ 2) | đạt |

Chạy bằng một lệnh: `node ../../../tools/ui-eval/measure.mjs --config ui-eval.config.json`.

## Bốn lỗi registry mà chỉ convert mới lộ

Cả bốn đều nằm ở component **dùng chung**, nên sửa một lần là mọi màn sau đều hưởng.

| Lỗi | Ảnh hưởng |
|---|---|
| `Switch` cao **18.4px** — dưới ngưỡng 24×24 của WCAG 2.5.8 | 5 công tắc bật/tắt mẫu ở S5b |
| `SelectTrigger` dính `disabled:opacity-50` | chữ "Đã xong" / "Done" ở bản chỉ xem chỉ đạt **3.34:1** |
| Registry thiếu `Progress` | S5a cần báo tiến độ đồng bộ (FR-02) |
| Registry thiếu `Notice` | dải thông báo lặp ở ít nhất 3 chỗ, mỗi chỗ tự dựng lại một kiểu |

`SelectTrigger` là component **thứ ba** dính `disabled:opacity-50`, sau `Button` (lộ ở S1)
và `Input` (lộ ở S2). Ba lần cùng một lỗi ở ba component khác nhau — nên có check quét
thẳng mã nguồn registry thay vì đợi từng màn dẫm phải.

## `CMP-01` thấp là tín hiệu đúng — và cách sửa không phải là gian lận con số

Lần đo đầu: **S5a 78.5%, S5b chỉ xem 53.6%** — cả hai trượt ngưỡng.

Nguyên nhân không phải "thiết kế quá độc bản" mà là mình dựng bằng `<section>` + `<h3>` +
`<p>` trong khi registry **đã có sẵn** `Card` / `CardHeader` / `CardTitle` /
`CardDescription` / `CardContent`. Các khối đó đúng là card, chỉ là dựng bằng tay.

Đổi sang dùng `Card`, và tách dải thông báo thành `Notice`:

| Màn | Trước | Sau |
|---|---|---|
| S5a | 78.5% | **83.2%** |
| S5b quản trị | (bespoke 24.9%) | **89.4%** |
| S5b chỉ xem | 53.6% | **88.7%** |

Đây là lý do chỉ số này đáng giữ: nó **chỉ đúng chỗ đang tự viết lại thứ đã có**.

## `RES-01` có điểm mù — đã vá

Ảnh bản chỉ xem lộ ra cột "Mặc định" **bị cắt cụt** bên phải. `RES-01` báo 0 lỗi, vì nó chỉ
đo `scrollWidth` của `documentElement`: bảng tràn **bên trong** một `Card` có
`overflow-hidden` thì trang không hề cuộn, mà một cột vẫn biến mất khỏi màn.

Đã thêm **`RES-01b`** vào [`measure.mjs`](../../../../tools/ui-eval/measure.mjs): quét mọi
phần tử có `overflow-x: hidden|clip` mà `scrollWidth > clientWidth`.

Lần chạy đầu nó báo một ca ở S2 — **dương tính giả**: `<input>` một dòng vốn cắt chữ của
chính nó, nhưng người dùng vẫn tới được bằng con trỏ và bàn phím. Đã loại thẻ nhập khỏi
phạm vi. Ghi lại vì đây là ranh giới dễ nhầm: *bị cắt* khác *mất nội dung*.

## Ràng buộc âm FR-05 giữ được ở tầng code

Kiểm bằng script trên mã nguồn S5b:

```
số <Switch>: 1   — nằm trong bảng mẫu, bật/tắt TỪNG MẪU
cụm cấm ("auto-Done", "Đóng issue Inactive"): không có
```

Không có công tắc tự động đóng nào ở **cấp dự án** — đúng A-05. Đây là chỗ bản Stitch từng
tự bịa ra và phải bỏ; ở code thì ràng buộc này kiểm được bằng máy.

## Hai thứ chưa làm

- **Kéo thả đổi thứ tự** dùng HTML5 DnD gốc, chỉ chạy bằng chuột. Bàn phím chưa đổi thứ tự
  được — cần thêm nút lên/xuống hoặc `aria-grabbed`. Chưa có check nào bắt được việc này.
- **Ranh giới FR-05** (khu cấu hình độc lập với dự án ở thanh bên) mới giữ bằng code review,
  chưa có check tự động. Có thể viết thành một luồng: đổi dự án ở thanh bên → mở cấu hình →
  khẳng định dự án đang mở không đổi theo.
