import { ref } from 'vue'
import { useGameStore } from '@/stores/game'

const SFX_FILES = {
  click: 'audio/click.mp3',
  levelup: 'audio/levelup.mp3',
  success: 'audio/success.mp3',
  action_cook: 'audio/cook.mp3'
}

// BGM removed as per user request

export function useAudio() {
  const gameStore = useGameStore()
  const isPlaying = ref(false)

  function playSfx(name: keyof typeof SFX_FILES) {
    if (!gameStore.state.settings.soundEnabled) return

    try {
      const audio = new Audio(SFX_FILES[name])
      audio.volume = 0.5
      audio.play().catch((e) => {
        console.warn('Audio play failed (user interaction needed or file missing):', e)
      })
    } catch (e) {
      console.error('Failed to initialize audio:', e)
    }
  }

  return {
    playSfx,
    isPlaying
  }
}
