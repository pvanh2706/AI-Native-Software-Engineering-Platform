/**
 * Dữ liệu mẫu cho prototype. Lấy nguyên từ brief S1 và S2 — gồm cả những dòng
 * CỐ Ý dài để lộ chỗ tràn chữ, và dấu tiếng Việt chồng hai tầng.
 * Khi nối API thật thì thay chỗ này, không đụng tới màn hình.
 */
export type Trang = 'active' | 'draft' | 'invalid'
export type Tmpl = { ten: string; loai: 'Task' | 'Bug'; dich: string; trang: Trang; macDinh?: boolean; lyDo?: string }
export type IssueGanDay = { key: string; mau: string; nguoi: string; luc: string; ok: boolean; ketQua: string }
export type DuAn = { ten: string; quanTri: boolean; mau: Tmpl[]; ganDay: IssueGanDay[] }

export const DU_AN: Record<string, DuAn> = {
  ITSUP: {
    ten: 'Hỗ trợ nội bộ', quanTri: true,
    mau: [
      { ten: 'Ghi nhận hỗ trợ đã xử lý', loai: 'Task', dich: 'Tự động Done', trang: 'active', macDinh: true },
      { ten: 'Cấp quyền truy cập', loai: 'Task', dich: 'Tự động Done', trang: 'active' },
      { ten: 'Sự cố cần theo dõi', loai: 'Bug', dich: 'Để mở', trang: 'active' },
      { ten: 'Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8', loai: 'Task', dich: 'Để mở', trang: 'draft' },
      { ten: 'Bàn giao thiết bị', loai: 'Task', dich: 'Tự động Done', trang: 'invalid',
        lyDo: 'Field "Người bàn giao" không còn tồn tại trên Jira' },
    ],
    ganDay: [
      { key: 'ITSUP-2482', mau: 'Ghi nhận hỗ trợ đã xử lý', nguoi: 'Phạm Việt Anh', luc: '10/08 09:41',
        ok: false, ketQua: 'LỖI: chưa chuyển được sang Done' },
      { key: 'ITSUP-2481', mau: 'Ghi nhận hỗ trợ đã xử lý', nguoi: 'Phạm Việt Anh', luc: '10/08 09:36', ok: true, ketQua: 'Done' },
      { key: 'ITSUP-2479', mau: 'Cấp quyền truy cập', nguoi: 'Nguyễn Thị Hoa', luc: '10/08 08:58', ok: true, ketQua: 'Done' },
    ],
  },
  HRQ: {
    ten: 'Yêu cầu nhân sự', quanTri: true, ganDay: [],
    mau: [
      { ten: 'Đề nghị tuyển dụng', loai: 'Task', dich: 'Để mở', trang: 'active', macDinh: true },
      { ten: 'Xác nhận nghỉ phép', loai: 'Task', dich: 'Tự động Done', trang: 'active' },
    ],
  },
  INFRA: {
    ten: 'Hạ tầng và vận hành', quanTri: false, ganDay: [],
    mau: [
      { ten: 'Sự cố hạ tầng', loai: 'Bug', dich: 'Để mở', trang: 'active', macDinh: true },
      { ten: 'Yêu cầu cấp máy chủ', loai: 'Task', dich: 'Tự động Done', trang: 'active' },
    ],
  },
}

/* Giá trị mặc định của mẫu "Ghi nhận hỗ trợ đã xử lý" — brief S2.
   {{today}} và {{me}} được thay tại thời điểm TẠO issue, không phải lúc lưu mẫu (FR-04). */
export const MAU_MAC_DINH = {
  tieuDe: 'Hỗ trợ người dùng khối văn phòng — xử lý sự cố đăng nhập và cấp lại quyền truy cập ngày 11/08/2026',
  moTa: [
    'h3. Nội dung đã xử lý',
    '* Kiểm tra tài khoản trên hệ thống',
    '* Cấp lại quyền truy cập',
    'Người thực hiện: Phạm Việt Anh',
  ].join('\n'),
  uuTien: 'Trung bình',
  han: '2026-08-11',
  nhan: ['hỗ-trợ-nội-bộ', 'đã-xử-lý'],
  /* Mẫu MẶC ĐỊNH của dự án thì mọi field bắt buộc phải có sẵn giá trị, nếu không
     thì NFR-07 ("tạo 1 issue KHÔNG SỬA GÌ trong ≤ 3 lần bấm") không bao giờ đạt —
     luồng dùng nhiều nhất luôn phải dừng lại để điền tay.
     Brief S2 cố ý để trống ô này nhằm thử phần hiển thị lỗi; trạng thái đó vẫn
     tái hiện được bằng cách xoá ô rồi bấm tạo. Đổi lại '' là quay về như brief. */
  thoiGian: '30',
  nhomTren: 'Khối văn phòng',
  nhomDuoi: 'Hà Nội',
  nguoiYeuCau: 'Nguyễn Thị Hoa',
}

export const WIKI_CU_PHAP = [
  { cu: 'h1.', y: 'Tiêu đề mức 1' },
  { cu: '*', y: 'Gạch đầu dòng' },
  { cu: '#', y: 'Danh sách đánh số' },
  { cu: '*đậm*', y: 'In đậm' },
  { cu: '_nghiêng_', y: 'In nghiêng' },
  { cu: '[Chữ|url]', y: 'Liên kết' },
]

/* ── Khu CẤU HÌNH (S5a / S5b) ─────────────────────────────────────────────
   FR-05: khu này ĐỘC LẬP với dự án đang chọn ở điều hướng chính — nó có danh
   sách riêng, gồm MỌI dự án hệ thống biết, không chỉ 3 dự án ở thanh bên.
   Dữ liệu lấy từ brief S5a. */
export type TrangDongBo = 'ok' | 'quaHan' | 'thatBai'
export type DuAnCauHinh = {
  ma: string; ten: string; quanTri: boolean
  daDatStatusDich: boolean; soMau: number
  luc: string; trangDongBo: TrangDongBo; ghiChu?: string
}

export const DU_AN_CAU_HINH: DuAnCauHinh[] = [
  { ma: 'ITSUP', ten: 'Hỗ trợ nội bộ', quanTri: true, daDatStatusDich: true, soMau: 12, luc: '11/08 08:30', trangDongBo: 'ok' },
  { ma: 'HRQ', ten: 'Yêu cầu nhân sự', quanTri: true, daDatStatusDich: false, soMau: 4, luc: '11/08 07:15', trangDongBo: 'ok' },
  // tên cố ý dài — để lộ chỗ tràn chữ
  { ma: 'INFRA', ten: 'Hạ tầng và vận hành hệ thống nội bộ khối văn phòng', quanTri: false, daDatStatusDich: true, soMau: 7, luc: '10/08 16:02', trangDongBo: 'ok' },
  { ma: 'DEVOPS', ten: 'Triển khai và vận hành', quanTri: true, daDatStatusDich: true, soMau: 9, luc: '08/08 09:20', trangDongBo: 'quaHan', ghiChu: 'Cần lấy lại thông tin từ Jira' },
  { ma: 'LEGAL', ten: 'Pháp chế', quanTri: false, daDatStatusDich: false, soMau: 0, luc: '11/08 06:40', trangDongBo: 'thatBai', ghiChu: 'Jira không phản hồi — đang dùng dữ liệu cũ từ 09/08 18:00' },
]

/* Status lấy từ workflow thật của dự án (FR-05) — không gõ tay chuỗi "Done". */
export const STATUS_DU_AN = ['Cần làm', 'Đang làm', 'Chờ duyệt', 'Đã xong', 'Đã huỷ']

export type FieldTransition = { ma: string; ten: string; batBuoc: boolean; kieu: 'chon' | 'so' | 'chu'; chon?: string[]; giaTri: string }
export const FIELD_TRANSITION: FieldTransition[] = [
  { ma: 'resolution', ten: 'Resolution', batBuoc: true, kieu: 'chon', chon: ['Done', "Won't Do", 'Duplicate'], giaTri: 'Done' },
  { ma: 'thoi-gian', ten: 'Thời gian thực tế đã bỏ ra để xử lý', batBuoc: true, kieu: 'so', giaTri: '' },
  { ma: 'ghi-chu', ten: 'Ghi chú bàn giao', batBuoc: false, kieu: 'chu', giaTri: '' },
]

/* Mẫu của ITSUP ở màn cấu hình: bật/tắt, thứ tự, mẫu mặc định (FR-05). */
export type MauCauHinh = { ten: string; bat: boolean; macDinh: boolean; lyDo?: string }
export const MAU_CAU_HINH: MauCauHinh[] = [
  { ten: 'Ghi nhận hỗ trợ đã xử lý', bat: true, macDinh: true },
  { ten: 'Cấp quyền truy cập', bat: true, macDinh: false },
  { ten: 'Sự cố cần theo dõi', bat: true, macDinh: false },
  { ten: 'Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8', bat: false, macDinh: false },
  { ten: 'Bàn giao thiết bị', bat: true, macDinh: false, lyDo: 'Field "Người bàn giao" không còn tồn tại trên Jira' },
]

/* ── S4 — Soạn / sửa mẫu ───────────────────────────────────────────────────
   Mỗi trường của mẫu mang bốn thứ: tên · kiểu · giá trị mặc định · khoá hay
   cho sửa (FR-04). Biến {{today}} / {{me}} thay tại thời điểm TẠO ISSUE. */
export type KieuField = 'chu1dong' | 'wiki' | 'chonNguoi' | 'chonMot' | 'chonNhieu' | 'ngay' | 'so' | 'chonHaiTang'
export type FieldMau = {
  ma: string; ten: string; kieu: KieuField; batBuoc: boolean
  giaTri: string; giaTri2?: string; nhan?: string[]; chon?: string[]; chon2?: string[]
  khoa: boolean
}

export const MAU_DANG_SUA = {
  ten: 'Ghi nhận hỗ trợ đã xử lý',
  moTa: 'Dùng khi đã xử lý xong một yêu cầu hỗ trợ và chỉ cần ghi nhận lại trên Jira',
  duAn: 'ITSUP', loaiIssue: 'Task', trangThai: 'Đang dùng' as 'Đang dùng' | 'Nháp',
  tuDongDong: true,
}

export const FIELD_MAU: FieldMau[] = [
  { ma: 'tieu-de', ten: 'Tiêu đề', kieu: 'chu1dong', batBuoc: true, giaTri: 'Hỗ trợ người dùng — {{today}}', khoa: false },
  { ma: 'mo-ta', ten: 'Mô tả', kieu: 'wiki', batBuoc: false, khoa: false,
    giaTri: 'h3. Nội dung đã xử lý\n* Kiểm tra tài khoản trên hệ thống\n* Cấp lại quyền truy cập' },
  { ma: 'nguoi-duoc-giao', ten: 'Người được giao', kieu: 'chonNguoi', batBuoc: false, giaTri: '{{me}}', khoa: true },
  { ma: 'nguoi-bao-cao', ten: 'Người báo cáo', kieu: 'chonNguoi', batBuoc: false, giaTri: '{{me}}', khoa: true },
  { ma: 'do-uu-tien', ten: 'Độ ưu tiên', kieu: 'chonMot', batBuoc: false, giaTri: 'Trung bình', chon: ['Thấp', 'Trung bình', 'Cao', 'Khẩn'], khoa: false },
  { ma: 'nhan', ten: 'Nhãn', kieu: 'chonNhieu', batBuoc: false, giaTri: '', nhan: ['hỗ-trợ-nội-bộ', 'đã-xử-lý'], khoa: false },
  { ma: 'han', ten: 'Hạn hoàn thành', kieu: 'ngay', batBuoc: false, giaTri: '{{today}}', khoa: false },
  // tên cố ý dài — Stitch đã viết cụt chỗ này ở bản thiết kế
  { ma: 'thoi-gian', ten: 'Thời gian thực tế đã bỏ ra để xử lý', kieu: 'so', batBuoc: true, giaTri: '30', khoa: false },
  { ma: 'nhom', ten: 'Nhóm hỗ trợ', kieu: 'chonHaiTang', batBuoc: false, giaTri: 'Khối văn phòng', giaTri2: 'Hà Nội',
    chon: ['Khối văn phòng', 'Khối sản xuất'], chon2: ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh'], khoa: true },
  { ma: 'nguoi-yeu-cau', ten: 'Người yêu cầu', kieu: 'chonNguoi', batBuoc: false, giaTri: '', khoa: false },
]

export const BIEN_TU_SINH = [
  { bien: '{{today}}', y: 'ngày tạo issue' },
  { bien: '{{me}}', y: 'người đang đăng nhập' },
]

/* ── S3 — Lịch sử issue (FR-09) ────────────────────────────────────────────
   Lấy nguyên 5 dòng của brief S3, kể cả tên mẫu CỐ Ý dài ở dòng tạo lỗi.

   BỐN kết quả phải phân biệt được, không được gộp:
     taoOk + dong 'xong'      việc trọn vẹn
     taoOk + dong 'khongBat'  bình thường, KHÔNG phải lỗi
     taoOk + dong 'thatBai'   issue ĐÃ có trên Jira, chỉ kẹt trạng thái (STATE-05)
     !taoOk                   KHÔNG có issue nào trên Jira

   `ngay` tách khỏi `luc`: lọc theo khoảng so chuỗi ISO, không parse lại chuỗi
   hiển thị — chuỗi hiển thị không mang năm nên parse là hỏng ngay đầu năm sau. */
export type KetQuaDong = 'xong' | 'khongBat' | 'thatBai'
export type DongLichSu = {
  id: string
  key: string | null      // null = Jira chưa tạo được issue nào
  duAn: string
  mau: string
  nguoi: string
  ngay: string            // 'yyyy-mm-dd' — để lọc
  luc: string             // 'dd/mm HH:mm' — để hiện
  taoOk: boolean
  loiTao?: string         // nguyên văn Jira trả về, giữ để tra cứu (COPY-11)
  dong?: KetQuaDong       // bỏ trống khi tạo lỗi: không có issue nào để đóng
  dungO?: string          // STATE-05: đã đi tới trạng thái nào
  hongO?: string          // …hỏng khi sang trạng thái nào
  lyDoDong?: string       // …vì sao
}

export const LICH_SU: DongLichSu[] = [
  { id: 'ls1', key: 'ITSUP-2482', duAn: 'ITSUP', mau: 'Ghi nhận hỗ trợ đã xử lý',
    nguoi: 'Phạm Việt Anh', ngay: '2026-08-11', luc: '11/08 09:41', taoOk: true,
    dong: 'thatBai', dungO: 'Chờ duyệt', hongO: 'Đã xong',
    lyDoDong: 'token của bạn không đủ quyền thực hiện transition này' },
  { id: 'ls2', key: 'ITSUP-2481', duAn: 'ITSUP', mau: 'Ghi nhận hỗ trợ đã xử lý',
    nguoi: 'Phạm Việt Anh', ngay: '2026-08-11', luc: '11/08 09:36', taoOk: true, dong: 'xong' },
  { id: 'ls3', key: 'HRQ-318', duAn: 'HRQ', mau: 'Đề nghị tuyển dụng',
    nguoi: 'Nguyễn Thị Hoa', ngay: '2026-08-11', luc: '11/08 08:58', taoOk: true, dong: 'khongBat' },
  // tên mẫu cố ý dài — chỗ Stitch đã tự viết cụt ngay trong markup ở S5a, S2, S4
  { id: 'ls4', key: null, duAn: 'ITSUP',
    mau: 'Yêu cầu cấp quyền truy cập hệ thống cho nhân sự mới vào tháng 8',
    nguoi: 'Trần Thị Bích', ngay: '2026-08-10', luc: '10/08 17:20', taoOk: false,
    loiTao: "Field 'customfield_10312' is required." },
  { id: 'ls5', key: 'INFRA-902', duAn: 'INFRA', mau: 'Sự cố hạ tầng',
    nguoi: 'Lê Văn Cường', ngay: '2026-08-10', luc: '10/08 14:05', taoOk: true, dong: 'xong' },
]

/* Khoảng thời gian mặc định của bộ lọc S3 — đúng brief: 04/08 → 11/08/2026. */
export const KHOANG_MAC_DINH = { tu: '2026-08-04', den: '2026-08-11' }

/* Kết quả đối chiếu khi nhân bản sang dự án khác (FR-10). */
export const DOI_CHIEU_NHAN_BAN = {
  duAnDich: 'HRQ — Yêu cầu nhân sự',
  hong: [
    { ten: 'Thời gian thực tế đã bỏ ra để xử lý', vi: 'trường không tồn tại ở HRQ' },
    { ten: 'Nhóm hỗ trợ', vi: 'giá trị "Khối văn phòng" không có trong HRQ' },
  ],
  nguyenVen: 7,
}
