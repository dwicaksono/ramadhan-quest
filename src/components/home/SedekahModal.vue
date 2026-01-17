<script setup lang="ts">
import { ref, watch } from 'vue'
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

const customAmount = ref('')
const selectedAmount = ref<number | null>(null)
const amounts = [2000, 5000, 10000, 20000, 50000, 100000]

// Sync selection with custom input
watch(selectedAmount, (newVal) => {
  if (newVal) {
    customAmount.value = newVal.toString()
  }
})

// Sync custom input with selection
watch(customAmount, (newVal) => {
  const val = parseInt(newVal)
  if (amounts.includes(val)) {
    selectedAmount.value = val
  } else {
    selectedAmount.value = null
  }
})

function formatCurrency(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(val)
}

function handleDone() {
  const amount = parseInt(customAmount.value)
  if (!amount || amount <= 0) {
    toast.error('Pilih atau masukkan nominal yang valid')
    return
  }

  gameStore.logSadaqah(amount)
  playSfx('click')
  // Play coin sound if available, otherwise click is fine
  
  toast.success(`Alhamdulillah! Sedekah ${formatCurrency(amount)} dicatat.`)
  emit('update:modelValue', false)
  
  // Reset
  setTimeout(() => {
    customAmount.value = ''
    selectedAmount.value = null
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
        class="w-full max-w-sm relative overflow-hidden" 
        :rounded="'2xl'" 
        :padding="'lg'"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
           <h3 class="text-xl font-bold text-secondary-900 dark:text-white flex items-center gap-2">
             <span>🤝</span> Sedekah Harian
           </h3>
           <button @click="close" class="text-stone-400 hover:text-stone-600 dark:hover:text-white transition-colors">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
             </svg>
           </button>
        </div>

        <div class="space-y-6">
          <p class="text-stone-500 dark:text-stone-400 text-sm">
            Catat sedekahmu hari ini untuk menambah keberkahan (dan XP Karakter!) 🤲
          </p>

          <!-- Quick Amounts Grid -->
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="amount in amounts"
              :key="amount"
              class="py-3 px-4 rounded-xl border transition-all font-medium relative overflow-hidden text-left"
              :class="selectedAmount === amount 
                ? 'bg-primary-500 text-white border-primary-500 ring-2 ring-primary-200 dark:ring-primary-900' 
                : 'bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 text-secondary-900 dark:text-white hover:border-primary-200 dark:hover:border-primary-500/30'"
              @click="selectedAmount = amount"
            >
              <div class="text-xs opacity-80 mb-0.5">Sedekah</div>
              <div>{{ formatCurrency(amount) }}</div>
              
              <!-- Checkmark -->
              <svg v-if="selectedAmount === amount" class="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>

          <!-- Custom Amount + Action -->
          <div class="space-y-3 pt-4 border-t border-stone-100 dark:border-white/5">
            <label class="text-xs font-bold text-stone-400 uppercase tracking-wider">Nominal Lainnya</label>
            <div class="flex gap-2">
              <div class="relative flex-1">
                 <span class="absolute left-4 top-3.5 text-stone-400 font-medium">Rp</span>
                 <input
                  v-model="customAmount"
                  type="number"
                  placeholder="0"
                  class="w-full bg-stone-50 dark:bg-black/20 border border-stone-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 text-secondary-900 dark:text-white font-medium"
                  @keyup.enter="handleDone"
                />
              </div>
              
              <BaseButton 
                variant="primary"
                class="px-6 shadow-lg shadow-primary-500/20"
                @click="handleDone"
                :disabled="!customAmount"
              >
                Catat
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </Transition>
</template>
