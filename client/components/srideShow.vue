<template>
  <div class="srideShow">
    <!-- <img :src="prevSride.img" class="prevSride img" />
    <img :src="nowSride.img" class="mainSride img" />
    <img :src="nextSride.img" class="nextSride img" />-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      counter: 0
    };
  },
  props: {
    srideData: {
      type: Array,
      required: true
    }
  },
  computed: {
    nowSride() {
      return this.srideData[this.counter];
    },
    nextSride() {
      let nextCount = (this.counter + 1) % this.srideData.length;
      return this.srideData[nextCount];
    },
    prevSride() {
      let prevCount = this.counter
        ? this.counter - 1
        : this.srideData.length - 1;
      console.log(prevCount);
      return this.srideData[prevCount];
    }
  },
  created() {
    setInterval(() => {
      this.counter = (this.counter + 1) % this.srideData.length;
      // console.log(this.prevSride);
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
.srideShow {
  position: relative;
}
.img {
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 70vh;
  object-fit: cover;
}
.meinSride {
  z-index: -1;
}

.prevSride {
  left: -80%;
  z-index: 4;
}

.nextSride {
  left: 80%;
  z-index: 5;
}
</style>