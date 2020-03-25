<template>
  <div>
    <div class="modal-flex-text">
      <h2 class="modal-flex-text_title">{{ article.title }}</h2>
      <div class="modal-flex-text_content">
      {{ '日付 : ' + timestamp }}
      <br>
      {{ '概要 : ' + article.content }}
      <br>
      {{'本文 : ' + article.content }}
      <!-- <br> -->
      <!-- {{'投稿者 : ' + post.contributor}} -->
      <!-- <br> -->
      <!-- {{'Twitter ID:' + post.twitter_id}} -->
      </div>
    </div>
  </div>
</template>
<script>
import modify from "~/plugins/modifiedTime";

export default {
  props: ['article'],
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
      

      &_title {
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

      &_content{
        padding-left: 10px;
      }
    }
  }
}
</style>