<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <Menu></Menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar">223</div>
    <div class="layout_main">main</div>
  </div>
</template>
<script lang="ts" setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
</script>
<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  background-color: #bfbff1;
  .layout_slider {
    float: left;
    width: 260px;
    height: 100%;
    background-color: bisque;
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
