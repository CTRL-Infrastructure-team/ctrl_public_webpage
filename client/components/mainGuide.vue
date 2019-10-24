<template>
  <div @mouseover="doBig" class="box" :style="{background:color}">
    <img :src="img" class="img" :style="imgStyle" />
    <span>{{name}}</span>
  </div>
</template>
<script>
export default {
  name: "main_guide",
  props: {
    name: String,
    color: { default: "red" },
    img: { type: String, default: "_nuxt/client/assets/img/img4.jpg" }
  },
  data() {
    return {
      imgStyle: {
        width: 100 + "%",
        height: 100 + "%"
      }
    };
  },
  methods: {
    doBig() {
      console.log("hover");
      this.imgStyle.width = 120 + "%";
    }
  }
};
</script>
<style lang="scss" scoped>
.main_img {
  //   color: blue;
  // box-sizing: border-box;

  // height: 40vh;
  //   background: red;
}
.img {
  // z-index: 2;
  object-fit: cover;
}
.box {
  // width: 100%;
  // height: 100%;
  margin-top: 20px;
  height: 40vh;
  width: 40%;
  overflow: hidden;
}
</style>