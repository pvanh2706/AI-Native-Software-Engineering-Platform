<script setup lang="ts">
/**
 * Khung khởi điểm. Thay nội dung `<main>` bằng màn hình của dự án.
 * GIỮ NGUYÊN AppShell — nó cưỡng chế khung cố định (RES-12 / AP-19):
 * khối tài khoản ở đáy thanh bên không bao giờ bị đẩy khỏi khung nhìn.
 */
import { ref, onMounted } from 'vue'
import AppShell from '@/components/ui/AppShell.vue'
import NavItem from '@/components/ui/NavItem.vue'
import KitPage from '@/KitPage.vue'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-vue-next'

const page = ref<'home' | 'kit'>('home')
const dark = ref(false)
function setTheme(d: boolean) {
  dark.value = d
  document.documentElement.setAttribute('data-theme', d ? 'dark' : 'light')
}
onMounted(() => setTheme(matchMedia?.('(prefers-color-scheme: dark)').matches ?? false))
</script>

<template>
  <AppShell>
    <template #topbar>
      <span class="text-title-md font-medium text-foreground">Tên ứng dụng</span>
      <span class="h-4 w-px bg-border" />
      <span>Design System v0.1</span>
      <span class="ml-auto" />
      <Button variant="ghost" size="icon-sm"
              :aria-label="dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'"
              @click="setTheme(!dark)">
        <Sun v-if="dark" /><Moon v-else />
      </Button>
    </template>

    <template #sidebar>
      <div class="px-2 pt-1 pb-1 text-overline font-medium uppercase tracking-wide text-muted-foreground">Ứng dụng</div>
      <NavItem :active="page === 'home'" @click="page = 'home'">Trang chính</NavItem>

      <div class="px-2 pt-4 pb-1 text-overline font-medium uppercase tracking-wide text-muted-foreground">Nền tảng</div>
      <NavItem :active="page === 'kit'" @click="page = 'kit'">Bộ component</NavItem>

      <div class="mt-auto border-t pt-2">
        <NavItem>
          <span class="grid size-6 flex-none place-items-center rounded-full bg-primary text-overline font-bold text-primary-foreground">?</span>
          <span>Người dùng</span>
        </NavItem>
      </div>
    </template>

    <KitPage v-if="page === 'kit'" />
    <div v-else>
      <h1 class="text-headline">Trang chính</h1>
      <p class="mt-1 text-muted-foreground">
        Thay khối này bằng màn hình của dự án. Xem <b>Bộ component</b> để biết được dùng những gì.
      </p>
    </div>
  </AppShell>
</template>
