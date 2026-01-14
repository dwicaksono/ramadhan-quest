import { useVibrate } from '@vueuse/core'
import { useGameStore } from '@/stores/game'

export function useHaptics() {
  const gameStore = useGameStore()
  const { vibrate } = useVibrate({ pattern: [] })

  function trigger(pattern: 'light' | 'medium' | 'heavy' | 'success' | 'error') {
    if (!gameStore.state.settings.hapticsEnabled) return

    let vibrationPattern: number | number[] = []

    switch (pattern) {
      case 'light':
        vibrationPattern = 10
        break
      case 'medium':
        vibrationPattern = 40
        break
      case 'heavy':
        vibrationPattern = 80
        break
      case 'success':
        vibrationPattern = [50, 30, 50]
        break
      case 'error':
        vibrationPattern = [50, 50, 50, 50, 100]
        break
    }

    vibrate(vibrationPattern)
  }

  return {
    trigger
  }
}
