import { ref } from 'vue'
import { useGameStore } from '@/stores/game'

const SFX_FILES = {
  click: 'audio/click.mp3',
  levelup: 'audio/levelup.mp3',
  success: 'audio/success.mp3',
  action_cook: 'audio/cook.mp3'
}

// BGM singleton
const bgm = new Audio('audio/bgm-peaceful.mp3')
bgm.loop = true

export function useAudio() {
  const gameStore = useGameStore()
  const isPlaying = ref(false)

  function playSfx(name: keyof typeof SFX_FILES) {
    if (!gameStore.state.settings.soundEnabled) return

    // Since we don't have real files yet, we log to console
    console.log(`🔊 Playing SFX: ${name} (${SFX_FILES[name]})`)
    
    // In real app:
    // const audio = new Audio(SFX_FILES[name])
    // audio.volume = 0.5
    // audio.play().catch(() => {})
  }

  function toggleBgm(play: boolean) {
    if (!gameStore.state.settings.soundEnabled && play) return

    if (play) {
      console.log('🎵 Playing BGM')
      // bgm.play().catch(() => {})
      isPlaying.value = true
    } else {
      console.log('🎵 Stopping BGM')
      // bgm.pause()
      isPlaying.value = false
    }
  }

  return {
    playSfx,
    toggleBgm,
    isPlaying
  }
}
