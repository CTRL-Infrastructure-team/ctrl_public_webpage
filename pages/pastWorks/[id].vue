<template>
  <div class="content">
    <el-card v-if="work" class="content-wrapper">
      <el-row>
        <el-col :span="24">
          <div class="flex_images_top">
            <el-image style="width: 100%" :src="work.top_img_url" :preview-src-list="images" />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="flex_images">
            <el-image style="width: 100%" :src="work.other_img_url_0" :preview-src-list="images" />
          </div>
        </el-col>
        <el-col :span="12">
          <div class="flex_images">
            <el-image style="width: 100%" :src="work.other_img_url_1" :preview-src-list="images" />
          </div>
        </el-col>
      </el-row>
      <div class="text-wrapper">
        <div class="content-title">{{ work.title }}</div>
        <div class="content-text">{{ `投稿日 : ${formatDate(work.created_at)}` }}</div>
        <div class="content-text">{{ `制作者 : ${work.contributor}` }}</div>
        <div v-if="work.twitter_id" class="content-text">
          {{ `Twitter ID : ${work.twitter_id}` }}
        </div>
        <div class="content-text sanitize-text" v-html="sanitize(work.content)"></div>
        <div class="content-download">
          <div class="content-text">ダウンロードはこちら :</div>
          <a :href="work.download_url" class="content-icon" aria-label="作品ファイルをダウンロード">
            <img src="/download.png" alt="">
          </a>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { sanitize } from '~/utils/sanitize'
import { redirectPastWorkId } from '~/utils/redirects'

const route = useRoute()
const id = computed(() => String(route.params.id))
const redirected = redirectPastWorkId(id.value)
if (redirected) {
  await navigateTo(`/pastWorks/${redirected}`, { replace: true })
}

const { data: work } = await useFetch(`/api/pastworks/${id.value}`)
const images = computed(() =>
  work.value
    ? [work.value.top_img_url, work.value.other_img_url_0, work.value.other_img_url_1]
    : []
)

useHead({
  title: `${work.value?.title || '作品'} | `
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
  max-width: 700px;
  background-color: #2c2c2c;
  color: $mainchar;
}

.text-wrapper {
  margin-left: 10px;
  @include mq {
    margin-left: 20px;
  }
}

.content-title {
  font-weight: bolder;
  font-size: calc(15px + 1vw);
  margin-bottom: 15px;
}

.content-text {
  line-height: 30px;
}

.content-icon img {
  height: 27px;
  width: 27px;
}

.content-download {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.flex_images_top {
  width: 95%;
  margin: 0 auto;
}

.flex_images {
  width: 90%;
  margin: 20px auto;
}

.sanitize-text {
  margin: 10px 0;
}
</style>
