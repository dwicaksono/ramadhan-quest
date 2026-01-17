<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { BaseCard, BaseButton } from '@/components/base'
import confetti from 'canvas-confetti'
import { useAudio } from '@/composables/useAudio'

import { watch } from 'vue'

const gameStore = useGameStore()
const { playSfx } = useAudio()


// Trigger confetti when modal opens
watch(() => gameStore.state.showLevelUpModal, (newVal) => {
  if (newVal) {
    fireConfetti()
    playSfx('levelup')

  }
})

function fireConfetti() {
  const duration = 3000
  const end = Date.now() + duration

  ;(function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#10B981', '#F59E0B', '#FCD34D'] // Green, Orange, Gold
    })
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#10B981', '#F59E0B', '#FCD34D']
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }())
}

function handleClose() {
  gameStore.closeLevelUpModal()
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div 
      v-if="gameStore.state.showLevelUpModal" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <BaseCard class="w-full max-w-sm text-center relative overflow-visible transform transition-all scale-100">
        <!-- Badge Icon -->
        <div class="absolute -top-12 left-1/2 -translate-x-1/2">
          <div class="w-24 h-24 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg border-4 border-white">
            <span class="text-4xl">🏆</span>
          </div>
        </div>

        <div class="mt-10 space-y-4">
          <h2 class="text-2xl font-bold text-primary-900">Level Up!</h2>
          
          <div class="py-2">
            <p class="text-secondary-600">Kamu naik ke level</p>
            <p class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-600 to-emerald-500">
              {{ gameStore.state.level }}
            </p>
          </div>

          <p class="text-secondary-500 text-sm">
            Masya Allah! Terus tingkatkan ibadah dan kebaikanmu ya! ✨
          </p>

          <BaseButton 
            block 
            variant="primary" 
            class="text-lg font-bold shadow-xl shadow-primary-500/30"
            @click="handleClose"
          >
            Alhamdulillah! 🤲
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </Transition>
</template>
