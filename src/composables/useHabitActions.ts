import { useHabitStore } from '@/stores/habit'
import { useGameStore } from '@/stores/game'
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
  function toggleHabit(habitId: string) {
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
    completedToday
  }
}
