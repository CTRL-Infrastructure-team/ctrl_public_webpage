<template>
  <div
    class="wrapper"
    :class="{
      'presentation-wrapper--open': isOpen,
      'presentation-wrapper--close': !isOpen
    }"
  >
    <div class="presentation-title" @click="openTable">
      <div class="presentation-title-item">
        {{ name }}
      </div>
      <div
        :class="{
          'presentation-title-item--open': isOpen,
          'presentation-title-item--close': isOpen
        }"
      >
        <span></span>
      </div>
    </div>
    <div
      :class="{
        'presentation-slide--open': isOpen,
        'presentation-slide--close': !isOpen
      }"
    >
      <div v-if="isOpen">
        <p class="slide-min">
          <iframe
            :src="url"
            frameborder="0"
            width="304"
            height="200"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </p>
        <p class="slide-max">
          <iframe
            :src="url"
            frameborder="0"
            width="748"
            height="450"
            allowfullscreen="true"
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
          ></iframe>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false
    };
  },
  props: {
    name: String,
    url: String
  },
  methods: {
    openTable() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
<style lang="scss" scoped>
.presentation {
  &-wrapper {
    &--open,
    &--close {
      max-width: 800px;
      display: block;
      position: relative;
      width: 90%;
      margin: 0 auto;
      border-top: 1.5px solid $mainchar;
      border-bottom: 1.5px solid $mainchar;
      transition: 0.5s ease-in-out;
      overflow: hidden;
    }
    &--open {
      height: 300px;
      @include mq {
        height: 550px;
      }
    }
    &--close {
      height: 50px;
    }
  }

  &-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    font-size: calc(15px + 0.3vw);
    height: 50px;
    line-height: 50px;
    text-align: center;
    &-item {
      width: 50%;
      @include mq {
        width: 20%;
      }
      &--open,
      &--close {
        width: 50px;
        span,
        span::before,
        span::after {
          position: absolute;
          height: 3px;
          width: 10px;
          background: #ffffff;
          display: block;
          border-radius: 2px;
          font-size: 2px;
          content: "";
        }
        span {
          background: $maincolorBlack;
        }
      }
      &--open {
        span::before {
          transform: rotate(135deg);
          bottom: -23px;
          left: 3px;
        }
        span::after {
          transform: rotate(45deg);
          bottom: -23px;
          left: -3px;
        }
      }
      &--close {
        span::before {
          transform: rotate(45deg);
          bottom: -18px;
        }
        span::after {
          transform: rotate(-45deg);
          bottom: -24px;
        }
      }
    }
  }

  &-slide {
    &--open,
    &--close {
      width: 100%;
      position: relative;
      transition: all 0.5s ease-in-out;
      text-align: center;
      padding: 25px 0px;
    }
    &--open {
      opacity: 1;
      height: 300px;
      @include mq {
        height: 500px;
      }
    }
    &--close {
      height: 0px;
      overflow: hidden;
      opacity: 0;
    }
  }
}

.slide {
  &-min {
    @include mq {
      display: none;
    }
  }
  &-max {
    display: none;
    @include mq {
      display: inline-block;
    }
  }
}

.el-breadcrumb__inner a,
.is-link {
  color: #ffffff !important;
}
</style>
