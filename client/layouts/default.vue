<template>
  <div class="body">
    <header class="header">
      <headerComponent :menu="menu" />
    </header>
    <nuxt class="body" />
    <scrollButton />
    <footerComponent :menu="menu" />
  </div>
</template>
<script>
import headerComponent from "~/components/header";
import footerComponent from "~/components/footer";
import mainmenu from "~/components/mainmenu";
import scrollButton from "~/components/scrollButton";

export default {
  components: {
    headerComponent,
    footerComponent,
    scrollButton,
    mainmenu
  },
  data() {
    return {
      menu: [
        { name: "Top", to: "/" },
        { name: "活動報告", to: "/report" },
        { name: "作品", to: "/progress" },
        { name: "進捗発表", to: "/publication/recentTopics" },
        { name: "問い合わせ", to: "/inquiry" }
      ]
    };
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP|Roboto&display=swap");
html {
  font-family: "Noto Sans JP", sans-serif;
  // font-family: "Roboto", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: $maincolorBlack;
  color: $mainchar;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.footer {
  background: #2c2c2c;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.body {
  min-height: 100vh;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

hr {
  margin-top: 10px;
}
.header {
  // height: $headerHeight;
  position: relative;
}
</style>
