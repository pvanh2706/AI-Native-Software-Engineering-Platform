# S2 — convert sang Vue · kết quả

Ngày 11/08/2026. Convert từ `form.html` sang
[`app/src/screens/S2TaoIssue.vue`](../../app/src/screens/S2TaoIssue.vue).

| Ảnh | Là gì |
|---|---|
| `form.png` · các `*.png` khác | Bản thiết kế |
| `convert-form-sang.png` · `convert-form-toi.png` | Bản Vue, 1280×1024 @2x |
| `convert-tao-that-bai.png` | Sau khi bấm tạo mà thiếu trường bắt buộc |
| `convert-tao-thanh-cong.png` | Sau khi điền rồi bấm tạo |
| `convert-dong-tu-dong-loi.png` | Hộp thoại FR-08 |

## Số đo

| Chỉ số | S1 | S2 | Ngưỡng |
|---|---|---|---|
| **`CMP-01`** | **85.2%** | **81.5%** | ≥ 80% ✅ |
| Tương phản — sáng | 0 | **0** | 0 |
| Tương phản — tối | 0 | **0** | 0 |

S2 đóng góp: `Input` 23.8% · `Textarea` 21.5% · `Label` 15.2% · `NavItem` 13.5% ·
`Button` 2.8% · `TagsInput` 2.6% · `SelectValue` 1.6% · `Badge` 0.6%. Viết tay:
`AppShell` 10.8% (bố cục thanh bên/thanh trên) + `S2TaoIssue` 7.7% (khối tra cú pháp wiki,
dải báo lỗi).

**S2 sát sàn hơn S1 (81.5% so với 85.2%) là hợp lý:** màn bảng thì `TableCell` và
`TableHead` phủ gần 70% diện tích chỉ bằng hai component; màn form thì mỗi trường là một ô
nhỏ, và các khối ghép riêng (bảng tra cú pháp wiki, ô nhãn dạng chip) không có component
sẵn nên phải viết tay — dù đã bổ sung `Textarea` và `TagsInput` vào registry.

## Ba lần đo mới ra được con số dùng được

Định nghĩa trong [docs/07](../../../../docs/07-uiux-capability-and-eval.md) chỉ có một dòng —
*"% vùng UI ánh xạ được về component trong Registry"* — nên phải tự chọn cách hiện thực.
Hai cách đầu đều **hỏng theo kiểu im lặng**, ra số đẹp mà vô nghĩa:

| Cách quy | S1 | S2 | Vấn đề |
|---|---|---|---|
| Quy theo component render trực tiếp phần tử | 94.6% | 70.1% | `Select`/`Dialog` chỉ bọc mỏng quanh reka-ui nên DOM lá thuộc `node_modules` → **không được tính**, dù ta đúng là đang dùng component registry |
| Đi ngược chuỗi sở hữu tới component registry gần nhất | 100% | 100% | `AppShell` bọc toàn màn nên **mọi thứ** đều quy về nó |
| **Đi ngược chuỗi, nhưng KHÔNG tính `AppShell`** | **85.2%** | **81.5%** | dùng được |

Cách thứ ba là cách đang dùng: `AppShell` là thẻ bọc bố cục, không phải component nội dung
— vùng nào mà tổ tiên registry gần nhất chỉ là shell thì đó là markup viết tay.

Bài học cho chính chỉ số này: **một chỉ số chỉ có ngưỡng mà không có cách đo thì chưa dùng
được.** Đã xử: viết thành [`tools/ui-eval/measure.mjs`](../../../../tools/ui-eval/measure.mjs)
để mọi màn đo giống nhau, không ai phải nghĩ lại.

```bash
node measure.mjs "http://localhost:5199/?theme=light" "http://localhost:5199/?man=s2&theme=light"      --out anh/ --json bao-cao.json
```

Nó đo cả `CMP-01` lẫn `A11Y-01`, và **thoát khác 0 khi có màn không đạt** nên cắm vào CI
được. Lý do phải đổi cách đo hai lần cũng ghi ngay trong
[README của tool](../../../../tools/ui-eval/README.md).

## Ba trạng thái: từ ba ảnh rời thành hành vi thật

Bản thiết kế phải vẽ ba màn riêng. Ở bản Vue chúng là **một màn với ba nhánh**, nên không
thể lệch nội dung — đúng vấn đề mà [ghi chú thiết kế S2](ghi-chu.md) đã nêu (bản "tạo thất
bại" Stitch sinh ra là một form khác hẳn, phải bỏ).

Kiểm bằng Playwright, không nhìn mắt:

```
1. gửi khi thiếu trường bắt buộc
   dải báo lỗi     : HIỆN
   lỗi gắn đúng ô  : Field 'customfield_10312' is required.
   dữ liệu còn giữ : Task…                     ← FR-06: không xoá form khi lỗi
2. điền rồi gửi
   hộp thoại       : Tạo issue thành công
3. chuyển trạng thái hỏng
   tiêu đề         : Issue ITSUP-2484 đã được tạo thành công
   đi tới đâu      : có nêu ("Chờ duyệt")
   nút thử lại     : có
```

Điểm 3 là chỗ FR-08 dễ hỏng nhất: tiêu đề **dẫn bằng thành công**, dùng màu cảnh báo chứ
không dùng màu lỗi, và nói rõ hỏng ở bước nào. Người dùng không thể nhầm thành "tạo hỏng".

Móc `?ketqua=transition` chỉ để xem trước trạng thái đó khi chụp ảnh — bỏ khi nối API thật.

## Hai thứ sửa ở registry

**1. `Input` cũng dính `disabled:opacity-50`** — cùng lỗi `AP-11` đã sửa ở `Button` khi
convert S1. Ba trường khoá của S2 (`Loại issue`, `Người được giao`, `Người báo cáo`) đều là
`Input disabled`, nên lỗi này sẽ hiện ngay trên màn dùng nhiều nhất. Đã thay bằng token màu.

**2. Registry thiếu `Textarea`** — mà ô Mô tả là thành phần chính của S2 và phải soạn bằng
wiki markup Jira (FR-04), không được dùng trình soạn thảo giàu định dạng. Đã thêm
[`textarea/Textarea.vue`](../../app/src/components/ui/textarea/Textarea.vue), dùng nguyên hệ
class của `Input` để hai ô trông như một. Nó đóng góp **21.5%** `CMP-01` — không thêm thì con số tụt
xuống dưới ngưỡng thật.

## Còn lệch so với bản thiết kế

- **Khối tra cú pháp wiki** viết tay; hợp lý vì nó đặc thù một màn.
- **Ô ngày** dùng `input[type=date]` của trình duyệt nên hình thức theo hệ điều hành, khác
  bản thiết kế — xem §dưới.

## Đã bổ sung `TagsInput` vào registry

Ô Nhãn ban đầu viết tay ngay trong màn. Đã tách thành
[`tags-input/TagsInput.vue`](../../app/src/components/ui/tags-input/TagsInput.vue) — tự
chứa, không thêm phụ thuộc (bản của reka-ui kéo theo API riêng mà ở đây chưa cần).

Có `v-model` mảng chuỗi, thêm bằng Enter hoặc khi rời ô, **Backspace ở ô rỗng gỡ nhãn cuối**,
và mỗi nút gỡ có `aria-label` riêng. `CMP-01` của S2 nhích từ 80.8% lên **81.5%**.

## Date picker: chưa làm, và đây là lý do

Kiểm rồi: **không cần cài thêm gì** — `reka-ui` đã có `Calendar`, và
`@internationalized/date` đã nằm sẵn trong `node_modules` như phụ thuộc gián tiếp.

Nhưng làm cho tử tế thì phải thêm **hai nhóm component** (`calendar` ~8 file và `popover`
~4 file) và nâng `@internationalized/date` thành phụ thuộc trực tiếp. Đổi lại chỉ được
**một trường** trên một màn, mà `input[type=date]` hiện tại vẫn dùng được và vẫn truy cập
được bằng bàn phím — chỉ là hình thức theo hệ điều hành.

Đề xuất: **để lại**, làm khi có màn thật sự cần khoảng ngày hoặc định dạng riêng — nhiều
khả năng là S3 (Lịch sử issue, FR-09 có lọc theo khoảng thời gian). Lúc đó chi phí chia cho
hai màn thay vì một.

## `NFR-07`: đếm tay đã kết luận sai

Lần báo trước mình ghi *"2 lần bấm. Đạt."* — **sai**. Đếm đúng số lần bấm nhưng chưa kiểm
issue có được tạo hay không.

Khi cho máy bấm thật (kiểm luồng trong `measure.mjs`, có điều kiện `xong` là hộp thoại
thành công) thì lộ ra: **2 lần bấm, nhưng không tới đích**. Mẫu mặc định có field bắt buộc
*Thời gian thực tế* chưa khai giá trị mặc định, nên luồng dừng ở màn báo lỗi. Tức là tác vụ
dùng nhiều nhất trong ngày **luôn phải dừng lại điền tay** — đúng thứ `NFR-07` sinh ra để
chặn.

**Đã sửa ở dữ liệu, không phải ở màn:** mẫu `MẶC ĐỊNH` giờ có sẵn giá trị cho field bắt
buộc. Sau đó `NFR-07` đạt thật: 2 lần bấm → hộp thoại thành công.

Chỗ này lệch với brief S2 (brief cố ý để trống ô đó để thử phần hiển thị lỗi). Lý do chọn
như vậy: mẫu **mặc định** của dự án mà thiếu giá trị bắt buộc thì là lỗi cấu hình, không
phải chủ ý thiết kế — `FR-04` cho phép field bắt buộc không có mặc định, nhưng khi đó
`NFR-07` không thể đạt. Trạng thái lỗi **vẫn tái hiện được** bằng cách xoá ô rồi bấm tạo,
và ảnh `convert-tao-that-bai.png` chụp đúng theo cách đó. Muốn quay về đúng brief thì đổi
`thoiGian` về `''` trong [`du-lieu.ts`](../../app/src/du-lieu.ts) — một dòng.

## Việc tiếp

Đã gộp toàn bộ vào [`tools/ui-eval/measure.mjs`](../../../../tools/ui-eval/measure.mjs):
`CMP-01`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `RES-01`, `RES-12` và kiểm luồng — một lệnh,
một mã thoát. Cấu hình riêng của dự án ở
[`app/ui-eval.config.json`](../../app/ui-eval.config.json).

```
✅ theme-light · theme-dark          CMP-01 85.2%   6/6 check đạt
✅ man-s2-theme-light · -dark        CMP-01 81.2%   6/6 check đạt
✅ NFR-07                            2 lần bấm (tối đa 3), tới đích
```

Còn lại: `DS-01` vẫn nằm ở `capture.mjs` và mới quét được HTML tự chứa — muốn dùng cho app
thật thì phải quét `.vue`/`.css`, là việc khác chứ không phải chép sang.
