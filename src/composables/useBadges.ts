import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { BADGES, type BadgeId } from '@/types/badge'
import { useStorage } from '@vueuse/core'
import { toast } from 'vue-sonner'

const STORAGE_KEY = 'ramadan-quest-badges'

export function useBadges() {
  const gameStore = useGameStore()
  
  // Store unlocked badge IDs + timestamp
  // Format: { 'early_bird': '2025-03-01T04:00:00.000Z' }
  const unlockedBadges = useStorage<Record<string, string>>(STORAGE_KEY, {})

  // Get all badges with unlocked status
  const allBadges = computed(() => {
    return BADGES.map(badge => ({
      ...badge,
      unlockedAt: unlockedBadges.value[badge.id] || undefined,
      isUnlocked: !!unlockedBadges.value[badge.id]
    }))
  })

  // Count unlocked
  const unlockedCount = computed(() => Object.keys(unlockedBadges.value).length)

  /**
   * Check logic for specific badges.
   * This should be called after relevant actions (e.g. logging water).
   */
  function checkBadges() {
    const state = gameStore.state
    const newUnlocks: string[] = []

    // 1. First Step (Login)
    if (!unlockedBadges.value['first_step']) {
         unlock('first_step')
         newUnlocks.push('first_step')
    }

    // 2. Hydration Master (8 glasses)
    if (!unlockedBadges.value['hydration_master'] && state.waterLog >= 8) {
      unlock('hydration_master')
      newUnlocks.push('hydration_master')
    }

    // 3. Sedekah Warrior (5 times check - simplified as total amount for now or add counter later)
    // For now let's use a placeholder logic: > 50000 total donation
    if (!unlockedBadges.value['sedekah_warrior'] && state.sadaqahTotal >= 50000) {
      unlock('sedekah_warrior')
      newUnlocks.push('sedekah_warrior')
    }

    // 4. Streak Master (7 days)
    if (!unlockedBadges.value['streak_master'] && state.streak >= 7) {
      unlock('streak_master')
      newUnlocks.push('streak_master')
    }

    // 5. Pejuang Sahur (Time check)
    // We'll rely on a manual trigger or time check for this
    
    return newUnlocks
  }

  function unlock(badgeId: BadgeId) {
    if (unlockedBadges.value[badgeId]) return // Already unlocked

    const badge = BADGES.find(b => b.id === badgeId)
    if (!badge) return

    unlockedBadges.value[badgeId] = new Date().toISOString()
    
    // Toast Notification
    toast.success(`Badge Unlocked: ${badge.name}! ${badge.icon}`, {
      duration: 5000,
      description: badge.description
    })

    // XP Reward for Badge? Maybe later
    gameStore.addXP(100) // Bonus XP for Badge
  }

  return {
    allBadges,
    unlockedCount,
    checkBadges,
    unlock
  }
}
