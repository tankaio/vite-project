<template>
  <el-container>
    <el-aside>
      <div class="logo">
        <!-- https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg -->
        <img src="../../assets/imgs/logo.png" />
        <h1 v-show="!sysStore.menuCollapse" class="title">我的管理系统</h1>
      </div>
      <el-scrollbar>
        <el-menu
          router
          default-active="0"
          :collapse="sysStore.menuCollapse"
          class="el-menu-vertical-demo"
        >
          <Menu :menuList="userStore.routesMenu" />
        </el-menu>
      </el-scrollbar>
      <div class="collapse__box">
        <span class="icon__collapse" @click="toggle">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="menu-fold"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"
            ></path>
          </svg>
        </span>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <ToolsHeader />
        <div class="tagview__box">
          <TagView />
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Menu from '@/components/Menu.vue'
import TagView from '@/components/TagView.vue'
import useUserStore from '@/store/modules/user'
import useSysStore from '@/store/modules/sys'
import ToolsHeader from '@/components/ToolsHeader/index.vue'

const userStore = useUserStore()
const sysStore = useSysStore()

const toggle = () => {
  sysStore.toggleMenuCollapse()
}
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}

.el-aside {
  overflow: hidden;

  // width: $base-menu-width;
  // --el-aside-width: 200px;
  width: auto;
  height: 100vh;
  background-color: #fff;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background: #001529;

  img {
    width: 30px;
    height: 30px;
  }

  .title {
    line-height: 48px;
    margin-left: 5px;
    color: #fff;
  }
}

.el-scrollbar {
  height: calc(100% - 88px);
}

.collapse__box {
  padding-left: 25px;
  height: 40px;
  line-height: 40px;
  border-top: 1px solid rgb(0 0 0 / 6%);

  .icon__collapse {
    font-size: 18px;
    vertical-align: middle;
    cursor: pointer;

    svg {
      display: inline-block;
    }
  }
}

.el-header {
  padding: 0;
  height: 96px;
  color: #fff;
}

.el-main {
  position: relative;
  padding: 20px;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')
    no-repeat 0 0;
  background-size: 100%;
}

.el-main__content {
  padding: 20px;
}

.tagview__box {
  height: 48px;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>
