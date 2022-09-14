<template>
  <div>
    <div v-for="data in presentations" :key="data.id3" class="wapper">
      <thePresentation :name="data.contributor" :url="data.slide_url" class="border" />
    </div>
  </div>
</template>

<script>
import thePresentation from "~/components/publication/thePresentation";

export default {
  components: {
    thePresentation
  },
  props: {
    presentations: Array
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: calc(100vh - 60px);
  margin: 30px auto;
  @include mq {
    margin: 50px auto;
  }
}

.border {
  border-top: 2px solid $mainchar;
}
</style>
