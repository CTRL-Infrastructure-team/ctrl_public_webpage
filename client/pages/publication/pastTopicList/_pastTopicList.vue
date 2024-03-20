<template>
  <div class="container">
    <pageHeader :path_datas="path_datas" />
    <div class="list-wrapper" v-for="topic in topics" :key="topic.id2">
      <banner :data="topic" />
    </div>
  </div>
  <!-- /.container -->
</template>

<script>
import pageHeader from "~/components/publication/pageHeader";
import banner from "~/components/publication/banner";
import bannerToRP from "~/components/publication/bannerToRP";
import modify from "~/plugins/modifiedTime";

export default {
  components: {pageHeader, banner, bannerToRP },
  async asyncData({ params, app }) {
    let term = await app.$axios.asyncGet(`/api/publication/term/${params.pastTopicList}`);
    let topics = await app.$axios.asyncGet(`/api/publication/termTopics/${params.pastTopicList}`);
    topics = topics.map(t=>{
      t.date = modify(t.date);
      return t
    });
    let path_datas = [
        { name: "Top", path: "/" },
        { name: "最近の進捗発表", path: "/publication/recentTopics"},
        { name: "過去の進捗発表", path: "/publication/pastTerms"},
        { name: term.name, path: "/publication/pastTopicList/" + term.id }
      ];
    return { topics, term, path_datas }
  },
  head() {
    return {
      title: "過去の進捗発表 | ",
      meta:[
        { hid: 'twitter:description',
          name: 'twitter:description',
          content: "過去の進捗発表"
        }
      ]
    }
  },
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