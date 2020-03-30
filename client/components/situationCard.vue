<template>
  <div class="content">
    <el-card class="box-card">
      <nuxt-link :to="`/currentSituations/${situation._id}`" class="detail-link"></nuxt-link>
      <div slot="header" class="clearfix">
        <h3>{{ situation.title }}</h3>
      </div>
      <div class="flex-box">
        <div class="img_holder">
          <img :src="situation.img_url" />
        </div>
        <div class="text item">
          <div>{{ '日付 : ' + timestamp }}</div>
          <div>{{ '投稿者 : ' + situation.contributor }}</div>
          <div>{{ '概要 : ' + situation.content }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import modify from "~/plugins/modifiedTime";

export default {
  props: ['situation'],
  computed: {
    timestamp() {
      return modify(this.situation.createdAt)
    }
  },
  mounted() {
    console.log("situation.img_url", this.situation.img_url)
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

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
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
}

.img_holder {
  margin: 0px 0px;
  // width: 100%;
  text-align: center;
  @include mq {
    margin: 0px 10px;
    width: 30vw;
  }
}

img{
  width: 100%;
  @include mq {
    width: 30vw;
  }
}

a {
  text-decoration: none;
  color: $mainchar;
}
.flex{
  &-box {
    // width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    @include mq {
      flex-direction: row;
      justify-content: flex-start;
    }
  }
}
</style>