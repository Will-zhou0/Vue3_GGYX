import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
// 在开发环境下 command 的值为 serve（vite dev,vite serve），
// 而在生产环境下为 build（vite build）
export default defineConfig(({ command, mode }) => {
  // 第一个参数,根据当前工作目录中的 `mode` 加载 .env 文件
  // 第二个参数 process.cwd()为项目的跟=根目录,指定.env文件所在位置
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 配置服务器
    server: {
      // 服务器代理规则
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 代理的目标地址
          target: env.VITE_SERVE,
          // 开启代理
          changeOrigin: true,
          // 重写代理的路径
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
