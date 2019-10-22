<template>
  <div>
    <div class="main_img" :style="{ background: color }">{{name}}</div>
  </div>
</template>
<script>
export default {
  name: "main_guide",
  props: {
    name: String,
    color: { default: "red" }
  }
};
</script>
<style lang="scss" scoped>
.main_img {
  //   color: blue;
  box-sizing: border-box;

  // height: 40vh;
  //   background: red;
}
</style>