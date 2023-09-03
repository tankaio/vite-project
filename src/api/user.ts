import http from '@/utils/request'
import type { LoginForm, LoginResponse, UserInfo } from '@/types/user'

enum URL {
  LOGIN = '/user/login',
  LOGOUT = '/user/logout',
  USERINFO = '/user/info',
}

export const reqLogin = (data: LoginForm): Promise<LoginResponse> => {
  return http({
    url: URL.LOGIN,
    method: 'POST',
    data,
  })
}

export const reqLogout = (): Promise<LoginResponse> => {
  return http({
    url: URL.LOGOUT,
    method: 'POST',
  })
}

export const reqGetUserInfo = (): Promise<UserInfo> => {
  return http({
    url: URL.USERINFO,
    method: 'GET',
  })
}
