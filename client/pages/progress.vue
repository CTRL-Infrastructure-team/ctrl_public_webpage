<template>
  <div class="content" @resize="windowResize">
    <el-row>
      <div v-for="(work, index) in works" :key="`${currentPage}${index}`">
      <el-col :span="cardWidth" >
        <workCard  :work="work"/>
      </el-col>
      </div>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :total="countPages * 10"
      @current-change="handleCurrentPage">
    </el-pagination>
  </div>
</template>
<script>
import workCard from '~/components/workCard.vue'
import axios from 'axios'

export default {
  components :{
    workCard
  },
  async asyncData() {
    let res = await axios.get('/api/pastWorks'),
        pastWorks = res.data
    return { pastWorks }
  },
  data() {
    return { works: [],
      worksLength: [],
      countPages: 1,
      pageDatas: new Map(),
      currentPage: 1,
      cardWidth: 8
    }
  },
  created() {
    this.works = this.pastWorks
    
    // 記事の数によってページ分割
    let start = 0
    let end = 9
    this.worksLength = this.works.length

    while(this.worksLength > 9) {
      this.pageDatas.set(this.countPages, this.works.slice(start, end))
      start += 9
      end += 9
      this.worksLength -= 9
      this.countPages++
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
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy() {
    window.addEventListener('resize', this.windowResize)
  },
  methods: {
    //引数でページ番号を渡す
    handleCurrentPage: function(index) {
      this.works = this.pageDatas.get(index)
      this.currentPage = index
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      })
    },
    windowResize: function() {
      let windowSize = window.innerWidth
      if(windowSize <= 768) {
        this.cardWidth = 24
      } else {
        this.cardWidth = 8
      }
    }
  },
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

.el-pagination {
  text-align: center;
  color: #2c2c2c;
}

ul.el-pager {
  background-color: $maincolorBlack;
}

ul .number {
  background-color: $maincolorBlack;
}
</style>