# 04-design — nơi đẩy bản thiết kế từ Stitch lên

Thả file vào thư mục con theo mã màn hình. Tôi đọc từ đây để convert sang Vue.

> **Có cách không phải copy tay: Stitch MCP.** Xem [§Qua MCP](#qua-mcp-thay-vì-copy-tay) cuối file.
> Kể cả khi dùng MCP, **vẫn lưu một bản chụp vào đây** — bất biến của platform là *"không có output trôi nổi"*: mọi thứ dùng để dựng sản phẩm phải có bản lưu truy vết được.

```text
04-design/
  s1-danh-sach-mau/     ← thả file cho màn S1 vào đây
  s2-tao-issue/         ← tạo khi làm tới màn đó
  ...
```

## Cần những gì — theo thứ tự quan trọng

| # | Thứ cần | Bắt buộc? | Dùng để làm gì |
|---|---|---|---|
| 1 | **Mã nguồn** Stitch xuất ra — HTML + Tailwind, hoặc Vue | ✅ **bắt buộc** | Rút chính xác màu, spacing, bo góc, thang chữ → sinh `design-overrides.json`. Ánh xạ cấu trúc sang component |
| 2 | **Ảnh chụp màn hình** | ✅ **bắt buộc** | Judge lớp 2 chấm trên pixel, không chấm trên mô tả. Cũng là mốc để so bản convert có giống thiết kế không |
| 3 | `DESIGN.md` của Stitch, nếu xuất được | ⚪ nên có | Chứa design system của nó — màu, typography, spacing. Hoà giải với `design-system/` sẽ chính xác hơn nhiều |
| 4 | Link file Stitch, nếu chia sẻ được | ⚪ tuỳ | Xem lại khi có chỗ mơ hồ |

**Thiếu mã nguồn** thì tôi phải đoán giá trị từ ảnh — sai số lớn, và `design-overrides.json` sẽ không khớp.
**Thiếu ảnh** thì không chạy được judge lớp 2, mất luôn khâu bắt lỗi thị giác.

## Ảnh: xin đủ bốn cái

1. `sang.png` — màn chính, giao diện sáng
2. `toi.png` — màn chính, giao diện tối
3. `rong.png` — trạng thái khi dự án chưa có mẫu nào
4. `full.png` — ảnh chụp trọn chiều dài trang (nếu Stitch cho), để thấy phần dưới màn hình

## Đặt tên

Đặt được theo gợi ý dưới thì tôi xử lý nhanh hơn, nhưng **không đúng tên cũng không sao** — tôi tự nhận diện qua nội dung.

```text
s1-danh-sach-mau/
  sang.png
  toi.png
  rong.png
  code.html          (hoặc code.vue, hoặc cả thư mục Stitch xuất ra)
  DESIGN.md
  ghi-chu.md         (tuỳ chọn — chỗ bạn muốn nhắc riêng)
```

File nén `.zip` cũng được, cứ thả nguyên vào.

## Nếu Stitch cho chọn định dạng xuất

**HTML + Tailwind** và **Vue** đều tốt như nhau — công ánh xạ giống hệt, vì cả hai đều là markup thô chưa dùng component của ta.

Chọn HTML nếu tiện hơn. Đừng chọn React/JSX — thêm một lượt dịch không cần thiết.

## Tôi làm gì sau khi nhận

1. **Rút ngôn ngữ thị giác** từ mã nguồn → `projects/<slug>/design-overrides.json`
2. **Chỉnh component** trong `app/src/components/ui/` cho khớp thiết kế — shadcn là copy-in, sửa được thoải mái
3. **Convert màn hình** sang Vue dùng component đã chỉnh
4. **Bù trạng thái và a11y** — Stitch chỉ vẽ happy path
5. **Chạy `tools/ui-eval`** trên bản build
6. **Báo lại**: ảnh so sánh thiết kế ↔ bản convert, kết quả eval, và `CMP-01` — *% vùng UI dùng lại component*

Ngưỡng đã thống nhất: `CMP-01` ≥ **80%** nghĩa là cách làm này trụ được. Liên tục dưới **50%** nghĩa là thiết kế quá độc bản, phải xét lại việc dùng component.

## Qua MCP thay vì copy tay

Stitch có MCP server. Cấu hình đã đặt sẵn ở [`.mcp.json`](../../../.mcp.json) gốc repo.

**15 công cụ — đã dò trực tiếp endpoint, không lấy từ blog.**
(Các bài hướng dẫn ngoài ghi `get_screen_code` / `get_screen_image` / `build_site` — **sai**, API thật khác và rộng hơn nhiều.)

| Nhóm | Tool | Dùng để |
|---|---|---|
| **Dự án** | `list_projects` · `get_project` · `create_project` · `delete_project` | Duyệt và quản lý project Stitch |
| **Màn hình** | `list_screens` · `get_screen` | **Đọc thiết kế** — thay việc xuất và copy tay |
| **Sinh & sửa** | `generate_screen_from_text` · `edit_screens` · `generate_variants` | Sinh màn từ prompt, sửa, tạo biến thể |
| **Design system** | `list_design_systems` · `create_design_system` · `update_design_system` · `apply_design_system` | Đọc, tạo, áp design system lên màn |
| **DESIGN.md** | `upload_design_md` · `create_design_system_from_design_md` | **Đẩy DESIGN.md của ta VÀO Stitch** |

**Hai phát hiện quan trọng:**

1. **`generate_screen_from_text` nghĩa là brief đưa thẳng vào MCP được** — không cần copy prompt sang giao diện web Stitch. Cả vòng thiết kế chạy trong một chỗ.
2. **`upload_design_md` nghĩa là Stitch NHẬP được design system từ ngoài.** Trước đây tưởng chỉ xuất một chiều. Điều này mở ra phương án lai ở §dưới.

### Xác thực

Dò thực tế trên `https://stitch.googleapis.com/mcp`:

| Thao tác | Cần khoá? | Kết quả dò |
|---|---|---|
| `initialize`, `tools/list` | ❌ không | HTTP 200 — đọc được danh sách công cụ mà không cần khoá |
| `tools/call` (mọi thao tác thật) | ✅ **có** | HTTP 401 — *"Request is missing required authentication credential"* |

Nên cấu hình đúng là **bắt buộc có khoá**; nếu không mọi thao tác thật đều 401.

### Cấu hình — remote HTTP, không cần cài gói

Stitch cung cấp MCP dạng **HTTP từ xa**. Nhẹ hơn hẳn bản chạy `npx`: không phải cài gói, không vướng đường dẫn `npx` trên Windows, không lệch phiên bản.

Stitch đưa cấu hình theo định dạng của VS Code (khoá `servers`). Claude Code dùng khoá **`mcpServers`** — phần còn lại giữ nguyên:

```jsonc
// Stitch đưa                      →  .mcp.json của Claude Code
{ "servers": { … } }               →  { "mcpServers": { … } }
```

Đã đặt sẵn ở [`.mcp.json`](../../../.mcp.json) gốc repo.

### Cách bật

1. **Đặt API key vào biến môi trường** — không dán vào chat, không ghi vào repo:
   ```powershell
   setx STITCH_API_KEY "khoa-cua-ban"
   ```
   `.mcp.json` tham chiếu `${STITCH_API_KEY}` nên bản thân file **không chứa bí mật** — commit được bình thường.

2. **Mở terminal mới** (biến đặt bằng `setx` chỉ có ở tiến trình mới), rồi **khởi động lại Claude Code** trong thư mục repo. MCP nạp lúc mở phiên, không hot-reload.

3. Lúc khởi động sẽ hỏi *"Allow connection to MCP server 'stitch'?"* → chọn **Allow**.

4. Bảo tôi đọc màn hình — tôi gọi `get_screen_code` + `get_screen_image`, lưu bản chụp vào thư mục này rồi convert.

### Nếu vấp

| Triệu chứng | Nguyên nhân thường gặp |
|---|---|
| Server không hiện trong `/mcp` | Chưa khởi động lại Claude Code, hoặc `.mcp.json` sai khoá (`servers` thay vì `mcpServers`) |
| 401 / 403 | Biến `STITCH_API_KEY` chưa có ở tiến trình hiện tại — mở terminal mới. Kiểm bằng `echo %STITCH_API_KEY%` |
| Xác thực hỏng sau vài tháng | Token Stitch hết hạn sau 90 ngày — sinh lại, cập nhật biến môi trường, không cần sửa `.mcp.json` |

### Quy tắc về khoá

**Khoá API không bao giờ nằm trong repo và không bao giờ dán vào hội thoại.** Dán rồi thì coi như đã lộ — sinh khoá mới. Đó cũng là lý do dùng `${STITCH_API_KEY}` thay vì ghi thẳng: `.mcp.json` commit được, khoá thì không đi theo.

### Phương án lai vừa mở ra nhờ `upload_design_md`

Trước đây phải chọn một trong hai: **Stitch tự do sáng tạo** (được gu, mất nhận diện chung) hoặc **bó Stitch theo design system của ta** (giữ nhận diện, mất phần Stitch giỏi nhất).

Giờ có đường thứ ba: **đẩy vào Stitch một `DESIGN.md` chỉ chứa LÕI BẤT BIẾN**, thả phần còn lại.

| Đẩy vào Stitch qua `upload_design_md` | Để Stitch tự quyết |
|---|---|
| Thang spacing gốc 4px | Bảng màu, màu gốc |
| Mật độ compact | Bo góc |
| Sàn tương phản WCAG 2.2 AA | Thang chữ, font |
| Danh sách anti-pattern | Hình thức component |

Đúng ranh giới đã chốt ở [design-system/README](../../../design-system/README.md): các công cụ nội bộ **trông khác nhau nhưng dùng giống nhau**.

Chưa làm — cần thử một vòng "tự do hoàn toàn" trước để biết gu Stitch ra sao, rồi mới quyết có siết lõi hay không.

### MCP tiết kiệm khâu vận chuyển, KHÔNG tiết kiệm khâu convert

Đừng kỳ vọng sai: dù đọc qua MCP, thứ Stitch trả về **vẫn là markup thô với class Tailwind gốc**, không dùng component của ta. Toàn bộ công việc thật vẫn nguyên:

rút `design-overrides.json` → chỉnh component → ánh xạ markup → bù trạng thái và a11y → eval.

Cái được là **vòng lặp chặt hơn**: bạn chỉnh trong Stitch, tôi đọc lại ngay, không cần xuất/gửi lại.

## Bảy điểm tôi sẽ soi ngay

Cùng danh sách đã ghi ở [brief](../03-ui-brief/s1-danh-sach-mau.md):

1. Dòng cố ý dài — *"Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8"* — có tràn hoặc bị Stitch tự rút ngắn không
2. Dấu tiếng Việt ở dòng chật có bị cắt không (ề, ộ, ữ)
3. Mẫu Nháp / Không hợp lệ có nhìn ra là không dùng được không — và **có dùng `opacity` không** (`AP-11`, check máy mù trước ca này)
4. Khối tài khoản ở đáy thanh bên có nằm trong khung nhìn không (`RES-12`)
5. Số lần bấm để tạo một issue — phải ≤ 3 (`NFR-07`)
6. Có vi phạm mục nào trong 8 điều "không được làm" của brief không
7. `CMP-01` sau khi convert
