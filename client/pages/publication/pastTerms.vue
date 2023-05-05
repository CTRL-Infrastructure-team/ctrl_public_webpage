<template>
  <div class="container">
    <pageHeader :path_datas="path_datas" />
    <div class="list-wrapper" v-for="term in terms" :key="term.id2">
      <termBanner :data="term" />
    </div>
    <div class="list-wrapper">
      <bannerToRP />
    </div>
    <!-- /.list-wrapper -->
  </div>
  <!-- /.container -->
</template>

<script>
import pageHeader from "~/components/publication/pageHeader";
import termBanner from "../../components/publication/termBanner";
import bannerToRP from "../../components/publication/bannerToRP";
//import modify from "~/plugins/modifiedTime";

export default {
  components: {pageHeader, termBanner, bannerToRP },
  async asyncData({ app }) {
    let terms = await app.$axios.asyncGet(`/api/publication/pastTerms`)
    return { terms }
  },
  head() {
    return {
      title: "過去の活動期間 | ",
      meta:[
        { hid: 'twitter:description',
          name: 'twitter:description',
          content: "過去の活動期間"
        }
      ]
    }
  },
  data() {
    return {
      path_datas: [
        { name: "Top", path: "/" },
        { name: "最近の進捗発表", path: "/publication/recentTopics" },
        { name: "過去の活動期間", path: "/publication/pastTerms" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 30px auto;
  @include mq {
    margin: 50px auto;
  }
}

.breadcrumb {
  &-wrapper {
    width: 90%;
    max-width: 1000px;
    margin: 0px auto 30px auto;
  }
  &-list {
    padding-left: 0px;
    text-align: left;
  }
  &-path {
    display: inline-block;
    list-style: none;
  }
  &-path::after {
    display: inline-block;
    margin: 0px 5px;
    content: ">";
  }
  &-path:last-child::after {
    content: none;
  }
  &-link {
    text-decoration: none;
    color: $mainchar;
  }
  &-text {
    margin-top: 20px;
  }
}

.list-wrapper {
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
}

</style>