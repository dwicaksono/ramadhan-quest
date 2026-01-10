// Character mood states
export type CharacterMood = 'happy' | 'neutral' | 'sad' | 'tired' | 'excited'

// Game state interface
export interface GameState {
  xp: number
  level: number
  energy: number
  coins: number
  mood: CharacterMood
  userName: string
  lastActiveDate: string
  streak: number
}

// XP thresholds for leveling up
export const XP_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 1750,
  7: 2750,
  8: 4000,
  9: 5500,
  10: 7500,
}

// Action XP rewards
export const XP_REWARDS = {
  COMPLETE_HABIT: 10,
  COOK_RECIPE: 15,
  SAVE_BUDGET: 20,
  DAILY_LOGIN: 5,
  STREAK_BONUS: 25,
} as const
