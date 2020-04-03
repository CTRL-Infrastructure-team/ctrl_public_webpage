<template>
  <div>
    <div class="tab-title">
      <span>Tweets</span>
    </div>
    <div class="TwitterBox">
      <a
        class="twitter-timeline"
        data-theme="dark"
        href="https://twitter.com/tcuctrl?ref_src=twsrc%5Etfw"
      >Tweets by tcuctrl</a>
      <no-ssr>
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </no-ssr>
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

.tab-title {
  height: 45px;
  line-height: 45px;
  margin-left: 1.5rem;
  span {
    position: relative;
    font-size: calc(20px + 1vw);
    font-weight: bolder;
    &::before {
      border-radius: 10%;
      content: "";
      position: absolute;
      height: 0.9rem;
      width: 0.9rem;
      top: 50%;
      left: -1.5rem;
      background: #f0f0f0;
      transform: translateY(-50%);
    }
  }
}

.twitterBox {
  margin-top: 0px;
  overflow-y: hidden;
}
.TwitterBox {
  height: 480px;
  overflow-y: scroll;
}

.TwitterBox::-webkit-scrollbar {
  width: 4px;
}

.TwitterBox::-webkit-scrollbar-thumb {
  background: #888888;
  border-radius: 3px;
}
</style>
