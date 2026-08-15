<script setup lang="ts">
/**
 * TagsInput — ô nhập nhiều nhãn dạng chip.
 *
 * Thêm vào registry 11/08/2026: S2 cần ô Nhãn (FR-04 — field kiểu "chọn nhiều"),
 * mà registry chưa có nên phải viết tay ngay trong màn. Tách ra đây để màn nào
 * cần cũng dùng lại được, và để CMP-01 phản ánh đúng thực tế.
 *
 * Tự chứa, không thêm phụ thuộc: bản của reka-ui kéo theo API riêng mà ở đây
 * chưa cần tới.
 */
import type { HTMLAttributes } from 'vue'
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<{
  modelValue: string[]
  placeholder?: string
  disabled?: boolean
  class?: HTMLAttributes['class']
}>()
const emits = defineEmits<{ (e: 'update:modelValue', v: string[]): void }>()

const nhap = ref('')

function them() {
  const t = nhap.value.trim()
  if (!t || props.modelValue.includes(t)) { nhap.value = ''; return }
  emits('update:modelValue', [...props.modelValue, t])
  nhap.value = ''
}
function bo(t: string) {
  emits('update:modelValue', props.modelValue.filter((x) => x !== t))
}
/* Backspace ở ô rỗng thì gỡ nhãn cuối — thao tác quen thuộc, đỡ phải rê chuột. */
function phim(e: KeyboardEvent) {
  if (e.key === 'Backspace' && !nhap.value && props.modelValue.length) bo(props.modelValue[props.modelValue.length - 1])
}
</script>

<template>
  <div
    data-slot="tags-input"
    :class="cn(
      'border-input focus-within:border-ring focus-within:ring-ring/50 flex min-h-8 w-full flex-wrap items-center gap-1.5 rounded-lg border bg-transparent px-1.5 py-1 transition-colors focus-within:ring-3',
      disabled && 'pointer-events-none bg-surface-variant',
      props.class,
    )"
  >
    <span
      v-for="t in modelValue"
      :key="t"
      data-slot="tags-input-item"
      class="bg-secondary text-secondary-foreground inline-flex h-7 shrink-0 items-center gap-0.5 rounded-4xl py-0.5 pl-2 pr-0.5 text-xs font-medium"
    >
      {{ t }}
      <button
        v-if="!disabled"
        type="button"
        class="hover:text-destructive hover:bg-surface-variant grid size-6 shrink-0 place-items-center rounded-full"
        :aria-label="`Bỏ nhãn ${t}`"
        @click="bo(t)"
      >
        <X class="size-3" />
      </button>
    </span>

    <input
      v-model="nhap"
      data-slot="tags-input-field"
      :disabled="disabled"
      :placeholder="placeholder"
      :aria-label="placeholder || 'Thêm nhãn'"
      class="placeholder:text-muted-foreground h-6 min-w-24 flex-1 bg-transparent px-1 text-sm outline-none"
      @keydown.enter.prevent="them()"
      @keydown="phim"
      @blur="them()"
    >
  </div>
</template>
