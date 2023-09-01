// 注册全局组件的自定义插件
import SvgIcon from '@/components/svgIcon/index.vue'
const allGobalComponents = { SvgIcon }
// 全局引入icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 自定义插件，对外暴露
export default {
  // 安装插件
  install(app: any) {
    Object.keys(allGobalComponents).forEach((key) => {
      app.component(key, allGobalComponents[key])
    })
    // 将icons注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
