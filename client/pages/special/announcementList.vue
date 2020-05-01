<template>
  <div class="container">
    <div class="list-wrapper">
      <pageTitle :title="title" />
      <div class="presentations-first">
        <nuxt-link class="banner-link" to="/special/firstPresentations"></nuxt-link>
        <span class="banner-top">第1回進捗発表資料</span>
        <span class="banner-description">詳しくはこちらをクリック！</span>
      </div>
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

.presentations {
  &-first {
    border-radius: 5px;
    height: 200px;
    background: #FFFFFF;
    text-align: center;
    position: relative;
  }
}

.banner {
  &-top {
    display: inline-block;
    width: 100%;
    font-size: calc(16px + 1vw);
    font-weight: bolder;
    line-height: 100px;
    color: #000000;
  }

  &-description {
    display: inline-block;
    width: 100%;
    font-size: calc(15px + 0.7vw);
    font-weight: bolder;
    line-height: 40px;
    color: #000000;
  }

  &-link {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

</style>