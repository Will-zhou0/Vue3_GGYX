import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { UserState } from './type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 引入数据类型
import type { loginFormData, ResponseData } from '@/api/user/type'
// 创建用户相关的小仓库
export const useUserStore = defineStore('user', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN() || '',
    }
  },
  // getters: {
  //   name: (state) => state.name,
  // },
  // 异步|逻辑的地方
  actions: {
    async userLogin(data: loginFormData) {
      const res: ResponseData = await reqLogin(data)
      // 登录成功，存储token
      if (res.code === 200) {
        this.token = res.data.token
        // token持久化存储
        SET_TOKEN(res.data.token)
        return 'ok'
      } else {
        return res.data.message
      }
    },
  },
})
