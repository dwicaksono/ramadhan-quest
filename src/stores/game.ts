import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GameState, CharacterMood } from '@/types/game'
import { XP_THRESHOLDS } from '@/types/game'

const STORAGE_KEY = 'ramadan-quest-game'

function getDefaultState(): GameState {
  return {
    xp: 0,
    level: 1,
    energy: 100,
    coins: 0,
    mood: 'happy',
    userName: '',
    lastActiveDate: new Date().toISOString().split('T')[0],
    streak: 0,
    showLevelUpModal: false,
    waterLog: 0,
    settings: {
      soundEnabled: true,
      hapticsEnabled: true
    }
  }
}

function loadFromStorage(): GameState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return { ...getDefaultState(), ...JSON.parse(stored) }
    } catch {
      return getDefaultState()
    }
  }
  return getDefaultState()
}

export const useGameStore = defineStore('game', () => {
  // State
  const state = ref<GameState>(loadFromStorage())

  // Getters
  const xpToNextLevel = computed(() => {
    const currentThreshold = XP_THRESHOLDS[state.value.level] || 0
    const nextThreshold = XP_THRESHOLDS[state.value.level + 1] || Infinity
    return nextThreshold - currentThreshold
  })

  const currentLevelProgress = computed(() => {
    const currentThreshold = XP_THRESHOLDS[state.value.level] || 0
    const nextThreshold = XP_THRESHOLDS[state.value.level + 1] || state.value.xp
    const progress = state.value.xp - currentThreshold
    const total = nextThreshold - currentThreshold
    return Math.min((progress / total) * 100, 100)
  })

  const energyPercentage = computed(() => state.value.energy)

  // Actions
  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.value))
  }

  function addXP(amount: number) {
    state.value.xp += amount
    checkLevelUp()
    updateMood()
    saveToStorage()
  }

  function addEnergy(amount: number) {
    state.value.energy = Math.min(100, Math.max(0, state.value.energy + amount))
    updateMood()
    saveToStorage()
  }

  function addCoins(amount: number) {
    state.value.coins += amount
    saveToStorage()
  }

  function setUserName(name: string) {
    state.value.userName = name
    saveToStorage()
  }

  function checkLevelUp() {
    const nextThreshold = XP_THRESHOLDS[state.value.level + 1]
    if (nextThreshold && state.value.xp >= nextThreshold) {
      state.value.level++
      state.value.mood = 'excited'
      state.value.showLevelUpModal = true
      // Excited for 1 hour
      state.value.excitedUntil = Date.now() + (60 * 60 * 1000)
    }
  }

  function closeLevelUpModal() {
    state.value.showLevelUpModal = false
  }

  function updateMood() {
    // If currently excited and time hasn't passed, don't change mood
    if (state.value.excitedUntil && Date.now() < state.value.excitedUntil) {
      state.value.mood = 'excited'
      return
    }

    if (state.value.energy < 20) {
      state.value.mood = 'tired'
    } else if (state.value.energy < 40) {
      state.value.mood = 'sad'
    } else if (state.value.energy < 60) {
      state.value.mood = 'neutral'
    } else {
      state.value.mood = 'happy'
    }
  }

  function setMood(mood: CharacterMood) {
    state.value.mood = mood
    saveToStorage()
  }

  function checkDailyLogin() {
    const today = new Date().toISOString().split('T')[0]
    if (state.value.lastActiveDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      if (state.value.lastActiveDate === yesterdayStr) {
        state.value.streak++
      } else {
        state.value.streak = 1
      }

      state.value.lastActiveDate = today
      state.value.energy = Math.min(100, state.value.energy + 20)
      
      // Reset Daily Counters
      state.value.waterLog = 0 
      
      saveToStorage()
      return true
    }
    return false
  }

  function reset() {
    state.value = getDefaultState()
    saveToStorage()
  }

  function toggleSound(enabled: boolean) {
    state.value.settings.soundEnabled = enabled
    saveToStorage()
  }

  function toggleHaptics(enabled: boolean) {
    state.value.settings.hapticsEnabled = enabled
    saveToStorage()
  }

  function logWater() {
    state.value.waterLog = (state.value.waterLog || 0) + 1
    // Reward for first 8 glasses
    if (state.value.waterLog <= 8) {
      addXP(5) 
      addEnergy(2)
    }
    saveToStorage()
    return state.value.waterLog
  }

  return {
    // State
    state,
    // Getters
    xpToNextLevel,
    currentLevelProgress,
    energyPercentage,
    // Actions
    addXP,
    addEnergy,
    addCoins,
    setUserName,
    setMood,
    checkDailyLogin,
    reset,
    closeLevelUpModal,
    toggleSound,
    toggleHaptics,
    logWater,
  }
})
