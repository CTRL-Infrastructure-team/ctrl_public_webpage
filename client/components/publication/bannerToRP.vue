<template>
  <div class="presentations-wrapper">
    
    <nuxt-link
      class="banner-link"
      :to= urls
    ></nuxt-link>
    <span class="banner-top">{{msg}}</span>
  </div>
  <!-- /.presentations-wrapper -->
</template>

<script>
export default {
  data(){
    const page = this.$route.path.split("/").slice(-1)[0];
    if(page === "recentTopics"){
      return {msg:"過去の進捗発表はこちら！", urls:"/publication/pastTerms"}
    }else{
      return {msg:"最近の進捗発表はこちら！", urls:"/publication/recentTopics"}
    }
  }
}
</script>

<style lang="scss" scoped>
.presentations {
  &-wrapper {
    margin-bottom: 30px;
    border-radius: 5px;
    height: 110px;
    background: #ABABAB;
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
    line-height: 70px;
    color: #ffffff;
  }

  &-description {
    display: inline-block;
    width: 100%;
    font-size: calc(15px + 0.7vw);
    font-weight: bolder;
    line-height: 30px;
    color: #ffffff;
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