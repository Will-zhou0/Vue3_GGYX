<template>
  <el-menu background-color="red" text-color="blue">
    <el-menu-item index="">首页</el-menu-item>
    <el-menu-item index="">首页2</el-menu-item>
    <el-sub-menu index="权限管理">
      <template #title>Workspace</template>
      <el-menu-item index="">权限1</el-menu-item>
      <el-menu-item index="">权限2</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="">商品管理</el-menu-item>
  </el-menu>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
