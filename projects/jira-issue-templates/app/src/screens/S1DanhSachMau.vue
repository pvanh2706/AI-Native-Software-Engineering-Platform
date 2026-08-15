<script setup lang="ts">
/** S1 — Danh sách mẫu issue. Convert từ 04-design/s1-danh-sach-mau/code.html. */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableEmpty, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowRight, Ban, Bug, CircleAlert, CircleCheck } from 'lucide-vue-next'
import type { Tmpl, IssueGanDay } from '@/du-lieu'

defineProps<{ mau: Tmpl[]; ganDay: IssueGanDay[] }>()
const emit = defineEmits<{ (e: 'tao-issue', t: Tmpl): void }>()
const dungDuoc = (t: Tmpl) => t.trang === 'active'
</script>

<template>
  <section class="rounded-xs border border-outline-variant">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[30%]">Tên mẫu</TableHead>
          <TableHead class="w-[15%]">Loại Issue</TableHead>
          <TableHead class="w-[15%]">Trạng thái đích</TableHead>
          <TableHead class="w-[15%]">Trạng thái mẫu</TableHead>
          <TableHead class="w-[25%] text-right">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="t in mau" :key="t.ten" :class="t.trang === 'invalid' ? 'bg-danger-container/30' : ''">
          <TableCell>
            <div class="flex items-center gap-2">
              <span :class="[
                t.trang === 'invalid' ? 'text-on-surface line-through decoration-destructive'
                : t.trang === 'draft' ? 'italic text-on-surface-variant' : 'font-bold text-on-surface']">{{ t.ten }}</span>
              <Badge v-if="t.macDinh">Mặc định</Badge>
            </div>
          </TableCell>
          <TableCell :class="t.trang === 'active' ? 'text-on-surface' : 'text-on-surface-variant'">
            <span v-if="t.loai === 'Bug'" class="flex items-center gap-1 text-destructive"><Bug class="size-4" />Bug</span>
            <template v-else>{{ t.loai }}</template>
          </TableCell>
          <TableCell :class="t.trang === 'active' ? 'text-on-surface' : 'text-on-surface-variant'">{{ t.dich }}</TableCell>
          <TableCell>
            <span v-if="t.trang === 'active'" class="font-medium text-primary">Đang bật</span>
            <span v-else-if="t.trang === 'draft'" class="font-medium text-on-surface-variant">Nháp</span>
            <span v-else class="flex flex-col">
              <span class="font-medium text-destructive">Không hợp lệ</span>
              <span class="mt-0.5 max-w-50 text-overline text-on-danger-container">{{ t.lyDo }}</span>
            </span>
          </TableCell>
          <TableCell class="text-right">
            <Button v-if="dungDuoc(t)" variant="ghost" size="sm" class="text-primary" @click="emit('tao-issue', t)">
              Tạo issue<ArrowRight />
            </Button>
            <Button v-else variant="ghost" size="sm" disabled class="text-on-surface-variant">
              Tạo issue<Ban v-if="t.trang === 'invalid'" /><ArrowRight v-else />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>

  <h2 class="mb-3 mt-6 text-title-lg font-semibold text-on-surface">Issue gần đây</h2>
  <section class="rounded-xs border border-outline-variant">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[15%]">Key</TableHead>
          <TableHead class="w-[30%]">Tên mẫu đã dùng</TableHead>
          <TableHead class="w-[20%]">Người tạo</TableHead>
          <TableHead class="w-[15%]">Thời gian</TableHead>
          <TableHead class="w-[20%]">Kết quả</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty v-if="!ganDay.length" :colspan="5">
          <div class="font-medium text-on-surface">Chưa có issue nào tạo từ dự án này</div>
          <div class="mt-1 text-body-sm text-on-surface-variant">Chọn một mẫu ở trên để bắt đầu.</div>
        </TableEmpty>
        <TableRow v-for="r in ganDay" :key="r.key">
          <TableCell><span class="font-mono font-bold text-primary">{{ r.key }}</span></TableCell>
          <TableCell>{{ r.mau }}</TableCell>
          <TableCell class="text-on-surface-variant">{{ r.nguoi }}</TableCell>
          <TableCell class="font-mono text-on-surface-variant">{{ r.luc }}</TableCell>
          <TableCell>
            <span class="flex items-center gap-1 font-medium" :class="r.ok ? 'text-on-success-container' : 'text-destructive'">
              <CircleCheck v-if="r.ok" class="size-4" /><CircleAlert v-else class="size-4" />
              {{ r.ketQua }}
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>
</template>
