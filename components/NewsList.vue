<template>
  <div>
    <div class="tab-title">
      <span>News</span>
    </div>
    <div class="scroll">
      <div class="back">
        <ArticleItem
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  articles: { id: string, title: string, content: string, created_at: string }[]
}>()
</script>

<style lang="scss" scoped>
.tab-title {
  height: 45px;
  line-height: 45px;
  margin-left: 1.5rem;
  span {
    position: relative;
    font-size: calc(20px + 1vw);
    font-weight: bolder;
    &::before {
      border-radius: 10%;
      content: "";
      position: absolute;
      height: 0.9rem;
      width: 0.9rem;
      top: 50%;
      left: -1.5rem;
      background: #f0f0f0;
      transform: translateY(-50%);
    }
  }
}

.scroll {
  height: 30em;
  overflow-x: hidden;
}

.back {
  padding: 1px 10px 20px 15px;
  background-color: #292f33;
  min-height: 480px;
}

.scroll::-webkit-scrollbar {
  width: 7px;
}

.scroll::-webkit-scrollbar-thumb {
  background: #888888;
  border-radius: 3px;
}
</style>
