# S3 — convert sang Vue · kết quả

Ngày 11/08/2026. Convert từ `danh-sach.html` + `khong-khop.html` sang
[`app/src/screens/S3LichSuIssue.vue`](../../app/src/screens/S3LichSuIssue.vue).

| Ảnh | Là gì |
|---|---|
| `danh-sach.png` · `khong-khop.png` | Bản thiết kế |
| `convert-danh-sach-sang.png` · `convert-danh-sach-toi.png` | Bản Vue, 1280×1024 @2x |
| `convert-khong-khop.png` | Bộ lọc không khớp dòng nào (`?man=s3-khong-khop`) |
| `convert-thu-lai.png` | Sau khi bấm *Thử lại* trên dòng ITSUP-2482 |

## Số đo

| Chỉ số | Kết quả | Ngưỡng |
|---|---|---|
| **`CMP-01`** — danh sách | **92.7%** sáng · **92.7%** tối | ≥ 80% ✅ |
| **`CMP-01`** — lọc không khớp | **85.9%** | ≥ 80% ✅ |
| `A11Y-01/02/03`, `RES-01/01b/12` | **0 lỗi** ở cả 3 URL | 0 |
| Luồng `FR-09` | **1 lần bấm** thử lại, tới đích | ≤ 1 |

Đóng góp `CMP-01` màn danh sách: `TableCell` 51.4% · `TableHead` 10.4% ·
`TableCaption` 9.4% · `NavItem` 9.4% · `Button` 3.6% · `Label` 3.6% · `Badge` 2.3% ·
`Input` 2.1% · `SelectValue` 0.4%. Viết tay: **chỉ `AppShell` 7.3%** — không một dòng
markup riêng nào của màn.

Cao hơn S1 (85.2%) và S2 (81.3%) vì đây là màn bảng thuần: `TableCell` + `TableHead`
một mình đã phủ 62%. **Không thêm component mới nào vào registry** — đúng dự đoán của
ghi chú thiết kế.

## Bốn kết quả: phân biệt bằng CỘT, không bằng màu

Chỗ dễ hỏng nhất của màn này là ca (b) *"không bật"* bị vẽ thành lỗi và ca (c)
*"đóng tự động thất bại"* bị nhầm thành (d) *"tạo lỗi"*. Cách xử:

| Ca | Kết quả tạo | Kết quả đóng tự động | Thao tác |
|---|---|---|---|
| a — trọn vẹn | `Thành công` (nền xanh) | ✓✓ Xong | Mở Jira |
| b — không bật | `Thành công` | *Không bật* + "Mẫu không cấu hình đóng tự động — không phải lỗi" | Mở Jira |
| c — kẹt trạng thái | `Thành công` | **Thất bại** + đang dừng ở đâu, hỏng khi sang đâu, vì sao | **Thử lại** · Mở Jira |
| d — tạo lỗi | `Lỗi` + nguyên văn Jira | — | **Tạo lại** |

Hai cột tách rời mới là thứ phân biệt (c) với (d): ca (c) cột *Kết quả tạo* vẫn xanh
`Thành công`, nên không thể đọc nhầm thành "chưa có issue". Ca (d) mã issue ghi
**«Chưa tạo»** chứ không phải «(Trống)» như bản thiết kế — «(Trống)» đọc ra như dữ liệu
bị khuyết, còn sự thật là Jira chưa hề tạo issue nào.

Cũng vì hai cột đã nói đủ nên câu giải thích ca (c) **bỏ vế "Issue đã tạo"** — bảng dài
hàng trăm dòng thì mỗi hàng chữ thừa là một dòng ít đi trong khung nhìn.

## `input[type=date]` có một cái bẫy không sửa được từ phía app

Đã chốt dùng hai ô ngày gốc trình duyệt thay vì thêm `calendar` + `popover`. Chạy thật
mới lộ ra: **Chrome vẽ `input[type=date]` theo locale của TRÌNH DUYỆT, không theo `lang`
của trang.** `index.html` đã có `lang="vi"` từ đầu mà ô vẫn hiện `08/04/2026` cho ngày
**04/08**. Máy nào đặt Chrome en-US là đọc ngược ngày.

Không có cách sửa từ phía app. Đã bù bằng cách **nhắc lại khoảng ngày theo `dd/mm/yyyy`
ngay trong caption của bảng** — *"Hiển thị 5 kết quả khớp bộ lọc — từ 04/08/2026 đến
11/08/2026"*. Đó là chỗ duy nhất trên màn nói rõ đang lọc ngày nào, và nó không phụ
thuộc locale.

Ghi lại để lần sau cân nhắc: **đây mới là lý do thật để thêm date picker**, không phải
"hình thức theo hệ điều hành" như ghi chú convert S2 đã nêu.

Ràng buộc chéo `từ ≤ đến` làm bằng `max`/`min` chéo nhau (chặn ngay trong lịch) cộng một
câu báo khi gõ tay vượt rào — thứ mà một ô text dạng "04/08/2026 - 11/08/2026" như bản
thiết kế không có.

## Số dòng khớp là `<caption>`, không phải một `<p>` rời

Bản thiết kế để dòng *"Hiển thị 5 kết quả khớp bộ lọc"* thành một dòng chữ trôi phía trên
bảng. Ở bản Vue nó là `<TableCaption>` với `caption-top`:

- trình đọc màn hình đọc nó **ngay khi vào bảng**, không phải đi tìm;
- `aria-live="polite"` nên đổi bộ lọc là nghe được số mới;
- và nó là component registry, không phải markup viết tay.

Đây chính là chỗ kéo `CMP-01` màn lọc-không-khớp từ **74.7% lên 85.9%** — xem §dưới.

## Bộ lọc dự án của S3 KHÔNG theo bộ chọn ở thanh bên

Mâu thuẫn thật giữa hai tài liệu:

- **QĐ1** nói bộ chọn dự án ở thanh bên *"chi phối Mẫu issue và Lịch sử issue"*;
- **brief S3** đòi một bộ lọc *Dự án* riêng có thêm lựa chọn **"Tất cả"**, và dữ liệu mẫu
  trải trên cả 3 dự án.

Bộ chọn thanh bên **không diễn đạt được "Tất cả"** nên không thể là nguồn cho màn này.
Đã chọn: bộ lọc của S3 là nguồn duy nhất, mặc định "Tất cả" — đúng brief và đúng bản
thiết kế. Kèm theo, thanh bên **không tô sáng dự án nào khi đang ở S3**, để khỏi hiện một
thứ sai (ITSUP sáng trong khi bảng đang hiện cả 3 dự án).

**Cần cập nhật QĐ1.** Ranh giới đúng là: bộ chọn thanh bên chi phối *Mẫu issue*; *Lịch sử
issue* và khu *Cấu hình* đều có danh sách riêng.

## Một lỗi thật ở S5a lộ ra trong lúc đo

`?man=s5a-rong` đang hiện câu *"Hệ thống chưa kết nối với dự án Jira nào"* **và liệt kê
đủ 5 dự án ngay bên dưới** — trạng thái rỗng nói dối. Nguyên nhân: vòng `v-for` dựng dòng
không có nhánh loại trừ `rong`. Đã sửa một dòng ở
[`S5aDanhSachDuAn.vue`](../../app/src/screens/S5aDanhSachDuAn.vue).

Hệ quả về số: **`CMP-01` 89.3% của `s5a-rong` ghi trong QUYET-DINH là số ẢO** — nó được
5 dòng bảng đáng lẽ không tồn tại đẩy lên. Số thật sau khi sửa là **79.7%**, tức trượt
ngưỡng. Xem mục treo cuối file.

## `sr-only` từng bị `RES-01b` báo nhầm — đã sửa ở tool

Ô "Kết quả đóng tự động" của dòng tạo lỗi hiện dấu `—` kèm một `<span class="sr-only">`
giải thích *"Không áp dụng vì issue chưa được tạo"*. `RES-01b` báo ngay:
*"SPAN.sr-only bị cắt 237px, không cuộn được"*.

Báo sai. `sr-only` là ô 1×1 bị clip **cố ý** — chữ trong đó dành cho trình đọc màn hình,
không phải nội dung mất khỏi màn. Không lọc thì **mọi `sr-only` ở mọi màn về sau đều báo
lỗi**, và cách chữa dễ nhất lại là bỏ `sr-only` đi — tức là phép đo đang đẩy người ta làm
xấu khả năng tiếp cận.

Đã sửa ở [`measure.mjs`](../../../../tools/ui-eval/measure.mjs): bỏ qua phần tử vừa ≤ 1px
một chiều, vừa định vị tuyệt đối, vừa bị `clip`/`clip-path`. Nhận theo hình dạng chứ không
theo tên class, nên không phụ thuộc `sr-only` của Tailwind.

## Còn treo — cần quyết

**`CMP-01` phạt oan màn thưa nội dung.** Sau khi sửa lỗi S5a, `s5a-rong` ra **79.7%** mà
**100% phần "viết tay" là `AppShell` (20.3%)** — màn đó không còn một dòng markup riêng
nào. Không có cách nào nâng số bằng cách dùng thêm component, vì đã hết chỗ để dùng.

Nguyên nhân là bất đối xứng trong chính phép đo: `AppShell` bị **loại khỏi tử số** (đúng
— nếu không thì màn nào cũng 100%) nhưng **vẫn nằm trong mẫu số**. Màn càng ít nội dung
thì phần khung cố định càng chiếm tỉ trọng lớn, và một màn sạch tuyệt đối vẫn trượt.

Ba đường đi, chưa chọn:

| | Việc phải làm | Cái mất |
|---|---|---|
| **a. Loại `AppShell` khỏi cả mẫu số** | sửa `measure.mjs` | **Mọi con số đã ghi phải đo lại** — S1 85.2%, S2 81.3%, S4 93.1%… đều đổi |
| **b. Ngưỡng riêng cho màn trạng thái** | khai `nguong` theo URL trong config | Thêm một chỗ để nới tay khi trượt |
| **c. Dựng lại trạng thái rỗng của S5a** | bỏ tiêu đề cột khi chưa có dữ liệu | Đụng vào màn đã nghiệm thu; `TableHead` đang là 28.6% nên bỏ đi số còn tụt sâu hơn |

Nghiêng về **(a)**: `CMP-01` hỏi *"màn vừa dựng có dùng lại component không"*, mà khung
app thì dựng một lần dùng chung — tính nó vào mẫu số của từng màn là phạt màn thưa vì
thứ nó không quyết định. Nhưng nó **đo lại toàn bộ bảng số**, nên đây là quyết định của
người, không phải của bước convert.

Trong lúc chờ, `measure.mjs` **đang thoát khác 0** vì `s5a-rong` 79.7%.

## Còn lệch so với bản thiết kế

- **Dòng đếm nằm TRONG khung bảng** (là `<caption>`), bản thiết kế để ngoài.
- **Trạng thái lọc-không-khớp giữ nguyên tiêu đề cột**, bản thiết kế thay cả bảng bằng
  một khối rỗng riêng. Giữ cột để người dùng thấy mình vẫn đang ở đúng bảng, và để dùng
  lại đúng `TableEmpty` như S5a.
- **Không có thanh cuộn ngang.** Bản thiết kế bị cắt mất cột cuối ở 1280px nên phải cho
  cuộn; bản Vue cho tên mẫu và câu giải thích **xuống dòng** nên 8 cột vừa khung.
- **Tiêu đề bảng không dính (`sticky`)**, bản thiết kế có. Thẻ bọc `Table` dùng
  `overflow-x: auto` nên tự thành khung cuộn theo cả hai chiều, `sticky top-0` bên trong
  không bám vào `main` được. Chưa cần với 5 dòng; sẽ cần khi nối API thật.

## Việc tiếp

- **Dữ liệu S1 và S3 đang lệch nhau.** `DU_AN.ITSUP.ganDay` (mục "Issue gần đây" của S1)
  ghi ITSUP-2482 lúc `10/08 09:41`, còn `LICH_SU` của S3 ghi `11/08 09:41` — cùng một
  issue, hai mốc thời gian. Mỗi bên lấy theo brief của mình. Nên cho S1 đọc lại từ
  `LICH_SU` để chỉ còn một nguồn; chưa làm vì đụng màn đã nghiệm thu.
- **Nút "Thử lại" ở prototype lần nào cũng thành công.** Bản thật gọi lại transition và
  có thể hỏng tiếp — lúc đó dòng phải ở nguyên nhánh *Thất bại* và câu giải thích phải
  đổi theo lý do mới.
