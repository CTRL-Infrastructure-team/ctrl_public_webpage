<template>
  <div>
    <div class="flex flex_center">
      <mainGuide
        class="mp0"
        :img="item.img"
        v-for="(item,index) in mainGuideprops"
        :key="index"
        :name="item.title"
        @open="openModal(index,$event)"
      />
      <myModal v-if="modal" @close="closeModal" class="black modal">
        <div class="modal-flex">
          <div class="modal-flex_img">
            <img :src="modalImg" class="img" />
          </div>
          <div class="modal-flex-text">
            <h2 class="modal-flex-text_title">{{modalText.title}}</h2>
            <p>{{modalText.body}}</p>
          </div>
        </div>
      </myModal>
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
      mainGuideprops: [
        {
          img: img1,
          title: "ＣＴＲＬとは？"
        },
        { img: img2, title: "どんな人がいるの？" },
        { img: img3, title: "活動内容は？" },
        { img: img4, title: "活動場所は？" }
      ],
      isCenter: false,
      isflex: true,
      modal: false,
      modalImg: img1,
      modalTexts: [
        {
          title: "CTRLとは？",
          body:
            "我がコンピュータ技術研究会は2008年に設立された新しいサークルです。名前のとおりコンピュータに関することを主な活動内容としています。 プログラミングを学び、ソフトを作ったりして遊んでいます。"
        },
        {
          title: "どんな人がいるの？",
          body:
            "知識工学部の情報科学科が多く、次に情報ネットワークが多いです。工学部の人もいます。学部・学科に偏りはありますが、学年・学部・学科等は問いません。 (現状、知識工学部が多く、ソフトウェアに偏りがちです。別の学科の方がきてくださればハード系の出来ることの範囲が広がります) サークルに来た時点で、すでに応用情報技術者の資格を持っていてバリバリにプログラムが書ける人もいれば、 大学に入学するまで殆どパソコンを触ったことがなく、動画再生のために使うぐらいという初心者など様々です。"
        },
        {
          title: "普段どんなことしてるの？",
          body:
            "プログラミング・ハードウェア・ネットワーク・PCによる動画等の作成など行っております。 基本的には横浜祭または世田谷祭に向けてプロジェクトを立ち上げて、文化祭で成果を発表する形になります。 プロジェクトは現在は個人のものが多くなっていますが、複数人でチームを組んでのプロジェクトとしても構いません。 また、定期的に報告会を開き、プロジェクトの枠を超えて意見交換なども行っています。 それ以外にも、プログラミングなどの講座や合宿などサークル全体での活動もあります。"
        },
        {
          title: "どこで活動してるの？",
          body: "世田谷キャンパス1号館2階　Ｆ教室(12F)で活動しています。"
        }
      ],
      modalText: ""
    };
  },
  methods: {
    //モーダルウインドウをオープンする
    openModal(index, modalImg) {
      console.log(index, modalImg);
      this.modalImg = modalImg;
      this.modal = true;
      this.modalText = this.modalTexts[index];
    },
    //closeモーダルウインドウ
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
  width: 50%;
}
.guide {
  margin-top: 20px;
  margin: 0;
  padding: 0;
  display: block;
}
.img {
  display: inline-block;
  object-fit: cover;
  transition: all 0.5s;
  opacity: 0.6;
  @include mq(sm) {
    height: 200px;
    width: 200px;
  }
  &:hover {
    // transform: scale(1.1, 1.1);
    object-fit: cover;
    overflow: hidden;
  }
}

.twitterBox {
  width: 30%;
  height: 500px;
  //overflow-y: scroll;
}

@keyframes typing {
  from {
    width: 0;
  }
}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}

.modal {
  width: 90%;
  &-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-img {
      width: 35%;
    }
    &-text {
      width: 60%;

      &_title {
        font-family: monospace;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 20px;
        margin-top: 10px;
        padding-left: 3px;
        border-bottom: 1px solid rgb(42, 54, 219);
        border-left: 4px solid rgb(42, 54, 219);
      }
    }
  }
}
</style>
