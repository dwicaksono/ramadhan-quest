<script setup lang="ts">
/**
 * BaseButton - Reusable button component
 * Multiple variants and sizes for different use cases
 */
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  loading?: boolean
  disabled?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    class="inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
    :class="[
      // Size variants
      {
        'px-3 py-1.5 text-sm rounded-lg gap-1.5': size === 'sm',
        'px-4 py-2.5 text-base rounded-xl gap-2': size === 'md' || !size,
        'px-6 py-3 text-lg rounded-2xl gap-2.5': size === 'lg',
      },
      // Block
      block ? 'w-full' : '',
      // Variant
      {
        'bg-primary-500 text-white hover:bg-primary-600 shadow-sm border border-transparent': variant === 'primary' || !variant,
        'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 dark:bg-[#121212] dark:text-white dark:border dark:border-white/10 dark:hover:bg-white/5': variant === 'secondary',
        'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20': variant === 'outline',
        'text-secondary-600 hover:bg-secondary-100 dark:text-gray-300 dark:hover:bg-white/5': variant === 'ghost',
        'bg-accent-500 text-white hover:bg-accent-600 shadow-sm border border-transparent': variant === 'accent',
      },
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <slot v-else />
  </button>
</template>
