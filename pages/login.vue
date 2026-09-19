<template>
  <div class="form">
    <UiPageTitle title="ログインページ" />
    <el-card class="login-card">
      <form class="form" @submit.prevent="login">
        <div class="form-box">
          <p>
            <label for="username">ログインID</label>
            <span>(必須)</span>
          </p>
          <el-input id="username" v-model="username" placeholder="ID" clearable />
        </div>
        <div class="form-box">
          <p>
            <label for="password">パスワード</label>
            <span>(必須)</span>
          </p>
          <el-input id="password" v-model="password" type="password" placeholder="パスワード" />
        </div>
        <p v-if="alert" class="red">{{ alert }}</p>
        <div class="form-button">
          <el-button native-type="submit" :loading="pending">ログイン</el-button>
        </div>
      </form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'ログイン | ' })

const username = ref('')
const password = ref('')
const alert = ref('')
const pending = ref(false)

async function login() {
  alert.value = ''
  if (!username.value || !password.value) {
    alert.value = '値を入力してください'
    return
  }
  pending.value = true
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    await navigateTo('/edit/management')
  } catch (err: any) {
    alert.value = err?.statusMessage || 'ログインに失敗しました'
  } finally {
    pending.value = false
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin: 20px calc(30px - 1rem) 0;
  font-size: calc(10px + 0.625vw);
  &-box {
    margin-bottom: 1.8em;
  }
  p {
    label {
      font-size: 1.2em;
      font-weight: 500;
    }
    span {
      font-size: 0.75em;
      color: red;
    }
  }
}
.red {
  color: red;
}
</style>
