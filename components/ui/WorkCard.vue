<template>
  <el-card class="box-card" :body-style="{ padding: '0px' }">
    <NuxtLink :to="`/pastWorks/${work.id}`" class="detail-link">
      <span class="sr-only">{{ work.title }}</span>
    </NuxtLink>
    <div class="img_holder" :style="{ backgroundImage: `url(${work.top_img_url})` }"></div>
    <div class="text-wrapper">
      <div class="text-title">{{ work.title }}</div>
      <div class="text-other">{{ `日付 : ${modifiedTime}` }}</div>
      <div class="text-other">{{ `  制作者 : ${work.contributor}` }}</div>
      <div v-if="work.twitter_id" class="text-other">
        {{ `Twitter ID : ${work.twitter_id}` }}
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'

const props = defineProps<{
  work: {
    id: string
    title: string
    contributor: string
    twitter_id: string
    top_img_url: string
    created_at: string
  }
}>()

const modifiedTime = computed(() => formatDate(props.work.created_at))
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0 auto;
}

.text-wrapper {
  margin: 20px 20px;
}

.box-card {
  width: 100%;
  background-color: #2c2c2c;
  color: $mainchar;
  position: relative;
  @include mq {
    height: 300px;
  }
}

.detail-link {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.img_holder {
  width: 100%;
  padding-top: 56.25%;
  background-position: center center;
  background-size: cover;
}

.text-title {
  font-weight: bolder;
  font-size: calc(15px + 0.6vw);
}
</style>
