// mainGuide.vueと大体同じ
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
  box-sizing: auto; //ここがmainGuide.vueと違う
  width: 250%; 
  //height: 100px;
  //height: 40vh;
  background: red;
  
}
</style>