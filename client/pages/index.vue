<template>
  <div>
    <div class="flex flex_center">
      <mainGuide
        name="1"
        color="darkblue"
        class="mp0"
        :img="item"
        v-for="(item,index) in mainimg"
        :key="index"
        @open="openModal"
      />
      <myModal v-if="modal" :img="modalImg" @close="closeModal"></myModal>
    </div>
    <div class="flex flex_around">
      <news class="news_box" />
      <twitterbox class="twitterBox"></twitterbox>
    </div>
  </div>
</template>

<script>
//コンポーネントインポート
import mainGuide from "~/components/mainGuide";
import news from "~/components/news";
import twitterbox from "~/components/twitter";
import { mapGetters, mapMutations } from "vuex";
import { TweenMax, Expo, Elasric } from "gsap";
import myModal from "~/components/modal";

//画像インポート
import img1 from "~/assets/img/img1.jpg";
import img2 from "~/assets/img/img2.jpg";
import img3 from "~/assets/img/img3.jpg";
import img4 from "~/assets/img/img4.jpg";
export default {
  components: {
    mainGuide,
    news,
    twitterbox,
    myModal
  },
  data() {
    return {
      mainimg: [img1, img2, img3, img4],
      isCenter: false,
      isflex: true,
      modal: false,
      modalImg: img1
    };
  },
  methods: {
    openModal(modalImg) {
      console.log(modalImg);
      this.modalImg = modalImg;
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
  &_center {
    justify-content: center;
    align-items: center;
  }
  &_around {
    justify-content: space-around;
    align-items: flex-start;
  }
}

.news_box {
  width: 40%;
}
.guide {
  margin-top: 20px;
  margin: 0;
  padding: 0;
  display: block;
}
.img {
  object-fit: cover;
}

.twitterBox {
  height: 400px;
  overflow-y: scroll;
}
</style>
