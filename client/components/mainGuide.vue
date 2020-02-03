<template>
  <transition @mouseenter="titileOn = true">
    <div
      @click="doModal"
      @mouseenter="titileOn = !titileOn"
      @mouseleave="titileOn = !titileOn"
      class="box"
      v-if="show"
    >
      <img :src="img" class="img" :style="imgStyle" />
      <transition name="title">
        <span class="imgTitle" v-if="titileOn">{{name}}</span>
      </transition>
    </div>
  </transition>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "main_guide",
  props: {
    name: { type: String, default: "this is name" },
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
      titileOn: false
    };
  },

  methods: {
    //モーダルウインドウオープン
    doModal() {
      let img = this.img;
      this.$emit("open", img);
    }
  },
  //cssトランジション制御
  mounted() {
    this.show = !this.show;
    this.isTheFlug = false;
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
  bottom: 5%;
  right: 5%;
  z-index: 2;
  color: rgba(#f0f0f0, 0.8);
  font-weight: bold;
  font-size: 20px;
  font-family: Quicksand, sans-serif;
  opacity: 1;
  transition: all 0.3s;
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  overflow: hidden;
  height: 40vh;
  width: 50%;
  cursor: pointer;

  &:hover {
    background: linear-gradient(
      rgba(0, 0, 0, 0) 0 80%,
      rgba(0, 0, 0, 0.9) 80% 100%
    );
  }
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

.title-enter-active,
.title-leave-active {
  transition: all 0.5s;
}

.title-enter, .title-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.dpNone {
  display: none;
  opacity: 0;
  transition: all 1s;
}
</style>