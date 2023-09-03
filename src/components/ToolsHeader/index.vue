<template>
  <div class="tools__box">
    <div class="header__logo">
      <!-- https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg -->
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </div>
    <div class="tools__right">
      <div class="timer">{{ currentTime }}</div>
      <el-popover placement="top-start" trigger="hover">
        <template #reference>
          <div class="user">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            />
            <span>{{ userStore.userInfo.username }}</span>
          </div>
        </template>
        <div class="list">
          <span style="cursor: pointer" @click="onLogout">退出登录</span>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()
const currentTime = ref('')
const timer = ref(0)

onMounted(() => {
  timer.value = window.setInterval(getTime, 1000)
})
onUnmounted(() => {
  window.clearInterval(timer.value)
})

const getTime = () => {
  let yy = new Date().getFullYear()
  let mm = new Date().getMonth() + 1
  let dd = new Date().getDate()
  let hh = new Date().getHours()
  let mf =
    new Date().getMinutes() < 10
      ? '0' + new Date().getMinutes()
      : new Date().getMinutes()
  let ss =
    new Date().getSeconds() < 10
      ? '0' + new Date().getSeconds()
      : new Date().getSeconds()
  currentTime.value = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
}
const onLogout = () => {
  userStore.userLogout()
}
</script>

<style scoped lang="scss">
.tools__box {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 48px;
  color: #fff;
  background: #001529;
}

.header__logo {
  display: flex;
  align-items: center;
  width: 220px;

  img {
    width: 34px;
    height: 34px;
  }

  h1 {
    margin-left: 10px;
    font-size: 18px;
  }
}

.tools__right {
  display: flex;
  align-items: center;
  padding-right: 10px;
  font-size: 16px;

  .timer {
    margin-right: 30px;
  }

  .user {
    cursor: pointer;

    img {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      border-radius: 50%;
    }

    span {
      margin-left: 10px;
    }
  }
}
</style>
