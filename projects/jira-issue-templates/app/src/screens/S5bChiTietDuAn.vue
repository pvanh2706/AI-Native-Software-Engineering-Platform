<script setup lang="ts">
/**
 * S5b — Cấu hình: chi tiết một dự án.
 * Convert từ 04-design/s5b-cau-hinh-chi-tiet-du-an/quan-tri.html.
 *
 * Bản CHỈ XEM không phải màn riêng: cùng markup, chỉ khoá tương tác — đúng cách
 * đã dựng ở tầng thiết kế, và nhờ vậy hai bản không thể lệch nội dung.
 *
 * RÀNG BUỘC ÂM (FR-05, chốt từ A-05): màn này TUYỆT ĐỐI không có công tắc
 * bật/tắt "tự động đóng issue". Việc đó ở cấp MẪU, không phải cấp dự án. Đây là
 * chỗ mô hình cũ hay quay lại nhất.
 */
import { ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Notice } from '@/components/ui/notice'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronDown, ChevronUp, CircleAlert, GripVertical, Star } from 'lucide-vue-next'
import { FIELD_TRANSITION, MAU_CAU_HINH, STATUS_DU_AN, type DuAnCauHinh } from '@/du-lieu'

const props = defineProps<{ duAn: DuAnCauHinh }>()

const statusDich = ref('Đã xong')
const field = ref(FIELD_TRANSITION.map((f) => ({ ...f })))
const mau = ref(MAU_CAU_HINH.map((m) => ({ ...m })))
const daGui = ref(false)
const suaDuoc = () => props.duAn.quanTri

/* Kéo thả đổi thứ tự — HTML5 DnD gốc, không thêm thư viện. */
const keo = ref<number | null>(null)
function tha(den: number) {
  if (keo.value === null || keo.value === den) return
  const l = [...mau.value]
  l.splice(den, 0, ...l.splice(keo.value, 1))
  mau.value = l
  keo.value = null
}
/* Đổi thứ tự bằng BÀN PHÍM. Kéo thả chỉ chạy bằng chuột, nên nếu chỉ có kéo
   thả thì người dùng bàn phím không đổi được thứ tự — và không check nào bắt
   được việc đó, nên nó sẽ nằm im. */
function doiCho(i: number, huong: -1 | 1) {
  const j = i + huong
  if (!suaDuoc() || j < 0 || j >= mau.value.length) return
  const l = [...mau.value]
  ;[l[i], l[j]] = [l[j], l[i]]
  mau.value = l
}

/* Mẫu đang tắt thì không được chọn làm mặc định (FR-05). */
function datMacDinh(i: number) {
  if (!suaDuoc() || !mau.value[i].bat) return
  mau.value = mau.value.map((m, k) => ({ ...m, macDinh: k === i }))
}
</script>

<template>
  <!-- Chế độ chỉ xem: nói RÕ vì sao không sửa được và liên hệ ai (FR-11) -->
  <Notice v-if="!suaDuoc()" tieu-de="Bạn đang xem ở chế độ chỉ xem" class="mb-4">
    Bạn không có quyền quản trị trên dự án {{ duAn.ma }} nên không sửa được cấu hình này.
    Vẫn xem được toàn bộ thiết lập đang áp dụng. Cần thay đổi thì liên hệ quản trị viên của dự án.
  </Notice>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 flex flex-col gap-4 lg:col-span-5">
      <Card class="px-4">
        <CardHeader class="p-0"><CardTitle>Trạng thái đích</CardTitle></CardHeader>
        <CardContent class="p-0">
        <Label for="status-dich" class="mb-1 block">Trạng thái tự động đóng issue</Label>
        <Select v-model="statusDich" :disabled="!suaDuoc()">
          <SelectTrigger id="status-dich" class="w-full" aria-label="Trạng thái tự động đóng issue"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem v-for="s in STATUS_DU_AN" :key="s" :value="s">{{ s }}</SelectItem>
          </SelectContent>
        </Select>
        <p class="mt-2 text-body-sm text-on-surface-variant">
          Đây là trạng thái mà issue sẽ được chuyển tới sau khi tạo, với những mẫu có bật chế độ tự động đóng.
        </p>
        </CardContent>
      </Card>

      <Card class="px-4">
        <CardHeader class="p-0">
          <CardTitle>Giá trị trường bắt buộc</CardTitle>
          <CardDescription>Các giá trị này sẽ được tự động điền khi chuyển trạng thái đích.</CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col gap-3 p-0">
          <div v-for="f in field" :key="f.ma">
            <Label :for="f.ma" class="mb-1 block">
              {{ f.ten }}<span v-if="f.batBuoc" class="text-destructive"> *</span>
            </Label>
            <Select v-if="f.kieu === 'chon'" v-model="f.giaTri" :disabled="!suaDuoc()">
              <SelectTrigger :id="f.ma" class="w-full" :aria-label="f.ten"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="c in f.chon" :key="c" :value="c">{{ c }}</SelectItem>
              </SelectContent>
            </Select>
            <Input v-else :id="f.ma" v-model="f.giaTri" :type="f.kieu === 'so' ? 'number' : 'text'"
                   :disabled="!suaDuoc()" placeholder="Chưa có giá trị"
                   :aria-invalid="f.batBuoc && !f.giaTri" />
            <p v-if="f.batBuoc && !f.giaTri" class="mt-1 text-overline text-destructive">
              Trường này bắt buộc trên Jira nhưng dự án chưa khai giá trị.
              {{ suaDuoc() ? 'Hãy bổ sung để mẫu tự động đóng lưu được.' : 'Quản trị viên dự án cần bổ sung.' }}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="col-span-12 lg:col-span-7">
      <Card>
        <CardHeader class="px-4">
          <CardTitle>Danh sách mẫu của dự án</CardTitle>
          <CardDescription>
            {{ suaDuoc() ? 'Kéo thả để sắp xếp thứ tự hiển thị trên giao diện người dùng.' : 'Thứ tự hiển thị trên giao diện người dùng.' }}
          </CardDescription>
        </CardHeader>
        <CardContent class="overflow-x-auto p-0">
        <Table class="min-w-[520px]">
          <TableHeader>
            <TableRow>
              <TableHead v-if="suaDuoc()" class="w-20">Thứ tự</TableHead>
              <TableHead class="w-16">Trạng thái</TableHead>
              <TableHead>Tên mẫu</TableHead>
              <TableHead class="w-32 text-center">Mặc định</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(m, i) in mau" :key="m.ten"
                      :draggable="suaDuoc()" @dragstart="keo = i" @dragover.prevent @drop="tha(i)">
              <TableCell v-if="suaDuoc()" class="text-on-surface-variant">
                <div class="flex items-center gap-0.5">
                  <GripVertical class="size-4 shrink-0 cursor-grab" aria-hidden="true" />
                  <div class="flex flex-col">
                    <Button variant="ghost" size="icon-sm" class="h-6 w-6" :disabled="i === 0"
                            :aria-label="`Đưa mẫu ${m.ten} lên trên`" @click="doiCho(i, -1)">
                      <ChevronUp />
                    </Button>
                    <Button variant="ghost" size="icon-sm" class="h-6 w-6" :disabled="i === mau.length - 1"
                            :aria-label="`Đưa mẫu ${m.ten} xuống dưới`" @click="doiCho(i, 1)">
                      <ChevronDown />
                    </Button>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Switch v-model="m.bat" :disabled="!suaDuoc()" :aria-label="`Bật mẫu ${m.ten}`" />
              </TableCell>
              <TableCell>
                <div class="text-on-surface">{{ m.ten }}</div>
                <div v-if="m.lyDo" class="mt-0.5 flex items-center gap-1 text-overline text-destructive">
                  <CircleAlert class="size-3 shrink-0" />Lỗi: {{ m.lyDo }}
                </div>
              </TableCell>
              <TableCell class="text-center">
                <Badge v-if="m.macDinh"><Star />Mặc định</Badge>
                <Button v-else-if="suaDuoc() && m.bat" variant="ghost" size="sm"
                        class="text-on-surface-variant" @click="datMacDinh(i)">Đặt mặc định</Button>
                <span v-else class="text-on-surface-variant">—</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </CardContent>
      </Card>
    </div>
  </div>

  <div v-if="suaDuoc()" class="mt-6 flex items-center justify-end gap-2 border-t border-outline-variant pt-4">
    <Button variant="ghost">Huỷ bỏ</Button>
    <Button @click="daGui = true">Lưu thay đổi</Button>
  </div>
</template>
