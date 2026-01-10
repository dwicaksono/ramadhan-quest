// Habit item for daily tracker
export interface HabitItem {
  id: string
  name: string
  category: 'spiritual' | 'community' | 'personal'
  icon: string
  xpReward: number
}

// Habit state interface
export interface HabitState {
  dailyHabits: HabitItem[]
  completedToday: Set<string>
  lastResetDate: string
}

// Default habits for Ramadan
export const DEFAULT_HABITS: HabitItem[] = [
  { id: 'fajr', name: 'Sholat Subuh', category: 'spiritual', icon: '🕌', xpReward: 15 },
  { id: 'dhuhr', name: 'Sholat Dzuhur', category: 'spiritual', icon: '🕌', xpReward: 10 },
  { id: 'asr', name: 'Sholat Ashar', category: 'spiritual', icon: '🕌', xpReward: 10 },
  { id: 'maghrib', name: 'Sholat Maghrib', category: 'spiritual', icon: '🕌', xpReward: 10 },
  { id: 'isha', name: 'Sholat Isya', category: 'spiritual', icon: '🕌', xpReward: 10 },
  { id: 'quran', name: 'Baca Quran 5 Halaman', category: 'spiritual', icon: '📖', xpReward: 20 },
  { id: 'adhkar', name: 'Dzikir Pagi', category: 'spiritual', icon: '🤲', xpReward: 10 },
  { id: 'sadaqah', name: 'Sedekah Hari Ini', category: 'community', icon: '💝', xpReward: 25 },
  { id: 'tarawih', name: 'Sholat Tarawih', category: 'spiritual', icon: '🌙', xpReward: 20 },
]
