<template>
  <div class="container">
    <div class="breadcrumb-wrapper">
      <ul class="breadcrumb-list">
        <li class="breadcrumb-path" v-for="data in path_datas" :key="data.id">
          <nuxt-link class="breadcrumb-link" :to="data.path">{{
            data.name
          }}</nuxt-link>
        </li>
      </ul>
    </div>
    <!-- /.breadcrumb-wrapper -->
    <div class="list-wrapper" v-for="topic in topics" :key="topic.id2">
      <banner :data="topic" />
    </div>
    <div class="list-wrapper">
      <bannerToRP />
    </div>
    <!-- /.list-wrapper -->
  </div>
  <!-- /.container -->
</template>

<script>
import banner from "../../components/publication/banner";
import bannerToRP from "../../components/publication/bannerToRP";
import modify from "~/plugins/modifiedTime";

export default {
  components: { banner, bannerToRP },
  async asyncData({ app }) {
    let topics = await app.$axios.asyncGet(`/api/publication/pastTopics`)
    topics = topics.map(t=>{
      t.topic_date = modify(t.topic_date);
      return t
    });
    return { topics }
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
  data() {
    return {
      path_datas: [
        { name: "Top", path: "/" },
        { name: "進捗発表", path: "/publication/recentTopics" },
        { name: "過去の進捗発表", path: "/publication/pastTopics" }
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