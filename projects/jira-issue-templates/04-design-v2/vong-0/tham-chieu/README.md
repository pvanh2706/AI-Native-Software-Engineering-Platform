# Nguồn tham chiếu thiết kế — thả file vào đây

Chốt 13/08/2026: hướng **admin hiện đại kiểu TailAdmin / PrimeVue**, mở cả khối thống kê.
Bám nguồn thật luôn tốt hơn để tôi mô tả bằng chữ — đúng nguyên tắc đã ghi ở
[make-prototype §Vòng làm rõ UX](../../../../../.claude/skills/make-prototype/SKILL.md).

## Cần gì — theo thứ tự quan trọng

| # | Thứ cần | Bắt buộc? | Tôi dùng để làm gì |
|---|---|---|---|
| 1 | **Ảnh chụp màn danh sách/bảng** của template bạn thích | ✅ | Đây là dạng màn chiếm 5/7 màn của dự án. Trích mật độ thật, chiều cao dòng, cách vẽ nhãn trạng thái |
| 2 | **Ảnh chụp màn biểu mẫu** | ✅ | S2 và S4 đều là form. Trích cách vẽ nhãn, ô nhập, viền nghỉ/focus |
| 3 | **Ảnh chụp thanh bên** — cả trạng thái active | ✅ | Đang phân vân giữa thanh bên trắng và thanh bên tối; ảnh giải quyết ngay |
| 4 | Link template, hoặc tên bản cụ thể | ⚪ nên có | TailAdmin có nhiều bản (free/pro, Vue/React/HTML) và trông khác nhau |
| 5 | **Mã nguồn / file CSS** nếu bạn có bản quyền | ⚪ tuỳ | Có mã thì tôi **trích được token thật** thay vì đo từ pixel — chính xác hơn hẳn |

## Đặt tên

Không đúng tên cũng không sao, tôi tự nhận qua nội dung.

```text
tham-chieu/
  bang-danh-sach.png
  bieu-mau.png
  thanh-ben.png
  khoi-thong-ke.png     ← nếu muốn tôi bám sát dải thống kê đầu trang
  ghi-chu.md            ← chỗ bạn ghi "thích chỗ này, ghét chỗ kia"
```

**Ghi chú của bạn quan trọng ngang ảnh.** Một câu *"thích cách nó tách panel nhưng ghét bo góc to"*
tiết kiệm cả một vòng đoán.

## Rồi tôi làm gì

1. Trích ngôn ngữ thị giác từ ảnh/mã → viết lại **brief Vòng 0**
2. Sinh lại design system, đo tương phản toàn bộ như vòng trước
3. Trình bạn duyệt lại bảng màu — Vòng 0 hiện tại (`assets/e00e946…`) sẽ bị thay

## Một điều đã chốt kèm theo

Chọn "theo hẳn TailAdmin" nghĩa là **mở khối thống kê và bố cục thẻ**, thứ mà brief trước cấm
và **không FR nào đòi**. Cách xử lý: vẫn dựng, nhưng đánh dấu `[BỔ SUNG UX]` trong bảng map
của từng brief — đúng cơ chế skill đã có. Chúng thành ứng viên cho `RequirementSet` v4 chứ
không lặng lẽ đi vào sản phẩm như thể yêu cầu vẫn luôn có.
