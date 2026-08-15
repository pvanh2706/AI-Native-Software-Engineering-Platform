# OpenQuestions — Jira Issue Templates

- **Phiên bản:** v2
- **Ngày:** 2026-08-10
- **Gắn với:** [01-requirements.md](01-requirements.md) v2

> Chỉ những câu **còn treo**. 16 câu đã chốt nằm ở [01-answers.md](01-answers.md).
> Trả lời bằng cách gõ trong chat (`Q22: Jira 9.4`) hoặc gọi skill `answer-questions` — **không cần sửa file này bằng tay**.

## Blocking

**Không còn câu blocking nào.** Cả 7 câu blocking của v1 đã chốt trong vòng làm rõ ngày 2026-08-10.

## Cần kiểm tra (không chặn thiết kế, nhưng nên xác nhận trước khi code)

- [ ] **Q22:** Jira Data Center đang chạy phiên bản nào? — *Vì sao quan trọng:* Personal Access Token chỉ có từ **Jira 8.14** trở lên. Bản cũ hơn thì FR-01 phải lùi về Basic auth (username + password), kéo theo NFR-01 phải lưu mật khẩu thay vì token — bảo mật kém hơn hẳn và không thu hồi riêng lẻ được. — *Giả định đang tạm dùng:* Jira DC ≥ 8.14, dùng PAT. — *Ảnh hưởng tới:* FR-01, NFR-01

- [ ] **Q23:** Workflow các dự án có bắt buộc field nào khi đóng issue ngoài `Resolution` không? — *Vì sao quan trọng:* FR-05 đã có chỗ khai giá trị field bắt buộc, nên đây không phải rủi ro thiết kế. Nhưng biết trước danh sách thật giúp kiểm chứng FR-07 sớm thay vì phát hiện lúc chạy thật. — *Giả định đang tạm dùng:* chỉ `Resolution`. — *Ảnh hưởng tới:* FR-05, FR-07

## Tùy chọn (quyết sau, không chặn)

- [ ] **Q17:** Có cần thông báo (Slack / Teams / email) khi tạo issue hoặc khi auto-Done thất bại không?
- [ ] **Q18:** Có cần nhận webhook từ Jira để đồng bộ ngược trạng thái issue về hệ thống không?
- [ ] **Q19:** Giao diện cần đa ngôn ngữ (Việt / Anh) không?
- [ ] **Q20:** Có cần import/export mẫu (JSON) để chuyển cấu hình giữa các môi trường không?
- [ ] **Q21:** Có cần lưu lịch sử phiên bản của mẫu (ai sửa gì, khôi phục được không)? — đáng cân nhắc hơn bình thường vì theo A-09, nhiều người có quyền admin dự án Jira đều sửa được mẫu.
