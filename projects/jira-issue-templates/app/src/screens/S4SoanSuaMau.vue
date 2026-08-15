<script setup lang="ts">
/**
 * S4 — Soạn / sửa mẫu issue.
 * Convert từ 04-design/s4-soan-sua-mau/form.html.
 *
 * ĐỐI XỨNG với S5b: màn này BẮT BUỘC có công tắc tự động đóng, vì auto-Done
 * nằm ở cấp MẪU (FR-07). S5b thì cấm tuyệt đối — cùng một bộ yêu cầu, hai màn
 * ngược nhau.
 *
 * Ca "tên mẫu trùng" (FR-03) cố ý không xin Stitch vẽ: nó là lỗi hiện ngay
 * trên form, tức phải vẽ lại toàn bộ form — đúng loại Stitch làm hỏng ở S2.
 * Hiện thực thẳng bằng hành vi ở đây.
 */
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldValueInput } from '@/components/ui/field-value-input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Notice } from '@/components/ui/notice'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Ban, Copy, Lock, PencilLine } from 'lucide-vue-next'
import { BIEN_TU_SINH, DOI_CHIEU_NHAN_BAN, FIELD_MAU, MAU_DANG_SUA, DU_AN } from '@/du-lieu'

const m = ref({ ...MAU_DANG_SUA })
const field = ref(FIELD_MAU.map((f) => ({ ...f, nhan: f.nhan ? [...f.nhan] : undefined })))
const hopThoai = ref<null | 'nhanBan' | 'ngungDung'>(
  new URLSearchParams(location.search).get('hop') as 'nhanBan' | 'ngungDung' | null,
)
const daLuu = ref(false)

/* FR-03: tên mẫu không được trùng trong cùng một dự án. */
const TEN_DA_CO = ['Cấp quyền truy cập', 'Sự cố cần theo dõi', 'Bàn giao thiết bị']
const tenTrung = computed(() => TEN_DA_CO.includes(m.value.ten.trim()))

/* FR-04: bắt buộc + không có mặc định + khoá ⇒ mẫu KHÔNG lưu được.
   Trường bắt buộc mà trống nhưng CHO SỬA thì vẫn hợp lệ — người tạo điền sau. */
const ketDinh = computed(() => field.value.filter((f) => f.batBuoc && !String(f.giaTri).trim() && f.khoa))
const luuDuoc = computed(() => !tenTrung.value && ketDinh.value.length === 0 && m.value.ten.trim().length > 0)
</script>

<template>
  <Notice v-if="ketDinh.length" muc="loi" tieu-de="Mẫu này chưa lưu được" class="mb-4">
    {{ ketDinh.map(f => `"${f.ten}"`).join(', ') }} vừa là trường bắt buộc trên Jira, vừa chưa có giá trị
    mặc định, lại vừa bị khoá không cho người tạo nhập. Hãy khai giá trị hoặc bỏ khoá.
  </Notice>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 lg:col-span-4">
      <Card class="px-4">
        <CardHeader class="flex-row items-center justify-between p-0">
          <CardTitle>Thông tin mẫu</CardTitle>
          <Badge :class="m.trangThai === 'Đang dùng' ? 'bg-success-container text-on-success-container' : ''">
            {{ m.trangThai }}
          </Badge>
        </CardHeader>
        <CardContent class="flex flex-col gap-3 p-0">
          <div>
            <Label for="ten-mau" class="mb-1 block">Tên mẫu <span class="text-destructive">*</span></Label>
            <Input id="ten-mau" v-model="m.ten" :aria-invalid="tenTrung" />
            <p v-if="tenTrung" class="mt-1 text-overline text-destructive">
              Dự án {{ m.duAn }} đã có mẫu tên này. Tên mẫu phải khác nhau trong cùng một dự án.
            </p>
          </div>

          <div>
            <Label for="mo-ta-mau" class="mb-1 block">Mô tả mẫu</Label>
            <Textarea id="mo-ta-mau" v-model="m.moTa" class="min-h-16" />
          </div>

          <div>
            <Label for="du-an" class="mb-1 block">Dự án Jira đích</Label>
            <Select v-model="m.duAn">
              <SelectTrigger id="du-an" class="w-full" aria-label="Dự án Jira đích"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(d, k) in DU_AN" :key="k" :value="String(k)">{{ k }} — {{ d.ten }}</SelectItem>
              </SelectContent>
            </Select>
            <p class="mt-1 text-overline text-on-surface-variant">
              Muốn dùng mẫu này ở dự án khác thì phải nhân bản, không gán nhiều dự án.
            </p>
          </div>

          <div>
            <Label for="loai-issue" class="mb-1 block">Loại issue</Label>
            <Select v-model="m.loaiIssue">
              <SelectTrigger id="loai-issue" class="w-full" aria-label="Loại issue"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="l in ['Task', 'Bug', 'Story']" :key="l" :value="l">{{ l }}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label for="trang-thai" class="mb-1 block">Trạng thái mẫu</Label>
            <Select v-model="m.trangThai">
              <SelectTrigger id="trang-thai" class="w-full" aria-label="Trạng thái mẫu"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="t in ['Nháp', 'Đang dùng']" :key="t" :value="t">{{ t }}</SelectItem>
              </SelectContent>
            </Select>
            <p class="mt-1 text-overline text-on-surface-variant">Mẫu Nháp thì người tạo issue chưa thấy.</p>
          </div>

          <!-- FR-07: auto-Done ở cấp MẪU. S5b cấm cái này, S4 bắt buộc có. -->
          <div class="flex items-start justify-between gap-3 border-t border-outline-variant pt-3">
            <div>
              <Label for="tu-dong-dong">Tự động đóng issue sau khi tạo</Label>
              <p class="mt-1 text-overline text-on-surface-variant">
                Trạng thái đích lấy từ cấu hình của dự án, hiện là "Đã xong". Đây là công tắc của riêng mẫu này.
              </p>
            </div>
            <Switch id="tu-dong-dong" v-model="m.tuDongDong" aria-label="Tự động đóng issue sau khi tạo" />
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="col-span-12 lg:col-span-8">
      <Card>
        <CardHeader class="flex-row items-start justify-between gap-4 px-4">
          <div>
            <CardTitle>Giá trị mặc định của trường</CardTitle>
            <CardDescription>Cấu hình dữ liệu điền sẵn khi dùng mẫu này.</CardDescription>
          </div>
          <div class="flex shrink-0 flex-wrap items-center gap-1.5 text-overline text-on-surface-variant">
            <span>Biến tự sinh:</span>
            <span v-for="b in BIEN_TU_SINH" :key="b.bien" class="flex items-center gap-1">
              <code class="rounded-xs bg-surface-variant px-1 font-mono text-on-surface">{{ b.bien }}</code>{{ b.y }}
            </span>
          </div>
        </CardHeader>
        <CardContent class="overflow-x-auto p-0">
          <Table class="min-w-[640px]">
            <TableHeader>
              <TableRow>
                <TableHead class="w-[26%]">Tên trường và kiểu</TableHead>
                <TableHead class="w-[54%]">Giá trị mặc định</TableHead>
                <TableHead class="w-[20%]">Quyền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="f in field" :key="f.ma">
                <TableCell>
                  <div class="font-medium text-on-surface">
                    {{ f.ten }}<span v-if="f.batBuoc" class="text-destructive"> *</span>
                  </div>
                  <div class="mt-0.5 text-overline text-on-surface-variant">
                    {{ { chu1dong: 'Chữ 1 dòng', wiki: 'Nhiều dòng (wiki)', chonNguoi: 'Chọn người',
                         chonMot: 'Chọn một', chonNhieu: 'Chọn nhiều', ngay: 'Ngày', so: 'Số',
                         chonHaiTang: 'Chọn 2 tầng' }[f.kieu] }}
                  </div>
                </TableCell>

                <TableCell>
                  <FieldValueInput
                    :id="f.ma" v-model="f.giaTri" :kieu="f.kieu" :nhan-o="f.ten" :khoa="f.khoa"
                    :chon="f.chon" :chon2="f.chon2" :gia-tri2="f.giaTri2" :nhan="f.nhan"
                    @update:gia-tri2="(v: string) => (f.giaTri2 = v)"
                    @update:nhan="(v: string[]) => (f.nhan = v)" />
                </TableCell>

                <TableCell>
                  <Button variant="ghost" size="sm"
                          :class="f.khoa ? 'text-destructive' : 'text-primary'"
                          :aria-label="`${f.ten}: ${f.khoa ? 'đang khoá, bấm để cho sửa' : 'đang cho sửa, bấm để khoá'}`"
                          @click="f.khoa = !f.khoa">
                    <Lock v-if="f.khoa" /><PencilLine v-else />
                    {{ f.khoa ? 'Khoá' : 'Cho sửa' }}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </div>

  <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant pt-4">
    <div class="flex items-center gap-2">
      <Button variant="ghost" class="text-primary" @click="hopThoai = 'nhanBan'"><Copy />Nhân bản sang dự án khác</Button>
      <Button variant="ghost" class="text-destructive" @click="hopThoai = 'ngungDung'"><Ban />Ngừng dùng mẫu</Button>
    </div>
    <div class="flex items-center gap-2">
      <Button variant="ghost">Lưu nháp</Button>
      <Button :disabled="!luuDuoc" @click="daLuu = true">Lưu mẫu</Button>
    </div>
  </div>

  <!-- FR-10: nhân bản sang dự án khác — ĐỐI CHIẾU trước, liệt kê rõ từng chỗ hỏng -->
  <Dialog :open="hopThoai === 'nhanBan'" @update:open="(v: boolean) => !v && (hopThoai = null)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2"><Copy class="size-5 text-primary" />Nhân bản sang dự án khác</DialogTitle>
        <DialogDescription>Chép mẫu "{{ m.ten }}" sang {{ DOI_CHIEU_NHAN_BAN.duAnDich }}.</DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-2 text-body-sm">
        <Notice muc="canhBao" tieu-de="Có phần không mang sang được">
          <span v-for="(h, i) in DOI_CHIEU_NHAN_BAN.hong" :key="h.ten" class="block">
            {{ i + 1 }}. <span class="font-medium">{{ h.ten }}</span> — {{ h.vi }}
          </span>
        </Notice>
        <p class="text-on-surface-variant">
          {{ DOI_CHIEU_NHAN_BAN.nguyenVen }} trường còn lại mang sang nguyên vẹn. Những chỗ hỏng sẽ bị bỏ trống,
          và mẫu mới ở trạng thái <span class="font-medium text-on-surface">Nháp</span> cho tới khi bạn khai lại.
        </p>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="hopThoai = null">Huỷ</Button>
        <Button @click="hopThoai = null">Nhân bản</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- FR-10: ngừng dùng KHÁC xoá — lịch sử vẫn tra được -->
  <Dialog :open="hopThoai === 'ngungDung'" @update:open="(v: boolean) => !v && (hopThoai = null)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2"><Ban class="size-5 text-destructive" />Ngừng dùng mẫu này?</DialogTitle>
        <DialogDescription>"{{ m.ten }}" sẽ không còn hiện khi ai đó tạo issue.</DialogDescription>
      </DialogHeader>
      <Notice muc="thongTin" tieu-de="Đây không phải xoá">
        Lịch sử những issue đã tạo từ mẫu này vẫn tra cứu được bình thường. Bạn có thể bật dùng lại bất cứ lúc nào.
      </Notice>
      <DialogFooter>
        <Button variant="outline" @click="hopThoai = null">Huỷ</Button>
        <Button class="bg-error text-on-error" @click="hopThoai = null">Ngừng dùng</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
