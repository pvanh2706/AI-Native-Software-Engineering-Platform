<script setup lang="ts">
/**
 * S2 — Tạo issue từ mẫu. Convert từ 04-design/s2-tao-issue-tu-mau/form.html.
 *
 * Ba trạng thái mà bản thiết kế phải vẽ thành ba màn riêng, ở đây là HÀNH VI
 * THẬT: gửi khi thiếu trường bắt buộc → hiện lỗi Jira gắn đúng trường; gửi hợp
 * lệ → hộp thoại thành công. Hộp thoại "chuyển trạng thái lỗi" xem trước bằng
 * ?ketqua=transition (móc dành cho prototype, bỏ khi nối API thật).
 */
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Notice } from '@/components/ui/notice'
import { Textarea } from '@/components/ui/textarea'
import { TagsInput } from '@/components/ui/tags-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowRight, CircleAlert, CircleCheck, ExternalLink, Lock, RefreshCw, Sparkles } from 'lucide-vue-next'
import { MAU_MAC_DINH, WIKI_CU_PHAP, type Tmpl } from '@/du-lieu'

const props = defineProps<{ mau: Tmpl }>()

const f = ref({ ...MAU_MAC_DINH, nhan: [...MAU_MAC_DINH.nhan] })
const daGui = ref(false)
const ketQua = ref<null | 'ok' | 'transition'>(
  new URLSearchParams(location.search).get('ketqua') === 'transition' ? 'transition' : null,
)

/* FR-04: không tạo được nếu field Jira bắt buộc chưa có giá trị. */
const thieuBatBuoc = computed(() => !String(f.value.thoiGian).trim())
const loiJira = 'Field \'customfield_10312\' is required.'

function gui() {
  daGui.value = true
  if (thieuBatBuoc.value) return          // Jira từ chối — giữ nguyên dữ liệu đã nhập
  ketQua.value = 'ok'
}
function datLai() {
  f.value = { ...MAU_MAC_DINH, nhan: [...MAU_MAC_DINH.nhan] }
  daGui.value = false
}
</script>

<template>
  <!-- Dải báo lỗi: chỉ hiện sau khi bấm tạo và Jira từ chối (FR-06) -->
  <Notice v-if="daGui && thieuBatBuoc" muc="loi" tieu-de="Không tạo được issue trên Jira" class="mb-4">
    Jira từ chối yêu cầu. Chi tiết ở trường bị đánh dấu bên dưới. Dữ liệu bạn đã nhập vẫn được giữ nguyên.
  </Notice>

  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 flex flex-col gap-4 lg:col-span-7">
      <!-- Trường khoá: mẫu quy định, người tạo không sửa (FR-04) -->
      <section class="rounded-xs border border-outline-variant p-4">
        <div class="mb-3 flex items-center gap-1.5 text-body-sm font-medium text-on-surface-variant">
          <Lock class="size-4" />Trường cố định theo mẫu
        </div>
        <div class="grid grid-cols-3 gap-3">
          <div><Label for="loai-issue" class="mb-1 block">Loại issue</Label><Input id="loai-issue" :model-value="mau.loai" disabled /></div>
          <div><Label for="nguoi-duoc-giao" class="mb-1 block">Người được giao</Label><Input id="nguoi-duoc-giao" model-value="Phạm Việt Anh" disabled /></div>
          <div><Label for="nguoi-bao-cao" class="mb-1 block">Người báo cáo</Label><Input id="nguoi-bao-cao" model-value="Phạm Việt Anh" disabled /></div>
        </div>
      </section>

      <section class="flex flex-col gap-4 rounded-xs border border-outline-variant p-4">
        <div>
          <div class="mb-1 flex items-center justify-between">
            <Label for="tieu-de">Tiêu đề <span class="text-destructive">*</span></Label>
            <Badge variant="secondary"><Sparkles />Tự sinh</Badge>
          </div>
          <Input id="tieu-de" v-model="f.tieuDe" />
        </div>

        <div>
          <Label for="mo-ta" class="mb-1 block">Mô tả</Label>
          <div class="grid grid-cols-3 gap-3">
            <Textarea id="mo-ta" v-model="f.moTa" class="col-span-2 min-h-40 font-mono" />
            <div class="rounded-xs border border-outline-variant p-2">
              <div class="mb-1.5 text-overline font-medium text-on-surface-variant">Cú pháp wiki</div>
              <div v-for="c in WIKI_CU_PHAP" :key="c.cu" class="flex gap-2 py-0.5 text-overline">
                <code class="font-mono text-on-surface">{{ c.cu }}</code>
                <span class="text-on-surface-variant">{{ c.y }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="col-span-12 flex flex-col gap-4 lg:col-span-5">
      <section class="flex flex-col gap-4 rounded-xs border border-outline-variant p-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <Label for="do-uu-tien" class="mb-1 block">Độ ưu tiên</Label>
            <Select v-model="f.uuTien">
              <SelectTrigger class="w-full" aria-label="Độ ưu tiên"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="u in ['Thấp', 'Trung bình', 'Cao', 'Khẩn']" :key="u" :value="u">{{ u }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div class="mb-1 flex items-center justify-between">
              <Label for="han-hoan-thanh">Hạn hoàn thành</Label><Sparkles class="size-3.5 text-on-surface-variant" />
            </div>
            <Input id="han-hoan-thanh" v-model="f.han" type="date" />
          </div>
        </div>

        <div>
          <Label for="nhan" class="mb-1 block">Nhãn</Label>
          <TagsInput v-model="f.nhan" placeholder="Thêm nhãn…" />
        </div>

        <div :class="daGui && thieuBatBuoc ? 'rounded-xs border border-destructive bg-danger-container/30 p-2' : ''">
          <Label for="thoi-gian" class="mb-1 block" :class="daGui && thieuBatBuoc ? 'text-on-danger-container' : ''">
            Thời gian thực tế đã bỏ ra để xử lý (phút) <span class="text-destructive">*</span>
          </Label>
          <Input id="thoi-gian" v-model="f.thoiGian" type="number" placeholder="Chưa có giá trị"
                 :aria-invalid="daGui && thieuBatBuoc" />
          <p v-if="daGui && thieuBatBuoc" class="mt-1 text-overline text-destructive">
            Jira trả về: <span class="font-mono">{{ loiJira }}</span>
          </p>
        </div>
      </section>

      <section class="flex flex-col gap-4 rounded-xs border border-outline-variant p-4">
        <div>
          <Label for="nhom-ho-tro" class="mb-1 block">Nhóm hỗ trợ</Label>
          <div class="flex items-center gap-2">
            <Select v-model="f.nhomTren">
              <SelectTrigger class="w-full" aria-label="Nhóm hỗ trợ — khối"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="n in ['Khối văn phòng', 'Khối sản xuất']" :key="n" :value="n">{{ n }}</SelectItem>
              </SelectContent>
            </Select>
            <span class="text-on-surface-variant">/</span>
            <Select v-model="f.nhomDuoi">
              <SelectTrigger class="w-full" aria-label="Nhóm hỗ trợ — địa điểm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem v-for="n in ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh']" :key="n" :value="n">{{ n }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label for="nguoi-yeu-cau" class="mb-1 block">Người yêu cầu</Label>
          <Input id="nguoi-yeu-cau" v-model="f.nguoiYeuCau" />
        </div>
      </section>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-2 border-t border-outline-variant pt-4">
    <Button variant="ghost" @click="datLai()">Đặt lại theo mẫu</Button>
    <Button @click="gui()">Tạo issue<ArrowRight /></Button>
  </div>

  <!-- Tạo xong, đóng tự động thành công -->
  <Dialog :open="ketQua === 'ok'" @update:open="(v: boolean) => !v && (ketQua = null)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <CircleCheck class="size-5 text-on-success-container" />Tạo issue thành công
        </DialogTitle>
        <DialogDescription>
          Issue <span class="font-mono font-bold text-primary">ITSUP-2483</span> đã được tạo và chuyển sang
          trạng thái <span class="font-medium text-on-success-container">Đã xong</span>.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline"><ExternalLink />Mở trên Jira</Button>
        <Button @click="ketQua = null; datLai()">Tạo tiếp từ mẫu này</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Tạo xong NHƯNG chuyển trạng thái hỏng (FR-08).
       Phải nhìn ra ngay là KHÁC ca tạo hỏng: dẫn bằng thành công, dùng cảnh báo
       chứ không dùng lỗi, và nói rõ đi được tới đâu / hỏng ở bước nào. -->
  <Dialog :open="ketQua === 'transition'" @update:open="(v: boolean) => !v && (ketQua = null)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <CircleAlert class="size-5 text-on-warning-container" />
          Issue ITSUP-2484 đã được tạo thành công
        </DialogTitle>
        <DialogDescription>Tuy nhiên, bước tự động chuyển trạng thái đã thất bại.</DialogDescription>
      </DialogHeader>
      <div class="flex flex-col gap-2 text-body-sm">
        <div class="flex items-center justify-between rounded-xs bg-surface-variant px-3 py-2">
          <span class="text-on-surface-variant">Trạng thái hiện tại</span>
          <Badge variant="secondary">Chờ duyệt</Badge>
        </div>
        <div class="rounded-xs border-l-2 border-destructive bg-warning-container p-3 text-on-warning-container">
          <div>Hỏng ở bước chuyển từ "Chờ duyệt" sang "Đã xong".</div>
          <div class="mt-1 font-mono">Lý do: thiếu quyền thực hiện transition.</div>
        </div>
        <p class="text-on-surface-variant">
          Issue đã được ghi nhận, không cần tạo lại. Thử lại sẽ đi tiếp từ trạng thái hiện tại.
        </p>
      </div>
      <DialogFooter>
        <Button variant="outline"><ExternalLink />Mở trên Jira</Button>
        <Button @click="ketQua = null"><RefreshCw />Thử lại việc chuyển trạng thái</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
