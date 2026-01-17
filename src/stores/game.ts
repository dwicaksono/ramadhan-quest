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
    avatarId: 'male_peci',
    lastActiveDate: new Date().toISOString().split('T')[0],
    streak: 0,
    showLevelUpModal: false,
    waterLog: 0,
    sadaqahTotal: 0,
    sahurStreak: 0,
    lastSahurLog: '',
    tarawihLogs: [],
    settings: {
      soundEnabled: true,
      // duplicate removed
      // hapticsEnabled removed
    },
    lastAcknowledgedLevel: 1
  }
}

function loadFromStorage(): GameState {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      return { 
        ...getDefaultState(), 
        ...parsed,
        // CRITICAL FIX: Ensure modal is hidden on reload if level matches acknowledged
        showLevelUpModal: parsed.level > (parsed.lastAcknowledgedLevel || 0) ? parsed.showLevelUpModal : false
      }
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
    
    // Check if enough XP for next level
    if (nextThreshold && state.value.xp >= nextThreshold) {
      state.value.level++
      state.value.mood = 'excited'
      
      // Only show modal if this level hasn't been acknowledged yet
      // This might be redundant if we just check logic, but safest for UX
      state.value.showLevelUpModal = true 
      
      // Excited for 1 hour
      state.value.excitedUntil = Date.now() + (60 * 60 * 1000)
    }
  }

  function closeLevelUpModal() {
    // When closing, acknowledge the current level
    state.value.lastAcknowledgedLevel = state.value.level
    state.value.showLevelUpModal = false
    saveToStorage()
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

  /* 
  function toggleHaptics(enabled: boolean) {
    state.value.settings.hapticsEnabled = enabled
    saveToStorage()
  }
  */

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

  function logSadaqah(amount: number) {
    state.value.sadaqahTotal = (state.value.sadaqahTotal || 0) + amount
    // Big reward for charity
    addXP(50)
    addEnergy(10)
    saveToStorage()
    return state.value.sadaqahTotal
  }

  function logTarawih(rakaat: number) {
    const today = new Date().toDateString()
    const alreadyLogged = state.value.tarawihLogs.some(log => log.date === today)
    
    if (alreadyLogged) return false
    
    // Log it
    state.value.tarawihLogs.push({ date: today, rakaat })
    
    // Rewards
    addXP(50) // Big reward for Tarawih
    
    return true
  }

  function logSahur() {
    const today = new Date().toISOString().split('T')[0]
    
    // Prevent multiple logs per day
    if (state.value.lastSahurLog === today) {
      return false
    }

    // Check Streak Logic
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]

    if (state.value.lastSahurLog === yesterdayStr) {
      state.value.sahurStreak = (state.value.sahurStreak || 0) + 1
    } else {
      state.value.sahurStreak = 1
    }

    state.value.lastSahurLog = today // Mark as done for today
    
    // Grant Rewards
    addXP(50) // Big bonus for waking up early
    addEnergy(100) // Full energy refill
    setMood('excited') // Character is happy!
    
    state.value.excitedUntil = Date.now() + (30 * 60 * 1000) // Excited for 30 mins

    saveToStorage()
    return true
  }



  function setAvatar(avatarId: any) {
    state.value.avatarId = avatarId
    saveToStorage()
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
    setAvatar,
    setMood,
    checkDailyLogin,
    reset,
    closeLevelUpModal,
    toggleSound,
    // toggleHaptics,
    logWater,
    logSadaqah,
    logSahur,
    logTarawih,
  }
})
