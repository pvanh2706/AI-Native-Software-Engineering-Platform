<script setup lang="ts">
import { cn } from '@/lib/utils'
defineProps<{ active?: boolean; class?: string }>()
</script>

<template>
  <button
    :class="cn(
      'flex items-center gap-2 w-full text-left h-8 px-2 rounded-xs text-body-md',
      'transition-colors duration-[120ms] hover:bg-surface-variant',
      active ? 'bg-primary-container text-on-primary-container font-medium' : 'text-on-surface',
      $props.class)">
    <slot />
  </button>
</template>
