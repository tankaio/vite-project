import { defineStore } from 'pinia'
import type { UserState } from '@/types/userState'
import type { LoginForm, LoginResponse, UserInfo } from '@/types/user'
import { reqLogin, reqLogout } from '@/api/user'
import db from '@/utils/storage'
import { constantRoute } from '@/router/routes'
import useSysStore from '@/store/modules/sys'
import router from '@/router'

const useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => ({
    token: db.session.get('token') || '',
    userInfo: db.local.get('userInfo') || {},
    routesMenu: constantRoute,
  }),
  // 异步/逻辑的地方
  actions: {
    // 退出登录
    async userLogout() {
      const res: LoginResponse = await reqLogout()
      const { code } = res
      if (code === 200) {
        this.saveUserInfo({} as UserInfo)
        this.token = ''
        const sysStore = useSysStore()
        sysStore.clearTags()
        db.local.clear()
        db.session.clear()

        router.replace('/login')
      }
    },
    // 用户登录
    async userLogin(params: LoginForm) {
      const res: LoginResponse = await reqLogin(params)
      const { data, code } = res
      if (code === 200) {
        this.token = data.token
        db.session.set('token', this.token)
        this.saveUserInfo(data)
        return data
      } else {
        return Promise.reject(res)
      }
    },
    saveUserInfo(params: UserInfo) {
      this.userInfo = params
      db.local.set('userInfo', this.userInfo)
    },
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
})

export default useUserStore
