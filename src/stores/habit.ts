import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { HabitItem } from '@/types/habit'
import { DEFAULT_HABITS } from '@/types/habit'

const STORAGE_KEY = 'ramadan-quest-habits'

interface StoredHabitState {
  completedToday: string[]
  lastResetDate: string
}

function loadFromStorage(): StoredHabitState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return { completedToday: [], lastResetDate: '' }
    }
  }
  return { completedToday: [], lastResetDate: '' }
}

export const useHabitStore = defineStore('habit', () => {
  // State
  const habits = ref<HabitItem[]>(DEFAULT_HABITS)
  const storedState = loadFromStorage()
  const completedToday = ref<Set<string>>(new Set(storedState.completedToday))
  const lastResetDate = ref(storedState.lastResetDate)

  // Getters
  const completedCount = computed(() => completedToday.value.size)
  const totalCount = computed(() => habits.value.length)
  const progressPercentage = computed(() => 
    Math.round((completedCount.value / totalCount.value) * 100)
  )

  const todaysHabits = computed(() => 
    habits.value.map(habit => ({
      ...habit,
      isCompleted: completedToday.value.has(habit.id),
    }))
  )

  // Actions
  function saveToStorage() {
    const state: StoredHabitState = {
      completedToday: Array.from(completedToday.value),
      lastResetDate: lastResetDate.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  function toggleHabit(habitId: string): { xpEarned: number; wasCompleted: boolean } {
    const habit = habits.value.find(h => h.id === habitId)
    if (!habit) return { xpEarned: 0, wasCompleted: false }

    if (completedToday.value.has(habitId)) {
      completedToday.value.delete(habitId)
      saveToStorage()
      return { xpEarned: -habit.xpReward, wasCompleted: false }
    } else {
      completedToday.value.add(habitId)
      saveToStorage()
      return { xpEarned: habit.xpReward, wasCompleted: true }
    }
  }

  function isCompleted(habitId: string): boolean {
    return completedToday.value.has(habitId)
  }

  function checkDailyReset() {
    const today = new Date().toISOString().split('T')[0]
    if (lastResetDate.value !== today) {
      completedToday.value.clear()
      lastResetDate.value = today
      saveToStorage()
      return true
    }
    return false
  }

  function reset() {
    completedToday.value.clear()
    lastResetDate.value = ''
    saveToStorage()
  }

  // Auto-check daily reset on store init
  checkDailyReset()

  return {
    // State
    habits,
    completedToday,
    // Getters
    completedCount,
    totalCount,
    progressPercentage,
    todaysHabits,
    // Actions
    toggleHabit,
    isCompleted,
    checkDailyReset,
    reset,
  }
})
