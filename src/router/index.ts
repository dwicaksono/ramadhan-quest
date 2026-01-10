import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/dapur',
    name: 'kitchen',
    component: () => import('@/pages/Kitchen.vue'),
  },
  {
    path: '/dompet',
    name: 'wallet',
    component: () => import('@/pages/Wallet.vue'),
  },
  {
    path: '/profil',
    name: 'profile',
    component: () => import('@/pages/Profile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
