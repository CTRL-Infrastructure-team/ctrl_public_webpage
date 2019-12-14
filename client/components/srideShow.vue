<template>
  <div>
    <div class="srideShow">
      <div v-for="(sride,index) in srideStyle" :key="index" @click="doModal" class="sride_box">
        <img :src="sride.img" :style="sride.style" class="sride_img" />
      </div>
      <span class="sride_title">{{nowTitle}}</span>
    </div>
    <div class="flex">
      <div
        v-for="(value,index) in srideStyle"
        :key="index"
        class="box"
        :class="{box_active:value.isActive}"
        @click="changeActive(index)"
      ></div>
    </div>
  </div>
</template>
<script>
let intervalID;
export default {
  data() {
    return {
      counter: 0,
      nowSrideStyle: {}
    };
  },
  props: {
    srideData: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeActive(index) {
      clearInterval(intervalID);
      this.counter = index;
      this.startInterval();
    },
    startInterval() {
      intervalID = setInterval(() => {
        this.counter = (this.counter + 1) % this.srideData.length;
      }, 5000);
      console.log(intervalID);
    },
    doModal() {
      console.log("doModal", this.srideData[this.counter].img);
      this.$emit("open", this.counter);
    }
  },
  computed: {
    srideStyle() {
      let defaultStyle = this.srideData.map((value, index) => {
        value.style = {
          left: 100 * (index - this.counter) + "%",
          transition: "all 0.4s ease"
        };
        if (this.counter === index) {
          value.isActive = true;
        } else value.isActive = false;
        return value;
      });
      console.log(defaultStyle);
      return defaultStyle;
    },
    nowTitle() {
      return this.srideData[this.counter].title;
    }
  },
  created() {
    this.startInterval();
  },
  destroyed() {
    clearInterval(this.intervalfnc);
  }
};
</script>
<style lang="scss" scoped>
.srideShow {
  position: relative;
  height: 35vh;
  overflow: hidden;
  background: linear-gradient(
    rgba(0, 0, 0, 0) 0 80%,
    rgba(0, 0, 0, 0.9) 80% 100%
  );
}
.sride {
  &_img {
    position: absolute;
    width: 100%;
    height: 35vh;
    object-fit: cover;
  }
  &_title {
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
}

.flex {
  display: flex;
  justify-content: space-around;
  background: #353837;
  padding: 0 10%;
}
.box {
  margin-top: 10px;
  margin-bottom: 10px;
  background: rgb(143, 142, 142);
  border: solid 1px #5c5a5a;
  width: 22%;
  height: 9px;
  &_active {
    background: #f0f0f0;
  }
}
</style>