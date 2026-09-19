<template>
  <nav class="content" aria-label="メイン">
    <div class="menu-wrapper">
      <div v-for="item in menu" :key="item.to" class="single-menu">
        <NuxtLink :to="item.to" class="text-wrapper">
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  menu: readonly { name: string, to: string }[]
}>()
</script>

<style lang="scss" scoped>
.content {
  height: 60px;
  z-index: 11;
}

.menu-wrapper {
  height: 60px;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #2c2c2c;
  @include mq {
    display: flex;
  }
}

.single-menu {
  width: 20%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.text-wrapper {
  text-decoration: none;
  color: #f0f0f0;
  font-size: calc(12.5px + 0.4vw);
  white-space: nowrap;
  opacity: 0.8;
  &:hover {
    transition: 0.3s all ease;
    opacity: 1;
  }
}
</style>
