<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h3><nuxt-link :to="`/currentSituations/${situation._id}`">{{ situation.title }}</nuxt-link></h3>
      </div>
      <div class="flex-box">
        <div class="img_holder">
          <img :src="situation.img_url" />
        </div>
        <div class="text item">
          {{ '日付 : ' + timestamp }} 
          <br>
          {{ '  制作者 : ' + situation.contributor }}
          <br>
          {{ '概要 : ' + situation.content }}
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
  background-color: #2c2c2c;
  color: $mainchar;
}


.img_holder {
  margin-left: 10px;
  width: 30vw;
  margin-right: 10px;
  
}

img{
  width: 30vw;
}

a {
  text-decoration: none;
  color: $mainchar;
}
.flex{
  &-box {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
  }
}
</style>