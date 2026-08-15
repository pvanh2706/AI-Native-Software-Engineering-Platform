<script setup lang="ts">
/**
 * Notice — dải thông báo có biểu tượng, tiêu đề và lời giải thích.
 *
 * Thêm vào registry 11/08/2026: cùng một cấu trúc lặp ở ít nhất ba chỗ —
 * dải "chỉ xem" của S5b, dải báo lỗi Jira của S2, và cảnh báo thiếu quyền.
 * Mỗi chỗ tự dựng lại là mỗi chỗ tự quên một thứ (biểu tượng, vai trò aria,
 * hoặc màu nền không đủ tương phản).
 *
 * KHÔNG dùng độ mờ để phân biệt mức độ — dùng cặp token container/on-container,
 * vốn đã kiểm tương phản sẵn ở design system (AP-11).
 */
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  muc?: 'thongTin' | 'canhBao' | 'loi' | 'thanhCong'
  tieuDe?: string
  class?: HTMLAttributes['class']
}>(), { muc: 'thongTin' })

const KIEU = {
  thongTin: { nen: 'bg-surface-variant text-on-surface-variant', icon: Info, vai: 'status' },
  canhBao: { nen: 'bg-warning-container text-on-warning-container', icon: TriangleAlert, vai: 'status' },
  loi: { nen: 'bg-danger-container text-on-danger-container', icon: CircleAlert, vai: 'alert' },
  thanhCong: { nen: 'bg-success-container text-on-success-container', icon: CircleCheck, vai: 'status' },
} as const
const k = computed(() => KIEU[props.muc])
</script>

<template>
  <div
    data-slot="notice"
    :role="k.vai"
    :class="cn('flex items-start gap-2 rounded-xs p-3', k.nen, props.class)"
  >
    <component :is="k.icon" class="mt-0.5 size-5 shrink-0" />
    <div>
      <p v-if="tieuDe" class="font-medium">{{ tieuDe }}</p>
      <p :class="tieuDe && 'mt-0.5 text-body-sm'"><slot /></p>
    </div>
  </div>
</template>
