<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="layOutSetting.fold ? 'Fold' : 'Expand'"></component>
      </el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="item in route.matched"
          :key="item.path"
          v-show="item.meta.title"
          :to="item.path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button circle icon="Refresh" @click="updateRefresh"></el-button>
      <el-button circle icon="FullScreen" @click="fullScreen"></el-button>
      <el-popover
        placement="bottom"
        title="设置主题"
        :width="200"
        trigger="click"
      >
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              show-alpha
              :predefine="predefineColors"
              @change="changeColor"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="darkMode"
              inline-prompt
              active-icon="Moon"
              inactive-icon="Sunny"
              @change="changeDarkMode"
            />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button circle icon="Setting"></el-button>
        </template>
      </el-popover>
      <img
        :src="userStore.avatar"
        style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
const route = useRoute()
const router = useRouter()
let layOutSetting = useLayOutSettingStore()
const userStore = useUserStore()
const changeIcon = () => {
  layOutSetting.fold = !layOutSetting.fold
}
const updateRefresh = () => {
  layOutSetting.refresh = !layOutSetting.refresh
}
const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
// 设置主题
// 主题颜色
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const changeColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}
// 暗黑模式
let darkMode = ref<boolean>(false)
//switch开关的chang事件进行暗黑模式的切换
const changeDarkMode = () => {
  //获取HTML根节点
  let html = document.documentElement
  //判断HTML标签是否有类名dark
  darkMode.value ? (html.className = 'dark') : (html.className = '')
}
const logout = async () => {
  // 发请求退出登录 => 清空pinia仓库中的相关数据 => 跳转登陆页面
  await userStore.userLogout()
  // 跳转登陆页面
  router.push('/login')
}
</script>
<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
