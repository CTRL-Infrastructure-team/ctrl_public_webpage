<template>
  <div>
    <mainmenu />
    <div class="flex">
      <mainGuide name="1" class="main guide" color="darkblue" />
      <mainGuide name="2" class="main guide" color="pink" />
      <mainGuide name="3" class="main guide" color="gray" />
      <mainGuide name="4" class="main guide" color="black" />
    </div>
    <div class="flex">
      <news />
      <twitterbox></twitterbox>
    </div>
  </div>
</template>

<script>
import mainmenu from "~/components/mainmenu";
import mainGuide from "~/components/mainGuide";
import news from "~/components/news";
import twitterbox from "~/components/twitter";
export default {
  components: {
    mainmenu,
    mainGuide,
    news,
    twitterbox
  }
};
</script>

<style>
.guide {
  margin-top: 20px;
}
.main {
  height: 40vh;
  width: 40%;
  background: blue;
}
.flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  /* width: 100; */
}
</style>
