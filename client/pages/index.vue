<template>
  <div>
    <div class="flex">
      <!-- <img src="~/assets/img/img3.jpg" /> -->
      <mainGuide name="1" class="guide" color="darkblue" :img="mainimg[0]" />
      <mainGuide name="2" class="guide" color="pink" :img="mainimg[1]" />
      <mainGuide name="3" class="guide" color="gray" :img="mainimg[2]" />
      <mainGuide name="4" class="guide" color="black" :img="mainimg[3]" />
    </div>
    <div class="flex">
      <news />
      <twitterbox></twitterbox>
    </div>
  </div>
</template>

<script>
//コンポーネントインポート
import mainGuide from "~/components/mainGuide";
import news from "~/components/news";
import twitterbox from "~/components/twitter";

//画像インポート
import img1 from "~/assets/img/img1.jpg";
import img2 from "~/assets/img/img2.jpg";
import img3 from "~/assets/img/img3.jpg";
import img4 from "~/assets/img/img4.jpg";
export default {
  components: {
    mainGuide,
    news,
    twitterbox
  },
  data() {
    return {
      mainimg: [img1, img2, img3, img4]
    };
  }
};
</script>

<style>
.guide {
  margin-top: 20px;
  height: 40vh;
  width: 40%;
}
.flex {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.img {
  object-fit: cover;
}
</style>
