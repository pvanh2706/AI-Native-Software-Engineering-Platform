# S1 — convert sang Vue · kết quả

Ngày 11/08/2026. Convert từ `code.html` (bản Stitch đã chuẩn hoá) sang
[`app/src/App.vue`](../../app/src/App.vue), dùng bộ component ở `app/src/components/ui/`.

| Ảnh | Là gì |
|---|---|
| `sang.png` · `toi.png` | Bản thiết kế |
| `convert-sang.png` · `convert-toi.png` | Bản Vue, cùng thông số 1280×1024 @2x |
| `convert-chi-xem.png` | Bản Vue khi chọn dự án **không có quyền quản trị** (FR-11) |

## Số đo

| Chỉ số | Kết quả | Ngưỡng |
|---|---|---|
| **`CMP-01`** — % vùng UI ánh xạ về component registry | **85.2%** | ≥ 80% ✅ |
| Tương phản WCAG — giao diện sáng | **0** chỗ không đạt | 0 |
| Tương phản WCAG — giao diện tối | **0** chỗ không đạt | 0 |
| `DS-02` theme parity | 29/29 vai trò khớp | — |

Đóng góp vào `CMP-01`: `TableCell` 46.5% · `TableHead` 23.0% · `NavItem` 10.3% ·
`Button` 5.0% · `Badge` 0.4%. Viết tay: `AppShell` 8.2% + `S1DanhSachMau` 6.7%.

> **Số này đã sửa lại.** Bản đầu ghi 94.6% vì phép đo có tính cả `AppShell` — mà nó bọc
> toàn màn nên quy về nó là ăn gian. Cách đo cuối cùng và lý do đổi hai lần: xem
> [ghi chú convert S2](../s2-tao-issue-tu-mau/convert-ghi-chu.md).

**Cách đo** — `CMP-01` định nghĩa là *"% vùng UI ánh xạ được về component trong Registry"*,
tức tính theo **diện tích**, không đếm số thẻ. Cách làm: duyệt mọi phần tử trong `#app`,
chỉ lấy phần tử **mang nội dung** (có chữ trực tiếp, hoặc là ô nhập / icon / ảnh), hỏi Vue
xem component nào render ra nó (`__vueParentComponent.type.__file`), rồi cộng diện tích
theo nhóm.

Bỏ thẻ bọc bố cục là chủ ý, và `AppShell` không được tính là đích quy — chi tiết ở
[ghi chú convert S2](../s2-tao-issue-tu-mau/convert-ghi-chu.md). Lưu ý khi đọc: ô bảng được
tính cho `TableCell` kể cả khi chữ bên trong do màn truyền vào, nên con số thiên về phía
rộng rãi.

## Ba thứ sửa được nhờ convert mà nhìn ảnh không ra

**1. `Button` của registry vi phạm `AP-11`.** Base cva có `disabled:opacity-50` — chính bộ
component dùng độ mờ để báo trạng thái khoá, đúng thứ brief cấm. Nút "Tạo issue" ở hai dòng
không dùng được đo ra **2.5:1**. Đã thay bằng token màu riêng
(`disabled:bg-surface-variant disabled:text-on-surface-variant`). Sửa ở registry nên **mọi
màn sau đều hưởng**.

**2. Bẫy `primary-container` đảo vai trò đã thành hiện thực.** [QĐ6](../QUYET-DINH.md) có
cảnh báo: ở bộ org `primary-container` là nền nhạt còn ở dự án là nền đậm, nên
`on-primary-container` ở dự án là **màu nhạt**. Mình vẫn dính: dùng nó cho chữ "Đang bật"
→ **1.43:1**. Đổi sang `text-primary`. Cảnh báo bằng chữ không đủ; nên có check máy bắt
được việc dùng `on-*-container` làm màu chữ trên nền surface.

**3. `design-overrides.json` chưa từng được áp vào app.** Script
[`sync-design-system.mjs`](../../app/scripts/sync-design-system.mjs) chỉ sinh token từ bộ
org rồi thôi — nghĩa là app đang chạy bằng bảng màu org (`#2563EB`), không phải bảng màu
đã chốt của dự án. Đã thêm bước áp override vào script: **40 giá trị**, và **override
thiếu `$reason` thì thoát lỗi** thay vì cảnh báo suông, đúng tinh thần `DS-01`.

## Còn lệch so với bản thiết kế

Không phải lỗi, nhưng cần biết khi so ảnh:

- **Mục điều hướng đang chọn**: thiết kế là pill xanh nhạt chữ xanh đậm; `NavItem` của
  registry dùng `bg-primary-container text-on-primary-container` nên ra nền xanh đặc. Cùng
  gốc với bẫy ở mục 2. Chưa sửa vì đụng vào component dùng chung — cần chốt hướng ở tầng
  token trước.
- **Nền hàng tiêu đề bảng**: thiết kế có nền xám nhạt, `TableHead` của registry để trong suốt.
- **Cỡ chữ tiêu đề cột**: thiết kế 12px, registry dùng cỡ mặc định lớn hơn.

## Bộ chọn dự án — đã bổ sung theo brief

Chốt 11/08/2026: **thêm bộ chọn dự án vào thanh bên** theo đúng brief S1, thay vì theo bản
Stitch. [QĐ1](../QUYET-DINH.md) đã sửa lại đặc tả.

Thanh bên giờ có ba nhóm: **Dự án Jira** (3 dự án, chọn một, dự án không có quyền quản trị
hiện biểu tượng khoá) · **Trong dự án** (Mẫu issue, Lịch sử issue) · **Quản trị** (Cấu hình
dự án).

Kèm theo, `FR-11` giờ **chạy thật chứ không phải vẽ**: đổi sang dự án INFRA thì nút
"Tạo mẫu mới" biến mất, thay bằng dòng giải thích vì sao. Kiểm bằng script Playwright:

```
ITSUP (có quyền quản trị) -> nút "Tạo mẫu mới": HIỆN
INFRA (chỉ xem)           -> nút "Tạo mẫu mới": ẨN
   thay bằng: Chỉ xem — cần quyền quản trị dự án để sửa mẫu
```

Ranh giới cần giữ khi convert tiếp: bộ chọn này chi phối *Mẫu issue* và *Lịch sử issue*,
**không** chi phối khu Cấu hình dự án — S5a/S5b tự chọn dự án trong danh sách riêng (FR-05).

Bản thiết kế HTML của S1/S2/S5a/S5b **chưa có** bộ chọn này vì Stitch bỏ sót. Không sửa
ngược vào file thiết kế: chúng là bản ghi của thứ Stitch đã sinh. QĐ1 mới là đặc tả thi
hành, và nó đã ghi rõ.

## Đáng lưu ý: `App.vue` trước đó đã có một màn S1 khác

Bản cũ dựng từ prototype, **không phải** từ thiết kế Stitch — khác cột, khác dữ liệu, và
thanh bên có **danh sách 3 dự án Jira** mà bản Stitch không có.

Chỗ này cần chốt: [brief S1](../../03-ui-brief/s1-danh-sach-mau.md) **có yêu cầu** danh sách
dự án ở thanh bên, nhưng bản Stitch chỉ để lại dòng chữ "Project Selector" tĩnh. Nghĩa là
**Stitch bỏ sót một yêu cầu**, và [QĐ1](../QUYET-DINH.md) — vốn đúc từ chính bản Stitch —
kế thừa luôn chỗ sót đó.

**Đã quyết: bổ sung theo brief** — xem mục trên. Bản prototype cũ hoá ra đúng ở chỗ này.
