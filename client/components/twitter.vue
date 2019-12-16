<template>
  <div>
    <h1>
    nemui twitter
    </h1>
    <a
      class="twitter-timeline"
      data-theme="dark"
      href="https://twitter.com/tcuctrl?ref_src=twsrc%5Etfw"
    >Tweets by tcuctrl</a>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
  </div>
</template>
<style lang="scss" scoped>
div {
  width: 40%;
}

.twitterBox {
  height: 450px;
  overflow-y: scroll;
}

.twitterBox::-webkit-scrollbar {
  //background:#09C9D9;
  width: 7px;
}
.twitterBox::-webkit-scrollbar-thumb {
  //background: linear-gradient(0deg, #43e2c6, #3183d0);
  background: #888888;
  border-radius: 3px;
}
</style>