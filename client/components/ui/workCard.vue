<template>
  <div class="content">
    <el-card
      class="box-card"
      :body-style="{ padding: '0px' }"
    >
      <nuxt-link 
        :to="`/pastWorks/${work.id}`"
        :work="work" 
        class="detail-link"
      >
      </nuxt-link>
      <div 
        class="img_holder"
        :style="`background-image: url(${img})`"
      >
      </div>
      <!-- /.img_holder -->
      <div class="text-wrapper">
        <div class="text-title">{{ work.title }}</div>
        <!-- /.text-title -->
        <div class="text-other">{{ '日付 : ' + modifiedTime }}</div>
        <!-- /.text-other -->
        <div class="text-other">{{ '  制作者 : ' + work.contributor }}</div>
        <!-- /.text-other -->
        <div
          v-if="twitterShow"
          class="text-other"
        >
          {{ 'Twitter ID : ' + work.twitter_id }}
        </div>
        <!-- /.text-other -->
      </div>
      <!-- /.text-wrapper -->
    </el-card>
  </div>
  <!-- /.content -->
</template>

<script>
import modify from '~/plugins/modifiedTime';

export default {
  props: ['work'],
  data() {
    let twitterShow = false;
    if(this.work.twitter_id !== "") {
      twitterShow = true;
    }
    return {
      img: this.work.top_img_url, 
      modifiedTime: modify(this.work.created_at),
      twitterShow
    };
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}

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

.sanitize-text {
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: $mainchar;
}
</style>