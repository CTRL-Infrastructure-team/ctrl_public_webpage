<template>
  <div class="content">
    <div class="content-wrapper">
      <h2>{{ title }}</h2>
      <el-row>
        <el-col :span="topImage">
          <div class="flex_images_top">
            <el-image :src="top_img_url" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="topImage / 2">
          <div class="flex_images">
            <el-image :src="other_img_url[0]" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
        <el-col :span="topImage / 2">
          <div class="flex_images">
            <el-image :src="other_img_url[1]" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="topImage">
          {{ "投稿日 : " + createdAt }}
          <br />
          {{ "制作者 : " + contributor }}
          <br />
          {{ content }}
          <br />
          {{ "ダウンロードはこちら : " }} <a :href="download_url">download!</a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import windowResize from "~/plugins/windowResizeMixins";
import modify from "~/plugins/modifiedTime";

export default {
  async asyncData({ params, app }) {
    let data = await app.$axios.asyncGet(`/api/pastWork/${params.pastWork}`);
    data.createdAt = modify(data.createdAt);
    return { ...data };
  },
  mixins: [windowResize],
  data() {
    return {
      images: [],
      modifiedTime: this.createdAt
    };
  },
  created() {
    this.images = [
        this.top_img_url,
        this.other_img_url[0],
        this.other_img_url[1]
    ]
  },
  computed: {
    topImage() {
      // return this.innerWidth < 768 ? 24 : 14;
      return 24;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin: 20px 0px;
  width: 100%;
}

.content-wrapper {
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
}

.flex_images_top {
  width: 95%;
  max-height: 50%;
  margin: 0 auto;
  @include mq {
    margin: 0px 0px;
  }
}
.flex_images {
  width: 90%;
  max-height: 50%;
  margin: 20px auto;
  @include mq {
    margin: 20px 0px;
  }
}
</style>
