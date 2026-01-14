<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['update:modelValue'])

defineProps<{
  modelValue: boolean
  title?: string
}>()

function close() {
  emit('update:modelValue', false)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          class="bg-white dark:bg-[#1E1E1E] w-full max-w-sm rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/5 overflow-hidden transform transition-all"
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-stone-100 dark:border-white/5 flex items-center justify-between bg-stone-50/50 dark:bg-white/5">
            <h3 class="font-bold text-lg text-secondary-900 dark:text-white">
              {{ title }}
            </h3>
            <button
              @click="close"
              class="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-secondary-500 dark:text-stone-400"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 max-h-[70vh] overflow-y-auto">
            <slot />
          </div>

          <!-- Footer (Optional) -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-stone-100 dark:border-white/5 bg-stone-50/50 dark:bg-white/5">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
