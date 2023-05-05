<template>
  <div class="presentations-wrapper">
    
    <nuxt-link
      class="banner-link"
      :to="`/publication/pastTopicList/${data.id}`"
    ></nuxt-link>
    <span class="banner-top">{{ data.name }}</span>
    <span class="banner-description">{{ data.explanation }}</span>
  </div>
  <!-- /.presentations-wrapper -->
</template>

<script>
export default {
  props: ["data"]
}
</script>

<style lang="scss" scoped>
.presentations {
  &-wrapper {
    margin-bottom: 30px;
    border-radius: 5px;
    height: 110px;
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
    line-height: 70px;
    color: #000000;
  }

  &-description {
    display: inline-block;
    width: 100%;
    font-size: calc(15px + 0.7vw);
    font-weight: bolder;
    line-height: 30px;
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