import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Favorites from '../views/Favorites.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: Favorites
    }
  ]
})

export default router
