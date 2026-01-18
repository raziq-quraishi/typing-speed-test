import { createRouter, createWebHistory } from 'vue-router'
import SummaryPage from '../views/SummaryPage.vue'
import ActionPanel from '@/components/ActionPanel.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'typing',
      component: ActionPanel,
    },
    {
      path: '/summary',
      name: 'summary',
      component: SummaryPage,
    },
  ],
})

export default router
