<script setup lang="ts">
/**
 * BaseProgress - Reusable progress bar component
 * Used for energy, XP, faith meter displays
 */
defineProps<{
  value: number
  max?: number
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
}>()
</script>

<template>
  <div class="w-full">
    <!-- Label row -->
    <div
      v-if="showLabel || label"
      class="flex justify-between items-center mb-1"
    >
      <span class="text-sm text-secondary-600">{{ label }}</span>
      <span class="text-sm font-medium text-secondary-700">
        {{ Math.round((value / (max || 100)) * 100) }}%
      </span>
    </div>
    
    <!-- Progress bar -->
    <div
      class="w-full bg-secondary-100 rounded-full overflow-hidden"
      :class="{
        'h-1.5': size === 'sm',
        'h-2.5': size === 'md' || !size,
        'h-4': size === 'lg',
      }"
    >
      <div
        class="h-full rounded-full transition-all duration-500 ease-out"
        :class="{
          'bg-primary-500': variant === 'primary' || !variant,
          'bg-secondary-400': variant === 'secondary',
          'bg-accent-500': variant === 'accent',
          'bg-green-500': variant === 'success',
          'bg-amber-500': variant === 'warning',
        }"
        :style="{ width: `${Math.min((value / (max || 100)) * 100, 100)}%` }"
      />
    </div>
  </div>
</template>
