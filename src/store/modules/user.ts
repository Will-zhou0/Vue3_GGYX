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
import { constantRoutes } from '@/router/routes'
// 创建用户相关的小仓库
export const useUserStore = defineStore('user', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      avatar: '',
      username: '',
    }
  },
  // getters: {
  //   name: (state) => state.name,
  // },
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
