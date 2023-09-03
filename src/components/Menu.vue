<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.meta.hidden">
      <!-- 没有子级路由 -->
      <el-menu-item
        v-if="!item.children"
        :index="item.path"
        @click="onClickMenuItem(item)"
      >
        <el-icon><House /></el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
      <!-- 只有一个子级路由 -->
      <el-menu-item
        v-if="item.children && item.children.length === 1"
        :index="item.children[0].path"
        @click="onClickMenuItem(item.children[0])"
      >
        <el-icon><House /></el-icon>
        <span>{{ item.children[0].meta.title }}</span>
      </el-menu-item>
      <!-- 有两个及以上子级路由 -->
      <el-sub-menu
        v-if="item.children && item.children.length > 1"
        :index="item.path"
      >
        <template #title>
          <el-icon><House /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <Menu :menuList="item.children" />
      </el-sub-menu>
    </template>
  </template>
</template>

<!-- 第二种注册递归组件方式，export 一个path出去 -->
<!-- <script lang="ts">
export default {
  path: 'Menu' // 这里可以自定义组件名，递归组件时使用设置的值进行递归
}
</script> -->

<script setup lang="ts">
import type { RouteMenu } from '@/types/sysState'
import { watch } from 'vue'
import Menu from './Menu.vue'
import useSysStore from '@/store/modules/sys'

const props = defineProps(['menuList'])
const sysStore = useSysStore()

watch(
  props.menuList,
  (nVal) => {
    console.log('menuList---', nVal)
  },
  { immediate: true },
)

const onClickMenuItem = (menu: RouteMenu) => {
  console.log('menu---', menu)
  sysStore.saveTag(menu)
}
</script>

<style scoped lang="scss"></style>
