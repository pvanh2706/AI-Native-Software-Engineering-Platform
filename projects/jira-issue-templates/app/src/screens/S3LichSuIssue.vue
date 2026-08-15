<script setup lang="ts">
/**
 * S3 — Lịch sử issue đã tạo. Convert từ 04-design/s3-lich-su-issue/danh-sach.html
 * (+ trạng thái lọc-không-khớp từ khong-khop.html).
 *
 * Việc chính của màn: TÌM DÒNG LỖI RỒI XỬ LÝ NGAY TẠI ĐÂY. Nên hai thứ phải
 * đúng trước mọi thứ khác:
 *   1. bốn kết quả phân biệt được — nhất là (b) "không bật" không được vẽ thành
 *      lỗi, và (c) "đóng tự động thất bại" không được nhầm thành (d) "tạo lỗi";
 *   2. hành động sửa nằm NGAY TRÊN DÒNG, hiện thường trực (QĐ3).
 *
 * Ràng buộc âm của FR-09 (tiêu chí 4): KHÔNG ô JQL, KHÔNG sửa/bình luận issue,
 * KHÔNG đổi trạng thái tay. Thêm bất cứ thứ nào trong đó là sai màn.
 */
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Notice } from '@/components/ui/notice'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCaption, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCheck, CircleAlert, CircleCheck, ExternalLink, RefreshCw, RotateCcw } from 'lucide-vue-next'
import { KHOANG_MAC_DINH, LICH_SU, type DongLichSu } from '@/du-lieu'

const props = defineProps<{ khongKhop?: boolean }>()
const emit = defineEmits<{ (e: 'tao-lai', d: DongLichSu): void }>()

/* Bản sao cục bộ: nút "Thử lại" đổi kết quả của chính dòng đó, không đụng
   nguồn dữ liệu. Nối API thật thì thay chỗ này bằng một lần gọi lại. */
const dong = ref<DongLichSu[]>(LICH_SU.map(d => ({ ...d })))

const TAT_CA = 'Tất cả'
const DU_AN_LOC = [TAT_CA, 'ITSUP', 'HRQ', 'INFRA']
const KET_QUA_LOC = [TAT_CA, 'Thành công', 'Tạo lỗi', 'Đóng tự động lỗi']

/* `?man=s3-khong-khop` mở thẳng vào một tổ hợp lọc không ra dòng nào, để chụp
   được STATE-01 mà không phải bấm tay. HRQ không có dòng tạo lỗi nào. */
const loc = ref(props.khongKhop
  ? { duAn: 'HRQ', ketQua: 'Tạo lỗi', ...KHOANG_MAC_DINH }
  : { duAn: TAT_CA, ketQua: TAT_CA, ...KHOANG_MAC_DINH })

function xoaBoLoc() {
  loc.value = { duAn: TAT_CA, ketQua: TAT_CA, ...KHOANG_MAC_DINH }
}

/* Ba lựa chọn của bộ lọc "Kết quả" phải RỜI NHAU — nếu không thì một dòng vừa
   tạo xong vừa đóng hỏng sẽ khớp hai lựa chọn, và con số "N kết quả" mất nghĩa.
   Quy ước: "Thành công" = tạo xong VÀ đóng tự động không hỏng. */
function nhom(d: DongLichSu) {
  if (!d.taoOk) return 'Tạo lỗi'
  if (d.dong === 'thatBai') return 'Đóng tự động lỗi'
  return 'Thành công'
}

const lechNgay = computed(() => loc.value.tu > loc.value.den)

const ketQua = computed(() => lechNgay.value ? [] : dong.value.filter(d =>
  (loc.value.duAn === TAT_CA || d.duAn === loc.value.duAn)
  && (loc.value.ketQua === TAT_CA || nhom(d) === loc.value.ketQua)
  && d.ngay >= loc.value.tu && d.ngay <= loc.value.den))

const ngayVN = (iso: string) => iso.split('-').reverse().join('/')
const dangLoc = computed(() =>
  `dự án ${loc.value.duAn === TAT_CA ? 'tất cả' : loc.value.duAn}`
  + ` · kết quả ${loc.value.ketQua === TAT_CA ? 'tất cả' : `«${loc.value.ketQua}»`}`
  + ` · từ ${ngayVN(loc.value.tu)} đến ${ngayVN(loc.value.den)}`)

/* FR-08 tiêu chí 4 — thử lại ĐI TIẾP từ trạng thái hiện tại, không tạo issue
   mới. Ở prototype lần thử nào cũng thành công; bản thật sẽ gọi lại transition
   và có thể hỏng tiếp, lúc đó dòng giữ nguyên nhánh "Thất bại". */
const dangThu = ref<string | null>(null)
const vuaXong = ref<DongLichSu | null>(null)

function thuLai(d: DongLichSu) {
  dangThu.value = d.id
  vuaXong.value = null
  window.setTimeout(() => {
    const r = dong.value.find(x => x.id === d.id)
    if (r) {
      r.dong = 'xong'
      r.dungO = undefined; r.hongO = undefined; r.lyDoDong = undefined
      vuaXong.value = r
    }
    dangThu.value = null
  }, 700)
}
</script>

<template>
  <!-- Kết quả của lần thử lại: nói rõ CÁI GÌ xong, không để "Thành công" trần (COPY) -->
  <Notice v-if="vuaXong" muc="thanhCong" class="mb-4" tieuDe="Đã đóng xong issue">
    {{ vuaXong.key }} đã chuyển sang «Đã xong». Không có issue nào được tạo thêm.
  </Notice>

  <!-- Bộ lọc — FR-09 tiêu chí 2. Ba bộ lọc, không có ô JQL. -->
  <section class="mb-4 flex flex-wrap items-end gap-4 rounded-xs border border-outline-variant p-3">
    <div class="min-w-48 flex-1">
      <Label for="loc-du-an" class="mb-1 block">Dự án</Label>
      <Select v-model="loc.duAn">
        <SelectTrigger id="loc-du-an" class="w-full" aria-label="Lọc theo dự án"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem v-for="x in DU_AN_LOC" :key="x" :value="x">{{ x }}</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div class="min-w-48 flex-1">
      <Label for="loc-ket-qua" class="mb-1 block">Kết quả</Label>
      <Select v-model="loc.ketQua">
        <SelectTrigger id="loc-ket-qua" class="w-full" aria-label="Lọc theo kết quả"><SelectValue /></SelectTrigger>
        <SelectContent>
          <SelectItem v-for="x in KET_QUA_LOC" :key="x" :value="x">{{ x }}</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Hai ô ngày gốc trình duyệt thay vì một ô khoảng: không thêm phụ thuộc,
         đi được bằng bàn phím ngay, và `max`/`min` chéo nhau đã chặn phần lớn
         ca từ > đến ngay trong lịch. Ca gõ tay vượt rào thì có câu báo bên dưới. -->
    <div class="min-w-72 flex-1">
      <Label for="loc-tu" class="mb-1 block">Khoảng thời gian</Label>
      <div class="flex items-center gap-2">
        <Label for="loc-tu" class="shrink-0 text-on-surface-variant">Từ</Label>
        <Input id="loc-tu" v-model="loc.tu" type="date" aria-label="Từ ngày"
               :max="loc.den" :aria-invalid="lechNgay" />
        <Label for="loc-den" class="shrink-0 text-on-surface-variant">đến</Label>
        <Input id="loc-den" v-model="loc.den" type="date" aria-label="Đến ngày"
               :min="loc.tu" :aria-invalid="lechNgay" />
      </div>
      <p v-if="lechNgay" class="mt-1 text-overline text-destructive">
        Ngày bắt đầu cần trước hoặc bằng ngày kết thúc.
      </p>
    </div>
  </section>

  <section class="rounded-xs border border-outline-variant">
    <!-- Số dòng khớp bộ lọc là <caption> chứ không phải một <p> rời: trình đọc
         màn hình đọc nó ngay khi vào bảng, và `aria-live` báo lại mỗi lần lọc. -->
    <Table class="caption-top">
      <!-- Khoảng ngày được nhắc lại ở đây theo dd/mm/yyyy vì `input[type=date]`
           vẽ theo LOCALE CỦA TRÌNH DUYỆT, không theo `lang` của trang: máy đặt
           en-US sẽ hiện 08/04/2026 cho ngày 04/08. Câu này là chỗ duy nhất trên
           màn nói rõ đang lọc ngày nào (COPY-16). -->
      <TableCaption aria-live="polite" class="mt-0 px-2 py-2 text-left">
        Hiển thị {{ ketQua.length }} kết quả khớp bộ lọc — từ {{ ngayVN(loc.tu) }}
        đến {{ ngayVN(loc.den) }}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[9%]">Mã issue</TableHead>
          <TableHead class="w-[6%]">Dự án</TableHead>
          <TableHead class="w-[20%]">Mẫu đã dùng</TableHead>
          <TableHead class="w-[10%]">Người tạo</TableHead>
          <TableHead class="w-[8%]">Thời điểm</TableHead>
          <TableHead class="w-[15%]">Kết quả tạo</TableHead>
          <TableHead class="w-[21%]">Kết quả đóng tự động</TableHead>
          <TableHead class="w-[11%] text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <!-- STATE-01 loại "lọc không ra kết quả": nói rõ ĐANG LỌC GÌ rồi mới gợi
             ý nới. Giữ nguyên tiêu đề cột để thấy mình vẫn đang ở đúng bảng. -->
        <TableEmpty v-if="!ketQua.length" :colspan="8">
          <div class="flex w-full max-w-160 flex-col items-center gap-3 whitespace-normal">
            <Notice muc="thongTin" class="w-full" tieuDe="Không có issue nào khớp bộ lọc">
              <template v-if="lechNgay">
                Khoảng thời gian đang ngược: từ {{ ngayVN(loc.tu) }} đến {{ ngayVN(loc.den) }}.
                Sửa lại một trong hai ô ngày để xem kết quả.
              </template>
              <template v-else>
                Đang lọc: {{ dangLoc }}. Nới một trong ba bộ lọc — thường là mở rộng khoảng
                thời gian — hoặc xoá hết để xem lại toàn bộ lịch sử.
              </template>
            </Notice>
            <Button variant="outline" @click="xoaBoLoc()">Xoá bộ lọc</Button>
          </div>
        </TableEmpty>

        <!-- align-top ở MỌI ô: dòng lỗi cao 3–4 hàng chữ, để mặc align-middle thì
             mã issue trôi xuống giữa còn nhãn trạng thái nằm trên — đọc theo cột
             không so được nữa. -->
        <TableRow v-for="d in ketQua" :key="d.id" :class="!d.taoOk ? 'bg-danger-container/30' : ''">
          <TableCell class="align-top" :class="!d.taoOk ? 'border-l-2 border-l-destructive' : ''">
            <span v-if="d.key" class="font-mono font-bold text-primary">{{ d.key }}</span>
            <span v-else class="italic text-on-surface-variant">Chưa tạo</span>
          </TableCell>

          <TableCell class="align-top">
            <span class="rounded-xs bg-surface-variant px-1 font-mono text-overline font-bold text-on-surface-variant">{{ d.duAn }}</span>
          </TableCell>

          <!-- Tên mẫu XUỐNG DÒNG chứ không cắt: QĐ đã chốt sau ca Stitch tự viết
               cụt chuỗi ngay trong markup — dữ liệu bị đổi âm thầm. -->
          <TableCell class="whitespace-normal align-top text-on-surface">{{ d.mau }}</TableCell>

          <TableCell class="align-top text-on-surface">{{ d.nguoi }}</TableCell>
          <TableCell class="align-top font-mono text-on-surface-variant">{{ d.luc }}</TableCell>

          <TableCell class="whitespace-normal align-top">
            <Badge v-if="d.taoOk" class="bg-success-container text-on-success-container">
              <CircleCheck />Thành công
            </Badge>
            <template v-else>
              <Badge class="bg-danger-container text-on-danger-container"><CircleAlert />Lỗi</Badge>
              <!-- COPY-11: giữ nguyên văn lỗi Jira để tra cứu, kèm một câu diễn giải. -->
              <p class="mt-1 text-overline text-on-surface">
                Chưa có issue trên Jira. <span class="font-mono">{{ d.loiTao }}</span>
              </p>
            </template>
          </TableCell>

          <TableCell class="whitespace-normal align-top">
            <!-- (d) tạo lỗi — không có gì để đóng, không phải "chưa đóng" -->
            <span v-if="!d.taoOk" class="text-on-surface-variant">
              —<span class="sr-only">Không áp dụng vì issue chưa được tạo</span>
            </span>

            <span v-else-if="dangThu === d.id" class="flex items-center gap-1 text-on-surface-variant">
              <RefreshCw class="size-4 animate-spin" />Đang thử lại
            </span>

            <!-- (a) trọn vẹn -->
            <span v-else-if="d.dong === 'xong'" class="flex items-center gap-1 text-on-success-container">
              <CheckCheck class="size-4" />Xong
            </span>

            <!-- (b) mẫu không bật đóng tự động — BÌNH THƯỜNG, phải nói rõ là không phải lỗi -->
            <span v-else-if="d.dong === 'khongBat'" class="flex flex-col text-on-surface-variant">
              <span class="italic">Không bật</span>
              <span class="text-overline">Mẫu không cấu hình đóng tự động — không phải lỗi</span>
            </span>

            <!-- (c) STATE-05 hỏng nửa chừng. Không nhắc lại "issue đã tạo" — cột
                 «Kết quả tạo» ngay bên trái đã nói, và bảng trăm dòng thì mỗi
                 hàng chữ thừa là một dòng ít đi trong khung nhìn. -->
            <span v-else class="flex flex-col">
              <span class="flex items-center gap-1 font-medium text-destructive">
                <CircleAlert class="size-4" />Thất bại
              </span>
              <span class="text-overline text-on-surface">
                Đang dừng ở «{{ d.dungO }}», hỏng khi sang «{{ d.hongO }}» — {{ d.lyDoDong }}
              </span>
            </span>
          </TableCell>

          <TableCell class="align-top text-right">
            <div class="flex flex-col items-end gap-1">
              <Button v-if="d.taoOk && d.dong === 'thatBai'" variant="outline" size="sm"
                      :disabled="dangThu === d.id"
                      :aria-label="`Thử lại việc chuyển trạng thái cho ${d.key}`"
                      @click="thuLai(d)">
                <RefreshCw />Thử lại
              </Button>

              <Button v-if="!d.taoOk" variant="outline" size="sm"
                      :aria-label="`Xem lại và tạo lại issue từ mẫu «${d.mau}»`"
                      @click="emit('tao-lai', d)">
                <RotateCcw />Tạo lại
              </Button>

              <Button v-if="d.key" variant="ghost" size="sm" class="text-primary"
                      :aria-label="`Mở ${d.key} trên Jira`">
                Mở Jira<ExternalLink />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>
