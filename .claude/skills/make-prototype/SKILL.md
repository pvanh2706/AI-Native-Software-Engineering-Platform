---
name: make-prototype
description: Biến RequirementSet đã duyệt thành UiPrototype — bản HTML clickable chạy được offline + bảng map requirement ↔ màn hình. Dùng sau khi gate Analysis đã qua, để khách hàng/senior nhìn thấy sản phẩm và bắt sai yêu cầu TRƯỚC khi code.
---

# Skill: Dựng prototype (make-prototype)

Capability ở giai đoạn *Prototype*. Contract theo [docs/02](../../../docs/02-capability-and-artifact.md):

| | |
|---|---|
| **Stage** | Prototype |
| **Input (requires)** | `RequirementSet` **Approved** · `DesignSystem` (nếu repo đã có) |
| **Input (optional)** | `OpenQuestions`, `Answers`, `DomainModel` |
| **Knowledge (bắt buộc nạp)** | `knowledge/ui/` — xem §Nguồn bắt buộc |
| **Output (produces)** | `UiPrototype` — HTML clickable + map req↔screen |
| **Cạnh truy vết** | `RequirementSet --realizedBy--> UiPrototype` · `DesignSystem --informs--> UiPrototype` |
| **Gate** | Human review bắt buộc, **sau khi UI Eval lớp 1 đã PASS** |

Mục đích thật của prototype: **bắt sai yêu cầu trước khi code**. Không phải để đẹp. Một prototype đẹp mà không soi ra được chỗ nào sai là prototype thất bại.

---

## Nguồn bắt buộc — đọc TRƯỚC khi dựng

Đây là ranh giới giữa "có tài sản" và "dùng tài sản". Bỏ bước này thì skill quay về tự phát minh, và mọi thứ đã xây thành đồ trang trí.

| Nguồn | Khi nào | Làm gì |
|---|---|---|
| `design-system/README.md` | **luôn**, việc đầu tiên | Xác định có Design System không, trạng thái gì, phong cách đã chốt là gì |
| `node tools/design-tokens/build-css.mjs` | khi có Design System | **Chạy lệnh** để sinh khối token CSS. Dán nguyên vào `<style>`. **Cấm tự gõ giá trị màu.** |
| `knowledge/ui/README.md` + `design-principles.md` + `anti-patterns.md` | **luôn** | Nạp toàn bộ. Đây là căn cứ chung cho mọi màn hình |
| `knowledge/ui/<theo loại màn>` | theo màn định dựng | Có biểu mẫu → `form-guidelines.md`. Có bảng → `table-guidelines.md`. Luôn đọc `state-guidelines.md` và `accessibility.md` |
| `knowledge/ui/microcopy-vi.md` | khi giao diện tiếng Việt | Chữ trên nút, nhãn, thông báo lỗi |
| `knowledge/ui/layout-and-density.md` + `visual-language.md` | **luôn** | Mật độ, căn chỉnh, dùng cấp chữ và vai trò màu nào |

**Không đọc `design-system/tokens/*.json` để chép giá trị bằng tay.** Chạy bộ sinh. Chép tay là chỗ token và giao diện bắt đầu lệch nhau mà không ai biết.

---

## Nguyên tắc bắt buộc

0. **Có Design System thì bám Design System.** Không tự chọn màu, cỡ chữ, bo góc, khoảng cách. Mọi giá trị thị giác đến từ token sinh ra bằng lệnh. Cần một giá trị chưa có trong token → **dừng và hỏi**, đó là đề nghị mở rộng hệ thống, thuộc thẩm quyền người dùng.
1. **Không chạy khi RequirementSet chưa Approved.** Chưa duyệt thì dừng và báo — dựng prototype trên yêu cầu chưa chốt là làm lại hai lần.
2. **Không phát minh yêu cầu.** Prototype chỉ hiện thực hóa FR đã có. Cần thêm gì để màn hình chạy được thì đánh dấu **[BỔ SUNG UX]** trong map và nêu ra khi trình — đó là ứng viên cho RequirementSet phiên bản sau.
3. **Phủ hết FR Must.** FR Must nào không lên được màn hình phải ghi rõ **vì sao** trong map, không im lặng bỏ qua.
4. **Clickable thật, không phải ảnh.** Các luồng chính bấm đi được từ đầu tới cuối. Màn hình tĩnh chỉ chấp nhận cho phần phụ, và phải ghi rõ.
5. **Một file HTML tự chứa.** Không CDN, không tải font/script ngoài — mở bằng double-click là chạy, gửi qua chat/email được. CSS/JS inline.
6. **Nói rõ đâu là giả.** Mọi dữ liệu là mẫu tĩnh; không gọi API thật. Ghi rõ ở màn hình và trong map.
7. **Dừng chờ review** sau khi ghi file — gate Prototype.
8. **Không trình khi UI Eval lớp 1 chưa PASS.** Trình một prototype còn lỗi blocking là đẩy việc rà máy làm được sang cho người.

## Quy trình

1. **Kiểm điều kiện đầu vào.** Đọc `PROJECT.md` + `01-requirements.md`. Chưa `Approved` → dừng, báo người dùng.
2. **Đọc kỹ toàn bộ FR/NFR + `01-answers.md`.** Quyết định đã chốt là ràng buộc thiết kế, không phải gợi ý — ví dụ "≤ 3 lần bấm" phải đếm được trên prototype.
3. **▶ Nạp nguồn bắt buộc** (§Nguồn bắt buộc). Chạy `node tools/design-tokens/build-css.mjs`, giữ output để dán vào bước 6.
4. **Lập danh sách màn hình** và ánh xạ ngược về FR. Màn hình không phục vụ FR nào → bỏ. Với mỗi màn, xác định **pattern** trước rồi mới tới component ([docs/07 §10 Lớp 0](../../../docs/07-uiux-capability-and-eval.md)); pattern quyết định `requiredStates` phải dựng.
5. **▶ Vòng làm rõ UX** — chỉ hỏi thứ **chưa được Design System trả lời** (§Vòng làm rõ).
6. **Dựng `index.html`** — dán khối token sinh ở bước 3, dùng **tên vai trò**, không gõ giá trị.
7. **▶ Chạy UI Eval lớp 1** — `node tools/ui-eval/capture.mjs <index.html> <thư-mục-ảnh>`. Lỗi blocking → sửa, chạy lại. **Lặp tới khi sạch.**
8. **▶ Tự soi ảnh chụp theo `anti-patterns.md`.** Đây là lớp 2 làm thủ công. Mỗi vi phạm ghi mã quy tắc. Nghiêm trọng → sửa trước khi trình.
9. **Viết `README.md`** của prototype: map req↔screen, luồng chính, chỗ giả, chỗ [BỔ SUNG UX], **kèm kết quả eval**.
10. **Tự kiểm** theo checklist.
11. **Trình + dừng chờ review**, kèm hướng dẫn mở file và tóm tắt eval.

## ▶ Vòng làm rõ UX (bước 5)

### Hỏi ít đi khi đã có Design System

Bảng này quyết định hỏi gì. **Có Design System `Approved` thì 3 trong 4 trục đã có câu trả lời** — hỏi lại là làm phiền và mở đường cho việc lệch khỏi hệ thống.

| Trục | Chưa có Design System | Đã có Design System |
|---|---|---|
| Nguồn tham chiếu | **hỏi** | ✅ đã có — chính là Design System |
| Phong cách thiết kế | **hỏi** (có preview) | ✅ đã chốt, ghi trong `design-system/README.md` |
| Màu & sáng/tối | **hỏi** | ✅ đã có trong `themes/` |
| Độ chín | hỏi | hỏi *chỉ khi* nghi ngờ cần wireframe; mặc định **gần giống thật** |
| Trục điều hướng + màn trung tâm | **hỏi** | **vẫn hỏi** — phụ thuộc dự án, Design System không trả lời được |

Design System ở trạng thái `Draft` (chưa qua Human Gate) → vẫn dùng được để dựng prototype, nhưng **phải nói rõ khi trình** rằng nền thị giác chưa được duyệt.

Dùng **AskUserQuestion**, mỗi lô ≤ 4 câu. Trước khi hỏi, lọc theo đúng 3 câu của `analyze-idea`: *có đổi việc mình làm không / tự tra được không / sai có sửa rẻ không*.

⚠️ **Đừng lấy "prototype thì rẻ để sửa" làm cớ tự quyết.** Rẻ hay đắt tính theo *đơn vị phải làm lại*: đổi một nhãn nút là rẻ, đổi **phong cách thiết kế** là dựng lại toàn bộ màn hình. Và có những thứ dù rẻ vẫn phải hỏi vì **thuộc thẩm quyền người dùng**, không phải thẩm quyền kỹ thuật: thẩm mỹ, thương hiệu, ngôn ngữ giao diện.

### Bắt buộc hỏi (4 trục quyết định hình dạng)

1. **Nguồn tham chiếu thiết kế — hỏi TRƯỚC tiên.** Công ty đã có design system / bộ màu thương hiệu / một app nội bộ đang chạy / file Figma không? **Bám nguồn thật luôn tốt hơn chọn từ menu của mình.** Có nguồn thì đọc nguồn rồi mới dựng, đừng đưa danh sách phong cách ra chọn.
2. **Phong cách thiết kế** — chỉ hỏi khi *không* có nguồn tham chiếu. Đây là thứ đắt nhất để làm lại.
3. **Độ chín** — wireframe thô, trung gian, hay gần giống thật. *Khác với phong cách*: độ chín là làm kỹ tới đâu, phong cách là làm theo hướng nào. **Hỏi cả hai, đừng gộp.**
4. **Trục điều hướng + màn hình trung tâm** — khung của mọi màn hình.

### Cách hỏi về hình dạng

Câu hỏi về hình dạng mà chỉ có chữ thì người dùng không chọn nổi. Dùng trường **`preview`** của AskUserQuestion (chỉ hoạt động với câu single-select) để dựng **phác thảo ASCII** cho từng phương án — cùng một màn hình vẽ theo từng phong cách, kèm ghi chú token chính (màu, cỡ chữ, độ bo góc, mật độ). Người dùng so sánh cạnh nhau rồi chọn.

### Danh mục phong cách phổ biến (tham chiếu nhanh)

Khi hỏi phong cách, **liệt kê đủ danh mục ngành rồi mới khuyến nghị** — đừng chỉ đưa vài phương án tự nghĩ, vì như vậy là thu hẹp lựa chọn của người dùng mà họ không biết.

| Phong cách | Đặc trưng | Hợp với |
|---|---|---|
| **Data-dense product UI** (Linear, Atlassian, Height) | Mật độ cao, viền mảnh, màu tiết chế, accent dùng dè, keyboard-forward | Công cụ nội bộ dùng nhiều lần/ngày, nhiều bảng và form |
| **Flat / Material 3** | Màu đặc, elevation, nút bo tròn, quen thuộc | Ứng dụng doanh nghiệp phổ thông, người dùng đa dạng |
| **Minimalism / Swiss** | Nhiều khoảng trắng, typography mạnh, gần đơn sắc, đường kẻ mảnh | Sản phẩm ít chức năng, đề cao nội dung |
| **Neo-brutalism** | Viền đen dày, bóng cứng lệch, màu bão hoà, font to | Sản phẩm cần bản sắc mạnh; gây tranh cãi trong enterprise |
| **Dark-first / developer tool** (Vercel, Raycast) | Nền tối làm gốc, accent neon, chữ nhỏ sắc nét | Công cụ kỹ thuật, người dùng là dev |
| **Glassmorphism** | Kính mờ, blur, lớp trong suốt | Trang giới thiệu, dashboard thưa; **kém** cho form dày |
| **Neumorphism** | Nổi khối mềm, bóng đôi cùng tông | Gần như không nên dùng — tương phản kém, hỏng tiếp cận |
| **Claymorphism** | Khối 3D tròn mềm, pastel | App tiêu dùng, giáo dục, trẻ em |
| **Skeuomorphism** | Mô phỏng vật thật | Niche (nhạc cụ, thiết bị ảo) |
| **Bento grid** | Ô lớn nhỏ ghép như hộp bento | Dashboard, trang tổng quan |

Kèm mỗi khuyến nghị phải nêu **lý do gắn với sản phẩm cụ thể** (mật độ dữ liệu, tần suất dùng, ai là người dùng), không nói chung chung.

### Không hỏi

Chi tiết **nằm trong một hướng đã chốt**: mã màu cụ thể, chữ trên nút, thứ tự field, icon nào. Chọn hợp lý rồi để người dùng sửa lúc review — đó là việc prototype sinh ra để làm.

## Nơi lưu

```
projects/<slug>/02-prototype/
  index.html     # UiPrototype — clickable, tự chứa
  README.md      # descriptor: map req↔screen, luồng, giới hạn
```

Sửa lớn → bump version trong `README.md` + ghi lịch sử thay đổi. Cập nhật `PROJECT.md` (bảng artifact, lifecycle stage, nhật ký quyết định).

## Yêu cầu kỹ thuật của `index.html`

- **Khối token đặt đầu `<style>`, dán nguyên từ bộ sinh.** Có dòng *"SINH TỰ ĐỘNG — KHÔNG SỬA TAY"*. Mọi giá trị thị giác phía dưới dùng `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, `var(--text-*)`, `var(--elev-*)`, `var(--dur-*)`. **Không một mã màu hay số đo nào được viết trực tiếp** — đó là check `DS-01`, máy kiểm được.
- **Tự chứa**: một file, CSS/JS inline, không request ra ngoài. Icon dùng emoji hoặc SVG inline.
- **Điều hướng bằng JS thuần**: ẩn/hiện `<section>` theo màn hình. Không router, không framework.
- **Phơi hai hàm cho harness eval**: `go(screenId)` và `applyTheme('light'|'dark')` phải là hàm toàn cục. Đây là cách `tools/ui-eval` điều khiển prototype để chụp mọi màn ở cả hai theme mà không phải sửa file.
- **Nhãn ô nhập là `<label for>` thật** (`FORM-01`). Không dùng `<span>` đặt tuyệt đối — nhìn thì giống nhưng trình đọc màn hình không nối được (`AP-12`).
- **Không dùng `opacity` để biểu đạt trạng thái** (`AP-11`). Dùng vai trò màu đã kiểm tương phản + nhãn chữ. Check tự động **mù** trước ca này nên nó sẽ lọt.
- **`<select>` đặt `appearance:none` thì bắt buộc vẽ lại mũi tên** (`FORM-04`, `AP-03`).
- **Thanh trạng thái prototype**: một dải cố định ghi rõ *"Prototype — dữ liệu giả, không gọi Jira thật"*, kèm phiên bản.
- **Nhãn truy vết**: mỗi màn hình hiện mã FR mà nó phục vụ (ví dụ chip `FR-06`). Đây là thứ giúp người review soi ngược về yêu cầu — **bắt buộc**.
- **Bộ đếm thao tác** cho luồng có ràng buộc số lần bấm: đếm và hiện tại chỗ, để nghiệm thu bằng mắt.
- **Ca lỗi phải dựng được**: nếu FR có nhánh thất bại (ví dụ transition lỗi), prototype phải có nút giả lập ca đó. Prototype chỉ có happy path là prototype nói dối.
- **Responsive tối thiểu**: không vỡ ở 1280px và 1440px. Không cần mobile trừ khi requirement đòi.
- **Tiếng Việt** cho nhãn giao diện, trừ khi requirement nói khác.

## Template — `02-prototype/README.md`

```markdown
# UiPrototype — <Tên dự án>

- **Phiên bản:** v1
- **Ngày:** <yyyy-mm-dd>
- **Sinh ra từ:** [01-requirements.md](../01-requirements.md) v<n> (Approved) — cạnh `realizedBy`
- **Trạng thái:** Draft (chờ review)
- **Mở thế nào:** double-click `index.html` (không cần server, không cần mạng)
- **Phong cách:** <người dùng chốt, hoặc nguồn tham chiếu đã bám theo>
- **Độ chín:** <wireframe | trung gian | gần giống thật>
- **Điều hướng / màn chính:** <...>

## Màn hình

| # | Màn hình | Phục vụ FR | Ghi chú |
|---|---|---|---|

## Luồng chính

1. **<tên luồng>** — <màn A> → <màn B> → <màn C>. Số lần bấm: **n** (ràng buộc: NFR-xx).

## Ca lỗi đã dựng
- <ca lỗi> — bấm ở đâu để xem

## Độ phủ requirement

| FR | Ưu tiên | Lên màn hình? | Ghi chú |
|---|---|---|---|

> FR Must nào **không** lên màn hình phải giải thích ở đây.

## Chỗ là giả (mock)
- <liệt kê: dữ liệu nào tĩnh, hành vi nào không thật>

## [BỔ SUNG UX] — thứ prototype phải thêm mà requirement chưa có
- <mô tả> — *đề xuất đưa vào RequirementSet v<n+1>*

## Câu cần người review trả lời
- <những chỗ mình phân vân, muốn khách hàng/senior quyết khi xem>
```

## Self-check

**Nguồn & hệ thống**
- [ ] `RequirementSet` đúng là **Approved** trước khi dựng.
- [ ] Đã đọc `design-system/README.md` **trước** khi hỏi bất cứ câu nào về hình thức.
- [ ] Khối token trong `index.html` **sinh bằng lệnh**, không gõ tay. Có dòng "SINH TỰ ĐỘNG".
- [ ] Đã nạp `knowledge/ui/`: README + `design-principles` + `anti-patterns` + các file theo loại màn hình.
- [ ] **Phong cách thiết kế do người dùng chốt hoặc do Design System quy định** — không tự chọn rồi dựng luôn.
- [ ] Không hỏi lại trục nào Design System đã trả lời.

**UI Eval — không trình khi chưa qua**
- [ ] `tools/ui-eval` đã chạy; **lớp 1 PASS sạch** (`DS-01` = 0, `A11Y-01/02/03` = 0, `RES-01` PASS).
- [ ] Đã tự soi từng ảnh chụp theo `anti-patterns.md`; vi phạm nghiêm trọng đã sửa.
- [ ] Kết quả eval ghi vào `README.md` của prototype, kèm mã quy tắc cho từng vi phạm còn lại.
- [ ] `go()` và `applyTheme()` là hàm toàn cục, harness điều khiển được.

**Nội dung**
- [ ] Mọi **FR Must** đều lên màn hình, hoặc có giải thích trong bảng độ phủ.
- [ ] Mọi màn hình đều truy ngược được về ít nhất một FR (không có màn hình mồ côi).
- [ ] Mỗi màn hình hiện mã FR trên giao diện.
- [ ] Luồng chính bấm đi được từ đầu tới cuối, không có nút chết.
- [ ] Ràng buộc số thao tác (nếu có) **đếm đúng** trên prototype.
- [ ] Có ít nhất một ca lỗi bấm xem được.
- [ ] File mở offline được: không có `http://`, `https://`, `src=` trỏ ra ngoài.
- [ ] Thứ prototype tự thêm đều được đánh dấu **[BỔ SUNG UX]**, không lẫn vào như thể đã có trong yêu cầu.
- [ ] `PROJECT.md` cập nhật: artifact, lifecycle stage, nhật ký.

## Sau khi xong

Tóm tắt: *bao nhiêu màn hình, phủ bao nhiêu FR, luồng chính mấy lần bấm, ca lỗi nào dựng được, mục [BỔ SUNG UX] nào đáng đưa vào requirement*. Kèm đường dẫn file và cách mở. Rồi **dừng** — hỏi người dùng muốn (a) sửa prototype theo góp ý, (b) cập nhật RequirementSet theo những gì prototype soi ra, hay (c) đi tiếp sang Architecture.
