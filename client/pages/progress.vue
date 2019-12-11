<template>
  <div class="content">
    <el-row>
      <div v-for="i in 20" :key="i">
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
  }
};
</script>
<style lang="scss" scoped>
.el-col {
  margin: 20px 0px;
}
</style>