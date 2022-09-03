<template>
  <div class="content"> 
    <el-card class="content-wrapper">
      <h2>{{ title }}</h2>
      <div class="flex-box">
        <div class="flex-box-images">
            <div class="flex_images_top">
              <el-image
                :src="img_url"
                :preview-src-list="[img_url]"
              >
              </el-image>
            </div>
      </div>
      <el-row>
        <el-col :span="topImage">
          <div>{{ '投稿日 : ' + created_at }}</div>
          <div>{{ '投稿者 : ' + contributor }}</div>
          <div class="sanitize-text" v-html="$sanitize(content)"></div> 
        </el-col>
      </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import img from '~/assets/img/img4.jpg'
import img2 from '~/assets/img/img2.jpg'
import img3 from '~/assets/img/img1.jpg'
import modify from "~/plugins/modifiedTime"
import windowResize from "~/plugins/windowResizeMixins"

export default {
  async asyncData({ params, app }) {
    let data = await app.$axios.asyncGet(`/api/situations/${params.currentSituation}`);
    data.created_at = modify(data.created_at);
    return { ...data };
  },
  mixins: [windowResize],
  data() {
    return {
      title: this.$route.params.currentSiuation,
      img: img,
      img2: img2,
      img3: img3,
      images: [ img, img2, img3 ],
      topImage: 24,
    }
  }
}
</script>
<style lang="scss" scoped>
.el{
  &-row{
    margin: 10px;
  }
  &-image {
    border-radius: 3px;
  }
}


.content {
  margin: 20px 0px;
  width: 100%;
}

.content-wrapper {
  margin: 0 auto;
  width: 90%;
  max-width: 800px;
  background-color: #2c2c2c;
  color: $mainchar;
}

.flex_images_top {
  width: 100%;
  max-height: 50%;
  margin: 0 auto;
  @include mq{
    margin: 0px 0px;
  }
}
.flex_images {
  width: 90%;
  max-height: 50%;
  margin: 20px auto;
  @include mq{
    margin: 20px 0px;
  }
  //margin-left: 40px;
}
.flex-box{
  margin-top: 20px;
  &-images {
    text-align: center;
  }
  @include mq {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    &-images{
      width: 40%;
      margin-right: 30px;
      margin-bottom: 20px;
    }
  }
}

@media screen and (min-width:768px){
  .row_image{
    padding-right: 30px;
  }
}

.sanitize-text {
  margin-top: 10px;
}
</style>