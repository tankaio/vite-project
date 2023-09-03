import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入vite-plugin-svg-icons注册脚本
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
import router from './router'
import pinia from './store'
// import db from '@/utils/storage'

import '@/styles'

// import { reqLogin } from './api/user'
// reqLogin({
//   username: 'admin',
//   password: '123456',
// }).then(data => {
//   console.log('login-data===', data)
// })

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(globalComponent)
app.use(ElementPlus)
app.mount('#app')

// app.config.globalProperties.$db = db

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

console.log('import.meta.env===', import.meta.env)
console.log('app.config.globalProperties===', app.config.globalProperties)
