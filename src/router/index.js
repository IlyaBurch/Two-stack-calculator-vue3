import { createRouter, createWebHistory } from 'vue-router'
import CalculatorMain from '../components/CalculatorMain.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'calculatorMain',
      component: CalculatorMain
    },
  ]
})

export default router
