import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Mint from '../views/Mint.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    components: {
      default: Home,
      wallet: () => import('../views/partials/OpenMachine.vue')
    }
  },
  {
    path: '/machine',
    components: {
      default: Mint,
      wallet: () => import('../views/partials/Wallet.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
