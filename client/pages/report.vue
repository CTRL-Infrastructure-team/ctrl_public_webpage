<template>
  <div class="reportContent">
    <el-row>
      <div v-for="work in works" :key="work">
        <el-col :span="8">
          <workCard　:work="work"/>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import reportContent from "~/pages/pastWorks/data.json";
// import { pastWorks } from '../../api/model';
export default {
  components: {
    workCard
  },
  data() {
    var works = [];
    return { works: works };
  },
  created() {
    // this.works = pastWorks.pastWorks
  }
};
</script>
<style lang="scss" scoped>
.panel-default {
  box-shadow: 2px 2px 4px 3px #2c2c2f;
  margin: 2% 5% 2% 5%;
  border: solid 2px #4ff0f0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  background-color: #2c2c2f;
  height: 50px;

  color: #ffffff;
  border-bottom: 2px solid #4ff0f0;
}

.panel-body {
  display: flex;
  justify-content: space-between;
  background-color: #2c2c2f;
  height: 100px;
}
</style>
