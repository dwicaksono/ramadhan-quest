<script setup lang="ts">
import { ref } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const activeTab = ref('puasa') // puasa | berbuka | tarawih

const tabs = [
  { id: 'puasa', label: 'Niat Puasa' },
  { id: 'berbuka', label: 'Doa Buka' },
  { id: 'tarawih', label: 'Tarawih' },
]

const content = {
  puasa: {
    title: "Niat Puasa Ramadhan",
    arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هِذِهِ السَّنَةِ لِلهِ تَعَالَى",
    latin: "Nawaitu shauma ghadin 'an ada'i fardhi syahri Ramadhana hadzihis sanati lillahi ta'ala.",
    meaning: "Aku berniat puasa esok hari untuk menunaikan fardhu di bulan Ramadhan tahun ini, karena Allah Ta'ala."
  },
  berbuka: {
    title: "Doa Berbuka Puasa",
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
    latin: "Allahumma laka shumtu wa 'ala rizqika afthartu. Dzahabaz zhama'u wabtallatil 'uruqu wa tsabatal ajru in syaa-allah.",
    meaning: "Ya Allah, untuk-Mu aku berpuasa, dan dengan rezeki-Mu aku berbuka. Telah hilang dahaga, urat-urat telah basah, dan pahala telah ditetapkan, insya Allah."
  },
  tarawih: {
    title: "Niat Sholat Tarawih (Makmum)",
    arabic: "اُصَلِّى سُنَّةَ التَّرَاوِيْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ مَأْمُوْمًا ِللهِ تَعَالَى",
    latin: "Ushalli sunnatat tarawihi rak'ataini mustaqbilal qiblati ma'muman lillahi ta'ala.",
    meaning: "Aku berniat shalat sunnah tarawih dua rakaat dengan menghadap kiblat sebagai makmum karena Allah Ta'ala."
  }
}
</script>

<template>
  <BaseModal 
    :model-value="modelValue" 
    @update:model-value="emit('update:modelValue', $event)"
    title="Panduan Ibadah"
  >
    <!-- Simple Tabs -->
    <div class="flex p-1 bg-stone-100 dark:bg-white/10 rounded-xl mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 py-1.5 text-xs font-medium rounded-lg transition-all"
        :class="activeTab === tab.id ? 'bg-white dark:bg-[#2A2A2A] shadow-sm text-primary-600 dark:text-primary-400' : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content -->
    <div class="text-center space-y-4">
      <h4 class="font-bold text-secondary-900 dark:text-white">
        {{ content[activeTab as keyof typeof content].title }}
      </h4>
      
      <div class="bg-primary-50 dark:bg-primary-900/10 p-4 rounded-2xl border border-primary-100 dark:border-primary-500/10">
        <p class="font-arabic text-2xl leading-loose text-center text-secondary-900 dark:text-white mb-2" dir="rtl">
          {{ content[activeTab as keyof typeof content].arabic }}
        </p>
      </div>

      <div class="space-y-2">
        <p class="text-sm italic text-primary-700 dark:text-primary-300 font-medium">
          "{{ content[activeTab as keyof typeof content].latin }}"
        </p>
        <p class="text-xs text-stone-500 dark:text-stone-400">
          {{ content[activeTab as keyof typeof content].meaning }}
        </p>
      </div>
    </div>
  </BaseModal>
</template>
