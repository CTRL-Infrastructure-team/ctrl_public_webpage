<template>
  <div class="banner-wrapper">
    <nuxt-link class="banner-link" to="/special/announcementList"></nuxt-link>
    <span class="banner-top">進捗発表資料 公開中</span>
    <span class="banner-description">詳しくはこちらをクリック！</span>
  </div>
  <!-- /.banner-wrapper -->
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>

.banner {
  &-wrapper {
    position: relative;
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    height: 150px;
    background: #f5f4f4;
    border-radius: 3px;
    text-align: center;
    overflow: hidden;
  }

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