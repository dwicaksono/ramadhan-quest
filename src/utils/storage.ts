

const STORAGE_KEYS = {
  game: 'ramadan-quest-game',
  wallet: 'ramadan-quest-wallet',
  habits: 'ramadan-quest-habits'
}

export interface AppData {
  game: any
  wallet: any
  habits: any
  timestamp: string
  version: string
}

export function exportData(): void {
  const data: AppData = {
    game: JSON.parse(localStorage.getItem(STORAGE_KEYS.game) || '{}'),
    wallet: JSON.parse(localStorage.getItem(STORAGE_KEYS.wallet) || '{}'),
    habits: JSON.parse(localStorage.getItem(STORAGE_KEYS.habits) || '{}'),
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `ramadan-quest-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function importData(file: File): Promise<boolean> {
  try {
    const text = await file.text()
    const data = JSON.parse(text) as AppData

    // Basic validation
    if (!data.game || !data.wallet || !data.habits) {
      throw new Error('Invalid backup file format')
    }

    // Restore to LocalStorage
    localStorage.setItem(STORAGE_KEYS.game, JSON.stringify(data.game))
    localStorage.setItem(STORAGE_KEYS.wallet, JSON.stringify(data.wallet))
    localStorage.setItem(STORAGE_KEYS.habits, JSON.stringify(data.habits))

    // Reload page to re-initialize stores from storage
    // This is the safest way to ensure all in-memory state matches storage
    window.location.reload()
    
    return true
  } catch (e) {
    console.error('Import failed:', e)
    return false
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.game)
  localStorage.removeItem(STORAGE_KEYS.wallet)
  localStorage.removeItem(STORAGE_KEYS.habits)
  
  // Reload to reset state
  window.location.reload()
}
