<script setup lang="ts">
/**
 * Progress — thanh tiến độ.
 * Thêm vào registry 11/08/2026: S5a cần báo tiến độ lấy dữ liệu từ Jira
 * (FR-02 — quá 2 giây thì phải báo tiến độ và cho huỷ).
 *
 * Dùng <progress> gốc thay vì div giả: trình đọc màn hình hiểu ngay, không
 * phải tự gắn role/aria-valuenow rồi quên cập nhật.
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  value?: number
  max?: number
  label?: string
  class?: HTMLAttributes['class']
}>(), { value: 0, max: 100 })
</script>

<template>
  <progress
    data-slot="progress"
    :value="props.value"
    :max="props.max"
    :aria-label="props.label"
    :class="cn(
      'h-2 w-full overflow-hidden rounded-4xl border-none bg-surface-variant',
      '[&::-webkit-progress-bar]:bg-surface-variant [&::-webkit-progress-value]:rounded-4xl [&::-webkit-progress-value]:bg-primary',
      '[&::-moz-progress-bar]:rounded-4xl [&::-moz-progress-bar]:bg-primary',
      props.class,
    )"
  />
</template>
