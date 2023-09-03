import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import useUserStore from '@/store/modules/user'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

router.beforeEach(async (to, _from, next) => {
  console.log('to---', to)
  console.log('_from---', _from)

  const userStore = useUserStore()
  const isLogin = userStore.isLogin

  if (isLogin) {
    if (!to.path.includes('/login')) {
      next()
    } else {
      next('/')
    }
  } else {
    if (!to.path.includes('/login')) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
