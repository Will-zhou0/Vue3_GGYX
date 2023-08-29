// 通过vue-router 实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'

const routes = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/index.vue'),
    },
    // 以上路由都没匹配上
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'Any',
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})
export default routes
