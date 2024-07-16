import { createRouter, createWebHistory } from 'vue-router'

import chat from "@/views/chat.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: chat
    }
  ]
})

export default router
