<script setup lang="ts">
import { ref } from 'vue'
import { BaseButton, BaseCard } from '@/components/base'
import { useGameStore } from '@/stores/game'
import { useAudio } from '@/composables/useAudio'
import { toast } from 'vue-sonner'

const emit = defineEmits(['update:modelValue'])

defineProps<{
  modelValue: boolean
}>()

const gameStore = useGameStore()
const { playSfx } = useAudio()

const selectedRakaat = ref<number | null>(null)
const rakaatOptions = [8, 20, 36] // Common counts + custom

function handleDone() {
  if (!selectedRakaat.value) {
    toast.error('Pilih jumlah rakaat')
    return
  }

  const success = gameStore.logTarawih(selectedRakaat.value)
  
  if (success) {
    playSfx('success') 
    toast.success(`Alhamdulillah! Tarawih ${selectedRakaat.value} rakaat dicatat. (+50 XP)`)
  } else {
    toast.info('Kamu sudah mencatat Tarawih hari ini.')
  }
  
  emit('update:modelValue', false)
  
  // Reset
  setTimeout(() => {
    selectedRakaat.value = null
  }, 300)
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click="close"
    >
      <BaseCard 
        class="w-full max-w-sm relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 border-indigo-500/20" 
        :rounded="'2xl'" 
        :padding="'lg'"
        @click.stop
      >
        <!-- Background Effects -->
        <div class="absolute inset-0 bg-[url('/patterns/islamic-geom.svg')] opacity-10 pointer-events-none"></div>
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <!-- Header -->
        <div class="relative z-10 flex items-center justify-between mb-6">
           <h3 class="text-xl font-bold text-white flex items-center gap-2">
             <span>🌙</span> Sholat Tarawih
           </h3>
           <button @click="close" class="text-white/60 hover:text-white transition-colors">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        <div class="relative z-10 space-y-6">
          <p class="text-purple-200 text-sm">
            "Barangsiapa melakukan qiyam Ramadhan karena iman dan mencari pahala, maka dosa-dosanya yang telah lalu akan diampuni."
          </p>

          <div class="space-y-3">
             <label class="text-xs font-bold text-purple-300 uppercase tracking-wider">Jumlah Rakaat (+ Witir)</label>
             <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="rakaat in rakaatOptions"
                  :key="rakaat"
                  class="py-4 px-2 rounded-xl border transition-all font-medium flex flex-col items-center justify-center gap-1 group"
                  :class="selectedRakaat === rakaat 
                    ? 'bg-purple-500 text-white border-purple-400 ring-2 ring-purple-500/50' 
                    : 'bg-white/10 border-white/10 text-white hover:bg-white/20'"
                  @click="selectedRakaat = rakaat"
                >
                  <span class="text-2xl font-bold">{{ rakaat }}</span>
                  <span class="text-[10px] opacity-80 uppercase">Rakaat</span>
                </button>
             </div>
          </div>

          <BaseButton 
            variant="primary"
            block
            class="bg-indigo-500 hover:bg-indigo-600 text-white border-none shadow-lg shadow-indigo-500/30"
            @click="handleDone"
            :disabled="!selectedRakaat"
          >
            Catat & Ambil XP
          </BaseButton>
        </div>
      </BaseCard>
    </div>
  </Transition>
</template>
