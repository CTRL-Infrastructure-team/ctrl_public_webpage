<template>
  <div class="content">
    <HeroSlideshow
      class="smartPhone"
      :slides-data="heroSlides"
      @open="openModal"
    />
    <div class="flex">
      <HeroGuide
        v-for="(item, index) in heroSlides"
        :key="item.title"
        class="mp0 desktop"
        :img="item.img"
        :name="item.title"
        @open="openModal(index)"
      />
      <SiteModal v-if="modal" class="black modal" @close="modal = false">
        <div class="modal-flex">
          <img :src="modalImg" class="img modal-flex_img" :alt="modalText.heading">
          <div class="modal-flex-text">
            <h2 class="modal-flex-text_title">{{ modalText.heading }}</h2>
            <p>{{ modalText.body }}</p>
          </div>
        </div>
      </SiteModal>
    </div>
    <div class="description-box">
      <div><span>Welcome to CTRL website !</span></div>
      <div><span>Try tapping the image above !</span></div>
    </div>
    <div class="flex flex-around">
      <NewsList class="news_box" :articles="articles || []" />
      <TwitterEmbed class="twitterBox" />
    </div>
  </div>
</template>

<script setup lang="ts">
import whatIs from '~/assets/img/whatIs.jpg'
import whoIs from '~/assets/img/whoIs.jpg'
import contentIs from '~/assets/img/contentIs.jpg'
import img4 from '~/assets/img/img4.jpg'
import { faqItems } from '~/assets/content/faq'

useHead({ title: '' })

const { data: articles } = await useFetch('/api/situations')

const images = {
  whatIs,
  whoIs,
  contentIs,
  place: img4
}

const heroSlides = faqItems.map(item => ({
  title: item.title,
  img: images[item.img],
  heading: item.heading,
  body: item.body
}))

const modal = ref(false)
const modalIndex = ref(0)
const modalImg = computed(() => heroSlides[modalIndex.value]?.img)
const modalText = computed(() => heroSlides[modalIndex.value] || heroSlides[0])

function openModal(index: number) {
  modalIndex.value = index
  modal.value = true
}
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

.flex {
  display: flex;
  flex-wrap: wrap;
  &-around {
    margin: 20px 0;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @include mq {
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
    }
  }
}

.news_box {
  width: 90%;
  @include mq {
    width: 50%;
    margin: 0 30px;
  }
}

.twitterBox {
  width: 90%;
  height: 300px;
  @include mq {
    width: 30%;
    margin: 0 30px;
    height: auto;
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
      display: inline-block;
      object-fit: cover;
    }
    &-text {
      width: 100%;
      line-height: 30px;
      @include mq(sm) {
        width: 60%;
      }
      &_title {
        width: 100%;
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
