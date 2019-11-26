import Vue from 'vue'
import Router from 'vue-router'

import Menu from '@/components/menu'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
    { path: '/login', component: Menu },
    { path: '/home', component: Layout },
]

// 全局路由简单工厂
const routerFactory = () => new Router({
    // mode: 'history', // require service support
    // scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = routerFactory()

export default router