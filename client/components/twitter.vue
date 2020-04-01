<template>
  <div>
    <h1>Tweets</h1>
    <div class="TwitterBox">
      <a
        class="twitter-timeline"
        data-theme="dark"
        href="https://twitter.com/tcuctrl?ref_src=twsrc%5Etfw"
      >Tweets by tcuctrl</a>
      <!-- <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> -->
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        { src: "https://platform.twitter.com/widgets.js",
          charset: "utf-8"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.twitterBox {
  margin-top: 0px;
  overflow-y: hidden;
}
.TwitterBox {
  height: 480px;
  overflow-y: scroll;
}

.TwitterBox::-webkit-scrollbar {
  //background:#09C9D9;
  width: 4px;
}
.TwitterBox::-webkit-scrollbar-thumb {
  //background: linear-gradient(0deg, #43e2c6, #3183d0);
  background: #888888;
  border-radius: 3px;
}
</style>
