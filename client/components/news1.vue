// mainGuide.vueと大体同じ
<template>
  <div>
    <div class="main_img" :style="{ background: color }">{{name}}</div>
    <div class>
      <!-- <img src="~/assets/img/img4.jpg" width="100px" height="100px" /> -->
    </div>
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
  box-sizing: auto; //ここがmainGuide.vueと違う
  width: 130%;
  //height: 100px;
  //height: 40vh;
  background: red;
}
</style>