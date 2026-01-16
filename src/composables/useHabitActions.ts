import { useHabitStore } from '@/stores/habit'
import { useGameStore } from '@/stores/game'
import { usePrayerTimes } from '@/composables/usePrayerTimes'
import { useNow } from '@vueuse/core'
import { storeToRefs } from 'pinia'

/**
 * Composable to handle habit interactions
 * Separates business logic from UI components
 */
export function useHabitActions() {
  const habitStore = useHabitStore()
  const gameStore = useGameStore()
  const { completedToday } = storeToRefs(habitStore)

  /**
   * Toggles a habit and updates XP/Game state
   * @param habitId The ID of the habit to toggle
   * @returns object containing the result of the action
   */
  const { formattedTimes } = usePrayerTimes()
  const now = useNow()

  function checkHabitEligibility(habit: any) {
    if (!habit.prayerTimeKey) return { eligible: true }
    
    const prayerTime = formattedTimes.value?.[habit.prayerTimeKey as keyof typeof formattedTimes.value]
    if (!prayerTime) return { eligible: true } // Fallback if time not found

    // Compare time: prayerTime (HH:mm) vs now (HH:mm)
    // We can use simple string comparison for 24h format: "13:00" > "12:00"
    const currentTime = now.value.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    
    // Eligible if Current Time >= Prayer Time
    if (currentTime >= prayerTime) {
      return { eligible: true }
    }

    return { 
      eligible: false, 
      message: `Belum waktunya sholat ${habit.name.replace('Sholat ', '')}` 
    }
  }

  /**
   * Toggles a habit and updates XP/Game state
   * @param habitId The ID of the habit to toggle
   * @returns object containing the result of the action
   */
  function toggleHabit(habitId: string) {
    const habit = habitStore.habits.find(h => h.id === habitId)
    
    // Check eligibility before toggling
    if (habit) {
      const { eligible, message } = checkHabitEligibility(habit)
      if (!eligible) {
        return {
          success: false,
          message,
          xpEarned: 0,
          isCompleted: false
        }
      }
    }

    const { xpEarned, wasCompleted } = habitStore.toggleHabit(habitId)
    
    // Update game state (add/remove XP)
    if (xpEarned !== 0) {
      gameStore.addXP(xpEarned)
    }

    // You could add side effects here like:
    // - Triggering sound effects
    // - Sending analytics events
    // - Showing global toast notifications

    return {
      success: true,
      xpEarned,
      isCompleted: wasCompleted
    }
  }

  function isHabitCompleted(habitId: string) {
    return habitStore.isCompleted(habitId)
  }

  return {
    toggleHabit,
    isHabitCompleted,
    completedToday,
    checkHabitEligibility // Export for UI state
  }
}
