<template>
  <div>
    <div class="modal-flex-text">
      <nuxt-link :to="`/currentSituations/${article._id}`">
        <h2 class="modal-flex-text--title">{{ article.title }}</h2>
      </nuxt-link>
      <div class="modal-flex-text--content">
        <div>{{ '日付 : ' + timestamp }}</div>
        <div class="sanitize-text" v-html="$sanitize(modifiedText)"></div>
      </div>
    </div>
  </div>
</template>
<script>
import modify from "~/plugins/modifiedTime";

export default {
  props: ['article'],
  data() {
    let modifiedText = ""
    if(this.article.content.length >= 100) {
      modifiedText = this.article.content.substring(1, 80) + "  [...]"
    } else {
      modifiedText = this.article.content
    }
    return {
      modifiedText
    }
  },
  computed: {
    timestamp() {
      return modify(this.article.createdAt)
    }
  },
}
</script>
<style lang="scss" scoped>
$modalBorder: #8193a9;
.modal {
  width: 100%;
  &-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-img {
      width: 35%;
    }
    &-text {
      width: 100%;
       padding-bottom: 10px;
      
      &--title {
        font-family: monospace;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 10px;
        margin-top: 10px;
        padding-left: 3px;
        border-bottom: 1px solid $modalBorder;
        border-left: 4px solid $modalBorder;
      }

      &--content{
        padding-left: 10px;
      }
    }
  }
}

.sanitize-text {
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: $mainchar;
}
</style>