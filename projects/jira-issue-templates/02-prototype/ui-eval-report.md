# UI Eval Report — UiPrototype v7

- **Ngày:** 2026-08-10 · **Profile:** `ui-eval.v1`
- **Đối tượng:** [index.html](index.html) v7 — **dựng lại từ đầu**, phong cách Atlassian
- **Harness:** [tools/ui-eval](../../../tools/ui-eval/README.md) — **16 ảnh** (8 màn × 2 theme), 3 breakpoint
- **Kết luận:** ✅ **PASS** — lớp 1 sạch **16/16 ảnh**

## v7 — dựng lại từ đầu

| Check | Kết quả |
|---|---|
| `A11Y-01` tương phản | 0 lỗi / 16 ảnh |
| `A11Y-02` vùng bấm ≥ 24px | 0 |
| `A11Y-03` nhãn ô nhập | 0 |
| `RES-12` khung trong khung nhìn | 0 |
| `RES-01` tràn ngang 1440/1280/1024 | PASS |
| `DS-01` màu hard-code | 0 |

**Lớp 1 sạch ngay lần chạy đầu của bản dựng mới** — lần đầu điều đó xảy ra. Lý do: bản này được dựng *sau khi* đã có `knowledge/ui/`, nên các quy tắc được áp lúc viết chứ không phải lúc sửa.

### Ba chuyện đáng ghi lại

**1. Check `RES-12` bắt được bản sửa của chính tôi chưa đủ.**
Người dùng báo khối tài khoản ở đáy thanh bên bị đẩy khỏi khung nhìn. Tôi sửa bằng `position:sticky` + `height:calc(100vh - 38px)` — và check vẫn báo lỗi. Đo ra thanh trên cao **53px**, không phải 38px. Nhìn mắt thì bản vá đó trông như đã xong. Sửa đúng là **app-shell**: khung cố định, chỉ vùng nội dung cuộn, không hardcode chiều cao nào.

**2. Mở rộng coverage từ 6 lên 16 ảnh, lập tức lộ 3 lỗi.**
Màn Soạn mẫu chưa từng được chụp. Trong đó có `AP-20`: link "cấu hình dự án" trong dải cảnh báo không khai màu nên rơi về màu mặc định của trình duyệt — theme sáng đọc được nên **không ai để ý**, theme tối cho tương phản **1.05:1**. Bắt được vì chạy trên **cả hai theme**.

> Bài học: **thiếu một tổ hợp màn × theme là thiếu một chỗ cho lỗi trốn.** Harness nay tự sinh đủ tích Descartes.

**3. Lần thứ ba harness tự nó sai.**
`DS-01` đếm cả mã màu **nằm trong chú thích CSS** — một chú thích nhắc tới `#0000EE` bị tính là vi phạm. Đã sửa để bỏ chú thích trước khi quét. Cộng dồn: regex khối token (v5), thiếu màn hình (v7), chú thích (v7). **Check cũng là code, và cũng có lỗi.**

### Phong cách không chỉ là màu

Đổi Material 3 → Atlassian **không thể** làm bằng cách đổi bảng màu. Design system có bo góc 28px cho hộp thoại và nút dạng viên không biểu đạt được Atlassian. Phải đổi token *hình dạng*: bo góc về 3px, headline 20px thay 24px, bóng nhẹ hơn, ô bảng 8px, hàng 40px. Token *màu* giữ nguyên.

---

## v6 — tách Cấu hình dự án thành hai màn

Theo phản hồi review. Màn cấu hình cũ làm **hai việc** cùng lúc (chọn dự án + cấu hình dự án) → vi phạm `PRIN-01`, dài 1670px.

| | v5 | v6 |
|---|---|---|
| Màn cấu hình | 1 màn, 1670px | **2 màn**: danh sách (`crud-list`) + chi tiết (`detail-page`) |
| Chọn dự án để cấu hình | Bảng chèn trên đầu màn chi tiết | Màn danh sách riêng |
| Ngữ cảnh | Bám dự án đang chọn ở thanh bên | **Độc lập** — khu vực quản trị riêng |
| Gọi Jira | Không nói rõ | **Mở màn không gọi Jira**; chỉ nút *Lấy lại thông tin từ Jira* |
| Lỗi lớp 1 | 0 | **0** (trên 8 ảnh, tăng từ 6) |

**Phát hiện đáng giá nhất không phải lỗi giao diện:** yêu cầu FR-02 cũ chỉ nói *"metadata được cache; có nút làm mới"* — đọc kiểu nào cũng được, kể cả gọi Jira mỗi lần mở màn. Đã bổ sung **5 tiêu chí** về *khi nào* gọi Jira và **RequirementSet lên v3**. Đây là vòng `UiPrototype → refines → RequirementSet` chạy đúng thiết kế: prototype bắt được **thiếu sót trong yêu cầu**, không chỉ lỗi giao diện.

**Một hồi quy bắt được nhờ nhìn ảnh:** cột "Thứ tự" vỡ hai dòng ở màn chi tiết. Nguyên nhân: một script sửa lỗi trước đó **thoát giữa chừng trước khi ghi file**, nên phần CSS `.order-cell` không bao giờ được áp — trong khi markup thì có class đó. Lớp 1 báo PASS suốt.

> Ba lần liên tiếp, thứ bắt được lỗi là **ảnh chụp**, không phải check máy. Xem thêm §Hai chuyện đáng ghi lại.

## Ngoại lệ được ghi nhận

| Mã | Màn | Lý do |
|---|---|---|
| `AP-04` | Danh sách dự án | Nội dung chiếm ~55% chiều cao vì **chỉ có 3 dự án** — ngắn do dữ liệu, không do thiết kế. `LAY-03` cho phép lệch nếu ghi lý do. Với 10+ dự án màn sẽ tự đầy. |

---

## Mốc so sánh v4 → v5

---

## Đo trước/sau

| | v4 | v5 |
|---|---|---|
| **Lỗi lớp 1 (blocking)** | **19** | **0** |
| `DS-01` màu hard-code | 1 | **0** |
| `RES-01` tràn ngang | PASS | PASS |
| **Điểm judge lớp 2** | **0.58** ⛔ | **0.81** ✅ |
| Lỗi thị giác | **9** | **0** (còn 2 mục nợ nhỏ) |

Đây là **lần đầu có số liệu trước/sau** để trả lời câu hỏi *"knowledge có thực sự hiệu quả hay chỉ là giấy tờ"*. Cùng một prototype, cùng Design System, chỉ khác việc **có bộ quy tắc để soi**.

### Lớp 1 theo màn hình

| Màn hình | v4 | v5 |
|---|---|---|
| light-home | 0 | 0 |
| light-config | 5 | **0** |
| light-create | 8 | **0** |
| light-fail | 3 | **0** |
| dark-home | 0 | 0 |
| dark-config | 3 | **0** |

---

## Đã sửa — 9/9 lỗi thị giác + 3 lỗi lớp 1

| # | Lỗi | Quy tắc | Cách sửa |
|---|---|---|---|
| V-1 | Thanh trên vỡ dòng | `AP-05` `RES-11` | `flex-wrap:nowrap` + rút gọn nội dung còn một dòng |
| V-2 | Hai banner xếp chồng | `AP-01` `LAY-04` | Gộp ngữ cảnh dự án + trạng thái đồng bộ vào **một** dải |
| V-3 | Select mất mũi tên | `AP-03` `FORM-04` | Vẽ lại mũi tên bằng gradient dùng `var(--color-on-surface-variant)` — theme-aware, áp cho **mọi** select |
| V-4 | Đáy trống 67% | `AP-04` `LAY-03` | Theo đúng thứ tự sửa của `LAY-03` bước 3: **đưa nội dung liên quan lên** — thêm dải "Issue vừa tạo" (FR-09). Nội dung lấp **87%** chiều cao |
| V-5 | Mép phải răng cưa | `AP-02` `LAY-01` | Một `max-width` cho cả cột ở `#main`; **bỏ 8 `max-width` nội tuyến** |
| V-6 | Thẻ mờ không đọc được ở nền đen | `AP-11` | Bỏ `opacity`, chuyển sang `surface-container-low` + `on-surface-variant` |
| V-7 | Cột số căn trái | `AP-14` `TBL-01` | Căn phải + `tabular-nums` |
| V-8 | `◉`/`○` giả radio | `AP-08` `FORM-06` | `<input type="radio">` thật, 24px, có `aria-label` |
| V-9 | Chip truy vết chiếm vị trí đắt | `AP-18` | Chuyển xuống chân màn hình, có nhãn "Truy vết:" |
| — | 15 nhãn giả | `AP-12` `FORM-01` | `<span class="lbl">` → `<label for>` thật, cấp id tự động |
| — | Link issue cao 15px | `A11Y-02` | `inline-flex` + `min-height:24px` |
| — | Mũi tên bước 4.26:1 | `A11Y-01` | Đổi sang `on-surface-variant` |

---

## Hai chuyện đáng ghi lại từ quá trình sửa

### 1. Sửa một quy tắc làm hỏng quy tắc khác

Sửa `AP-08` (thay `◉` bằng radio thật) **sinh ra 5 lỗi `A11Y-02` mới** — radio mặc định của trình duyệt chỉ **13×13px**, dưới sàn 24px. Lần chạy eval ngay sau đó cho thấy màn config **tệ đi** (5 → 6 lỗi) dù vừa được "sửa".

> Bài học: **phải chạy lại eval sau mỗi vòng sửa**, không phải chỉ chạy một lần ở cuối. Một bản sửa đúng quy tắc này có thể phá quy tắc khác, và không ai phát hiện bằng mắt.

### 2. Check tự động cũng hỏng, và hỏng im lặng

`DS-01` có lúc báo **57 lỗi giả**: regex lọc khối token yêu cầu `{` dính ngay sau `]`, mà CSS sinh tự động có dấu cách. Harness sai chứ không phải prototype sai.

> Bài học: **một check hỏng nói dối theo cả hai chiều** — báo lỗi không có, và bỏ qua lỗi có thật. Check cũng cần được kiểm.

---

## Lớp 2 — Judge chấm trên ảnh

| Tiêu chí | Trọng số | v4 | v5 |
|---|---|---|---|
| Task efficiency | 0.20 | 0.85 | 0.85 |
| Visual hierarchy | 0.15 | 0.55 | **0.80** |
| Consistency nội bộ | 0.15 | 0.40 | **0.85** |
| Information density | 0.10 | 0.35 | **0.70** |
| Simplicity | 0.10 | 0.50 | **0.80** |
| Microcopy | 0.10 | 0.75 | 0.75 |
| Xử lý ca rìa | 0.05 | 0.80 | **0.85** |
| Consistency với UI hiện có | 0.15 | — | — (chưa có UI hiện có) |
| **Tổng (chuẩn hoá)** | | **0.58** ⛔ | **0.81** ✅ |

## Còn nợ

| # | Vấn đề | Quy tắc | Ghi chú |
|---|---|---|---|
| N-1 | Hàng bảng cao ~53px, chuẩn compact là 36px | `LAY-11` | Mật độ chưa đạt mức đã chốt. Sửa `--space-cell-padding-y` cho ngữ cảnh bảng |
| N-2 | Thẻ mẫu hàng 2 còn khoảng trống giữa mô tả và badge | `LAY-13` | Chiều cao thẻ đã đều; nội dung ngắn không lấp hết |

Cả hai mức **Thấp**, không chặn. Đưa vào vòng sau.

## [BỔ SUNG UX] phát sinh

- **Dải "Issue vừa tạo ở dự án này"** trên màn chính. Dùng lại dữ liệu FR-09 ở một màn khác để sửa `AP-04` theo đúng thứ tự khắc phục của `LAY-03`. **Ứng viên đưa vào RequirementSet v3** — hiện FR-09 chỉ mô tả màn Lịch sử riêng.

## Lịch sử

- **v6** — 2026-08-10 · Tách Cấu hình thành 2 màn (`crud-list` + `detail-page`), tách khỏi ngữ cảnh thanh bên, quy định rõ khi nào gọi Jira. RequirementSet → v3. Lớp 1: 0/8 ảnh. Judge 0.84. **PASS**.
- **v5** — 2026-08-10 · Sửa 9 lỗi thị giác + 3 nhóm lỗi lớp 1 theo `knowledge/ui/`. Lớp 1: 19 → 0. Judge: 0.58 → 0.81. **PASS**.
- **v4** — 2026-08-10 · Màu lấy từ Design System. Lớp 1: 19 lỗi. Judge 0.58. FAIL.
