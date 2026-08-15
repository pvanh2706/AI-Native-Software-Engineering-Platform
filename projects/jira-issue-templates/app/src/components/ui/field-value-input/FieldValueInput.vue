<script setup lang="ts">
/**
 * FieldValueInput — một ô khai giá trị, tự chọn dạng ô theo KIỂU của field Jira.
 *
 * Thêm vào registry 11/08/2026 khi convert S4: màn soạn mẫu có 10 dòng, mỗi
 * dòng một kiểu field khác nhau (FR-04). Không tách ra thì mỗi dòng là một
 * chuỗi v-if viết tay ngay trong màn — vừa tụt CMP-01, vừa là chỗ để quên một
 * kiểu khi Jira thêm field mới.
 *
 * Đây cũng là chỗ duy nhất biết kiểu field nào dựng bằng ô nào, nên thêm kiểu
 * mới chỉ phải sửa một file.
 */
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TagsInput } from '@/components/ui/tags-input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { KieuField } from '@/du-lieu'

const props = defineProps<{
  kieu: KieuField
  modelValue: string
  giaTri2?: string
  nhan?: string[]
  chon?: string[]
  chon2?: string[]
  id?: string
  nhanO: string
  khoa?: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'update:giaTri2', v: string): void
  (e: 'update:nhan', v: string[]): void
}>()
</script>

<template>
  <Textarea v-if="kieu === 'wiki'" :id="id" :model-value="modelValue" :disabled="khoa"
            :aria-label="nhanO" class="min-h-20 font-mono"
            @update:model-value="(v: string) => emit('update:modelValue', v)" />

  <TagsInput v-else-if="kieu === 'chonNhieu'" :model-value="nhan ?? []" :disabled="khoa"
             placeholder="Thêm nhãn…" @update:model-value="(v: string[]) => emit('update:nhan', v)" />

  <Select v-else-if="kieu === 'chonMot'" :model-value="modelValue" :disabled="khoa"
          @update:model-value="(v) => emit('update:modelValue', String(v))">
    <SelectTrigger :id="id" class="w-full" :aria-label="nhanO"><SelectValue /></SelectTrigger>
    <SelectContent><SelectItem v-for="c in chon" :key="c" :value="c">{{ c }}</SelectItem></SelectContent>
  </Select>

  <div v-else-if="kieu === 'chonHaiTang'" class="flex items-center gap-2">
    <Select :model-value="modelValue" :disabled="khoa" @update:model-value="(v) => emit('update:modelValue', String(v))">
      <SelectTrigger :id="id" class="w-full" :aria-label="`${nhanO} — cấp 1`"><SelectValue /></SelectTrigger>
      <SelectContent><SelectItem v-for="c in chon" :key="c" :value="c">{{ c }}</SelectItem></SelectContent>
    </Select>
    <span class="text-on-surface-variant">/</span>
    <Select :model-value="giaTri2 ?? ''" :disabled="khoa" @update:model-value="(v) => emit('update:giaTri2', String(v))">
      <SelectTrigger class="w-full" :aria-label="`${nhanO} — cấp 2`"><SelectValue /></SelectTrigger>
      <SelectContent><SelectItem v-for="c in chon2" :key="c" :value="c">{{ c }}</SelectItem></SelectContent>
    </Select>
  </div>

  <Input v-else :id="id" :model-value="modelValue" :disabled="khoa" :aria-label="nhanO"
         :type="kieu === 'so' ? 'number' : kieu === 'ngay' ? 'text' : 'text'"
         :placeholder="kieu === 'chonNguoi' ? 'Trống — chọn khi áp mẫu' : 'Chưa có giá trị'"
         @update:model-value="(v: string | number) => emit('update:modelValue', String(v))" />
</template>
