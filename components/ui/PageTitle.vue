<template>
  <div class="title-wrapper">
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style lang="scss" scoped>
.title-wrapper {
  height: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
  span {
    &::before {
      content: "";
      position: absolute;
      top: 55%;
      left: -20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translateY(-50%);
      background: #f0f0f0;
    }
    position: relative;
    margin-left: 50px;
    font-family: "Hiragino Kaku Gothic ProN", "Noto Sans JP", sans-serif;
    text-align: left;
    font-size: calc(17px + 0.625vw);
    font-weight: 500;
  }
}
</style>
