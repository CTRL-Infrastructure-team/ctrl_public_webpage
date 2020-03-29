<template>
  <div class="content">
    <el-card class="content-wrapper">
      <h2>{{ title }}</h2>
      <el-row>
        <el-col :span="topImage">
          <div class="flex_images_top">
            <el-image style="width: 100%;" :src="top_img_url" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="topImage / 2">
          <div class="flex_images">
            <el-image style="width: 100%;" :src="other_img_url[0]" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
        <el-col :span="topImage / 2">
          <div class="flex_images">
            <el-image style="width: 100%;" :src="other_img_url[1]" :preview-src-list="images"> </el-image>
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
    </el-card>
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
      modifiedTime: this.createdAt,
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
  max-width: 700px;
  background-color: #2c2c2c;
  color: $mainchar;
  h2 {
    margin-bottom: 20px;
  }
}

.el-row {
  margin: 0px auto;
}

.flex_images_top {
  width: 95%;
  margin: 0 auto;
  text-align: center;
}
.flex_images {
  width: 90%;
  margin: 20px auto;
  vertical-align: bottom;
}
</style>
