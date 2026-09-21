<template>
  <div>
    <UiPageTitle v-if="situation" title="活動報告編集" />
    <FormsReportForm
      v-if="situation"
      :initial-title="situation.title"
      :initial-content="situation.content"
      existing-image
      :required-image="false"
      submit-label="編集を確定する"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const route = useRoute()
const { data: situation } = await useFetch(`/api/situations/${route.params.id}`)
useHead({ title: '活動報告編集 | ' })

async function onSubmit(payload: { title: string, content: string, file: File | null }) {
  const form = new FormData()
  form.append('title', payload.title)
  form.append('content', payload.content)
  if (payload.file) form.append('file', payload.file)
  await $fetch(`/api/situations/${route.params.id}`, { method: 'PUT', body: form })
  await navigateTo('/edit/reportList')
}
</script>
