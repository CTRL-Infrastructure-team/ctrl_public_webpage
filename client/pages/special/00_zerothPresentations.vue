<template>
  <div class="container">
    <pageHeader :path_datas="path_datas" />
    <presentation :presentations="presendata" class="wrapper" />
  </div>
  <!-- /.container -->
</template>
<script>
import presendata from "~/assets/data/2022sPresentationsData_2.json";
import pageHeader from "~/components/special/pageHeader";
import presentation from "~/components/special/presentations";

export default {
  components: {
    pageHeader,
    presentation
  },
  head() {
    return {
      title: "第0回進捗発表 | ",
      meta:[
        { hid: 'twitter:description',
          name: 'twitter:description',
          content: "第0回進捗発表"
        }
      ]
    }
  },
  data() {
    return {
      path_datas: [
        { name: "Top", path: "/" },
        { name: "特設ページTop", path: "/special/announcementList" },
        { name: "第0回", path: "/special/00_zerothPresentations" }
      ]
    };
  },
  computed: {
    presendata() {
      return presendata
        .filter(v => v.slide0 !== "")
        .map(v => {
          v.url = v.slide0;
          return v;
          }
        )
      ;
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 30px auto;
  @include mq {
    margin: 50px auto;
  }
}
</style>