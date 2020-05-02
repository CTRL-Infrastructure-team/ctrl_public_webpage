<template>
  <div class="container">
    <div
      class="wrapper"
      :class="{
        'presentation-wrapper--open': data.isOpen,
        'presentation-wrapper--close': !data.isOpen
      }"
      v-for="(data, index) in datas"
      :key="data.name"
    >
    <!-- {{ datas }} -->
      <div class="presentation-title" @click="openTable(index)">
        <div class="presentation-title-item">
          {{ data.name }}
        </div>
        <!-- /.presentaiton-title-item -->
        <div
          :class="{
            'presentation-title-item--open': data.isOpen,
            'presentation-title-item--close': !data.isOpen
          }"
        >
          <span></span>
        </div>
        <!-- /.presentaiton-title-item--open -->
        <!-- /.presentaiton-title-item--close -->
      </div>
      <!-- /.presentation-title -->
      <div :class="{
        'presentation-slide--open': data.isOpen,
        'presentation-slide--close': !data.isOpen  
      }">
      <p class="slide-min" v-html="data.slide"></p>
      <p class="slide-max" v-html="data.slide_mq"></p>
      </div>
      <!-- /.presentation-slide--open -->
      <!-- /.presentation-slide--close -->
    </div>
    <!-- /.wrapper -->
    <!-- /.presentation-wrapper--open -->
    <!-- /.presentation-wrapper--close -->
  </div>
  <!-- /.container -->
</template>

<script>
import data from "~/assets/data/firstPresentationsData.json"

export default {
  data() {
    let obj = JSON.stringify(data),
        default_data = JSON.parse(obj).map(item => {
      item.slide = ""
      item.slide_mq = ""
      return item
    })
    return {
      datas: default_data,
      back_data: data
    }
  },
  methods: {
    openTable: function(index) {
      this.datas[index].isOpen = !this.datas[index].isOpen
      this.datas[index].slide = this.back_data[index].slide
      this.datas[index].slide_mq = this.back_data[index].slide_mq
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 50px auto;
}
.wrapper+ .wrapper {
  border-top: 0px;
  border-bottom: 2px solid $mainchar;
}

.presentation {
  &-wrapper {
    &--open, &--close {
      max-width: 800px;
      display: block;
      position: relative;
      width: 90%;
      margin: 0 auto;
      border-top: 1.5px solid $mainchar;
      border-bottom: 2px solid $mainchar;
      transition: .5s ease-in-out;
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
      &--open, &--close {
        width: 50px;
        span, span::before, span::after {
          transition: all 0.3s;
          position: absolute;
          height: 3px;
          width: 10px;
          background: #FFFFFF;
          display: block;
          border-radius: 2px;
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
    &--open, &--close {
      width: 100%;
      position: relative;
      transition: all .5s ease-in-out;
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

</style>