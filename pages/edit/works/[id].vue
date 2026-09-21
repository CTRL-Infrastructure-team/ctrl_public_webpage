<template>
  <div>
    <UiPageTitle v-if="work" title="作品編集" />
    <FormsWorkForm
      v-if="work"
      :initial-title="work.title"
      :initial-content="work.content"
      :initial-twitter="Boolean(work.twitter_id)"
      :required-files="false"
      submit-label="編集を確定する"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const { data: work } = await useFetch(`/api/pastworks/${route.params.id}`)
useHead({ title: '作品編集 | ' })

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
  await $fetch(`/api/pastworks/${route.params.id}`, { method: 'PUT', body: form })
  await navigateTo('/edit/workList')
}
</script>
