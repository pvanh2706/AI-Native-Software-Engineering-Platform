<script setup lang="ts">
/**
 * Khung app + điều hướng. Bố cục thanh bên / thanh trên theo QĐ1
 * (04-design/QUYET-DINH.md).
 *
 * Theme đổi bằng ?theme=dark, màn đổi bằng ?man=s2 — KHÔNG thêm nút chuyển nào
 * vào giao diện, để ảnh chụp so với bản thiết kế không lẫn chrome của công cụ.
 */
import { computed, onMounted, ref } from 'vue'
import AppShell from '@/components/ui/AppShell.vue'
import NavItem from '@/components/ui/NavItem.vue'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, History, Lock, Plus, Settings, CircleUserRound } from 'lucide-vue-next'
import S1DanhSachMau from '@/screens/S1DanhSachMau.vue'
import S2TaoIssue from '@/screens/S2TaoIssue.vue'
import S3LichSuIssue from '@/screens/S3LichSuIssue.vue'
import S5aDanhSachDuAn from '@/screens/S5aDanhSachDuAn.vue'
import S5bChiTietDuAn from '@/screens/S5bChiTietDuAn.vue'
import S4SoanSuaMau from '@/screens/S4SoanSuaMau.vue'
import { DU_AN, DU_AN_CAU_HINH, type DongLichSu, type DuAnCauHinh, type Tmpl } from '@/du-lieu'

const daChon = ref('ITSUP')
const duAn = computed(() => DU_AN[daChon.value])
const man = ref<'s1' | 's2' | 's3' | 's4' | 's5a' | 's5b'>('s1')
const mauDangDung = ref<Tmpl | null>(null)
const rongCauHinh = ref(false)   // xem trước trạng thái chưa kết nối dự án nào
const khongKhopS3 = ref(false)   // xem trước trạng thái bộ lọc không khớp dòng nào

/* FR-05: khu cấu hình ĐỘC LẬP với dự án đang chọn ở thanh bên — nó giữ lựa
   chọn riêng, chọn trong danh sách của chính nó. Không dùng lại `daChon`. */
const duAnCauHinh = ref<DuAnCauHinh | null>(null)

function moTaoIssue(t: Tmpl) { mauDangDung.value = t; man.value = 's2' }
function veDanhSach() { man.value = 's1'; mauDangDung.value = null }
function moCauHinh() { man.value = 's5a'; duAnCauHinh.value = null }
function moSoanMau() { man.value = 's4' }
function moChiTiet(d: DuAnCauHinh) { duAnCauHinh.value = d; man.value = 's5b' }
function moLichSu() { man.value = 's3'; mauDangDung.value = null }

/* "Xem lại và tạo lại" của S3: mở lại chính mẫu đã hỏng, ở đúng dự án của dòng
   đó — không tạo lại ngầm. FR-09 chỉ cho phép DẪN sang màn tạo, không tự tạo. */
function taoLaiTuLichSu(d: DongLichSu) {
  daChon.value = d.duAn
  const p = DU_AN[d.duAn]
  const t = p?.mau.find((x: Tmpl) => x.ten === d.mau) ?? p?.mau[0]
  if (t) moTaoIssue(t)
}

onMounted(() => {
  const q = new URLSearchParams(location.search)
  document.documentElement.setAttribute('data-theme', q.get('theme') === 'dark' ? 'dark' : 'light')
  const m = q.get('man')
  if (m === 's2') moTaoIssue(duAn.value.mau[0])
  else if (m === 's3') moLichSu()
  else if (m === 's3-khong-khop') { moLichSu(); khongKhopS3.value = true }
  else if (m === 's5a') moCauHinh()
  else if (m === 's5a-rong') { moCauHinh(); rongCauHinh.value = true }
  else if (m === 's5b') moChiTiet(DU_AN_CAU_HINH[0])                       // ITSUP — có quyền quản trị
  else if (m === 's5b-chi-xem') moChiTiet(DU_AN_CAU_HINH[2])               // INFRA — chỉ xem
  else if (m === 's4') moSoanMau()
})
</script>

<template>
  <AppShell>
    <template #sidebar>
      <div class="mb-3 border-b border-outline-variant px-2 pb-3 pt-2">
        <div class="text-title-lg font-bold text-primary">Jira Automation</div>
      </div>

      <!-- Bộ chọn dự án — brief S1 yêu cầu, bản Stitch bỏ sót. Chi phối
           "Mẫu issue" và "Lịch sử issue"; KHÔNG chi phối khu cấu hình (FR-05). -->
      <div class="px-2 pb-1 text-overline font-medium text-on-surface-variant">Dự án Jira</div>
      <!-- Không tô dự án nào khi đang ở S3: màn đó có bộ lọc dự án riêng và có
           thêm lựa chọn "Tất cả" mà bộ chọn này không diễn đạt được (FR-09). -->
      <NavItem v-for="(p, k) in DU_AN" :key="k" :active="k === daChon && man !== 's3'"
               @click="daChon = String(k); veDanhSach()">
        <span class="rounded-xs bg-surface-variant px-1 font-mono text-overline font-bold text-on-surface-variant">{{ k }}</span>
        <span class="truncate">{{ p.ten }}</span>
        <Lock v-if="!p.quanTri" class="ml-auto size-3.5 shrink-0 text-on-surface-variant" />
      </NavItem>

      <div class="px-2 pb-1 pt-4 text-overline font-medium text-on-surface-variant">Trong dự án</div>
      <NavItem :active="man === 's1' || man === 's2'" @click="veDanhSach()"><FileText class="size-4" />Mẫu issue</NavItem>
      <NavItem :active="man === 's3'" @click="moLichSu()"><History class="size-4" />Lịch sử issue</NavItem>

      <div class="px-2 pb-1 pt-4 text-overline font-medium text-on-surface-variant">Quản trị</div>
      <NavItem :active="man === 's5a' || man === 's5b'" @click="moCauHinh()">
        <Settings class="size-4" />Cấu hình dự án
      </NavItem>

      <div class="mt-auto border-t border-outline-variant pt-2">
        <NavItem><CircleUserRound class="size-4" />Thông tin tài khoản</NavItem>
      </div>
    </template>

    <template #title>
      <h1 v-if="man === 's1'" class="text-headline text-on-surface">Mẫu issue Jira</h1>
      <h1 v-else-if="man === 's3'" class="text-headline text-on-surface">Lịch sử issue</h1>
      <h1 v-else-if="man === 's5a'" class="text-headline text-on-surface">Cấu hình dự án</h1>
      <div v-else-if="man === 's4'" class="flex items-center gap-2 text-body-sm text-on-surface-variant">
        <button class="flex h-6 items-center gap-1 rounded-xs px-1 hover:text-primary" @click="veDanhSach()">
          <ArrowLeft class="size-4" />Danh sách mẫu
        </button>
        <span>/</span>
        <span class="font-medium text-on-surface">Soạn mẫu</span>
      </div>
      <div v-else-if="man === 's5b'" class="flex items-center gap-2 text-body-sm text-on-surface-variant">
        <button class="flex h-6 items-center gap-1 rounded-xs px-1 hover:text-primary" @click="moCauHinh()">
          <ArrowLeft class="size-4" />Danh sách dự án
        </button>
        <span>/</span>
        <span class="font-medium text-on-surface">{{ duAnCauHinh?.ma }} — {{ duAnCauHinh?.ten }}</span>
        <span v-if="!duAnCauHinh?.quanTri" class="flex items-center gap-1 text-on-surface-variant">
          <Lock class="size-3.5" />Chỉ xem
        </span>
      </div>
      <div v-else class="flex items-center gap-2 text-body-sm text-on-surface-variant">
        <button class="flex h-6 items-center gap-1 rounded-xs px-1 hover:text-primary" @click="veDanhSach()">
          <ArrowLeft class="size-4" />Danh sách mẫu
        </button>
        <span>/</span>
        <span class="font-medium text-on-surface">{{ mauDangDung?.ten }}</span>
      </div>
    </template>

    <template #action>
      <!-- FR-11: chỉ người có quyền quản trị dự án mới thấy nút tạo mẫu. -->
      <template v-if="man === 's1'">
        <Button v-if="duAn.quanTri" @click="moSoanMau()"><Plus />Tạo mẫu mới</Button>
        <span v-else class="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
          <Lock class="size-3.5" />Chỉ xem — cần quyền quản trị dự án để sửa mẫu
        </span>
      </template>
    </template>

    <S1DanhSachMau v-if="man === 's1'" :mau="duAn.mau" :gan-day="duAn.ganDay" @tao-issue="moTaoIssue" />
    <S3LichSuIssue v-else-if="man === 's3'" :khong-khop="khongKhopS3" @tao-lai="taoLaiTuLichSu" />
    <S4SoanSuaMau v-else-if="man === 's4'" />
    <S5aDanhSachDuAn v-else-if="man === 's5a'" :rong="rongCauHinh" @mo="moChiTiet" />
    <S5bChiTietDuAn v-else-if="man === 's5b' && duAnCauHinh" :du-an="duAnCauHinh" />
    <S2TaoIssue v-else-if="mauDangDung" :mau="mauDangDung" />
  </AppShell>
</template>
