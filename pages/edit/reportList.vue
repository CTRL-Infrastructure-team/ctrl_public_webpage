<template>
  <FormsManageList
    api-list="/api/user/situations"
    api-item="/api/situations"
    edit-base="/edit/situations"
    empty-text="記事がありません。"
  />
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: '活動報告管理 | ' })
</script>
