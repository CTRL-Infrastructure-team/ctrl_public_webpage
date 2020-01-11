<template>
  <div class="content">
    <el-row>
      <div v-for="i in 7" :key="i">
      <el-col :span="8" >
        <workCard />
      </el-col>
      </div>
      <!-- <el-col :span="8">
        <workCard />
      </el-col>
      <el-col :span="8">
        <workCard />
      </el-col> -->
    </el-row>
  </div>
</template>
<script>
import workCard from '~/components/workCard.vue'

export default {
  components :{
    workCard
  },
  // data() {
  //     return {
  //         img: work_img,
  //         sample_data: {
  //             date: '2019-12-13',
  //             overview: 'この作品の概要です。',
  //         }
  //     }
  // },
  // async asyncData({ app }) {
  //     const data = await app.$axios.get('http://localhost:3000/api/')
  //     return { data: data }
  // },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 0px 5%;
}

.el-col {
  margin: 20px 0px;
}
</style>