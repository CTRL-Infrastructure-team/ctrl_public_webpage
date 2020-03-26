<template>
  <div class="content"> 
    <h2>{{ title }}</h2>
    <div class="flex-box">
      <div class="flex-box-images">
        <el-row>
          <div class="flex_images_top">
            <el-image
              :src="img"
              :preview-src-list="images"
            >
            </el-image>
          </div>
      </el-row>
    </div>
    <el-row>
      <el-col :span="topImage">
      {{ '投稿日 : ' + createdAt }}
      <br>
      {{ '制作者 : ' + contributor }}
      <br>
      {{ content }} 
      </el-col>
    </el-row>
    </div>  
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
    data.createdAt = modify(data.createdAt);
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
    margin-left: 10px;
    margin-top: 10px;
    //width: 600px;
  }
  &-col{
    //width: 600px
    //margin-right: 30px;
  }
}


.content {
  margin: 20px 20px;
  
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
@media screen and (min-width:768px){
  .row_image{
    padding-right: 30px;
  }
  .flex-box{
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    &-images{
      width: 400px;
      margin-top: 50px;
      margin-right: 30px;
      margin-bottom: 20px;
    }
  }
}
</style>