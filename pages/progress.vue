<template>
  <div class="content">
    <div class="card-wrapper">
      <UiPageTitle title="作品" />
      <el-row :gutter="rowGutter">
        <el-col
          v-for="work in pageItems"
          :key="work.id"
          :xs="24"
          :sm="8"
          :span="8"
        >
          <UiWorkCard :work="work" />
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="9"
        :total="allItems.length"
        @current-change="page = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '作品 | ',
  meta: [{ hid: 'twitter:description', name: 'twitter:description', content: '作品' }]
})

const { data } = await useFetch('/api/pastworks')
const allItems = computed(() => data.value || [])
const page = ref(1)
const pageItems = computed(() => {
  const start = (page.value - 1) * 9
  return allItems.value.slice(start, start + 9)
})

/** カード間の横余白（旧サイトの見た目に合わせる） */
const rowGutter = 24
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 0 5%;
}

.card-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  overflow-x: clip;
}

.el-col {
  margin-bottom: 20px;
  @include mq {
    margin-bottom: 30px;
  }
}

/* gutter の negative margin が .content の padding と重なって横スクロールしないよう */
.card-wrapper :deep(.el-row) {
  margin-left: 0;
  margin-right: 0;
}

.el-pagination {
  text-align: center;
}
</style>
