<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon style="margin-right: 10px" @click="changeIcon"><Fold /></el-icon>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path">
          <span>
            {{ item.meta.title }}
          </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="tabbar-right">
      <el-button circle icon="Refresh"></el-button>
      <el-button circle icon="FullScreen"></el-button>
      <el-button circle icon="Setting"></el-button>
      <el-dropdown>
        <span class="el-dropdown-link">
          amdmin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const changeIcon = () => {
  console.log(route)
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
