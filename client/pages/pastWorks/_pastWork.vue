<template>
  <div class="content">
    <el-card class="content-wrapper">
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
            <el-image style="width: 100%;" :src="other_img_url_0" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
        <el-col :span="topImage / 2">
          <div class="flex_images">
            <el-image style="width: 100%;" :src="other_img_url_1" :preview-src-list="images"> </el-image>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="text-wrapper">
          <el-col :span="topImage">
            <div class="content-title">{{ title }}</div>
            <div class="content-text">{{ "投稿日 : " + created_at }}</div>
            <div class="content-text">{{ "制作者 : " + contributor }}</div>
            <div v-if="twitterShow" class="content-text">
              {{ 'Twitter ID : ' + twitter_id }}
            </div>
            <div class="content-text sanitize-text" v-html="$sanitize(content)"></div>
            <div class="content-download">
              <div class="content-text">{{ "ダウンロードはこちら : " }}</div>
              <div class="content-icon" :style="`background-image: url(${download_icon})`">
                <a :href="download_url" class="content-link">
                </a>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import windowResize from "~/plugins/windowResizeMixins";
import modify from "~/plugins/modifiedTime";
import download_icon from "~/static/download.png";

export default {
  async asyncData({ params, app }) {
    let data = await app.$axios.asyncGet(`/api/pastWork/${params.pastWork}`);
        data.created_at = modify(data.created_at)
    return { ...data };
  },
  mixins: [windowResize],
  data() {
    return {
      images: [],
      modifiedTime: this.created_at,
      download_icon,
      twitterShow: false
    };
  },
  created() {
    this.images = [
        this.top_img_url,
        this.other_img_url_0,
        this.other_img_url_1
    ]
    if(this.twitter_id !== "") {
      this.twitterShow = true
    }
  },
  computed: {
    topImage() {
      return 24;
    },
    showTwitter() {

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
}

.text-wrapper {
  // width: 95%;
  margin-left: 10px;
  @include mq {
    margin-left: 20px;
  }
}

.content-title {
  font-weight: bolder;
  font-size: calc(15px + 1.0vw);
  margin-bottom: 15px;
}

.content-text {
  line-height: 30px;
}

.content-icon {
  height: 27px;
  width: 27px;
  position: relative;
  background-size: cover;
  margin-left: 10px;
}

.content-link {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.content-download {
  display: flex;
  flex-direction: row;
}

.el {
  &-row {
    margin: 0px auto;
  }
  &-image {
    border-radius: 3px;
  }
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

.sanitize-text {
  margin: 10px 0px;
}
</style>
