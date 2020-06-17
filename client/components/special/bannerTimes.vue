<template>
  <div class="presentations-wrapper">
    <nuxt-link
      class="banner-link"
      :to="times.link"
    ></nuxt-link>
    <span class="banner-top">{{ times.top }}</span>
    <span class="banner-description">詳しくはこちらをクリック！</span>
  </div>
  <!-- /.presentations-wrapper -->
</template>

<script>
export default {
  props: ["times"]
}
</script>

<style lang="scss" scoped>
.presentations {
  &-wrapper {
    margin-bottom: 30px;
    border-radius: 5px;
    height: 200px;
    background: #ffffff;
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