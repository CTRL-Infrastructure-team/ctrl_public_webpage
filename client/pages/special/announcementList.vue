<template>
  <div class="container">
    <div class="list-wrapper">
      <!-- <span>2020年4月29日に予定されております第一回進捗発表会の資料をこちらのページに掲載する予定です。掲載のタイミングは追って公式Twitterで告知させていただきます。</span> -->
      <pageTitle :title="title" />
    </div>
    <!-- /.list-wrapper -->
  </div>
  <!-- /.container -->
</template>

<script>
import pageTitle from "~/components/ui/pageTitle.vue"

export default {
  components: {
    pageTitle
  },
  data() {
    return { title: "特設ページ" }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}

.list-wrapper {
  min-height: calc(100vh - 60px);
  width: 90%;
  max-width: 1000px;
  margin: 30px auto;
}

</style>