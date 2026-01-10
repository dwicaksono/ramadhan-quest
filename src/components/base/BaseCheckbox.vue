<script setup lang="ts">
import { computed } from 'vue'

/**
 * BaseCheckbox - Reusable checkbox component
 * Used for habit tracking with custom styling
 */
const props = defineProps<{
  modelValue: boolean
  label?: string
  description?: string
  variant?: 'primary' | 'accent'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isChecked = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>

<template>
  <label class="flex items-start gap-3 cursor-pointer group">
    <!-- Checkbox -->
    <div class="relative flex-shrink-0 mt-0.5">
      <input
        v-model="isChecked"
        type="checkbox"
        class="sr-only peer"
      >
      <div
        class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
        :class="[
          isChecked
            ? variant === 'accent'
              ? 'bg-accent-500 border-accent-500'
              : 'bg-primary-500 border-primary-500'
            : 'border-secondary-300 group-hover:border-secondary-400',
        ]"
      >
        <!-- Checkmark -->
        <svg
          v-if="isChecked"
          class="w-3.5 h-3.5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    <!-- Label content -->
    <div class="flex-1 min-w-0">
      <span
        class="block text-base font-medium transition-all duration-200"
        :class="isChecked ? 'text-secondary-400 line-through' : 'text-secondary-800'"
      >
        {{ label }}
      </span>
      <span
        v-if="description"
        class="block text-sm text-secondary-500 mt-0.5"
      >
        {{ description }}
      </span>
    </div>
  </label>
</template>
