<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  { path: '/', name: 'Home', icon: 'home' },
  { path: '/dapur', name: 'Kitchen', icon: 'kitchen' },
  { path: '/dompet', name: 'Wallet', icon: 'wallet' },
  { path: '/profil', name: 'Profile', icon: 'profile' },
]

const currentPath = computed(() => route.path)

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <nav class="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white dark:bg-secondary-900 border-t border-secondary-100 dark:border-secondary-800 px-4 py-2 safe-bottom z-50">
    <div class="flex items-center justify-around">
      <button
        v-for="item in navItems"
        :key="item.path"
        :aria-label="item.name"
        class="flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200"
        :class="currentPath === item.path 
          ? 'text-primary-600 dark:text-primary-400' 
          : 'text-secondary-400 dark:text-secondary-600 hover:text-secondary-600 dark:hover:text-secondary-400'"
        @click="navigate(item.path)"
      >
        <!-- Home Icon -->
        <svg
          v-if="item.icon === 'home'"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>

        <!-- Kitchen Icon -->
        <svg
          v-else-if="item.icon === 'kitchen'"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>

        <!-- Wallet Icon -->
        <svg
          v-else-if="item.icon === 'wallet'"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        <!-- Profile Icon -->
        <svg
          v-else-if="item.icon === 'profile'"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>

        <span class="text-xs mt-1 font-medium">{{ item.name }}</span>
      </button>
    </div>
  </nav>
</template>
