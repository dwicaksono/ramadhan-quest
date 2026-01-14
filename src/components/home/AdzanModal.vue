<script setup lang="ts">
import { computed } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{
  modelValue: boolean
  prayerName: string
}>()

const emit = defineEmits(['update:modelValue', 'confirm'])



const doaContent = computed(() => {
  if (props.prayerName?.toLowerCase() === 'maghrib') {
    return {
      title: "Doa Berbuka Puasa",
      arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
      latin: "Allahumma laka shumtu wa 'ala rizqika afthartu. Dzahabaz zhama'u wabtallatil 'uruqu wa tsabatal ajru in syaa-allah.",
      meaning: "Ya Allah, untuk-Mu aku berpuasa, dan dengan rezeki-Mu aku berbuka. Telah hilang dahaga, urat-urat telah basah, dan pahala telah ditetapkan, insya Allah."
    }
  }
  
  // Default for other prayers
  return {
    title: `Selamat Menunaikan Sholat ${props.prayerName}`,
    arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِنْ ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ",
    latin: "Rabbij'alni muqimas-salati wa min dhurriyyati, Rabbana wa taqabbal du'a.",
    meaning: "Ya Tuhanku, jadikanlah aku dan anak cucuku orang-orang yang tetap mendirikan shalat, ya Tuhan kami, perkenankanlah doaku."
  }
})

function handleConfirm() {
  emit('confirm')
  emit('update:modelValue', false)
}
</script>

<template>
  <BaseModal 
    :model-value="modelValue" 
    title="Waktunya Sholat 🕌"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="text-center space-y-6 py-4">
      <!-- Icon/Illustration -->
      <div class="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce-slow">
        <span class="text-4xl">🕌</span>
      </div>

      <div>
        <h3 class="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
          Adzan {{ prayerName }}
        </h3>
        <p class="text-stone-500 dark:text-stone-400 text-sm">
          Selamat menunaikan ibadah sholat
        </p>
      </div>

      <!-- Doa Card -->
      <div class="bg-stone-50 dark:bg-white/5 rounded-2xl p-6 border border-stone-100 dark:border-white/10">
        <h4 class="font-bold text-primary-600 dark:text-primary-400 mb-4 text-sm uppercase tracking-widest">
          {{ doaContent.title }}
        </h4>
        
        <p class="font-arabic text-2xl leading-loose text-center text-secondary-900 dark:text-white mb-4" dir="rtl">
          {{ doaContent.arabic }}
        </p>

        <p class="text-sm italic text-primary-700 dark:text-primary-300 font-medium mb-2">
          "{{ doaContent.latin }}"
        </p>
        
        <p class="text-xs text-stone-500 dark:text-stone-400">
          {{ doaContent.meaning }}
        </p>
      </div>

      <BaseButton 
        variant="primary" 
        class="w-full shadow-xl shadow-primary-500/20 py-4 text-lg"
        @click="handleConfirm"
      >
        Alhamdulillah
      </BaseButton>
    </div>
  </BaseModal>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce 3s infinite;
}
</style>
