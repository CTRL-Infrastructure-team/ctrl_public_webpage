<template>
  <div class="content">
    <srideShow
      :srideData="mainGuideprops"
      class="smartPhone"
      @open="openModal($event)"
    />
    <div class="flex">
      <mainGuide
        class="mp0 desktop"
        :img="item.img"
        v-for="(item, index) in mainGuideprops"
        :key="index"
        :name="item.title"
        @open="openModal(index, $event)"
      />
      <myModal v-if="modal" @close="closeModal" class="black modal">
        <div class="modal-flex">
          <img :src="modalImg" class="img modal-flex_img" />
          <div class="modal-flex-text">
            <h2 class="modal-flex-text_title">{{ modalText.title }}</h2>
            <p>{{ modalText.body }}</p>
          </div>
        </div>
      </myModal>
    </div>
    <div class="description-box">
      <div><span>Welcome to CTRL website !</span></div>
      <div><span>Try tapping the image above !</span></div>
    </div>
    <banner />
    <div class="flex flex-around">
      <news class="news_box" :articles="articles" />
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
import banner from "~/components/ui/banner"; //バナー非表示の場合はコメント化
import axios from "axios";

//画像インポート
import whatIs from "~/assets/img/whatIs.jpg";
import whoIs from "~/assets/img/whoIs.jpg";
import contentIs from "~/assets/img/contentIs.jpg";
import img4 from "~/assets/img/img4.jpg";
export default {
  components: {
    mainGuide,
    news,
    twitterbox,
    myModal,
    srideShow,
    banner //バナー非表示の場合はコメント化
  },
  async asyncData({ app }) {
    let articles = await app.$axios.asyncGet("/api/situations");
    return { articles };
  },
  data() {
    return {
      mainGuideprops: [
        { img: whatIs, title: "ＣＴＲＬとは？" },
        { img: whoIs, title: "どんな人がいるの？" },
        { img: contentIs, title: "活動内容は？" },
        { img: img4, title: "活動場所は？" }
      ],
      isCenter: false,
      isflex: true,
      modal: false,
      modalImg: whatIs,
      modalTexts: [
        {
          title: "CTRLとは？",
          body:
            "我がコンピュータ技術研究会は2008年に設立された新しいサークルです。名前のとおりコンピュータに関することを主な活動内容としています。 プログラミングを学び、ソフトを作ったりして遊んでいます。"
        },
        {
          title: "どんな人がいるの？",
          body:
            "情報科学科や電気電子通信工学科が多いです。他にも情報系、理工系の学生が在籍しています。入部において学年・学部・学科等は問いません。 サークルに来た時点で、ゲーム作成の経験があり、バリバリにプログラムが書ける人もいれば、 大学に入学するまで殆どパソコンを触ったことがなく、動画再生のために使うぐらいという初心者など様々です。"
        },
        {
          title: "普段どんなことしてるの？",
          body:
            "プログラミング・ハードウェア・ネットワーク・PCによる動画等の作成など行っております。 基本的には横浜祭または世田谷祭に向けてプロジェクトを立ち上げて、文化祭で成果を発表する形になります。 プロジェクトは現在は個人のものが多くなっていますが、複数人でチームを組んでのプロジェクトとしても構いません。 また、定期的に報告会を開き、プロジェクトの枠を超えて意見交換なども行っています。 それ以外にも、プログラミングなどの講座や合宿などサークル全体での活動もあります。"
        },
        {
          title: "どこでいつ活動してるの？",
          body:
            "毎週水曜日14:00～18:00に活動しています。対面による活動が許可されていたときは、世田谷キャンパス1号館2階Ｆ教室(12F)で活動していました。現在はコロナ禍のため、zoom上で活動を続けています。"
        }
      ],
      modalText: ""
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

.content {
  width: 100%;
}

.description-box {
  line-height: calc(20px + 3vw);
  font-size: calc(15px + 1vw);
  font-weight: bolder;
  text-align: center;
  margin-top: 35px;
  @include mq {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .flex {
    display: flex;

    &_center {
      justify-content: center;
      align-items: center;
    }
    &-around {
      margin: 20px 0px;
      flex-wrap: nowrap;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
  }
  .news_box {
    width: 90%;
  }
  .twitterBox {
    width: 90%;
    height: 300px;
    //overflow-y: scroll;
  }
}

@media screen and (min-width: 768px) {
  .flex {
    display: flex;
    flex-wrap: wrap;
    // flex-direction: column;
    &_center {
      justify-content: center;
      align-items: center;
    }
    &-around {
      margin: 20px 0px;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    }
  }

  .news_box {
    width: 50%;
    margin: 0px 30px;
  }
  .twitterBox {
    width: 30%;
    margin: 0px 30px;
    //height: 500px;
    //overflow-y: scroll;
  }
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
