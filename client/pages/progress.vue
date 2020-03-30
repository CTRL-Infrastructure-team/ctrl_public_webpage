<template>
  <div class="content">
    <div class="card-wrapper">
      <div class="page-title">
        <span>作品</span>
      </div>
      <el-row>
        <div v-for="(work, index) in works" :key="`${currentPage}${index}`">
          <el-col :span="cardWidth">
            <workCard :work="work" />
          </el-col>
        </div>
      </el-row>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="countPages * 10"
      @current-change="handleCurrentPage"
    >
    </el-pagination>
  </div>
</template>
<script>
import workCard from "~/components/workCard.vue";
import pastWork from "~/pages/pastWorks/data.json";
import windowResize from "~/plugins/windowResizeMixins";

export default {
  components: {
    workCard
  },
  mixins: [windowResize],
  async asyncData({ app }) {
    let works = await app.$axios.asyncGet(`/api/pastWorks`)
    return { works }
  },
  data() {
    return {
      worksLength: [],
      countPages: 1,
      pageDatas: new Map(),
      currentPage: 1
    };
  },
  created() {
    let start = 0;
    let end = 9;
    this.worksLength = this.works.length;

    while (this.worksLength > 9) {
      this.pageDatas.set(this.countPages, this.works.slice(start, end));
      start += 9;
      end += 9;
      this.worksLength -= 9;
      this.countPages++;
    }

    end = this.works.length;
    this.pageDatas.set(this.countPages, this.works.slice(start, end));
    this.works = this.pageDatas.get(1);
  },
  computed: {
    cardWidth() {
      return this.innerWidth < 768 ? 24 : 8;
    }
  },
  methods: {
    //引数でページ番号を渡す
    handleCurrentPage(index) {
      this.works = this.pageDatas.get(index);
      this.currentPage = index;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 0px 5%;
}

.card-wrapper {
  max-width: 1000px;
  // width: 90%;
  margin: 0 auto;
}

.page-title {
  height: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
  span {
    &::before {
      content: "";
      position: absolute;
      top: 15px;
      left: -20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translateY(-50%);
      background: #f0f0f0;
    }
    position: relative;
    margin-left: 50px;
    font-family: "ヒラギノ角ゴシック";
    text-align: left;
    font-size: calc(17px + 0.625vw);
    font-weight: 500;
  }
}

.el-col {
    margin-bottom: 20px;
  @include mq {
    margin-bottom: 30px;
  }
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
