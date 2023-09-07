import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
import type { UserState } from './type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
// 引入路由（常量路由）
import { constantRoutes, asyncRoute, anyRoute } from '@/router/routes'
//引入深拷贝方法
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}
// 创建用户相关的小仓库
export const useUserStore = defineStore('user', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      avatar: '',
      username: '',
      buttons: [],
    }
  },
  // 异步|逻辑的地方
  actions: {
    async userLogin(data: loginFormData) {
      const res: loginResponseData = await reqLogin(data)
      // 登录成功，存储token
      if (res.code === 200) {
        this.token = res.data
        // token持久化存储
        SET_TOKEN(res.data)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data))
      }
    },
    // 获取用户信息
    async userInfo() {
      const res: userInfoReponseData = await reqUserInfo()
      if (res.code === 200) {
        // 这里的this指向当前的store
        this.avatar = res.data.avatar
        this.username = res.data.name
        this.buttons = res.data.buttons
        //计算当前用户需要展示的异步路由
        console.log(res.data.routes)

        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          res.data.routes,
        )
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoutes, ...userAsyncRoute, anyRoute]
        console.log(this.menuRoutes)

        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        console.log(router.getRoutes())
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      }
    },
    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        this.avatar = ''
        this.username = ''
        this.token = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
})
