<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  subtitle?: string
  backUrl?: string
  onBack?: () => void
}>()

const router = useRouter()

function handleBack() {
  if (props.onBack) {
    props.onBack()
  } else if (props.backUrl) {
    router.push(props.backUrl)
  } else {
    router.back()
  }
}
</script>

<template>
  <header class="mb-6">
    <div class="flex items-center gap-4 mb-4">
      <button 
        @click="handleBack"
        class="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 flex items-center justify-center text-secondary-600 dark:text-white hover:bg-stone-50 dark:hover:bg-white/10 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h1 class="text-2xl font-bold text-primary-800 dark:text-primary-400">{{ title }}</h1>
        <p v-if="subtitle" class="text-stone-500 dark:text-stone-400 text-sm">{{ subtitle }}</p>
      </div>
    </div>
    <slot name="bottom"></slot>
  </header>
</template>
