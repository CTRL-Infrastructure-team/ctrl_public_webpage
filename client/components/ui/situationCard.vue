<template>
  <div class="content">
    <el-card class="box-card">
      <nuxt-link :to="`/currentSituations/${situation.id}`" class="detail-link"></nuxt-link>
      <div slot="header" class="clearfix">
        <h3>{{ situation.title }}</h3>
      </div>
      <!-- /.clearfix -->
      <div class="flex-box">
        <div class="img_holder">
          <img :src="situation.img_url" />
        </div>
        <!-- /.img_holder -->
        <div class="text-wrapper">
          <div>{{ '日付 : ' + timestamp }}</div>
          <div>{{ '投稿者 : ' + situation.contributor }}</div>
          <div
            class="sanitize-text" 
            v-html="$sanitize(situation.content)"
          >
          <!-- /.sanitize-text -->
          </div>
        </div>
        <!-- text-wrapper -->
      </div>
      <!-- /.flex-box -->
    </el-card>
  </div>
  <!-- /.content -->
</template>

<script>
import modify from "~/plugins/modifiedTime";

export default {
  props: ['situation'],
  computed: {
    timestamp() {
      return modify(this.situation.created_at)
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 0px 5%;
  @include mq {
    padding: 0px 2%;
  }
}

.el-card {
  margin: 0 auto;
}

.text-wrapper {
  margin: 10px;
  @include mq {
    width: 70%;
  }
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
  text-align: center;
  @include mq {
    margin: 0px 10px;
    width: 30%;
  }
}

img{
  width: 100%;
  border-radius: 3px;
}

a {
  text-decoration: none;
  color: $mainchar;
}
.flex{
  &-box {
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

.sanitize-text {
  margin-top: 10px;
}
</style>