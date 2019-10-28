<template>
  <transition>
    <div @click="doBig" class="box" :style="{background:color}" v-if="show">
      <img :src="img" class="img" :style="imgStyle" />
      <span class="imgTitle">{{name}}</span>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import { TweenMax, Expo, Elasric } from "gsap";

export default {
  name: "main_guide",
  props: {
    name: { type: String, default: "this is name" },
    color: { default: "red" },
    img: { type: String }
  },
  data() {
    return {
      imgStyle: {
        width: 100 + "%",
        height: 100 + "%",
        display: "block"
      },
      show: false,
      isTheFlug: false,
      isCenter: false
    };
  },
  computed: {
    ...mapGetters({
      guideFlug: "guideFlug"
    })
  },
  methods: {
    doBig() {
      let img = this.img;
      this.$emit("open", img);
    },
    center() {
      if (this.isTheFlug === true) {
        return;
      }
    },
    none() {
      this.show = true;
      this.isTheFlug = false;
    }
  },
  mounted() {
    this.show = !this.show;
    this.isTheFlug = false;
  },
  watch: {
    guideFlug(val) {
      console.log("change");
      val ? this.center() : this.none();
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  object-fit: cover;
  transition: all 0.5s;
  opacity: 0.6;
  &:hover {
    transform: scale(1.1, 1.1);
    object-fit: cover;
    overflow: hidden;
  }
}
.imgTitle {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  color: $maincolorBlack;
  font-weight: bold;
  font-size: 40px;
  font-family: Quicksand, sans-serif;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  overflow: hidden;
  height: 40vh;
  width: 40%;

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