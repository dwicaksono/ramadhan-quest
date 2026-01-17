<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard, BaseButton } from '@/components/base'
import { exportData, importData, clearAllData } from '@/utils/storage'
import { toast } from 'vue-sonner'

const fileInput = ref<HTMLInputElement | null>(null)

function handleExport() {
  try {
    exportData()
    toast.success('Backup data berhasil didownload')
  } catch (e) {
    toast.error('Gagal membuat backup')
  }
}

async function handleImport(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  const file = target.files[0]
  const success = await importData(file)
  
  if (success) {
    toast.success('Data berhasil dipulihkan!')
  } else {
    toast.error('Gagal memulihkan data. File mungkin rusak.')
  }
  
  if (fileInput.value) fileInput.value.value = ''
}

function handleReset() {
  if (confirm('⚠️ PERINGATAN: Semua progress kamu (XP, Coins, Habit) akan hilang permanen.\n\nYakin ingin reset?')) {
    clearAllData()
  }
}

function openTraktir() {
  window.open('https://www.buymeacoffee.com/dwicaksono', '_blank')
}
</script>

<template>
  <div class="space-y-6">
    <BaseCard title="Pengaturan Data">
      <div class="space-y-4">
        <p class="text-sm text-secondary-500 dark:text-secondary-400 leading-relaxed">
          Simpan progress kamu ke file agar aman, atau pindahkan ke perangkat lain (misal dari HP ke Laptop).
        </p>
        
        <div class="grid grid-cols-2 gap-3">
          <BaseButton 
            variant="outline" 
            @click="handleExport" 
            class="h-auto py-3 px-4 flex flex-col items-center justify-center gap-1 border-secondary-200 hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800"
          >
            <span class="text-xl">📤</span>
            <span class="text-sm font-medium">Backup</span>
          </BaseButton>
          
          <div class="relative">
            <input
              type="file"
              ref="fileInput"
              accept=".json"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              @change="handleImport"
            />
            <BaseButton 
              variant="outline" 
              class="w-full h-auto py-3 px-4 flex flex-col items-center justify-center gap-1 border-secondary-200 hover:bg-secondary-50 dark:border-secondary-700 dark:hover:bg-secondary-800"
            >
              <span class="text-xl">📥</span>
              <span class="text-sm font-medium">Restore</span>
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseCard>

    <!-- Danger Zone -->
    <div class="pt-2 border-t border-secondary-200 dark:border-secondary-800">
      <BaseButton 
        variant="outline" 
        block 
        class="mb-3 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/20"
        @click="openTraktir"
      >
        💝 Traktir Developer
      </BaseButton>
      
      <BaseButton 
        variant="ghost" 
        block 
        class="text-secondary-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors" 
        @click="handleReset"
      >
        <span class="mr-2">🗑️</span> Reset Semua Data
      </BaseButton>
      <p class="text-center text-[10px] text-secondary-400 mt-2 opacity-60">
        Versi 1.0.0 (Alpha)
      </p>
    </div>
  </div>
</template>
