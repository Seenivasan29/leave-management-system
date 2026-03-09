import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/Login.vue'
import EmployeeDashboard from '../views/EmployeeDashboard.vue'
import EmployerDashboard from '../views/EmployerDashboard.vue'



const routes = [
{ path: "/", component: Login },
{ path: "/employee", component: EmployeeDashboard },
{ path: "/employer", component: EmployerDashboard }


]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router
