<template>
  <div class="content">
    <el-row>
      <div v-for="work in works" :key="work">
      <el-col :span="8" >
        <workCard  :work="work"/>
      </el-col>
      </div>
    </el-row>
  </div>
</template>
<script>
import workCard from '~/components/workCard.vue'
import pastWork from '~/pages/pastWorks/data.json'

export default {
  components :{
    workCard
  },
  data() {
    var works = []
    return { works: works }
  },
  created() {
    this.works = pastWork.pastWorks
    console.log(this.works)
  },
  // async asyncData({app}) {
  //   const datas = await app.$axios.get('./data.json')
  //   const works = datas.pastWorks
  //   return { works: works }
  // },
}
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