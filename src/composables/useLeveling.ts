import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { XP_THRESHOLDS } from '@/types/game'

/**
 * useLeveling - Composable for level progression logic.
 * 
 * Provides computed values for current level, XP progress, and thresholds.
 */
export function useLeveling() {
  const gameStore = useGameStore()

  // Current level (directly from state)
  const level = computed(() => gameStore.state.level)

  // Total XP (directly from state)
  const xp = computed(() => gameStore.state.xp)

  // XP required for the CURRENT level (threshold to ENTER this level)
  const currentLevelThreshold = computed(() => {
    return XP_THRESHOLDS[level.value] || 0
  })

  // XP required for the NEXT level (threshold to ENTER next level)
  const nextLevelThreshold = computed(() => {
    return XP_THRESHOLDS[level.value + 1] || Infinity
  })

  // XP needed to reach the next level (from current XP)
  const xpToNextLevel = computed(() => {
    return Math.max(0, nextLevelThreshold.value - xp.value)
  })

  // XP earned within the current level "band"
  const xpInCurrentLevel = computed(() => {
    return xp.value - currentLevelThreshold.value
  })

  // Total XP required to complete the current level "band" (band size)
  const xpForCurrentLevelBand = computed(() => {
    return nextLevelThreshold.value - currentLevelThreshold.value
  })

  // Progress percentage (0-100) within the current level
  const progressPercent = computed(() => {
    if (xpForCurrentLevelBand.value === Infinity) return 100
    return Math.min((xpInCurrentLevel.value / xpForCurrentLevelBand.value) * 100, 100)
  })

  // Max level check
  const isMaxLevel = computed(() => {
    return !(level.value + 1 in XP_THRESHOLDS)
  })

  // Level title (for fun!)
  const levelTitle = computed(() => {
    const l = level.value
    if (l >= 30) return 'Wali Tercinta'
    if (l >= 25) return 'Mujahid Ramadhan'
    if (l >= 20) return 'Sahabat Puasa'
    if (l >= 15) return 'Penghafal Doa'
    if (l >= 10) return 'Santri Rajin'
    if (l >= 5) return 'Pemula Berbinar'
    return 'Petualang Baru'
  })

  return {
    level,
    xp,
    currentLevelThreshold,
    nextLevelThreshold,
    xpToNextLevel,
    xpInCurrentLevel,
    xpForCurrentLevelBand,
    progressPercent,
    isMaxLevel,
    levelTitle,
  }
}
