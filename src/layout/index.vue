<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <SliderMenu :menuList="userStore.menuRoutes"></SliderMenu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: layoutSetting.fold }">
      <Tabbar></Tabbar>
    </div>
    <div class="layout_main" :class="{ fold: layoutSetting.fold }">
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
import useLayOutSettingStore from '@/store/modules/setting'
const userStore = useUserStore()
const layoutSetting = useLayOutSettingStore()
</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    background-color: white;
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    top: $base-tabbar-height;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: white;
    padding: 20px;
    // overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
