<template>
  <transition>
    <div @mouseover="doBig" @mouseout="doSmall" class="box" :style="{background:color}" v-if="show">
      <img :src="img" class="img" :style="imgStyle" />
      <span>{{name}}</span>
    </div>
  </transition>
</template>
<script>
// import { TweenMax, Expo, Elasric } from "gsap";
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
      },
      show: false
    };
  },
  methods: {
    doBig() {
      console.log("hover");
    },
    doSmall() {}
  },
  mounted() {
    this.show = !this.show;
  }
};
</script>
<style lang="scss" scoped>
.img {
  object-fit: cover;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1, 1.1);
    object-fit: cover;
    overflow: hidden;
  }
}
.box {
  margin-top: 20px;
  overflow: hidden;

  cursor: pointer;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 1s;
}
</style>