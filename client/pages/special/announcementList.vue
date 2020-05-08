<template>
  <div class="container">
    <div class="breadcrumb-wrapper">
      <ul class="breadcrumb-list">
        <li class="breadcrumb-path" v-for="data in path_datas" :key="data.id">
          <nuxt-link class="breadcrumb-link" :to="data.path">{{ data.name }}</nuxt-link>
        </li>
      </ul>
    </div>
    <!-- /.breadcrumb-wrapper -->
    <div class="list-wrapper">
      <div class="presentations-first">
        <nuxt-link class="banner-link" to="/special/firstPresentations"></nuxt-link>
        <span class="banner-top">第1回進捗発表資料</span>
        <span class="banner-description">詳しくはこちらをクリック！</span>
      </div>
      <!-- /.presentations-first -->
    </div>
    <!-- /.list-wrapper -->
  </div>
  <!-- /.container -->
</template>

<script>
// import pageTitle from "~/components/ui/pageTitle.vue"

export default {
  data() {
    return {
      path_datas: [
        { name: "Top", path: "/" },
        { name: "特設ページTop", path: "/special/announcementList" }
      ]
    }
  }
}
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
    content: ">"
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
    line-height: 140px;
    color: #000000;
  }

  &-description {
    display: inline-block;
    width: 100%;
    font-size: calc(15px + 0.7vw);
    font-weight: bolder;
    line-height: 60px;
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