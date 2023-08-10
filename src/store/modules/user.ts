import { defineStore } from 'pinia'
import type { UserState } from '@/types/userState'
import type { LoginForm, LoginResponse } from '@/types/user'
import { reqLogin } from '@/api/user'
import db from '@/utils/storage'

let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: db.session.get('token') || '',
    }
  },
  // 异步/逻辑的地方
  actions: {
    // 用户登录
    async userLogin(params: LoginForm) {
      const res: LoginResponse  = await reqLogin(params)
      const { data, code } = res
      if (code === 200) {
        this.token = data.token
        db.session.set('token', this.token)
        return data
      } else {
        return Promise.reject(res)
      }
    },
  },
  getters: {},
})

export default useUserStore