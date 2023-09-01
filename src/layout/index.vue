<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <SliderMenu :menuList="userStore.menuRoutes"></SliderMenu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main">
      <Main></Main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Logo from './logo/index.vue'
import SliderMenu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useUserStore } from '@/store/modules/user'
const userStore = useUserStore()
</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    float: left;
    width: 260px;
    height: 100%;
    background-color: #001529;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    top: 0;
    left: 260px;
    width: calc(100% - 260px);
    height: 50px;
  }
  .layout_main {
    float: right;
    position: relative;
    top: 50px;
    width: calc(100% - 260px);
    height: calc(100% - 50px);
    background-color: #6ddda5;
    padding: 20px;
  }
}
</style>
