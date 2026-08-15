# Vòng 0 — ghim ngôn ngữ thị giác

> **Trạng thái: `Đã ghim` — bản v3, trích từ TailAdmin. 13/08/2026.**
>
> **Design system dùng để sinh màn: `assets/0bb7f9a42b31406c889693eb34ce12b0`** — *Jira Automation Admin*
> Nguồn: [DESIGN-v3-tailadmin.md](DESIGN-v3-tailadmin.md) · xem màu: [bang-mau.html](bang-mau.html)
>
> Hai bản trước đã bỏ, giữ lại làm mốc: `assets/9fba9b…` (v1) và `assets/e00e946…` (v2, [DESIGN-da-sua.md](DESIGN-da-sua.md)).

## Vòng 0 lần 3 — đổi hẳn cách làm: trích từ nguồn thật, không để Stitch phát minh

Người dùng phản hồi *"kết quả vẫn hơi thô, muốn theo phong cách admin hiện đại như TailAdmin,
PrimeVue"* rồi đưa link [vue-demo.tailadmin.com](https://vue-demo.tailadmin.com/).

**Có nguồn tham chiếu thật thì Vòng 0 đổi bản chất.** Không còn là *"để Stitch tự nghĩ rồi ta
trích màu"* mà thành *"đo nguồn thật rồi viết thẳng design system"*. Đúng nguyên tắc đã ghi
trong [make-prototype](../../../../.claude/skills/make-prototype/SKILL.md): *"Bám nguồn thật
luôn tốt hơn chọn từ menu của mình."* Bỏ luôn được nút thắt timeout, vì không cần gọi
`generate_screen_from_text` lần nào.

Công cụ mới: [`tools/ui-eval/do-tham-chieu.mjs`](../../../../tools/ui-eval/README.md) — mở
trang tham chiếu bằng Playwright, chụp ở 4 mức rộng, rút computed style của thẻ, nút, dòng
bảng, nhãn, và đếm mọi giá trị bo góc / đổ bóng / font đang thực sự dùng.

**Vì sao phải đo chứ không đọc tài liệu:** tài liệu TailAdmin công bố **bảng màu** đầy đủ,
nhưng không có một dòng nào về bo góc, đổ bóng, chiều cao dòng, hay chữ. Mà đó mới là thứ làm
nên diện mạo. Đo mới ra: chữ **Outfit** (605/606 phần tử), thẻ **bo 16px** đệm 24px, nền trang
`#F9FAFB`, thanh bên trắng **290px**, nhãn dạng **pill**.

### Phát hiện đáng giá nhất: "cấm đổ bóng" hoá ra không sai

Vòng 1–2 cấm đổ bóng, và tôi từng cho đó là nguyên nhân trông thô. Đo ra thì TailAdmin **cũng
gần như không dùng bóng** — chỉ 5 phần tử, `0 1px 2px rgba(16,24,40,.05)`. Nó tách lớp bằng
**thẻ trắng bo 16px trên nền xám**. Thứ ta thiếu là *thẻ* và *bo góc lớn*, không phải bóng.

### TailAdmin tự nó trượt 6 cặp AA

| Cặp | Đo | |
|---|---|---|
| `success-600` trên `success-50` | 3.54 | ❌ |
| `warning-600` trên `warning-50` | 3.34 | ❌ |
| `blue-light-600` trên `blue-light-50` | 3.75 | ❌ |
| `error-600` trên `error-50` | 4.44 | ❌ |
| `gray-400` làm chữ phụ | 2.58 | ❌ |
| `gray-300` làm viền ô nhập | **1.47** | ❌ |

Dòng cuối **đúng y hệt lỗi ta vừa sửa ở vòng 2**. Hai nguồn độc lập cùng dẫm một chỗ — đủ để
kết luận: **vẻ nhẹ nhàng của dòng admin template một phần đến từ viền gần như vô hình**, và
đây là chỗ phải kiểm mỗi khi bám một template ngoài.

Cách chữa giữ nguyên diện mạo: nền `-50` giữ nguyên, chữ đẩy từ bậc 600 lên **700** → 5.13–6.05.
Viền dùng `#828D9F` (3.35 trên trắng, 3.21 trên nền xám). Chữ phụ dùng `gray-500 #667085` (4.97).

**Kết quả: 19/19 cặp đạt.**

### Hai chỗ cố ý đi khác template — người quyết

| | TailAdmin | Ta | Vì sao |
|---|---|---|---|
| Dòng bảng | 75px, chữ 16px | **44px, chữ 14px** | 900px chiều cao cho **12 dòng** thay vì 7. Sản phẩm này là công cụ bảng |
| Thanh trên | tìm kiếm toàn cục · chuông · avatar | **chỉ nút theme + avatar** | Hai thứ bỏ đi đều kéo theo yêu cầu mới mà chưa FR nào đòi |

Lưu ý đọc số: 75px đo ở bảng trong **trang dashboard** của demo; trang *Tables* riêng của họ
chưa đo.

### `[BỔ SUNG UX]` đi kèm hướng này

Dải **4 ô thống kê** đầu trang là đặc trưng của dòng template, **không FR nào đòi**, và brief
vòng trước còn cấm tường minh. Vẫn dựng, nhưng đánh dấu `[BỔ SUNG UX]` ở bảng map của từng
brief để thành ứng viên cho `RequirementSet` v4.

- **Ngày chạy:** 2026-08-13 · hai vòng
- **Brief dùng:** [03-ui-brief-v2/vong-0-phong-cach.md](../../03-ui-brief-v2/vong-0-phong-cach.md)
- **Project Stitch:** `8915115124044208786` — *Jira Issue Templates — thiết kế lại v2*
- **Xem bảng màu:** [bang-mau.html](bang-mau.html) — mở bằng double-click, hoặc bản đã publish
- **Bản lưu:** [DESIGN.md](DESIGN.md) — vòng 1. Vòng 2 nằm trong `assets/8be2090c…`, chưa chép về file riêng.

| Vòng | Asset | Kết quả |
|---|---|---|
| 1 | `assets/9fba9b1063be4438b27bafdeec52da7a` | 4 vai trò ngữ nghĩa · thiếu `success`/`warning` · văn xuôi mâu thuẫn YAML |
| **2** | `assets/8be2090c4415460082578f3cbb6bf36a` | **6 vai trò** · văn xuôi khớp YAML · bỏ sọc kẻ dòng · **viền tụt xuống 1.47:1** |

## Vấn đề vận hành: `generate_screen_from_text` luôn timeout

Ba lần gọi, ba lần timeout ở phía client MCP (~3 phút). Đổi `GEMINI_3_1_PRO` → `GEMINI_3_FLASH`
**không giúp** — nên timeout không phải do model chậm mà là trần của client.

Hệ quả khác nhau cho hai loại đầu ra, và đây là chỗ tôi chẩn đoán sai lần đầu:

| Đầu ra | Có sống sót qua timeout không | Vì sao |
|---|---|---|
| **Design system** | ✅ có | là trạng thái cấp project, server ghi vào `designTheme` |
| **Màn hình** | ❌ mất | [QĐ5](../../04-design/QUYET-DINH.md) đã ghi: `generate_screen_from_text` **không ghi màn vào project**, kết quả chỉ nằm trong phản hồi |

> **Sửa chẩn đoán.** Bản đầu của file này kết luận *"`projectType: PROJECT_DESIGN` không sinh
> được màn hình"*, dựa trên việc `list_screens` trả về rỗng. Sai. Màn sinh qua MCP **chưa bao
> giờ** xuất hiện trong `list_screens` — kể cả ở project `TEXT_TO_UI_PRO` của vòng v1, nơi 5
> trong 7 màn cũng chỉ tồn tại trong repo. `list_screens` rỗng là điều bình thường, không phải
> triệu chứng. Nguyên nhân thật đơn giản hơn: **timeout thì mất luôn phản hồi, mà phản hồi là
> nơi duy nhất chứa màn.**

Chưa có cách đi vòng. Ba hướng chưa thử: rút ngắn prompt, `GEMINI_3_FLASH` với brief gọn hơn
nhiều, hoặc dán brief vào giao diện web Stitch rồi `get_screen` đọc về — đường này chắc chắn
chạy vì `get_screen` là lời gọi đọc, nhanh, không timeout.

## Bảng màu vòng 2 — Stitch tự chọn

Brief **không gợi ý một mã màu nào**. Số đo đầy đủ ở [bang-mau.html](bang-mau.html).

| Vai trò | đặc | on- | container | on-container | container đạt |
|---|---|---|---|---|---|
| `primary` | `#0052CC` | `#FFFFFF` | `#D6E4FF` | `#001D4D` | 12.78 |
| `secondary` | `#4B5563` | `#FFFFFF` | `#F1F3F9` | `#1F2937` | 13.23 |
| `info` | `#0284C7` | `#FFFFFF` | `#E0F2FE` | `#075985` | 6.59 |
| `success` | `#16A34A` | `#FFFFFF` | `#DCFCE7` | `#166534` | 6.49 |
| `warning` | `#D97706` | `#FFFFFF` | `#FEF3C7` | `#92400E` | 6.37 |
| `error` | `#DC2626` | `#FFFFFF` | `#FEE2E2` | `#991B1B` | 6.80 |

Bốn màu đặc `info`/`success`/`warning`/`error` là **đúng bộ mặc định của Tailwind**
(`sky-600`, `green-600`, `amber-600`, `red-600`), container là `-100`, on-container là `-800`.
Stitch không tự pha màu mới mà lấy một bộ đã có sẵn — đổi lại thì bốn nhãn phân biệt rõ và
mọi cặp container đều đạt AA thoải mái.

`primary` vẫn ra `#0052CC`, **đúng Jira Blue**, dù brief không nhắc chữ "Jira" một lần nào.
Vòng 1 cũng vậy. Hai lần độc lập cùng hội tụ về một màu.

## Ba điều phải xử trước khi ghim

**1. Chữ trắng trên ba màu đặc không đọc được.** `on-info` 4.10 · `on-success` 3.30 ·
`on-warning` 3.19 — đều dưới 4.5. Bộ Tailwind ở bậc 600 vốn không thiết kế để đi với chữ
trắng. Chỉ ảnh hưởng nút và nhãn nền đặc; nhãn dạng container — thứ thực sự dùng ở bảng dữ
liệu — đều đạt.

**2. Viền tụt xuống gần như vô hình, và đây là bước lùi so với vòng 1.**

| | vòng 1 | vòng 2 |
|---|---|---|
| `outline` trên nền | `#737685` — **4.30:1** | `#D1D5DB` — **1.47:1** |
| `outline-variant` | `#c3c6d6` — 1.62:1 | `#E5E7EB` — 1.24:1 |
| phân lớp nền | — | `#F1F3F9` trên `#FFFFFF` — **1.11:1** |

WCAG 2.2 mục **1.4.11** đòi 3:1 cho viền của thành phần giao diện cần nhận ra được — viền ô
nhập nằm trong nhóm đó, nên đây là lỗi a11y thật chứ không phải chuyện thẩm mỹ. Nặng hơn vì
chính design system này tuyên bố *"box shadows strictly prohibited"* và phân lớp bằng nền:
toàn bộ chiến lược chiều sâu đang dựa vào khác biệt mắt gần như không thấy.

**3. Một vai trò, hai giá trị, trong cùng một object.** Khối `namedColors` giữ **cả** khoá
gạch ngang mới **lẫn** khoá gạch dưới cũ:

```
primary-container: #D6E4FF     primary_container: #0052CC
error-container:   #FEE2E2     error_container:   #FFDAD6
outline:           #D1D5DB     outline_variant:   #C3C6D6
```

Công cụ nào đọc theo khoá gạch dưới sẽ lấy nguyên bảng màu vòng 1. Phải chuẩn hoá về một kiểu
khoá trước khi `apply_design_system`.

## Điều làm đúng — đáng giữ thành luật

Brief phong cách có khối "KHÔNG ĐƯỢC LÀM", và Stitch **hấp thụ nó vào chính design system**
thay vì chỉ tuân thủ ở một màn:

| Điều brief cấm | Câu Stitch tự viết vào `DESIGN.md` |
|---|---|
| Không viết hoa cụm quá 3 từ | *"Never use uppercase … significantly degrades the readability of Vietnamese accents"* |
| Hành động không được chỉ hiện khi rê chuột | *"Do not use hover-only visibility for action triggers"* |
| Không đặt nhãn vào trong ô nhập | *"Labels must always be placed above the input field"* |
| Không dùng màu làm tín hiệu duy nhất | *"Color is never the sole signal"* |

Đối chiếu: bản `Nexus Enterprise` đang ghim ở project vòng v1 lại dặn **dùng ALL CAPS cho tiêu
đề cột** — thứ brief cấm và [QĐ2](../../04-design/QUYET-DINH.md) phải đi sửa tay ở từng màn.

**Đây là kết quả kiểm chứng rõ nhất tới lúc này:** chuyển danh sách cấm từ *brief từng màn* lên
*Vòng 0* biến nó từ yêu cầu phải lặp lại 7 lần thành luật của cả hệ thống.

## Hai lần Stitch tự nhận đạt WCAG mà không đạt

Vòng 1: *"adhering to WCAG AA contrast standards"*. Vòng 2: *"adhering to WCAG 2.2 AA contrast
standards (minimum 4.5:1 for standard text)"* — trong khi ba cặp `on-*` trượt. Vòng 2 còn được
dặn tường minh *"Hãy tự kiểm tra từng cặp trước khi trả lời"* và vẫn sai.

**Rút ra:** lời tự nhận về tương phản trong `DESIGN.md` không có giá trị, phải đo lại 100%.
Đây là quy tắc cấp brief, đã ghi vào skill.

## Ba lỗi đã sửa thế nào — chọn mức đạt ngưỡng mà lệch ít nhất

Không tự nghĩ màu. Với mỗi lỗi, dò thang màu rồi lấy **bậc đầu tiên đạt ngưỡng**.

| Vai trò | Stitch chọn | Đo | Sửa thành | Đo lại |
|---|---|---|---|---|
| `info` | `#0284C7` | 4.10 ❌ | **`#0369A1`** | **5.93** ✅ |
| `success` | `#16A34A` | 3.30 ❌ | **`#15803D`** | **5.02** ✅ |
| `warning` | `#D97706` | 3.19 ❌ | **`#B45309`** | **5.02** ✅ |
| `error` | `#DC2626` | 4.83 ✅ | giữ nguyên | 4.83 |

Cả ba đều lùi đúng **một bậc** trên thang Tailwind (600 → 700), nên giữ nguyên sắc độ; chỉ
đậm thêm vừa đủ để chữ trắng đọc được.

Viền — dò từ nhạt tới đậm, lấy giá trị nhạt nhất đạt 3:1 trên **cả hai** nền mà một ô nhập
có thể nằm lên:

| Ứng viên | trên `#FFFFFF` | trên `#F1F3F9` | |
|---|---|---|---|
| `#D1D5DB` (Stitch chọn) | 1.47 | 1.32 | ❌ |
| `#8B939F` | 3.10 | 2.80 | ❌ chỉ đạt trên trắng |
| `#868E9B` | 3.30 | 2.98 | ❌ sát mà vẫn thiếu |
| **`#828A97`** | **3.48** | **3.14** | ✅ **chọn** |
| `#737685` (vòng 1) | 4.51 | 4.06 | đạt, nhưng đậm hơn mức cần |

`outline-variant` → **`#CFD5DC`** (1.48) cho kẻ dòng bảng. Không phải đích của mục 1.4.11 vì
nó ngăn cách chứ không định danh điều khiển — nhưng `#E5E7EB` ở 1.24 thì mắt gần như không
thấy, tức đường kẻ không làm được việc của nó.

`namedColors` hai kiểu khoá: gỡ bằng cách **viết lại `DESIGN.md` từ đầu** với đúng một kiểu
khoá gạch ngang, thay vì sửa vá lên bản Stitch phát ra.

## Đã ghim

```
DESIGN-da-sua.md
   → upload_design_md          → screen instance 16233873269240216377
   → create_design_system_…    → assets/e00e94624f81454b823a5185e17b170b
```

`apply_design_system` **chưa gọi** — nó áp design system lên *các màn đã có*, mà project chưa
có màn nào. Sẽ gọi sau khi sinh xong màn, hoặc bỏ qua nếu lúc sinh đã chọn đúng design system.

> **Chưa đối chiếu lại giá trị Stitch lưu.** `create_design_system_from_design_md` có thể
> tự dẫn xuất thêm token. Kiểm khi màn đầu tiên về: nếu markup dùng `#0284C7` thay vì
> `#0369A1` thì Stitch đã ghi đè, và phải quay lại bước này.

## Còn phải làm

| # | Việc | Ai quyết |
|---|---|---|
| 1 | ~~Duyệt bảng màu~~ · ~~sửa ba lỗi~~ · ~~ghim~~ | ✅ xong 13/08 |
| 2 | Dẫn xuất bảng màu **tối** — brief chỉ xin bản sáng | — |
| 3 | Đối chiếu giá trị Stitch thực lưu khi màn đầu tiên về | — |
| 4 | `design-overrides-v2.json` — so từng vai trò với bộ org | — |
