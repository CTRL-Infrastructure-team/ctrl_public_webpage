<template>
  <transition>
    <div @click="doBig" class="box" :style="{background:color}" v-if="show">
      <img :src="img" class="img" :style="imgStyle" />
      <span class="imgTitle">{{name}}</span>
    </div>
  </transition>
</template>
<script>
import { TweenMax, Expo, Elasric } from "gsap";
import { mapGetters, mapMutations } from "vuex";
import { format } from "upath";
export default {
  name: "main_guide",
  props: {
    name: { type: String, default: "this is name" },
    color: { default: "red" },
    img: { type: String, default: "_nuxt/client/assets/img/img4.jpg" }
  },
  data() {
    return {
      imgStyle: {
        width: 100 + "%",
        height: 100 + "%",
        display: "block"
      },
      show: false,
      isTheFlug: false
    };
  },
  computed: {
    ...mapGetters({
      guideFlug: "guideFlug"
    })
  },
  methods: {
    doBig() {
      console.log("hover");
      this.isTheFlug = !this.isTheFlug;
      this.$store.commit("doGuideflugOn");
    },
    center() {
      if (this.isTheFlug === true) {
        this.isTheFlug = !this.isTheFlug;
        return;
      }
      this.show = !this.show;
    },
    none() {}
  },
  mounted() {
    this.show = !this.show;
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