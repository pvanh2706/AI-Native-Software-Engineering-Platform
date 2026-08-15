---
name: make-ui-brief
description: Biến RequirementSet đã duyệt thành UiBrief — prompt đặc tả từng màn để công cụ thiết kế ngoài (Stitch) vẽ được — rồi chạy Stitch qua MCP, lưu bản thiết kế về 04-design/ và chuẩn hoá trước khi convert. Dùng sau gate Analysis, cho từng màn một. Đây là mắt xích giữa yêu cầu và giao diện; Stitch không đọc được yêu cầu có cấu trúc.
---

# Skill: Viết brief thiết kế (make-ui-brief)

Capability ở giai đoạn *Solution*. Vai trò trong [docs/07 §4](../../../docs/07-uiux-capability-and-eval.md): đây là bản **thực thi qua công cụ ngoài** của `ui.design.specify` — chỗ `UiSpec` đáng lẽ ra đời. Hôm nay `UiBrief` + bản thiết kế đã chuẩn hoá đóng vai trò đó.

| | |
|---|---|
| **Stage** | Solution |
| **Input (requires)** | `RequirementSet` **Approved** · `DesignSystem` |
| **Input (optional)** | `UiPrototype` (để biết cần mấy màn), `Answers`, ghi chú convert vòng trước |
| **Knowledge (bắt buộc nạp)** | `knowledge/ui/` — chỉ phần liên quan loại màn, xem §Nguồn bắt buộc |
| **Output (produces)** | `UiBrief` → `projects/<slug>/03-ui-brief/<ma>.md` · `DesignInput` → `projects/<slug>/04-design/<ma>/` |
| **Cạnh truy vết** | `RequirementSet --drivesDesign--> UiBrief` · `UiBrief --realizedBy--> DesignInput` |
| **Gate** | Người xem bản thiết kế nhận về **trước khi** tốn một vòng convert |

Mục đích thật: **đặc tả chặt nội dung, thả hoàn toàn hình thức**. Ta gọi Stitch chính vì cần gu thẩm mỹ mà ta không có — bó hình thức lại là vứt đi phần giá trị nhất. Nhưng thả nội dung thì Stitch sẽ bịa, và sáu vòng đã chạy cho thấy nó bịa theo đúng vài kiểu lặp lại.

---

## Nguồn bắt buộc — đọc TRƯỚC khi viết một chữ nào

| Nguồn | Khi nào | Lấy gì |
|---|---|---|
| `projects/<slug>/PROJECT.md` | **luôn**, việc đầu tiên | Trạng thái RequirementSet, màn nào đã đi qua đường ống, câu treo nào chặn |
| `projects/<slug>/01-requirements.md` | **luôn** | FR/NFR màn này phục vụ, kèm **tiêu chí chấp nhận** — brief phải diễn đạt được từng tiêu chí |
| `projects/<slug>/01-answers.md` | **luôn** | Quyết định đã chốt. Chỗ nào **lệch khỏi nguyên văn yêu cầu ban đầu** là ứng viên số một cho khối ràng buộc âm |
| `projects/<slug>/03-ui-brief/README.md` | **luôn** | Luật đã trả giá để có. Cập nhật file này khi vòng mới dạy thêm điều gì |
| `projects/<slug>/04-design/QUYET-DINH.md` | khi đã có | Đặc tả app shell + các quyết định thắng khi mâu thuẫn |
| `knowledge/ui/anti-patterns.md` | **luôn** | Rút gọn thành khối "KHÔNG ĐƯỢC LÀM" — **đặt trong phần dán**, không phải ghi chú |
| `knowledge/ui/state-guidelines.md` | **luôn** | `requiredStates` theo pattern → quyết định xin thêm mấy màn trạng thái |
| `knowledge/ui/table-guidelines.md` / `form-guidelines.md` | theo loại màn | Màn có bảng / có biểu mẫu |
| `knowledge/ui/microcopy-vi.md` | **luôn** (giao diện tiếng Việt) | Chữ trên nút, nhãn, thông báo — brief phải đưa chữ thật, không để Stitch dịch |
| Ghi chú convert của các màn trước | **luôn** | Bài học cấp brief thường chết trong `convert-ghi-chu.md`. Đây là chỗ đọc lại nó |

**Không nạp cả `knowledge/ui/` vào brief.** Chỉ lấy mã quy tắc liên quan loại màn đang làm. Brief phình ra là Stitch bỏ qua phần cuối.

---

## Bước 0 — Vòng 0: ghim màu. Chạy MỘT LẦN cho mỗi dự án

Theo [docs/07 §10b](../../../docs/07-uiux-capability-and-eval.md). Bỏ bước này thì **mỗi màn là một lượt bốc thăm lại ngôn ngữ thị giác** — `generate_screen_from_text` sinh không tất định, và `jira-issue-templates` đã phải đi ngược trích **18 override light + 22 dark** sau khi 6 màn đã dựng xong.

Kiểm trước: `projects/<slug>/04-design/vong-0/GHIM.md` đã có chưa?

- **Có** → đọc `designSystemId`, đi thẳng vào vòng màn.
- **Chưa, nhưng đã có `design-overrides.json`** (ca của `jira-issue-templates`: màu đã trích ngược) → coi như đã chốt màu, chỉ còn **ghim lên project Stitch**: chạy nhánh (4)–(6) dưới đây, ghi `GHIM.md`.
- **Chưa có gì** → chạy đủ 6 nhánh.

1. **Brief phong cách** — mô tả loại sản phẩm, người dùng, mật độ, **không yêu cầu màn nghiệp vụ nào**. Một màn đại diện là đủ.
2. `generate_screen_from_text` → lưu ngay kết quả vào `04-design/vong-0/`.
3. **Trích token màu thật** ra khỏi markup → viết `projects/<slug>/design-overrides.json`, mỗi vai trò kèm `$value`, `$orgValue`, `$reason`. Kế thừa spacing/radius/typography từ org, **chỉ override màu**.
4. **★ DỪNG — người duyệt bảng màu.** Đây là gate, không phải thông báo. Màu là thứ đắt nhất để đổi sau.
5. `upload_design_md` → `create_design_system_from_design_md` → `apply_design_system` lên project Stitch của khách này.
6. Ghi `04-design/vong-0/GHIM.md`: `projectId`, `designSystemId`, ngày ghim, màu seed, lý do lệch khỏi org.

**Ghim gì — đã chốt:** chỉ **màu** (bảng màu · seed · vai trò ngữ nghĩa · cả hai theme). Thả cho Stitch quyết ở từng màn: bo góc · thang chữ · độ nổi · nhịp bố cục. Cái giá đã biết: hình dạng trôi giữa các màn → bù ở **bước chuẩn hoá**, và `DS-03` đếm độ trôi.

---

## Nguyên tắc bắt buộc

1. **Không chạy khi `RequirementSet` chưa `Approved`.** Chưa duyệt thì dừng và báo.
2. **Một màn một prompt.** Ranh giới chính xác đã trả giá ba lần: hỏng khi màn xin thêm **phải chép lại nội dung của màn khác**. Hộp thoại riêng, trạng thái rỗng, trạng thái đang tải → xin thêm được, tốt. Bản tối, bản chỉ xem, bản lỗi vẽ lại cả màn → **Stitch dựng lại từ đầu và lệch hết**. Biến thể loại đó ta **tự dẫn xuất** bằng token, hoặc dùng `edit_screens` trên chính màn đó.
3. **Thứ chỉ ghi ở "ghi chú cho ta" thì Stitch không đọc được.** Brief S1 nhắc `AP-11` ở phần *kiểm* nhưng quên cấm ở phần *dán* → Stitch dùng `opacity-60`, tương phản rơi xuống **2.24:1**. Mọi điều cấm phải nằm trong khối dán.
4. **Ràng buộc âm phải nói thẳng.** Chỗ nào yêu cầu đã **đổi khác mô hình quen thuộc**, Stitch sẽ tự khôi phục về cái nó từng thấy. Bắt buộc có khối `ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY`.
5. **Dữ liệu mẫu là tiếng Việt thật, không phải lorem.** Bắt buộc kèm: chuỗi **cố ý dài nhất có thể gặp**, chữ có **dấu chồng hai tầng** (ề, ộ, ữ), số bản ghi **điển hình và tối đa**. Giao diện đẹp cho tới khi gặp dữ liệu thật.
6. **Không phát minh yêu cầu.** Mọi khối trong brief truy ngược được về một FR hoặc một mã quy tắc. Thứ phải thêm để màn chạy được thì đánh dấu `[BỔ SUNG UX]` ở phần ghi chú.
7. **Không truyền thứ Stitch không thi hành được** (§Truyền gì).
8. **Làm một màn trước rồi mới viết tiếp.** Vòng đầu sẽ lộ ra brief thiếu gì — sửa mẫu rồi mới nhân bản. Không viết cả bộ rồi sửa cả bộ.
9. **Lưu bản chụp về repo dù chạy qua MCP.** `generate_screen_from_text` **không ghi màn vào project Stitch** — kết quả chỉ nằm trong phản hồi, mất là mất luôn, và chạy lại ra bản khác. Bất biến: không có output trôi nổi.
10. **Không convert khi chưa chuẩn hoá và chưa qua UI Eval lần 1 trên chính bản thiết kế.** Một vòng convert đắt hơn nhiều một lần chạy `capture.mjs`.
11. **Không khai số đo hình dạng trong brief.** Xem §Hai loại ràng buộc.

### Hai loại ràng buộc — chỗ dễ bóp chết phần Stitch làm giỏi

Brief S1 vòng đầu dành **40 dòng** cho bố cục khung — `240px`, `64px`, thứ tự từng khối — rồi mới tới dòng *"PHONG CÁCH: tự do sáng tạo"*. Tới đó thì không còn gì để sáng tạo, và kết quả ra phẳng đúng như dự đoán. Đây là vi phạm chính luật *"đặc tả chặt nội dung, thả hoàn toàn hình thức"* ở đầu file.

| Loại | Ví dụ | Xử lý |
|---|---|---|
| **Chở một yêu cầu** | khối tài khoản luôn trong khung nhìn (`RES-12`) · chiều cao dùng được ~900px (`RES-10`) · đúng một nút hành động chính | **giữ** — nhưng viết thành *yêu cầu*, không thành *con số* |
| **Việc của người thiết kế** | chiều rộng thanh bên · chiều cao thanh trên · bo góc · chiều cao dòng bảng · thang chữ | **bỏ khỏi brief** — design system đã quy định |

Số đo hình dạng lặp ở brief vừa thừa vừa chiếm chỗ của phần thật sự quan trọng, và khi hai nơi lệch nhau thì không ai biết nơi nào thắng.

> Ngoại lệ: **chưa chạy Vòng 0** thì brief buộc phải gánh phần này. Có Vòng 0 rồi thì bỏ.

### Khai đủ ba breakpoint, đừng khai một cỡ màn

`RES-03` cam kết **ba** mức — `≥1440`, `1024–1439` (**phổ biến nhất**), `768–1023` — và `measure.mjs` đo `RES-01` ở đúng **1440 / 1280 / 1024**. Brief viết *"màn hình 1440x900"* thì Stitch dựng markup chỉ đúng ở 1440, và bộ đo của chính mình sẽ đánh trượt hai mức còn lại.

Mobile-first **không** áp dụng cho loại sản phẩm này — [responsive-rules.md](../../../knowledge/ui/responsive-rules.md) đã loại tường minh, vì nó tối ưu cho ca hiếm và trả giá bằng mật độ ở ca thường. Đó là quyết định đã cân nhắc, không phải thiếu sót cần sửa.

---

## Quy trình

1. **Kiểm đầu vào** — đọc §Nguồn bắt buộc. `RequirementSet` chưa `Approved` → dừng.
2. **Kiểm Bước 0.** Chưa ghim màu → chạy Vòng 0 trước, kể cả khi người dùng chỉ hỏi một màn.
3. **Chốt danh sách màn và mã màn.** Mã dùng chung cho cả `03-ui-brief/<ma>.md` và `04-design/<ma>/`. Có `UiPrototype` thì đối chiếu từng màn prototype → đi về đâu trong đường ống; màn nào **không** có brief phải ghi rõ.
4. **Xác định pattern trước, component sau.** Pattern quyết định `requiredStates` phải xin thêm.
5. **▶ Vòng làm rõ** — chỉ hỏi thứ requirement và Design System **chưa trả lời** (§Vòng làm rõ).
6. **Viết brief** theo §Template. Hai phần: khối dán, và ghi chú cho ta.
7. **Tự soi brief** theo §Self-check phần *Trước khi gửi*. Đây là lúc rẻ nhất để bắt lỗi.
8. **▶ Chạy Stitch** (§Chạy Stitch) → lưu code + ảnh vào `04-design/<ma>/`.
9. **▶ Chuẩn hoá 4 bước** (§Chuẩn hoá). Ghi mọi thứ đã sửa vào `04-design/<ma>/ghi-chu.md`.
10. **▶ UI Eval lần 1 trên bản thiết kế đã chuẩn hoá** — `node tools/ui-eval/capture.mjs <file.html> <thư-mục-ảnh>`. Lỗi blocking → sửa, chạy lại.
11. **Cập nhật** `03-ui-brief/README.md` (bảng trạng thái), `04-design/README.md`, `PROJECT.md` (bảng artifact + nhật ký).
12. **Trình + dừng chờ người xem** trước khi convert.

---

## ▶ Vòng làm rõ (bước 5)

Dùng **AskUserQuestion**, mỗi lô ≤ 4 câu, mỗi câu 2–4 phương án nêu rõ cái giá, khuyến nghị đặt đầu với hậu tố `(Khuyến nghị)`.

| Trục | Hỏi? |
|---|---|
| Phong cách, bảng màu, sáng/tối | ❌ — đã chốt ở Design Direction gate + Vòng 0 |
| Tách màn thế nào (một màn hay hai) | ✅ **hỏi** — quyết định kiến trúc màn hình, đắt để làm lại |
| Dữ liệu mẫu lấy ở đâu | ✅ **hỏi** khi requirement không có ví dụ thật. Dữ liệu bịa làm hỏng chính mục đích của brief |
| Số bản ghi điển hình / tối đa | ✅ **hỏi** nếu requirement không nói — nó quyết định mật độ và phân trang |
| Hành động nào là chính trên màn | ✅ hỏi khi FR liệt kê nhiều hành động ngang nhau |
| Chữ trên nút, nhãn cột, thứ tự field | ❌ — chọn theo `microcopy-vi.md`, sửa lúc review |

Lọc theo đúng 3 câu của `analyze-idea`: *có đổi việc mình làm không / tự tra được không / sai có sửa rẻ không*.

---

## Truyền gì cho Stitch, và **không** truyền gì

Rút từ sáu vòng thật.

| Truyền | Không truyền |
|---|---|
| Màn này phục vụ việc gì, **việc chính là gì** | Token JSON — Stitch không thi hành được, chỉ làm phình context |
| Dữ liệu hiển thị + giá trị mẫu tiếng Việt thật | Tên component của mình (`ui.component.data-table`) — Stitch không biết và sẽ bịa |
| Hành động: chính / phụ / theo hàng | Kiến trúc, tech stack, lịch sử quyết định |
| **Khối ràng buộc âm** | Yêu cầu bản tối, hoặc biến thể phải chép lại nội dung màn khác |
| Anti-pattern rút gọn — **ở phần dán** | Phong cách chi tiết — đã ghim ở Vòng 0 |
| Nền tảng, ngôn ngữ, mật độ, kích thước màn hình đích | Mã màu cụ thể — trừ khi Vòng 0 chưa chạy được |

---

## Template — `03-ui-brief/<ma>.md`

````markdown
# Brief — <Mã> · <Tên màn>

- **Sinh từ:** [01-requirements.md](../01-requirements.md) v<n> — FR-xx, FR-yy
- **Ngày:** <yyyy-mm-dd>
- **Màu đã ghim:** [vong-0/GHIM.md](../04-design/vong-0/GHIM.md) · `designSystemId: <id>`

---

## Phần dán vào Stitch

> Copy nguyên khối dưới đây.

```text
Thiết kế một màn hình web cho <loại sản phẩm>.

BỐI CẢNH
<sản phẩm làm gì, ai dùng, dùng bao nhiêu lần một ngày>
Chạy trên máy tính bàn/laptop. Phải dùng tốt ở BA mức rộng: từ 1440px trở lên,
1024-1439px (phổ biến nhất, laptop 13-14 inch), và 768-1023px (chấp nhận giảm
tiện nghi). Dưới 768px không cần. Chiều cao dùng được khoảng 900px.
Toàn bộ giao diện bằng TIẾNG VIỆT.

VIỆC CHÍNH CỦA MÀN HÌNH NÀY
<một việc thôi — phần lớn lần vào màn là để làm việc đó. Nói rõ hệ quả:
thứ phục vụ việc đó phải nổi bật>

ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY
<ràng buộc âm, lấy từ tiêu chí chấp nhận có chữ "không". Nói rõ việc kia
để người dùng làm ở đâu>

KHUNG ỨNG DỤNG — NÊU YÊU CẦU, KHÔNG NÊU SỐ ĐO
<những thứ PHẢI có và PHẢI đúng, viết thành yêu cầu:
 - thanh bên chứa gì, mục nào đang chọn
 - khối tài khoản ở đáy thanh bên, LUÔN trong khung nhìn dù trang dài bao nhiêu
 - thanh trên có tiêu đề màn và đúng MỘT nút hành động chính
 - những thứ KHÔNG có: ô tìm kiếm toàn cục, chuông thông báo, nút trợ giúp, avatar
Chiều rộng thanh bên, chiều cao thanh trên, bo góc, chiều cao dòng: ĐỪNG khai —
design system đã quy định, và đó là phần công cụ thiết kế làm tốt hơn ta>

DỮ LIỆU — <tên khối> (dùng đúng những dòng này)
<liệt kê từng bản ghi bằng dữ liệu tiếng Việt thật, đánh số>
<ít nhất một dòng CỐ Ý dài, ghi chú "để kiểm tra chỗ tràn chữ">
<ít nhất một dòng có ô trống, để xem có xử lý được không>

HÀNH ĐỘNG
- Hành động chính: <...>
- Theo dòng: <...> — chỉ với ca <...>

MÀN HÌNH PHỤ CẦN THIẾT KẾ THÊM
<chỉ những trạng thái có nội dung RIÊNG: rỗng, đang tải, tạo xong.
KHÔNG xin bản tối / bản chỉ xem / bản lỗi vẽ lại cả màn>

CHẾ ĐỘ HIỂN THỊ
CHỈ thiết kế giao diện sáng. Không cần làm giao diện tối.

MẬT ĐỘ
<ưu tiên xem nhiều dòng cùng lúc, hay ưu tiên thoáng — nói rõ vì sao>

KHÔNG ĐƯỢC LÀM (đây là công cụ nội bộ, không phải trang giới thiệu)
- Không gradient làm nền cho vùng có chữ
- Không ảnh bìa lớn, không khối hero
- Không animation trang trí
- Không dùng thẻ (card) chỉ để nhóm hai dòng chữ
- Không giấu hành động chính trong menu ba chấm
- Không để hành động của một dòng chỉ hiện khi rê chuột — phải hiện thường trực
- Không dùng màu làm tín hiệu duy nhất — luôn kèm chữ hoặc biểu tượng
- Không dùng độ mờ (opacity) để thể hiện trạng thái không dùng được
- Không viết hoa toàn bộ cụm quá 3 từ, kể cả tiêu đề cột trong bảng
- Không đặt nhãn ô nhập vào bên trong ô rồi để nó biến mất khi gõ
- Không tự rút ngắn chuỗi dữ liệu ở trên — giữ nguyên văn, cho xuống dòng nếu chật
- Không dùng ô chọn ngày mặc định của trình duyệt cho khoảng ngày

THÀNH PHẦN GIAO DIỆN ĐƯỢC DÙNG
Bảng, nút (chính/viền/mờ), nhãn trạng thái, ô nhập, ô chọn, hộp kiểm, công tắc,
tab, hộp thoại, menu thả xuống, thanh bên, thanh trên, dải thông báo.
Nếu cần một thành phần khác, hãy ghi chú lại — đừng tự thêm loại mới.

PHONG CÁCH
Tự do sáng tạo. Miễn là hợp với <loại sản phẩm> dùng hằng ngày.
```

---

## Ghi chú cho ta — không dán vào Stitch

### Map về yêu cầu

| Phần trong brief | FR / mã quy tắc |
|---|---|

### Vì sao có khối ràng buộc âm

<chỉ ra tiêu chí chấp nhận nào sinh ra nó, và vì sao Stitch dễ vi phạm chỗ đó>

### Nhận bản thiết kế về thì kiểm gì

1. <ràng buộc âm có bị phá không — kiểm đầu tiên>
2. <các ca nghiệp vụ có phân biệt được không>
3. Chuỗi cố ý dài có bị **viết cụt ngay trong markup** không (kiểm cả text lẫn `title`)
4. Dòng thiếu dữ liệu có được xử lý không
5. Khối tài khoản ở đáy thanh bên có trong khung nhìn không (`RES-12`)
6. Thanh bên có tự mọc nút không
7. Có vi phạm mục nào trong "không được làm" không
````

---

## ▶ Chạy Stitch (bước 8)

**Có khoá** (`.mcp.json` có `STITCH_API_KEY`, server `stitch` hiện trong `/mcp`):

1. `generate_screen_from_text` với **đúng khối dán**, kèm `designSystemId` từ `GHIM.md`.
2. `get_screen` lấy code + ảnh.
3. Lưu ngay vào `04-design/<ma>/`: `code.html`, `sang.png`, và một file cho mỗi trạng thái phụ. Bản gốc chưa sửa cất ở `04-design/goc-stitch/` làm mốc.
4. Cần sửa nhỏ → `edit_screens` trên chính màn đó, **không** sinh lại từ prompt (sinh lại là bốc thăm lại).

**Không có khoá:** in khối dán ra chat, hướng dẫn người dùng dán vào Stitch và thả kết quả vào `04-design/<ma>/`. Nói rõ cần **cả mã nguồn lẫn ảnh** — thiếu mã nguồn thì phải đoán giá trị từ ảnh, thiếu ảnh thì mất judge lớp 2.

---

## ▶ Chuẩn hoá (bước 9) — bốn bước, có tên, có máy kiểm

Sáu vòng cho thấy luôn có một bước ở giữa, và nó lặp lại có quy luật. Để "convert tự xử" nghĩa là mỗi vòng phát hiện lại cùng ba lỗi.

| Bước | Làm gì | Công cụ |
|---|---|---|
| 1 | **Quét luật cấm** — `opacity` giấu hành động · `uppercase` · hex thô · nút bị cấm | `node tools/ui-eval/quet-nguon.mjs <thư-mục>` |
| 2 | **Đối chiếu dữ liệu** — chuỗi trong markup phải **bằng** chuỗi trong brief | đọc tay, đây là chỗ bắt viết cụt |
| 3 | **Ánh xạ hình dạng** — `rounded-[7px]` → `radius.md`, `text-[15px]` → `body-lg` | theo `design-system/tokens/` |
| 4 | **Ghi `DS-03`** — đếm độ lệch hình dạng, **không chặn** | ghi vào `ghi-chu.md` |

Ba lỗi lặp nhiều nhất, kiểm bằng mắt kể cả khi script báo sạch:

| Stitch làm sai | Đã lặp |
|---|---|
| `opacity-0 group-hover` giấu hành động theo dòng (đo ra 1.0:1) | **3 lần** |
| Viết cụt chuỗi dài ngay trong markup — đổi dữ liệu âm thầm | **3 lần** |
| Tự mọc nút ở thanh bên dù đã cấm tường minh | **3 lần** |

`quet-nguon.mjs` từng **trượt biến thể `group-hover/link:`** và phải sửa tay. Script là trợ thủ, không phải bảo chứng.

---

## Bài học cấp brief — đọc lại mỗi vòng

Chỗ này tồn tại vì bài học hay chết trong `convert-ghi-chu.md` mà không ai đọc lại khi viết brief kế tiếp. Cạnh `refines` của vòng UI có **ba đích**:

| Bài học thuộc loại | Ghi về đâu |
|---|---|
| Cách hỏi Stitch | `03-ui-brief/README.md` |
| Luật chuẩn hoá | `quet-nguon.mjs` + `04-design/QUYET-DINH.md` |
| Quy tắc thiết kế | `knowledge/ui/` — **qua người**, AI chỉ được đề xuất |

> **Bất biến:** AI **không** tự ghi vào `knowledge/ui/`.

Đang có hiệu lực:

- **Ô ngày gốc trình duyệt vẽ theo locale của trình duyệt, không theo `lang` của trang** — máy en-US hiện `08/04/2026` cho ngày 04/08. Đừng xin bộ lọc khoảng ngày dựa vào ô ngày mặc định; xin ô có nhãn ghi rõ định dạng, hoặc bù bằng caption ghi lại khoảng ngày.
- **Đừng xin giao diện tối.** Hai lượt sinh độc lập thì không gì buộc chúng khớp nhau — S1 trả về bản tối lệch hẳn cột và thiếu cột thao tác. Bản tối ta tự dựng bằng token, markup dùng chung nên không bao giờ lệch.
- **Stitch bỏ sót được cả một yêu cầu** (bộ chọn dự án ở S1) và bản `QUYET-DINH` đúc từ chính nó **kế thừa luôn chỗ sót**. Đối chiếu ngược brief ↔ markup từng khối, đừng đọc lướt.

---

## Self-check

**Trước khi gửi cho Stitch**
- [ ] `RequirementSet` là `Approved`; Vòng 0 đã chạy hoặc màu đã ghim.
- [ ] Mọi tiêu chí chấp nhận của FR mà màn này phục vụ đều **diễn đạt được** trong khối dán.
- [ ] Mọi điều cấm nằm **trong khối dán**, không nằm ở ghi chú.
- [ ] Có khối `ĐIỀU TUYỆT ĐỐI KHÔNG ĐƯA VÀO MÀN NÀY`, và nó bám vào một tiêu chí thật.
- [ ] Dữ liệu mẫu là tiếng Việt thật, có **chuỗi cố ý dài**, có **dấu chồng hai tầng**, có **ô trống**.
- [ ] Màn xin thêm **không** phải chép lại nội dung màn khác.
- [ ] Không xin bản tối. Không truyền token JSON, tên component nội bộ, hay tech stack.
- [ ] Số bản ghi điển hình và tối đa đã nêu.

**Sau khi nhận bản thiết kế**
- [ ] Code **và** ảnh đều đã lưu vào `04-design/<ma>/`; bản gốc chưa sửa cất ở `goc-stitch/`.
- [ ] Đã chạy `quet-nguon.mjs`; 0 vi phạm `AP-11`, `AP-11b`, `DS-01`.
- [ ] Đã đối chiếu **từng chuỗi** markup với brief — không có chỗ nào bị viết cụt.
- [ ] Đã đối chiếu **từng khối** brief với markup — không có yêu cầu nào bị bỏ sót.
- [ ] Thanh bên không mọc nút; hành động theo dòng hiện thường trực.
- [ ] `capture.mjs` đã chạy trên bản đã chuẩn hoá; lỗi blocking đã sửa.
- [ ] `ghi-chu.md` ghi đủ: đã sửa gì, `DS-03` bao nhiêu, bài học thuộc loại nào đi về đâu.
- [ ] `03-ui-brief/README.md`, `04-design/README.md`, `PROJECT.md` đã cập nhật.

---

## Sau khi xong

Tóm tắt: *màn nào, phủ FR nào, Stitch vi phạm mấy điều đã cấm, chuẩn hoá sửa những gì, `capture.mjs` ra sao, `DS-03` bao nhiêu*. Kèm ảnh so sánh nếu có.

Rồi **dừng** — hỏi người dùng muốn (a) sửa brief và sinh lại màn này, (b) đi tiếp sang convert Vue, hay (c) viết brief cho màn kế tiếp.
