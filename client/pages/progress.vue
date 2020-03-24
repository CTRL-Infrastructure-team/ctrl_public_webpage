<template>
  <div class="content">
    <el-row>
      <div v-for="(work, index) in works" :key="`${currentPage}${index}`">
        <el-col :span="cardWidth">
          <workCard :work="work" />
        </el-col>
      </div>
    </el-row>
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
import modify from "~/plugins/modifiedTime";

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
