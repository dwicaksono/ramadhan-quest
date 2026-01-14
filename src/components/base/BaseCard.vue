<script setup lang="ts">
/**
 * BaseCard - Reusable card container component
 * Bento-style card with optional variants
 */
defineProps<{
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'md' | 'lg' | 'xl' | '2xl'
  shadow?: boolean
}>()
</script>

<template>
  <div
    class="bg-white transition-all duration-200"
    :class="[
      // Padding variants
      {
        'p-0': padding === 'none',
        'p-3': padding === 'sm',
        'p-4': padding === 'md' || !padding,
        'p-6': padding === 'lg',
      },
      // Rounded variants
      {
        'rounded-xl': rounded === 'md',
        'rounded-2xl': rounded === 'lg' || !rounded,
        'rounded-3xl': rounded === 'xl',
        'rounded-[2rem]': rounded === '2xl',
      },
      // Shadow
      shadow !== false ? 'shadow-sm' : '',
      // Variant
      {
        'bg-white dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700': variant === 'default' || !variant,
        'bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800': variant === 'primary',
        'bg-secondary-50 dark:bg-secondary-800 border border-secondary-100 dark:border-secondary-700': variant === 'secondary',
        'bg-accent-50 dark:bg-accent-900/20 border border-accent-100 dark:border-accent-800': variant === 'accent',
      },
    ]"
  >
    <slot />
  </div>
</template>
