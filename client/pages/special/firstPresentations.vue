<template>
  <div class="container">
    <div
      class="wrapper"
      :class="{
        'presentation-wrapper--open': data.isOpen,
        'presentation-wrapper--close': !data.isOpen
      }"
      v-for="(data, index) in datas"
      :key="data.id"
    >
      <div class="presentation-title" @click="openTable(index)">
        {{ data.name }}
      </div>
      <div :class="{
        'presentation-slide--open': data.isOpen,
        'presentation-slide--close': !data.isOpen  
      }">
        <!-- {{ data.slide }} -->
      </div>
    </div>
    <!-- /.presentation-wrapper -->
  </div>
  <!-- /.container -->
</template>

<script>
export default {
  data() {
    let datas = [
      {
        name: "コットン",
        slide: "ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。",
        isOpen: false
      },
      {
        name: "コットン",
        slide: "ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。ダミーテキスト。",
        isOpen: false
      }
    ]
    return { datas }
  },
  methods: {
    openTable: function(index) {
      this.datas[index].isOpen = !this.datas[index].isOpen
    }
  }
}
</script>

<style lang="scss" scoped>

.container {
  width: 100%;
  max-width: 1000px;
  min-height: calc(100vh - 60px);
  margin: 30px auto;
}
.wrapper+ .wrapper {
  border-top: 0px;
  border-bottom: 2px solid $mainchar;
}

.presentation {
  &-wrapper {
    &--open, &--close {
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
      height: 350px;
      @include mq {
        height: 550px;
      }
    }
    &--close {
      height: 50px;
    }
  }

  &-title {
    position: relative;
    font-size: calc(15px + 0.5vw);
    height: 50px;
    line-height: 50px;
    width: 100%;
  }

  &-slide {
    &--open, &--close {
      position: relative;
      transition: all .5s ease-in-out;
      // margin: 0 auto;
      text-align: center;
      padding: 25px 0px;
    }
    &--open {
      opacity: 1;
      height: 500px;
    }
    &--close {
      height: 0px;
      overflow: hidden;
      opacity: 0;
    }
  }
}

</style>