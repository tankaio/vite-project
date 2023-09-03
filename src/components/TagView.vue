<template>
  <div class="tag-view">
    <div class="tag__list">
      <el-tag
        v-for="(tag, index) in sysStore.tags"
        :key="index"
        type="info"
        :closable="tag.name !== 'Overview'"
        class="tag__item"
        :effect="tag.path === $route.path ? 'dark' : 'plain'"
        @close="onCloseTag(tag)"
        @click="onClickTag(tag)"
      >
        {{ tag.meta.title }}
      </el-tag>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteMenu } from '@/types/sysState'
import useSysStore from '@/store/modules/sys'

const sysStore = useSysStore()

const onCloseTag = (tag: RouteMenu) => {
  sysStore.closeTag(tag)
}
const onClickTag = (tag: RouteMenu) => {
  sysStore.setCurrentMenu(tag)
}
</script>

<style scoped lang="scss">
.tag-view {
  height: 46px;

  // background: rgba($color: #fff, $alpha: 0.7);
  border-bottom: 1px solid rgb(0 0 0 / 5%);

  .tag__list {
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 100%;
  }

  .tag__item {
    cursor: pointer;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }
}
</style>
