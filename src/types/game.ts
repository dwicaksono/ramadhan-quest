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
  showLevelUpModal?: boolean
  lastAcknowledgedLevel: number // Track which level usage has seen
  excitedUntil?: number
  startedAt?: string // Date when user starter playing
  waterLog: number // Daily water glasses drunk
  sadaqahTotal: number
  sahurStreak?: number
  lastSahurLog?: string // Date YYYY-MM-DD
  settings: {
    soundEnabled: boolean
    hapticsEnabled: boolean
  }
}

// XP thresholds for leveling up (Level -> Total XP Required)
export const XP_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 800,
  6: 1200,
  7: 1700,
  8: 2300,
  9: 3000,
  10: 3800,
  11: 4700,
  12: 5700,
  13: 6800,
  14: 8000,
  15: 9500,
  16: 11000,
  17: 12800,
  18: 14800,
  19: 17000,
  20: 20000,
  21: 23000,
  22: 26500,
  23: 30500,
  24: 35000,
  25: 40000,
  26: 45500,
  27: 51500,
  28: 58000,
  29: 65000,
  30: 75000, // Milestone
}

// Action XP rewards
export const XP_REWARDS = {
  COMPLETE_HABIT: 10,
  COOK_RECIPE: 15,
  SAVE_BUDGET: 20,
  DAILY_LOGIN: 5,
  STREAK_BONUS: 25,
} as const
