<template>
  <div>
    <srideShow :srideData="mainGuideprops" class="smartPhone" @open="openModal($event)" />
    <div class="flex">
      <mainGuide
        class="mp0 desktop"
        :img="item.img"
        v-for="(item,index) in mainGuideprops"
        :key="index"
        :name="item.title"
        @open="openModal(index,$event)"
      />
      <myModal v-if="modal" @close="closeModal" class="black modal">
        <div class="modal-flex">
          <!-- <div class="modal-flex_img"> -->
          <img :src="modalImg" class="img modal-flex_img" />
          <!-- </div> -->
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
import srideShow from "~/components/srideShow";

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
    myModal,
    srideShow
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
      modalText: "",

    };
  },
  methods: {
    //モーダルウインドウをオープンする
    openModal(index, modalImg) {
      console.log(index, modalImg);
      this.modalImg = this.mainGuideprops[index].img;
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
$modalBorder: #8193a9;

 @media screen and (max-width: 499px) {
  .flex {
    display: flex;
  
    &_center {
      justify-content: center;
      align-items: center;
    }
    &_around {
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
    }
  }
}


@media screen and (min-width:500px){
  .flex {
  display: flex;
  flex-wrap: wrap;
  // flex-direction: column;
  &_center {
    justify-content: center;
    align-items: center;
  }
  &_around {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }
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
  display: none;
  @include mq(sm) {
    display: inline-block;
    object-fit: cover;
    opacity: 0.6;
    transition: all 0.5s;
    height: 200px;
    width: 200px;
  }
  &:hover {
    // transform: scale(1.1, 1.1);
    object-fit: cover;
    overflow: hidden;
  }
}

.smartPhone {
  display: block;
  @include mq() {
    display: none;
  }
}

.desktop {
  display: none;

  @include mq() {
    display: block;
  }
}

.twitterBox {
  width: 30%;
  //height: 500px;
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
    color: #cecece;
    @include mq(sm) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    &_img {
      width: 35%;
      overflow: hidden;
      border-radius: 4px;
    }
    &-text {
      width: 100%;
      line-height: 30px;
      @include mq(sm) {
        width: 60%;
      }

      &_title {
        font-family: monospace;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 20px;
        margin-top: 10px;
        padding-left: 5px;
        border-bottom: 1px solid $modalBorder;
        border-left: 4px solid $modalBorder;
      }
    }
  }
}
</style>
