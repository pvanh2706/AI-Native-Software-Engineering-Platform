<script setup lang="ts">
/**
 * App-shell — khung cố định, chỉ vùng nội dung cuộn (RES-12 / AP-19).
 *
 * Bố cục theo QĐ1 ở projects/jira-issue-templates/04-design/QUYET-DINH.md:
 *   · thanh bên 240px chạy hết chiều cao, khối tài khoản ghim ở đáy
 *   · thanh trên 64px chỉ nằm trên vùng nội dung: tiêu đề trái, ĐÚNG MỘT nút phải
 *   · không ô tìm kiếm toàn cục, không chuông, không trợ giúp, không avatar
 *
 * Đóng gói ở đây MỘT lần để không màn nào phải tự dựng lại và tự mắc lại lỗi
 * "khối tài khoản ở đáy thanh bên bị đẩy khỏi khung nhìn".
 */
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-surface text-on-surface">
    <aside class="flex w-[240px] flex-none flex-col overflow-y-auto border-r border-outline-variant p-3">
      <slot name="sidebar" />
    </aside>

    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <header class="flex h-16 flex-none items-center justify-between border-b border-outline-variant px-6">
        <slot name="title" />
        <slot name="action" />
      </header>
      <main class="min-w-0 flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
