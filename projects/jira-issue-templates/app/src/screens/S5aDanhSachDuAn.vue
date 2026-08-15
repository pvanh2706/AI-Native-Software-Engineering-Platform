<script setup lang="ts">
/**
 * S5a — Cấu hình: danh sách dự án.
 * Convert từ 04-design/s5a-cau-hinh-danh-sach-du-an/danh-sach.html.
 *
 * Màn ĐIỀU HƯỚNG VÀ CHẨN ĐOÁN, không phải màn nhập liệu — mọi chỉnh sửa nằm ở
 * S5b. Ba trạng thái mà bản thiết kế phải vẽ ba màn riêng (danh sách / chưa kết
 * nối / đang đồng bộ) ở đây là ba nhánh của một màn.
 */
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CircleAlert, CircleCheck, Link2, Lock, RefreshCw, TriangleAlert } from 'lucide-vue-next'
import { DU_AN_CAU_HINH, type DuAnCauHinh } from '@/du-lieu'

defineProps<{ rong?: boolean }>()
const emit = defineEmits<{ (e: 'mo', d: DuAnCauHinh): void }>()

/* FR-02: quá 2 giây thì phải báo tiến độ tới đâu và cho HUỶ giữa chừng. */
const dangDongBo = ref(false)
const tienDo = ref(0)
const buoc = ref('')
let hen: number | undefined

function dongBoTatCa() {
  dangDongBo.value = true; tienDo.value = 0
  const cac = DU_AN_CAU_HINH
  hen = window.setInterval(() => {
    tienDo.value = Math.min(100, tienDo.value + 5)
    const i = Math.min(cac.length - 1, Math.floor(tienDo.value / (100 / cac.length)))
    buoc.value = `Đang kiểm tra dự án ${cac[i].ma} (${i + 1}/${cac.length})…`
    if (tienDo.value >= 100) huy()
  }, 120)
}
function huy() { clearInterval(hen); dangDongBo.value = false }
</script>

<template>
  <Card>
    <CardHeader class="flex-row items-end justify-between gap-4 px-4">
      <div>
        <CardTitle>Danh sách dự án</CardTitle>
        <CardDescription>Quản lý cấu hình sinh issue tự động theo từng dự án.</CardDescription>
      </div>
      <Button v-if="!rong" variant="outline" @click="dongBoTatCa()">
        <RefreshCw />Lấy thông tin tất cả dự án
      </Button>
    </CardHeader>
    <CardContent class="p-0">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[28%]">Dự án</TableHead>
          <TableHead class="w-[10%]">Quyền hạn</TableHead>
          <TableHead class="w-[22%]">Trạng thái cấu hình</TableHead>
          <TableHead class="w-[8%] text-right">Số mẫu</TableHead>
          <TableHead class="w-[20%]">Lần cuối lấy dữ liệu</TableHead>
          <TableHead class="w-[12%] text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty v-if="rong" :colspan="6">
          <div class="flex flex-col items-center gap-2 py-6">
            <Link2 class="size-8 text-on-surface-variant" />
            <div class="font-medium text-on-surface">Hệ thống chưa kết nối với dự án Jira nào</div>
            <div class="max-w-96 text-body-sm text-on-surface-variant">
              Hãy kết nối dự án đầu tiên để bắt đầu cấu hình các mẫu issue cho nhân viên IT.
            </div>
            <Button class="mt-2"><Link2 />Kết nối dự án Jira đầu tiên</Button>
            <div class="text-overline text-on-surface-variant">Yêu cầu quyền quản trị viên để thực hiện kết nối.</div>
          </div>
        </TableEmpty>

        <!-- `v-if="!rong"`: thiếu nó thì màn "chưa kết nối dự án nào" vẫn liệt kê
             đủ 5 dự án ngay dưới câu thông báo — trạng thái rỗng nói dối. -->
        <TableRow v-for="d in (rong ? [] : DU_AN_CAU_HINH)" :key="d.ma">
          <TableCell>
            <div class="flex items-start gap-2">
              <span class="mt-0.5 shrink-0 rounded-xs bg-surface-variant px-1 font-mono text-overline font-bold text-on-surface-variant">{{ d.ma }}</span>
              <span class="font-medium text-on-surface">{{ d.ten }}</span>
            </div>
          </TableCell>

          <TableCell>
            <span class="flex items-center gap-1 text-on-surface-variant">
              <Lock v-if="!d.quanTri" class="size-3.5" />{{ d.quanTri ? 'Quản trị' : 'Chỉ xem' }}
            </span>
          </TableCell>

          <TableCell>
            <Badge v-if="d.daDatStatusDich" class="bg-success-container text-on-success-container">
              <CircleCheck />Đã đặt status đích
            </Badge>
            <template v-else>
              <Badge class="bg-warning-container text-on-warning-container"><TriangleAlert />Chưa đặt status đích</Badge>
              <div class="mt-1 text-overline text-on-surface-variant">Mẫu tự động đóng sẽ không lưu được</div>
            </template>
          </TableCell>

          <TableCell class="text-right font-mono text-on-surface">{{ d.soMau }}</TableCell>

          <TableCell>
            <div :class="d.trangDongBo === 'ok' ? 'text-on-surface-variant' : 'text-destructive'">
              <div class="font-mono">{{ d.luc }}</div>
              <div v-if="d.ghiChu" class="mt-0.5 text-overline">
                <span class="font-medium">{{ d.trangDongBo === 'quaHan' ? 'Đã quá hạn: ' : 'Thất bại: ' }}</span>{{ d.ghiChu }}
              </div>
            </div>
          </TableCell>

          <TableCell class="text-right">
            <div class="flex items-center justify-end gap-1">
              <Button variant="ghost" size="icon-sm" :aria-label="`Lấy lại thông tin dự án ${d.ma}`"
                      :class="d.trangDongBo === 'ok' ? 'text-primary' : 'text-destructive'" @click="dongBoTatCa()">
                <RefreshCw />
              </Button>
              <Button variant="ghost" size="sm" :class="d.quanTri ? 'text-primary' : 'text-on-surface-variant'" @click="emit('mo', d)">
                {{ d.quanTri ? 'Mở cấu hình' : 'Chỉ xem' }}
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    </CardContent>
  </Card>

  <p v-if="!rong" class="mt-3 text-body-sm text-on-surface-variant">
    Hiển thị {{ DU_AN_CAU_HINH.length }} dự án. Dữ liệu được đồng bộ tự động mỗi 24h.
  </p>

  <!-- Đang lấy thông tin từ Jira — FR-02: báo tiến độ và cho huỷ -->
  <Dialog :open="dangDongBo" @update:open="(v: boolean) => !v && huy()">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2"><RefreshCw class="size-5 text-primary" />Đang lấy thông tin từ Jira…</DialogTitle>
        <DialogDescription>Quá trình này có thể mất vài phút tuỳ khối lượng dữ liệu.</DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between text-body-sm">
          <span class="text-on-surface-variant">Tiến độ đồng bộ</span>
          <span class="font-mono font-medium text-primary">{{ tienDo }}%</span>
        </div>
        <Progress :value="tienDo" label="Tiến độ đồng bộ" />
        <div class="rounded-xs bg-surface-variant p-2 font-mono text-overline text-on-surface">
          <div class="flex items-center gap-1"><CircleCheck class="size-3" />Đã kết nối thành công với Jira API</div>
          <div class="mt-1 flex items-center gap-1"><CircleAlert class="size-3" />{{ buoc }}</div>
        </div>
      </div>
      <DialogFooter><Button variant="outline" @click="huy()">Huỷ</Button></DialogFooter>
    </DialogContent>
  </Dialog>
</template>
