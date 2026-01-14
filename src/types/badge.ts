export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string // ISO Date string
  condition?: (state: any) => boolean // Optional runtime check logic
}

export type BadgeId = 
  | 'early_bird'
  | 'hydration_master'
  | 'sedekah_warrior'
  | 'first_step'
  | 'night_owl'
  | 'streak_master'

export const BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'Langkah Pertama',
    description: 'Login pertama kali di Ramadhan Quest',
    icon: '🚀'
  },
  {
    id: 'hydration_master',
    name: 'Hydration Master',
    description: 'Minum 8 gelas air dalam satu malam (2-4-2)',
    icon: '💧'
  },
  {
    id: 'early_bird',
    name: 'Pejuang Sahur',
    description: 'Log aktivitas pada waktu Sahur (03:00 - 04:30)',
    icon: '🕋' // We'll use emoji for now: 🌅
  },
  {
    id: 'night_owl',
    name: 'Ahli Ibadah Malam',
    description: 'Log Tarawih atau Tadarus di malam hari',
    icon: '🌙'
  },
  {
    id: 'sedekah_warrior',
    name: 'Dermawan',
    description: 'Melakukan Sedekah 5 kali',
    icon: '🤝'
  },
  {
    id: 'streak_master',
    name: 'Istiqomah',
    description: 'Mencapai 7 hari streak berturut-turut',
    icon: '🔥'
  }
]
