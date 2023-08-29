// 注册全局组件的自定义插件
import SvgIcon from '@/components/svgIcon/index.vue'
const allGobalComponents = { SvgIcon }
// 自定义插件，对外暴露
export default {
  // 安装插件
  install(app) {
    Object.keys(allGobalComponents).forEach((key) => {
      app.component(key, allGobalComponents[key])
    })
  },
}
