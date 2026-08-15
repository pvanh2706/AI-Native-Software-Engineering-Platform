# UI Eval harness

Bản chạy được của **UI Eval** mô tả ở [docs/07 §8](../../docs/07-uiux-capability-and-eval.md). Mục đích: chấm giao diện **trên pixel thật**, không phải trên mô tả bằng chữ.

```bash
npm i                       # chỉ playwright-core, dùng Chrome đã cài sẵn — không tải browser

# prototype HTML tự chứa
node capture.mjs <đường-dẫn-index.html> <thư-mục-ảnh-ra>

# app thật đang chạy — đo cả 6 chỉ số + kiểm luồng
node measure.mjs --config <duong-dan>/ui-eval.config.json --out anh/ --json bao-cao.json
```

`measure.mjs` là **tool chung**, phần riêng của dự án nằm hết trong file config:
danh sách URL cần đo, và các **luồng** cần đếm số lần bấm. Ví dụ:
[`projects/jira-issue-templates/app/ui-eval.config.json`](../../projects/jira-issue-templates/app/ui-eval.config.json).

`measure.mjs` **thoát khác 0 khi có màn không đạt**, nên cắm thẳng vào CI được.

## Nó làm gì

| Chỉ số | Đo gì | Ngưỡng |
|---|---|---|
| `CMP-01` | % vùng UI ánh xạ về component registry | ≥ 80% |
| `A11Y-01` | tương phản chữ WCAG 2.2 AA | 0 lỗi |
| `A11Y-02` | vùng bấm ≥ 24×24 (WCAG 2.5.8) | 0 lỗi |
| `A11Y-03` | ô nhập có nhãn nối được bằng máy | 0 lỗi |
| `RES-01` | không tràn ngang ở 1440 / 1280 / 1024 | 0 lỗi |
| `RES-12` | khung (thanh bên / thanh trên) trong khung nhìn | 0 lỗi |
| **luồng** | đếm số lần bấm THẬT của một tác vụ, vd `NFR-07` | ≤ ngưỡng khai trong config |
| `DS-01` | màu hard-code ngoài khối token *(mới có ở `capture.mjs`)* | 0 lỗi |

Ảnh chụp mỗi màn vẫn xuất ra để judge đa phương thức chấm — lớp 1 có điểm mù, xem §dưới.

Điều khiển màn hình và theme qua chính API của prototype (`go(screen)`, `applyTheme(theme)`) — không cần sửa file để test.

## Kiểm luồng: vì sao `NFR-07` phải để máy bấm

`NFR-07` đòi *"tạo 1 issue từ mẫu **không sửa gì** trong ≤ 3 lần bấm"*. Đếm tay trên ảnh
tĩnh thì chỉ đếm được **số lần bấm**, không kiểm được **có tới đích không**.

Ca thật gặp ngay lần chạy đầu: đếm ra 2 lần bấm — trong ngưỡng — nhưng issue **không hề
được tạo**, vì mẫu mặc định có một field bắt buộc chưa khai giá trị mặc định, nên luồng
dừng lại ở màn báo lỗi. Đếm tay đã kết luận "đạt"; máy bấm thật thì bắt được.

Nên kiểm luồng luôn phải có `xong` — một selector chỉ xuất hiện khi tác vụ **thực sự
hoàn tất**:

```jsonc
{ "ma": "NFR-07", "toiDa": 3,
  "buoc": ["tr:has-text(\"Ghi nhận…\") button:has-text(\"Tạo issue\")",
           "button:has-text(\"Tạo issue\")"],
  "xong": "[role=dialog] >> text=Tạo issue thành công" }
```

## Vì sao phải chụp ảnh

Lớp 1 **có điểm mù**. Ví dụ thật, chạy trên prototype Jira v4:

> Lớp 1 báo `A11Y-01 = 0 lỗi` ở màn `dark-home`. Nhưng ảnh cho thấy hai thẻ mờ (`opacity: .55`) gần như không đọc được trên nền đen. `getComputedStyle().color` **không tính** `opacity` của phần tử cha, nên check tương phản mù trước ca này.

Một model đọc `UiSpec` dạng chữ càng không thấy được. Chỉ judge nhìn ảnh mới bắt được — cùng với thứ bậc thị giác, căn chỉnh, mật độ, trang trí thừa.

## `CMP-01` — vì sao phải có script riêng

`CMP-01` ở [docs/07](../../docs/07-uiux-capability-and-eval.md) chỉ có **ngưỡng** (≥ 80%),
**không có cách đo**. Lần convert S1/S2 đầu tiên phải tự nghĩ ra cách, và hai cách đầu đều
hỏng theo kiểu im lặng — ra số trông hợp lý mà vô nghĩa:

| Cách quy vùng về component | S1 | S2 | Sai ở đâu |
|---|---|---|---|
| Theo component render trực tiếp phần tử | 94.6% | 70.1% | `Select`/`Dialog` chỉ bọc mỏng quanh reka-ui nên DOM lá thuộc `node_modules` → không được tính, dù đúng là đang dùng component registry. **S2 "trượt ngưỡng" oan** |
| Đi ngược chuỗi sở hữu tới registry gần nhất | 100% | 100% | `AppShell` bọc toàn màn nên mọi thứ quy về nó |
| **Đi ngược, nhưng không tính `AppShell`** | **85.2%** | **81.5%** | dùng được — đang dùng cách này |

Cách đang dùng, viết gọn:

1. chỉ tính phần tử **mang nội dung** (có chữ trực tiếp, hoặc là ô nhập / icon / ảnh) —
   tính cả thẻ bọc bố cục thì diện tích cha con chồng nhau, con số mất nghĩa;
2. quy mỗi phần tử về **component registry gần nhất** trên chuỗi `__vueParentComponent`;
3. **`AppShell` không phải đích quy** — nó là khung bố cục, không phải component nội dung.

Bài học chung: **một chỉ số chỉ có ngưỡng mà không có cách đo thì chưa dùng được.** Ai cũng
tự nghĩ ra một cách, và các cách cho ra kết luận trái ngược nhau.

## Hai lần phép đo tự bắt nhầm

Ghi lại vì cả hai đều thuộc loại **đo sai theo hướng đẩy người ta làm xấu sản phẩm** —
nguy hiểm hơn hẳn đo thiếu.

**1. `RES-01b` báo `sr-only` là "nội dung bị cắt"** *(sửa 11/08/2026, gặp ở S3)*. Chữ
dành riêng cho trình đọc màn hình nằm trong ô 1×1 bị clip — đúng ý đồ, không phải nội
dung mất khỏi màn. Nhưng `scrollWidth > clientWidth` nên bị báo *"bị cắt 237px, không cuộn
được"*. Cách chữa dễ nhất khi thấy báo đỏ lại là **bỏ `sr-only` đi**. Đã lọc theo hình
dạng (≤ 1px một chiều + định vị tuyệt đối + có `clip`/`clip-path`), không lọc theo tên
class, nên không phụ thuộc `sr-only` của Tailwind.

**2. `CMP-01` phạt màn thưa nội dung** *(chưa sửa)*. `AppShell` bị loại khỏi **tử số** —
đúng, nếu không thì mọi màn đều 100%. Nhưng diện tích của nó **vẫn nằm trong mẫu số**.
Màn càng ít nội dung, phần khung cố định càng chiếm tỉ trọng lớn:

| Màn | `CMP-01` | Phần "viết tay" |
|---|---|---|
| S3 — danh sách (5 dòng bảng) | 92.7% | `AppShell` 7.3% |
| S3 — lọc không khớp | 85.9% | `AppShell` 14.1% |
| S5a — chưa kết nối | **79.7%** ❌ | `AppShell` 20.3% — **và không gì khác** |

Màn cuối **không còn một dòng markup riêng nào** mà vẫn trượt ngưỡng, và không có cách
nâng số bằng cách dùng thêm component vì đã hết chỗ để dùng. Sửa được bằng cách loại
`AppShell` khỏi cả mẫu số, nhưng thế thì **mọi con số đã ghi phải đo lại** — nên đang chờ
người quyết, xem
[ghi chú convert S3](../../projects/jira-issue-templates/04-design/s3-lich-su-issue/convert-ghi-chu.md).

## Giới hạn hiện tại

- Chưa chạy phần judge tự động: ảnh đang được đưa cho model đọc thủ công. Bước tiếp là gọi model đa phương thức và ép output theo rubric ở [docs/07 §8](../../docs/07-uiux-capability-and-eval.md).
- `DS-01` mới quét CSS trong một file HTML tự chứa; app thật cần quét cả `.vue`/`.css`.
- `DS-01` mới có ở `capture.mjs`, chưa gộp sang `measure.mjs` — cần quét `.vue`/`.css`
  chứ không phải một file HTML tự chứa, nên là việc khác chứ không phải chép sang.
- `CMP-01` tính ô bảng cho `TableCell` kể cả khi chữ bên trong do màn truyền vào, nên con
  số thiên về phía rộng rãi. Biết để đọc cho đúng, không phải lỗi.
- Chưa có so sánh ảnh giữa hai phiên bản (visual regression).
- Danh sách màn hình đang hard-code trong `SHOTS`; sau này lấy từ `UiSpec.screens[]`.
