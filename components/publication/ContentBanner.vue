<template>
  <div class="presentations-wrapper">
    <NuxtLink class="banner-link" :to="to">
      <span class="banner-top">{{ title }}</span>
      <span v-if="description" class="banner-description">{{ description }}</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  to: string
  title: string
  description?: string
  muted?: boolean
}>(), {
  description: '',
  muted: false
})
</script>

<style lang="scss" scoped>
.presentations-wrapper {
  margin-bottom: 30px;
  border-radius: 5px;
  height: 110px;
  background: v-bind('muted ? "#ABABAB" : "#ffffff"');
  text-align: center;
  position: relative;
}

.banner {
  &-top,
  &-description {
    display: inline-block;
    width: 100%;
    font-weight: bolder;
    color: v-bind('muted ? "#ffffff" : "#000000"');
  }
  &-top {
    font-size: calc(16px + 1vw);
    line-height: 70px;
  }
  &-description {
    font-size: calc(15px + 0.7vw);
    line-height: 30px;
  }
  &-link {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
}
</style>
