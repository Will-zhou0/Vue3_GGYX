<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          :model="loginForm"
          class="login_form"
          :rules="rules"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到网易有道</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
              placeholder=""
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="login_btn"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { onMounted, reactive, ref } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
const userStore = useUserStore()
let loginForm = reactive({
  username: 'admin',
  password: 'atguigu123',
})
let loading = ref(false)
let loginFormRef = ref()
const router = useRouter()
const validatorName = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度必须大于等于 5 个字符'))
  }
}
const validatorPass = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度必须大于等于 6 个字符'))
  } else {
    callback()
  }
}
const rules = reactive({
  username: [{ validator: validatorName, trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatorPass, trigger: 'blur' },
  ],
})
onMounted(() => {})
const login = async () => {
  await loginFormRef.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: getTime() + '好',
    })
  } catch (err) {
    ElNotification({
      type: 'error',
      message: (err as Error).message,
    })
  }
  loading.value = false
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
@/store/modules/user
