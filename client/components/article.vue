<template>
  <div>
    <div class="modal-flex-text">
      <nuxt-link :to="`/currentSituations/${article.id}`">
        <div class="modal-flex-text--title">{{ article.title }}</div>
      </nuxt-link>
      <div class="modal-flex-text--content">
        <div>{{ "日付 : " + timestamp }}</div>
        <div class="sanitize-text" v-html="$sanitize(modifiedText)"></div>
      </div>
    </div>
  </div>
</template>
<script>
import modify from "~/plugins/modifiedTime";

export default {
  props: ["article"],
  computed: {
    timestamp() {
      return modify(this.article.created_at);
    },
    modifiedText() {
      if (this.article?.content?.length >= 100) {
        return this.article.content.substring(0, 80) + " [...]";
      } else {
        return this.article.content;
      }
    }
  }
};
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
        width: 100%;
        font-size: calc(15px + 0.8vw);
        font-weight: bolder;
        margin-bottom: 10px;
        margin-top: 10px;
        padding-left: 3px;
        border-bottom: 1px solid $modalBorder;
        border-left: 4px solid $modalBorder;
      }

      &--content {
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
