<template>
  <div>
    <UiPageTitle title="管理画面" />
    <div class="select-wrapper">
      <NuxtLink to="/edit/createReport"><el-button>活動報告投稿</el-button></NuxtLink>
      <NuxtLink to="/edit/createWork"><el-button>作品投稿</el-button></NuxtLink>
      <NuxtLink to="/edit/reportList"><el-button>活動報告管理</el-button></NuxtLink>
      <NuxtLink to="/edit/workList"><el-button>作品管理</el-button></NuxtLink>
      <el-button @click="logout">ログアウト</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: '管理画面 | ' })

async function logout() {
  await $fetch('/api/logout', { method: 'POST' })
  await navigateTo('/login')
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button {
    width: 200px;
    height: 70px;
    margin: 20px 0;
  }
}
</style>
