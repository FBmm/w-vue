import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/layout';
Vue.use(Router);

export const constantRoutes = [{
    path: '/',
    component: Layout,
    redirect: {
      path: 'home'
    },
    children: [{
      path: '/home',
      component: () => import('@/views/home'),
      name: 'home'
    }]
  },
  {
    path: '/provision',
    name: 'provision',
    component: Layout,
    redirect: {
      path: '/provision/volume'
    },
    children: [{
      path: '/provision/volume',
      component: () => import('@/views/provision/volume'),
      name: 'provision-volume',
    }]
  },
  {
    path: '/protected',
    name: 'protected',
    component: Layout,
    redirect: {
      path: '/protected/replicationPair'
    },
    children: [{
      path: '/protected/replicationPair',
      component: () => import('@/views/protected/replication/replicationPair'),
      name: 'protected-replicationPair',
    },{
      path: '/protected/replicationConsistency',
      component: () => import('@/views/protected/replication/replicationConsistency'),
      name: 'protected-replicationConsistency',
    },{
      path: '/protected/dualActivePair',
      component: () => import('@/views/protected/dualActive/dualActivePair'),
      name: 'protected-dualActivePair',
    },{
      path: '/protected/dualActiveConsistency',
      component: () => import('@/views/protected/dualActive/dualActiveConsistency'),
      name: 'protected-dualActiveConsistency',
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
  },
  {
    path: '*',
    redirect: '/404'
  }
];

// 全局路由简单工厂
const routerFactory = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = routerFactory();

export default router;
