// Habit item for daily tracker
export interface HabitItem {
  id: string
  name: string
  category: 'spiritual' | 'community' | 'personal'
  icon: string
  xpReward: number
  prayerTimeKey?: string // 'subuh', 'dzuhur', etc.
}

// Habit state interface
export interface HabitState {
  dailyHabits: HabitItem[]
  completedToday: Set<string>
  lastResetDate: string
}

// Default habits for Ramadan
export const DEFAULT_HABITS: HabitItem[] = [
  { id: 'fajr', name: 'Sholat Subuh', category: 'spiritual', icon: '🕌', xpReward: 15, prayerTimeKey: 'subuh' },
  { id: 'dhuhr', name: 'Sholat Dzuhur', category: 'spiritual', icon: '🕌', xpReward: 10, prayerTimeKey: 'dzuhur' },
  { id: 'asr', name: 'Sholat Ashar', category: 'spiritual', icon: '🕌', xpReward: 10, prayerTimeKey: 'ashar' },
  { id: 'maghrib', name: 'Sholat Maghrib', category: 'spiritual', icon: '🕌', xpReward: 10, prayerTimeKey: 'maghrib' },
  { id: 'isha', name: 'Sholat Isya', category: 'spiritual', icon: '🕌', xpReward: 10, prayerTimeKey: 'isya' },
  { id: 'quran', name: 'Baca Quran 5 Halaman', category: 'spiritual', icon: '📖', xpReward: 20 },
  { id: 'adhkar', name: 'Dzikir Pagi', category: 'spiritual', icon: '🤲', xpReward: 10 },
]
