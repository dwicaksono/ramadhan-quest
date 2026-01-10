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
        'border border-secondary-100': variant === 'default' || !variant,
        'bg-primary-50 border border-primary-100': variant === 'primary',
        'bg-secondary-50 border border-secondary-100': variant === 'secondary',
        'bg-accent-50 border border-accent-100': variant === 'accent',
      },
    ]"
  >
    <slot />
  </div>
</template>
