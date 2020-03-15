<template>
  <div class="reportContent">
    <el-row>
     <div v-for="work in works" :key="work.id">
       <el-col :span="24" class="single-panel">
         <!-- <workCard :work="work"/> -->
         <situationCard :situation="work" />
       </el-col>
     </div>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :total="countPages * 10"
      @current-change="handleCurrentPages"
    >
    </el-pagination>
  </div>
</template>


<script>
import reportContent from '~/pages/pastWorks/data.json'
// import { pastWorks } from '../../api/model';
import situationCard from '~/components/situationCard.vue'

export default {
  components :{
    situationCard
  },
  data(){
    return {
      works: [],
      worksLength: [],
      countPages: 1,
      currentPage: 1,
      cardWidth: 24,
      pageDatas: new Map()
    }
  },
  created() {
    this.works = reportContent.currentSituation
    // this.works = reportContent.pastWorks
    this.worksLength = this.works.length

    let start = 0,
        end = 9

    while(this.worksLength > 9) {
      this.pageDatas.set(this.countPages, this.works.slice(start, end))
      start += 9
      end += 9
      this.worksLength -= 9
      this.countPages += 1
    }

    end = this.works.length
    this.pageDatas.set(this.countPages, this.works.slice(start, end))
    this.works = this.pageDatas.get(1)
  },
  mounted() {
    let windowSize = window.innerWidth
    if(windowSize <= 768) {
      this.cardWidth = 24
    } else {
      this.cardWidth = 8
    }
    window.addEventListener('resize', this.windowReSize)
  },
  methods: {
    windowReSize: function() {
      let windowSize = window.innerWidth
      if(windowSize <= 768) {
        this.cardWidth = 24
      } else {
        this.cardWidth = 8
      }
    },
    handleCurrentPages: function(index) {
      this.works = this.pageDatas.get(index)
      this.currentPage = index
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
};
  

</script>
<style lang="scss" scoped>

.panel-default{
  box-shadow: 2px 2px 4px 3px #2c2c2f;
  margin: 2% 5% 2% 5%;
  border: solid 2px #4ff0f0;
}

.reportContent {
  width: 60%;
  margin: 0 auto;
}

.single-panel {
  margin: 40px 0px;
}

.panel-header{
  display: flex;
  justify-content: space-between;
  background-color: #2c2c2f;
  height: 50px;

color: #FFFFFF;
border-bottom: 2px solid #4ff0f0;
}

.panel-body{
  display: flex;
  justify-content: space-between;
  background-color: #2c2c2f;
  height: 100px;
}
</style>