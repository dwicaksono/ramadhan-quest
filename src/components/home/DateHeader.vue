<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

// Ramadan date calculation (simplified)
const ramadanDay = computed(() => {
  // This would normally use Hijri calendar library
  // For now, we'll show a placeholder
  return 12
})

const hijriYear = computed(() => 1445)

// Get current Maghrib time (simplified)
const maghribTime = computed(() => '18:32')

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 5) return 'Selamat Sahur'
  if (hour < 12) return 'Salam'
  if (hour < 18) return 'Salam'
  return 'Selamat Berbuka'
})
</script>

<template>
  <div class="space-y-4">
    <!-- User Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Avatar -->
        <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
          <span class="text-xl">🧕</span>
        </div>
        <div>
          <p class="text-sm text-secondary-500">{{ greeting }},</p>
          <p class="text-lg font-bold text-secondary-900">
            {{ gameStore.state.userName || 'Muslim' }}
          </p>
        </div>
      </div>

      <!-- Notification bell -->
      <button class="w-10 h-10 bg-secondary-50 rounded-full flex items-center justify-center hover:bg-secondary-100 transition-colors">
        <svg class="w-5 h-5 text-secondary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
    </div>

    <!-- Date Card -->
    <div class="bg-secondary-50 rounded-2xl px-4 py-3">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-secondary-500 uppercase tracking-wider">TODAY</p>
          <p class="text-lg font-bold text-secondary-900">
            {{ ramadanDay }}<sup>th</sup> Ramadan
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm font-medium text-secondary-600">{{ hijriYear }} AH</p>
          <p class="text-xs text-secondary-500 flex items-center gap-1">
            <span>🌙</span>
            Maghrib {{ maghribTime }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
