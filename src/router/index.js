import Vue from 'vue';
import Router from 'vue-router';
import  constantRoutes from '@/config/router';

Vue.use(Router);

// 全局路由简单工厂
const routerFactory = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = routerFactory();

export default router;
