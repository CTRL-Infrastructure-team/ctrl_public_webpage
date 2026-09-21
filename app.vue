<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
useHead({
  meta: [
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: String(config.public.twitterImage || '')
    }
  ]
})
</script>

