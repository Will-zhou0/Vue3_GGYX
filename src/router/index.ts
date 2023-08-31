// 通过vue-router 实现模板路由配置
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from './routes'

const routes = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
})
export default routes
