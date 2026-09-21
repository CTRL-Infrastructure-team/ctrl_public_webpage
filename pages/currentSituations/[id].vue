<template>
  <div class="content">
    <el-card class="content-wrapper">
      <h2>{{ situation?.title }}</h2>
      <div class="flex-box">
        <div class="flex-box-images">
          <el-image :src="situation?.img_url" :preview-src-list="[situation?.img_url || '']" />
        </div>
        <div class="text">
          <div>{{ `投稿日 : ${formatDate(situation?.created_at)}` }}</div>
          <div>{{ `投稿者 : ${situation?.contributor}` }}</div>
          <div class="sanitize-text" v-html="sanitize(situation?.content)"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { sanitize } from '~/utils/sanitize'

const route = useRoute()
const { data: situation } = await useFetch(`/api/situations/${route.params.id}`)

useHead({
  title: `${situation.value?.title || '活動報告'} | `
})
</script>

<style lang="scss" scoped>
.content {
  margin: 20px 0;
  width: 100%;
}

.content-wrapper {
  margin: 0 auto;
  width: 90%;
  max-width: 800px;
  background-color: #2c2c2c;
  color: $mainchar;
}

.flex-box {
  margin-top: 20px;
  &-images {
    text-align: center;
  }
  @include mq {
    display: flex;
    &-images {
      width: 40%;
      margin-right: 30px;
    }
  }
}

.sanitize-text {
  margin-top: 10px;
}
</style>
