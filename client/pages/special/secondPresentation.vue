<template>
  <div class="container">
    <pageHeader :path_datas="path_datas" />
    <presentation :presentations="presendata" />
  </div>
</template>
<script>
import presendata from "~/assets/data/firstPresentationsData.json";
import pageHeader from "~/components/special/pageHeader";
import presentation from "~/components/special/presentations";

export default {
  components: {
    pageHeader,
    presentation
  },
  data() {
    return {
      path_datas: [
        { name: "Top", path: "/" },
        { name: "特設ページTop", path: "/special/announcementList" },
        { name: "第2回", path: "/special/secondPresentations" }
      ]
    };
  },
  computed: {
    presendata() {
      return presendata.map(v => {
        v.url = v.slide2;
        return v;
      });
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
