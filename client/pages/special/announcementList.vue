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
    <div class="list-wrapper">
      <bannerTimes :times="times.first" />
      <bannerTimes :times="times.second" />
      <bannerTimes :times="times.third" />
    </div>
    <!-- /.list-wrapper -->
  </div>
  <!-- /.container -->
</template>

<script>
import bannerTimes from "../../components/special/bannerTimes";

export default {
  components: { bannerTimes },
  data() {
    return {
      path_datas: [
        { name: "Top", path: "/" },
        { name: "特設ページTop", path: "/special/announcementList" }
      ],
      times: {
        first: { top: "第1回進捗発表資料", link: "/special/firstPresentations" },
        second: { top: "第2回進捗発表資料", link: "/special/secondPresentations" },
        third: { top: "第3回進捗発表資料", link: "/special/thirdPresentations" },
      }
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
  min-height: calc(100vh - 60px);
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
}

</style>
