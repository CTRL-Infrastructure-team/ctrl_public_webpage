<template>
  <div>
    <UiPageTitle title="活動報告投稿" />
    <FormsReportForm required-image @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: '活動報告投稿 | ' })

async function onSubmit(payload: { title: string, content: string, file: File | null }) {
  const form = new FormData()
  form.append('title', payload.title)
  form.append('content', payload.content)
  if (payload.file) form.append('file', payload.file)
  await $fetch('/api/situations', { method: 'POST', body: form })
  await navigateTo('/edit/reportList')
}
</script>
