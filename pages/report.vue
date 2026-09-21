<template>
  <div class="reportContent">
    <div class="card-wrapper">
      <UiPageTitle title="活動報告" />
      <el-row>
        <el-col v-for="item in pageItems" :key="item.id" :span="24" class="single-panel">
          <UiSituationCard :situation="item" />
        </el-col>
      </el-row>
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="9"
          :total="allItems.length"
          @current-change="page = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '活動報告 | ',
  meta: [{ hid: 'twitter:description', name: 'twitter:description', content: '活動報告' }]
})

const { data } = await useFetch('/api/situations')
const allItems = computed(() => data.value || [])
const page = ref(1)
const pageItems = computed(() => {
  const start = (page.value - 1) * 9
  return allItems.value.slice(start, start + 9)
})
</script>

<style lang="scss" scoped>
.reportContent {
  width: 100%;
  padding: 0 5%;
}

.card-wrapper {
  margin: 0 auto;
  max-width: 800px;
}

.single-panel {
  margin-bottom: 20px;
  @include mq {
    margin-bottom: 30px;
  }
}

.pagination-wrapper {
  text-align: center;
}
</style>
