import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { useGameStore } from './game'

export const useQuranStore = defineStore('quran', () => {
  const gameStore = useGameStore()
  
  // Persist completed Juz IDs
  const completedJuz = useStorage<number[]>('rq-quran-completed', [])
  
  // Computed
  const totalCompleted = computed(() => completedJuz.value.length)
  const isKhatam = computed(() => completedJuz.value.length === 30)
  const progressPercent = computed(() => Math.round((completedJuz.value.length / 30) * 100))

  // Actions
  function toggleJuz(juzId: number) {
    const index = completedJuz.value.indexOf(juzId)
    
    if (index === -1) {
      // Mark as complete
      completedJuz.value.push(juzId)
      // Award XP
      gameStore.addXP(100)
      return { completed: true, xpEarned: 100 }
    } else {
      // Mark as incomplete (optional: deduct XP? No, keep it friendly)
      completedJuz.value.splice(index, 1)
      return { completed: false, xpEarned: 0 }
    }
  }

  function isJuzCompleted(juzId: number) {
    return completedJuz.value.includes(juzId)
  }

  return {
    completedJuz,
    totalCompleted,
    isKhatam,
    progressPercent,
    toggleJuz,
    isJuzCompleted
  }
})
