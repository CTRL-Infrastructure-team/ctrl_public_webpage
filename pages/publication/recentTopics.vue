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
    <div class="list-wrapper">
      <PublicationContentBanner
        to="/publication/pastTerms"
        title="過去の進捗発表はこちら！"
        muted
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

useHead({
  title: '進捗発表 | ',
  meta: [{ hid: 'twitter:description', name: 'twitter:description', content: '進捗発表' }]
})

const { data: topics } = await useFetch('/api/publication/recent-topics')
const pathDatas = [
  { name: 'Top', path: '/' },
  { name: '最近の進捗発表', path: '/publication/recentTopics' }
]
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
