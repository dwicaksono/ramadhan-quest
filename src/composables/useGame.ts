import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useHabitStore } from '@/stores/habit'
import { XP_REWARDS } from '@/types/game'

/**
 * Composable for game logic
 * Separates business logic from components
 */
export function useGame() {
  const gameStore = useGameStore()
  const habitStore = useHabitStore()

  // Character status computed
  const characterStatus = computed(() => {
    const { energy } = gameStore.state
    
    if (energy < 20) return 'Lemah sekali... butuh istirahat'
    if (energy < 40) return 'Agak lelah, tapi masih semangat!'
    if (energy < 60) return 'Cukup berenergi'
    if (energy < 80) return 'Berenergi tinggi!'
    return 'Penuh semangat! 💪'
  })

  const faithMeter = computed(() => {
    return habitStore.progressPercentage
  })

  // Time until iftar/sahur
  const timeUntilNextMeal = computed(() => {
    const now = new Date()
    const hours = now.getHours()
    
    // Simple logic - Maghrib around 18:00, Sahur around 04:00
    if (hours >= 4 && hours < 18) {
      // Fasting time - count to Maghrib (18:00)
      const maghrib = new Date(now)
      maghrib.setHours(18, 0, 0, 0)
      const diff = maghrib.getTime() - now.getTime()
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
      const minsLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return { 
        label: 'buka puasa',
        hours: hoursLeft, 
        minutes: minsLeft,
        isFasting: true
      }
    } else {
      // Night time - count to Imsak (04:00)
      const imsak = new Date(now)
      if (hours >= 18) {
        imsak.setDate(imsak.getDate() + 1)
      }
      imsak.setHours(4, 0, 0, 0)
      const diff = imsak.getTime() - now.getTime()
      const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
      const minsLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return { 
        label: 'imsak',
        hours: hoursLeft, 
        minutes: minsLeft,
        isFasting: false
      }
    }
  })

  // Daily login bonus
  function claimDailyBonus() {
    const isNewDay = gameStore.checkDailyLogin()
    if (isNewDay) {
      gameStore.addXP(XP_REWARDS.DAILY_LOGIN)
      if (gameStore.state.streak > 1) {
        gameStore.addXP(XP_REWARDS.STREAK_BONUS)
      }
      return {
        xpEarned: XP_REWARDS.DAILY_LOGIN + (gameStore.state.streak > 1 ? XP_REWARDS.STREAK_BONUS : 0),
        streak: gameStore.state.streak
      }
    }
    return null
  }

  // Complete a habit and earn XP
  function completeHabit(habitId: string) {
    const result = habitStore.toggleHabit(habitId)
    if (result.wasCompleted) {
      gameStore.addXP(result.xpEarned)
      gameStore.addEnergy(5)
    } else {
      // Uncompleting a habit reduces XP
      gameStore.addXP(result.xpEarned) // This will be negative
    }
    return result
  }

  // Complete cooking (from Kitchen module)
  function completeCooking() {
    gameStore.addXP(XP_REWARDS.COOK_RECIPE)
    gameStore.addEnergy(15)
    return {
      xpEarned: XP_REWARDS.COOK_RECIPE,
      energyGained: 15
    }
  }

  // Save budget (from Wallet module)
  function completeSaving() {
    gameStore.addXP(XP_REWARDS.SAVE_BUDGET)
    gameStore.addCoins(10)
    return {
      xpEarned: XP_REWARDS.SAVE_BUDGET,
      coinsEarned: 10
    }
  }

  return {
    // Store references
    gameStore,
    habitStore,
    // Computed
    characterStatus,
    faithMeter,
    timeUntilNextMeal,
    // Actions
    claimDailyBonus,
    completeHabit,
    completeCooking,
    completeSaving,
  }
}
