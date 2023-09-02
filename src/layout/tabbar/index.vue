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
      <el-button circle icon="Setting"></el-button>
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
