<template>
  <div>
    <mainmenu />
    <div class="flex">
      <!-- <img src="~/assets/img/img3.jpg" /> -->
      <mainGuide
        name="1"
        class="main guide"
        color="darkblue"
        img="_nuxt/client/assets/img/img1.jpg"
      />
      <mainGuide name="2" class="main guide" color="pink" img="_nuxt/client/assets/img/img2.jpg" />
      <mainGuide name="3" class="main guide" color="gray" img="_nuxt/client/assets/img/img3.jpg" />
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
.main {
  margin-top: 20px;
  height: 40vh;
  width: 40%;
  /* background: blue; */
}
.flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
