<script setup lang="ts">
import { onMounted } from 'vue'
import { useGame } from '@/composables/useGame'
import { DateHeader, CharacterCard, FeatureCards, DailyQuests, QuickActions } from '@/components/home'

const { claimDailyBonus } = useGame()

onMounted(() => {
  // Check for daily login bonus
  const bonus = claimDailyBonus()
  if (bonus) {
    console.log(`Daily bonus claimed! XP: ${bonus.xpEarned}, Streak: ${bonus.streak}`)
  }
})
</script>

<template>
  <div class="min-h-screen pb-24 px-4 py-6 space-y-6">
    <!-- Header with greeting and date -->
    <DateHeader />

    <!-- Character status card -->
    <CharacterCard />

    <!-- Feature cards (Kitchen & Streak) -->
    <FeatureCards />

    <!-- Daily quests -->
    <DailyQuests />

    <!-- Quick action buttons -->
    <QuickActions />
  </div>
</template>
