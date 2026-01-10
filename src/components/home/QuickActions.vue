<script setup lang="ts">
import { BaseButton } from '@/components/base'
</script>

<template>
  <div class="flex gap-3">
    <BaseButton
      variant="secondary"
      size="sm"
      class="flex-1"
    >
      <span class="mr-1">💧</span>
      Log Water
    </BaseButton>

    <BaseButton
      variant="secondary"
      size="sm"
      class="flex-1"
    >
      <span class="mr-1">🕌</span>
      Prayer Guide
    </BaseButton>

    <!-- FAB Button -->
    <button class="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  </div>
</template>
