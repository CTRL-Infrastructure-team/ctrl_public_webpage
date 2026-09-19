<template>
  <div
    class="pointer"
    :class="isOpen ? 'presentation-wrapper--open' : 'presentation-wrapper--close'"
  >
    <button class="presentation-title" type="button" @click="isOpen = !isOpen">
      <div class="presentation-title-item">{{ name }}</div>
      <div :class="isOpen ? 'presentation-title-item--open' : 'presentation-title-item--close'">
        <span></span>
      </div>
    </button>
    <div :class="isOpen ? 'presentation-slide--open' : 'presentation-slide--close'">
      <div v-if="isOpen">
        <p class="slide-min">
          <iframe :src="url" title="進捗スライド" width="304" height="200" allowfullscreen></iframe>
        </p>
        <p class="slide-max">
          <iframe :src="url" title="進捗スライド" width="748" height="450" allowfullscreen></iframe>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  url: string
}>()
const isOpen = ref(false)
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
    font-size: calc(15px + 0.3vw);
    height: 50px;
    line-height: 50px;
    width: 100%;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
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
          left: -3px;
        }
        span::after {
          transform: rotate(-45deg);
          bottom: -24px;
          left: -3px;
        }
      }
    }
  }

  &-slide {
    &--open,
    &--close {
      width: 100%;
      text-align: center;
      padding: 25px 0;
    }
    &--open {
      opacity: 1;
      height: 300px;
      @include mq {
        height: 500px;
      }
    }
    &--close {
      height: 0;
      overflow: hidden;
      opacity: 0;
    }
  }
}

.slide-min {
  @include mq {
    display: none;
  }
}
.slide-max {
  display: none;
  @include mq {
    display: inline-block;
  }
}
.pointer {
  cursor: pointer;
}
</style>
