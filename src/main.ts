import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import 'virtual:svg-icons-register'
// 引入全局样式
import '@/styles/index.scss'

// 引入自定义插件
import globalComponent from '@/components'
// 引入路由
import router from './router'
// 引入状态管理 pinia
import pinia from './store'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(globalComponent)
// 注册路由
app.use(router)
// 注册pinia
app.use(pinia)
// 全局挂载
app.mount('#app')
