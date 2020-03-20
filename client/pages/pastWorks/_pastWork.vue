<template>
  <div class="content">
    <h2>{{ title }}</h2>
    <el-row>
      <el-col :span="topImage">
        <div class="flex_images_top">
          <el-image :src="img" :preview-src-list="images"> </el-image>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="topImage / 2">
        <div class="flex_images">
          <el-image :src="img2" :preview-src-list="images"> </el-image>
        </div>
      </el-col>
      <el-col :span="topImage / 2">
        <div class="flex_images">
          <el-image :src="img3" :preview-src-list="images"> </el-image>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="topImage">
        {{ "投稿日 : " + createdAt }}
        <br />
        {{ "制作者 : " + producer }}
        <br />
        {{ content }}
        <br />
        {{ "ダウンロードはこちら : " + download_url }}
      </el-col>
    </el-row>
  </div>
</template>
<script>
import img from "~/assets/img/img4.jpg";
import img2 from "~/assets/img/img2.jpg";
import img3 from "~/assets/img/img1.jpg";
import pastWork from "~/pages/pastWorks/data.json";
import windowResize from "~/plugins/windowResizeMixins";

import axios from "axios";
export default {
  async asyncData({ params, app }) {
    let data = await app.$axios.asyncGet(`/api/pastWork/${params.pastWork}`);
    return { ...data };
  },
  mixins: [windowResize],
  data() {
    var submission = [];
    let topImage;
    let secondImage;
    let thirdImage;
    return {
      // title: this.$route.params.pastWork,
      img: img,
      img2: img2,
      img3: img3,
      images: [img, img2, img3],
      submission: submission
    };
  },
  created() {
    var works = pastWork.pastWorks;
    var work = [];
    // console.log(works);
    var para = this.$route.params.pastWork;
    Object.keys(works).forEach(function(key) {
      if (works[key].title == para) {
        work = works[key];
      }
    });
    this.submission = work;
  },
  computed: {
    topImage() {
      return this.innerWidth < 768 ? 24 : 14;
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  margin: 20px 20px;
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
