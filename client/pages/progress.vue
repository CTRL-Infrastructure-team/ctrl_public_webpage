<template>
  <div class="content">
    <el-row>
      <div v-for="(work, index) in works" :key="`${currentPage}${index}`">
      <el-col :span="8" >
        <workCard  :work="work"/>
      </el-col>
      </div>
    </el-row>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="countPages * 10"
      @current-change="handleCurrentPage">
    </el-pagination>
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
    let works = []
    let worksLength = []
    let countPages = 1
    let pageDatas = new Map()
    let currentPage = 1
    return { works: works,
      worksLength: worksLength,
      countPages: countPages,
      pageDatas: pageDatas,
      currentPage: currentPage
    }
  },
  created() {
    this.works = pastWork.pastWorks

    // console.log(this.works)

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

    // console.log(this.countPages)

    //オブジェクトの内容確認
    // this.pageDatas.get(1).forEach((value, index, array) => {
    //   console.log(value)
    // })
    
    this.works = this.pageDatas.get(1)

  },
  methods: {
    //引数でページ番号を渡す
    handleCurrentPage(index) {
      // console.log("index : " + index)
      this.works = this.pageDatas.get(index)
      this.currentPage = index
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      })
    }
  }
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
}

// .pagination button{
//   background-color: $maincolorBlack;
//   color: $maincolorBlack;
// }
// .el-pager .number{
//   background-color: $maincolorBlack;
//   color: $maincolorBlack;
// }
</style>