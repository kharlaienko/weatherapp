import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/Main.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue')
    }
  ]
})

export default router
