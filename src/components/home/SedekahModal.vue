<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
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

// Sync custom input with selection (deselect if mismatch)
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
  
  toast.success(`Alhamdulillah! Sedekah ${formatCurrency(amount)} dicatat.`)
  emit('update:modelValue', false)
  
  // Reset after close
  setTimeout(() => {
    customAmount.value = ''
    selectedAmount.value = null
  }, 300)
}
</script>

<template>
  <BaseModal 
    :model-value="modelValue" 
    @update:model-value="emit('update:modelValue', $event)"
    title="Sedekah Subuh / Harian"
  >
    <div class="space-y-6">
      <div class="text-center">
        <p class="text-stone-500 dark:text-stone-400 text-sm mb-4">
          Catat sedekahmu hari ini untuk menambah keberkahan (dan XP Karakter!) 🤲
        </p>
      </div>

      <!-- Quick Amounts Grid -->
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="amount in amounts"
          :key="amount"
          class="py-3 px-4 rounded-xl border transition-all font-medium relative overflow-hidden"
          :class="selectedAmount === amount 
            ? 'bg-primary-500 text-white border-primary-500 ring-2 ring-primary-200 dark:ring-primary-900' 
            : 'bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 text-secondary-900 dark:text-white hover:border-primary-200 dark:hover:border-primary-500/30'"
          @click="selectedAmount = amount"
        >
          {{ formatCurrency(amount) }}
          <!-- Checkmark for selected -->
          <svg v-if="selectedAmount === amount" class="w-4 h-4 absolute top-2 right-2 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>

      <!-- Custom Amount + Action -->
      <div class="space-y-3 pt-2 border-t border-stone-100 dark:border-white/5">
        <div class="flex gap-2">
          <div class="relative flex-1">
             <span class="absolute left-4 top-3.5 text-stone-400 font-medium">Rp</span>
             <input
              v-model="customAmount"
              type="number"
              placeholder="Nominal.."
              class="w-full bg-stone-50 dark:bg-black/20 border border-stone-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 text-secondary-900 dark:text-white font-medium"
              @keyup.enter="handleDone"
            />
          </div>
          
          <BaseButton 
            variant="primary"
            class="px-8 shadow-lg shadow-primary-500/20"
            @click="handleDone"
            :disabled="!customAmount"
          >
            Catat
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseModal>
</template>
