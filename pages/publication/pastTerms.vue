<template>
  <div class="container">
    <PublicationPageHeader :path-datas="pathDatas" />
    <div v-for="term in terms || []" :key="term.id" class="list-wrapper">
      <PublicationContentBanner
        :to="`/publication/pastTopicList/${term.id}`"
        :title="term.name"
        :description="term.explanation"
      />
    </div>
    <div class="list-wrapper">
      <PublicationContentBanner
        to="/publication/recentTopics"
        title="最近の進捗発表はこちら！"
        muted
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '過去の活動期間 | ',
  meta: [{ hid: 'twitter:description', name: 'twitter:description', content: '過去の活動期間' }]
})

const { data: terms } = await useFetch('/api/publication/past-terms')
const pathDatas = [
  { name: 'Top', path: '/' },
  { name: '最近の進捗発表', path: '/publication/recentTopics' },
  { name: '過去の活動期間', path: '/publication/pastTerms' }
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
