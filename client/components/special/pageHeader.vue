<template>
  <div class="breadcrumb-wrapper">
    <ul class="breadcrumb-list">
      <li class="breadcrumb-path" v-for="data in path_datas" :key="data.id">
        <nuxt-link class="breadcrumb-link" :to="data.path">{{
          data.name
        }}</nuxt-link>
      </li>
    </ul>
    <div class="breadcrumb-text">
      <p>※スライドの読み込みに時間がかかることがあります。</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    path_datas: {
      type: Array,
      require: true
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  &-wrapper {
    width: 90%;
    max-width: 800px;
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
  &-path:not(:last-child)::after {
    display: inline-block;
    margin: 0px 5px;
    content: ">";
  }

  &-link {
    text-decoration: none;
    color: $mainchar;
  }
  &-text {
    margin-top: 20px;
  }
}
</style>
