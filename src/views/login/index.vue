<template>
  <div class="login">
    <div class="title-box">
      <h1 class="title">我的管理后台</h1>
      <h3 class="title-sub">My management system</h3>
    </div>
    <div class="login-box">
      <h1 class="title">登录</h1>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        label-width="0px"
        status-icon
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            autocomplete="off"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item prop="confirmPwd">
          <el-input
            v-model="loginForm.confirmPwd"
            type="password"
            autocomplete="off"
            placeholder="再次输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="loading"
            class="login-btn"
            @click="onUserLogin(loginFormRef)"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginForm, LoginResponse } from '@/types/user'
import useUserStore from '@/store/modules/user'

let $router = useRouter()
let $route = useRoute()
let loading = ref(false)

const loginFormRef = ref<FormInstance>()
const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
  confirmPwd: '',
})

const validatePwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (loginForm.password !== '') {
      if (!loginFormRef.value) return
      loginFormRef.value.validateField('confirmPwd', () => null)
    }
    callback()
  }
}
const confirmPwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== loginForm.password) {
    callback(new Error('两次输入密码不一致！'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<LoginForm>>({
  // 或者写成 reactive<FormRules<typeof loginForm>>
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 6, message: '请输入3-6位字符', trigger: 'blur' },
  ],
  password: [{ validator: validatePwd, trigger: 'blur' }],
  confirmPwd: [{ validator: confirmPwd, trigger: 'blur' }],
})

const userStore = useUserStore()
const onUserLogin = (formEl: FormInstance) => {
  if (!formEl) return
  formEl.validate(async (valid: boolean) => {
    if (!valid) return false
    loading.value = true
    try {
      await userStore.userLogin(loginForm)
      loading.value = false
      const redirect: string = $route.query.redirect as string // 如果是从某个页面（携带当前页面路径）跳转到登录页的，则登陆后跳转回这个页面。
      $router.push({ path: redirect || '/' })
      ElNotification({
        type: 'success',
        message: '登陆成功',
        title: 'Hi, 欢迎！',
      })
    } catch (error) {
      loading.value = false
      ElNotification({
        type: 'error',
        message: (error as LoginResponse).msg,
      })
    }
  })
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg')
    no-repeat center 110px;
  background-size: 100%;
}

.title-box {
  position: absolute;
  top: 18%;
  left: 17%;
  color: rgba($color: #000, $alpha: 80%);

  .title {
    font-size: 46px;
    font-weight: 600;
  }

  .title-sub {
    margin-top: 25px;
    font-size: 16px;
    text-align: right;
  }
}

.login-box {
  position: absolute;
  top: 4%;
  right: 10%;
  padding: 50px 60px 30px;
  width: 450px;
  min-height: 430px;
  background-color: rgb(255 255 255 / 45%);
  border-radius: 5px;

  .title {
    margin-bottom: 40px;
    font-size: 32px;
    text-align: center;
    color: #3b5998;
  }

  .login-btn {
    width: 100%;
    height: 56px;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background-color: rgb(68 126 217 / 80%);
    border-radius: 28px;
    line-height: 56px;
  }
}

::v-deep {
  .el-form-item {
    margin-bottom: 25px;
  }

  .el-input__wrapper {
    border-radius: 25px;
    box-shadow: none;
    border-bottom: 1px solid #d9d9d9;
  }

  .el-input__inner {
    padding-left: 12px;
    height: 50px;

    &::placeholder {
      font-size: 17px;
      color: rgba($color: #000, $alpha: 50%);
    }
  }

  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>
