<script setup lang="ts">
/**
 * App-shell — khung cố định, chỉ vùng nội dung cuộn (RES-12 / AP-19).
 * Đóng gói ở đây MỘT lần để không màn nào phải tự dựng lại và tự mắc lại lỗi
 * "khối tài khoản ở đáy thanh bên bị đẩy khỏi khung nhìn".
 */
</script>

<template>
  <header class="flex-none flex items-center gap-3 whitespace-nowrap h-8 px-4
                 bg-sf-high border-b border-outline-variant text-body-sm text-on-surface-variant">
    <slot name="topbar" />
  </header>
  <div class="flex flex-1 min-h-0 overflow-hidden w-full">
    <aside class="w-[260px] flex-none overflow-y-auto flex flex-col gap-px p-2
                  bg-sf-low border-r border-outline-variant">
      <slot name="sidebar" />
    </aside>
    <main class="flex-1 min-w-0 overflow-y-auto px-8 py-6">
      <div class="max-w-[1040px]"><slot /></div>
    </main>
  </div>
</template>
