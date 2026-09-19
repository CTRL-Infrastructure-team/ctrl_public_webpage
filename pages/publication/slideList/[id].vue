<template>
  <div class="container">
    <PublicationPageHeader :path-datas="pathDatas" />
    <div class="topic-wrapper">
      <p class="topic-title">{{ topic?.name }}</p>
      <p class="topic-explanation">{{ topic?.explanation }}</p>
      <p class="topic-attention">※スライドの読み込みに時間がかかることがあります。</p>
    </div>
    <PublicationPresentations :presentations="visibleSlides" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = String(route.params.id)
const { data: topic } = await useFetch(`/api/publication/topics/${id}`)
const { data: slides } = await useFetch(`/api/publication/topics/${id}/slides`)
const visibleSlides = computed(() => (slides.value || []).filter(s => s.slide_url))

const pathDatas = computed(() => {
  const items = [
    { name: 'Top', path: '/' },
    { name: '最近の進捗発表', path: '/publication/recentTopics' }
  ]
  if (topic.value?.pubterms_id) {
    items.push(
      { name: '過去の進捗発表', path: '/publication/pastTerms' },
      { name: '活動期間', path: `/publication/pastTopicList/${topic.value.pubterms_id}` }
    )
  }
  items.push({ name: topic.value?.name || '', path: `/publication/slideList/${id}` })
  return items
})

useHead({
  title: `${topic.value?.name || '進捗発表'} | `
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 30px auto;
  @include mq {
    margin: 50px auto;
  }
}

.topic {
  &-wrapper {
    width: 90%;
    max-width: 800px;
    margin: auto;
  }
  &-title {
    font-size: 2em;
    text-align: center;
    margin: 20px 0;
  }
  &-explanation {
    text-align: center;
    margin: 20px;
  }
  &-attention {
    color: #909090;
    margin-bottom: 20px;
  }
}
</style>
