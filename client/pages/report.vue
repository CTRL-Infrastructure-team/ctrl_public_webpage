<template>
  <div class="reportContent">
    <div class="card-wrapper">
      <pageTitle :title="title" />
      <el-row>
        <div v-for="work in works" :key="work.id">
          <el-col :span="24" class="single-panel">
            <situationCard :situation="work" />
          </el-col>
        </div>
      </el-row>
      <div class="pagination-wrapper">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="countPages * 10"
          @current-change="handleCurrentPages"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import situationCard from "~/components/ui/situationCard.vue";
import windowResize from "~/plugins/windowResizeMixins";
import pageTitle from "~/components/ui/pageTitle.vue";

export default {
  components: {
    situationCard,
    pageTitle
  },
  head() {
    return {
      title: "活動報告 | ",
      meta:[
        { hid: 'twitter:description',
          name: 'twitter:description',
          content: "活動報告"
        }
      ]
    }
  },
  async asyncData({ params, app }) {
    let works = await app.$axios.asyncGet(`/api/situations`);
    return { works }
  },
  mixins: [windowResize],
  data() {
    return {
      worksLength: [],
      countPages: 1,
      currentPage: 1,
      pageDatas: new Map(),
      title: "活動報告"
    };
  },
  created() {
    this.worksLength = this.works.length;

    let start = 0,
        end = 9;

    while (this.worksLength > 9) {
      this.pageDatas.set(this.countPages, this.works.slice(start, end));
      start += 9;
      end += 9;
      this.worksLength -= 9;
      this.countPages += 1;
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
    handleCurrentPages: function(index) {
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
.panel-default {
  box-shadow: 2px 2px 4px 3px #2c2c2f;
  margin: 2% 5% 2% 5%;
  border: solid 2px #4ff0f0;
}

.reportContent {
  width: 100%;
  padding: 0px 5%;
}

.card-wrapper {
  margin: 0 auto;
  max-width: 800px;
}

.single-panel {
  margin-bottom: 20px;
  @include mq {
    margin-bottom: 30px;
  }
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

.pagination-wrapper {
  text-align: center;
}
</style>
