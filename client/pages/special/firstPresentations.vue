<template>
  <div class="container">
    <div
      class="presentation-wrapper"
      v-for="(data, index) in datas"
      :key="data.id"
    >
      <span class="presentation-title" @click="openTable(index)">
        {{ data.name }}
      </span>
      <span :class="{
        'presentation-slide--open': data.isOpen,
        'presentation-slide--close': !data.isOpen  
      }">
        {{ data.slide }}
      </span>
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

.presentation {
  &-wrapper {
    display: block;
    width: 90%;
    margin: 0 auto;
    border-top: 1.5px solid $mainchar;
    border-bottom: 1.5px solid $mainchar;
  }
  &-wrapper+ &-wrapper {
    border-top: 0px;
    border-bottom: 1.5px solid $mainchar;
  }

  &-title {
    font-size: calc(15px + 0.5vw);
    display: inline-block;
    height: 50px;
    line-height: 50px;
    width: 100%;
  }


  &-slide {
    &--open {

    }
    &--close {
      display: none;
    }
  }
}

</style>