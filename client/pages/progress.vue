<template>
  <div class="content">
    <el-row>
      <el-col :span="8">
        <workCard />
      </el-col>
      <el-col :span="8">
        <workCard />
      </el-col>
      <el-col :span="8">
        <workCard />
      </el-col>
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
</style>