<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNav from '@/components/navigation/BottomNav.vue'
</script>

<template>
  <div class="min-h-screen bg-secondary-50">
    <!-- Main content -->
    <RouterView />

    <!-- Bottom navigation -->
    <BottomNav />
  </div>
</template>
