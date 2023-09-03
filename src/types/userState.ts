import type { RouteRecordRaw } from 'vue-router'
import type { UserInfo } from '@/types/user'

export interface UserState {
  token: string
  userInfo: UserInfo
  routesMenu: RouteRecordRaw[]
}
