<template>
  <FormsManageList
    api-list="/api/user/pastworks"
    api-item="/api/pastworks"
    edit-base="/edit/works"
    empty-text="作品がありません。"
  />
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: '作品管理 | ' })
</script>
