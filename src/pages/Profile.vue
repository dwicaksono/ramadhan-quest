<script setup lang="ts">
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import GeneralSettings from '@/components/profile/GeneralSettings.vue'
import PrayerSettings from '@/components/profile/PrayerSettings.vue'
import DataManagement from '@/components/profile/DataManagement.vue'
import TrophyRoom from '@/components/profile/TrophyRoom.vue'
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-8 bg-stone-50 dark:bg-secondary-900/50 transition-colors">
    <!-- 1. Header & Stats -->
    <ProfileHeader />

    <!-- 2. Badges & Achievements -->
    <TrophyRoom />

    <!-- 3. General Settings (Name, Sound, Haptic) -->
    <GeneralSettings />

    <!-- 4. Prayer & Location Settings -->
    <PrayerSettings />

    <!-- 5. Data Zone (Import/Export/Reset) -->
    <DataManagement />
  </div>
</template>
