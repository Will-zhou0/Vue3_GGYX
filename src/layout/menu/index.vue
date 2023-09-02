<template>
  <el-menu
    background-color="#001529"
    text-color="white"
    router
    :collapse="layoutSetting.fold"
    :default-active="route.path"
    :default-openeds="[route.matched[0].path]"
    unique-opened
  >
    <template v-for="item in menuList" :key="item.path">
      <template v-if="!item.meta.hidden">
        <!-- 没有子路由 -->
        <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
        <!-- 仅有一个子路由 -->
        <el-menu-item
          v-if="item.children && item.children.length === 1"
          :index="item.path"
          @click="goRoute"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
        <!-- 有大于一个子路由 -->
        <el-sub-menu
          v-if="item.children && item.children.length > 1"
          :index="item.path"
        >
          <template #title>
            <el-icon>
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!-- 不能使用递归组件,因为该menu组件是从 el-menu开始的.如果从el-menu-item开始则可以递归 -->
          <!-- <SliderMenu :menuList="item.children"></SliderMenu> -->
          <template v-for="childItem in item.children" :key="childItem.path">
            <template v-if="!item.meta.hidden">
              <!-- 没有子路由 -->
              <el-menu-item
                v-if="!childItem.children"
                :index="childItem.path"
                @click="goRoute"
              >
                <el-icon>
                  <component :is="childItem.meta.icon"></component>
                </el-icon>
                <template #title>
                  <span>{{ childItem.meta.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
defineProps(['menuList'])
const route = useRoute()
const layoutSetting = useLayOutSettingStore()
const goRoute = (vc: any) => {
  //路由跳转
  // console.log('route', vc.index)
  // console.log(route)
}
</script>
<script lang="ts">
export default {
  name: 'SliderMenu',
}
</script>
<style lang="scss" scoped></style>
