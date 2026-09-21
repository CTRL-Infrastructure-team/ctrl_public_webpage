<template>
  <button class="box" type="button" @click="$emit('open')" @mouseenter="titleOn = true" @mouseleave="titleOn = false">
    <img :src="img" class="img" :alt="name">
    <span v-if="titleOn" class="imgTitle">{{ name }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  img: string
}>()
defineEmits<{ open: [] }>()
const titleOn = ref(false)
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: all 0.5s;
  opacity: 0.6;
  &:hover {
    transform: scale(1.1, 1.1);
  }
}

.imgTitle {
  position: absolute;
  bottom: 5%;
  right: 5%;
  z-index: 2;
  color: rgba(#f0f0f0, 0.8);
  font-weight: bold;
  font-size: 20px;
}

.box {
  position: relative;
  overflow: hidden;
  height: 40vh;
  width: 50%;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
}
</style>
