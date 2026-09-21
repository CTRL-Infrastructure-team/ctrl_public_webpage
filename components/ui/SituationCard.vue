<template>
  <el-card class="box-card">
    <NuxtLink :to="`/currentSituations/${situation.id}`" class="detail-link">
      <span class="sr-only">{{ situation.title }}</span>
    </NuxtLink>
    <template #header>
      <h3>{{ situation.title }}</h3>
    </template>
    <div class="flex-box">
      <div class="img_holder">
        <img :src="situation.img_url" :alt="situation.title">
      </div>
      <div class="text-wrapper">
        <div>{{ `日付 : ${timestamp}` }}</div>
        <div>{{ `投稿者 : ${situation.contributor}` }}</div>
        <div class="sanitize-text" v-html="sanitized"></div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { sanitize } from '~/utils/sanitize'

const props = defineProps<{
  situation: {
    id: string
    title: string
    content: string
    img_url: string
    contributor: string
    created_at: string
  }
}>()

const timestamp = computed(() => formatDate(props.situation.created_at))
const sanitized = computed(() => sanitize(props.situation.content))
</script>

<style lang="scss" scoped>
.content,
.el-card {
  width: 100%;
}

.text-wrapper {
  margin: 10px;
  @include mq {
    width: 70%;
  }
}

.box-card {
  width: 100%;
  position: relative;
  background-color: #2c2c2c;
  color: $mainchar;
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
  text-align: center;
  @include mq {
    margin: 0 10px;
    width: 30%;
  }
}

img {
  width: 100%;
  border-radius: 3px;
}

.flex-box {
  display: flex;
  flex-direction: column;
  @include mq {
    flex-direction: row;
  }
}

.sanitize-text {
  margin-top: 10px;
}
</style>
