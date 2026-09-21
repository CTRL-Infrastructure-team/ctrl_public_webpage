<template>
  <div class="container">
    <PublicationPageHeader :path-datas="pathDatas" />
    <div v-for="topic in topics || []" :key="topic.id" class="list-wrapper">
      <PublicationContentBanner
        :to="`/publication/slideList/${topic.id}`"
        :title="topic.name"
        :description="formatDate(topic.date)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

const route = useRoute()
const id = String(route.params.id)
const { data: term } = await useFetch(`/api/publication/terms/${id}`)
const { data: topics } = await useFetch(`/api/publication/terms/${id}/topics`)

useHead({
  title: '過去の進捗発表 | ',
  meta: [{ hid: 'twitter:description', name: 'twitter:description', content: '過去の進捗発表' }]
})

const pathDatas = computed(() => [
  { name: 'Top', path: '/' },
  { name: '最近の進捗発表', path: '/publication/recentTopics' },
  { name: '過去の進捗発表', path: '/publication/pastTerms' },
  { name: term.value?.name || '', path: `/publication/pastTopicList/${id}` }
])
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 30px auto;
  @include mq {
    margin: 50px auto;
  }
}

.list-wrapper {
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
}
</style>
