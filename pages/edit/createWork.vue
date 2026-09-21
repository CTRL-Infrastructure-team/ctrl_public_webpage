<template>
  <div>
    <UiPageTitle title="作品投稿" />
    <FormsWorkForm required-files @submit="onSubmit" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: '作品投稿 | ' })

async function onSubmit(payload: {
  title: string
  content: string
  twitter: boolean
  topImage: File | null
  otherImage: File[]
  gameFile: File | null
}) {
  const form = new FormData()
  form.append('title', payload.title)
  form.append('content', payload.content)
  form.append('twitter', String(payload.twitter))
  if (payload.topImage) form.append('topImage', payload.topImage)
  payload.otherImage.forEach(file => form.append('otherImage', file))
  if (payload.gameFile) form.append('gameFile', payload.gameFile)
  await $fetch('/api/pastworks', { method: 'POST', body: form })
  await navigateTo('/edit/workList')
}
</script>
