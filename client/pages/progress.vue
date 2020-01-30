<template>
  <div class="content">
    <el-row>
      <div v-for="work in works" :key="work">
      <el-col :span="8" >
        <workCard  :work="work"/>
      </el-col>
      </div>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :total="worksLength">
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
    return { works: works,
      worksLength: worksLength
    }
  },
  created() {
    this.works = pastWork.pastWorks
    console.log(this.works)

    // 記事の数によってページ分割

    let pageDatas = new Map()
    let countPages = 0
    let start = 0
    let end = 10
    this.worksLength = this.works.length

    while(this.worksLength > 10) {
      pageDatas.set(countPages, this.works.slice(start, end))
      start += 10
      end += 10
      if(end > this.worksLength) {
        end = this.worksLength
      }
      this.worksLength -= 10
      ++countPages
    }

    //オブジェクトの内容確認
    pageDatas.get(0).forEach((value, index, array) => {
      console.log(value)
    })

  },
  methods: {
    //引数でページ番号を渡す
    selectPage(index) {
      this.works = pageDatas.get(index + 1)
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

// .el-pagination {
//   background-color: $maincolorBlack;
//   color: $maincolorBlack;
// }
</style>