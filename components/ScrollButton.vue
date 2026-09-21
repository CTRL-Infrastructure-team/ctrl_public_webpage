<template>
  <button
    id="scroll-top-button"
    class="button"
    :class="{ active: visible }"
    type="button"
    aria-label="ページ先頭へ戻る"
    @click="goTop"
  >
    <span>
      <div class="left"></div>
      <div class="right"></div>
    </span>
  </button>
</template>

<script setup lang="ts">
const visible = ref(false)

function goTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  visible.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style lang="scss" scoped>
.button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  z-index: 99;
  background-color: #f4f4f5;
  bottom: 5%;
  right: 5%;
  cursor: pointer;
  opacity: 0.6;
  border: 0;
}
.button.active {
  opacity: 1;
}

span {
  z-index: 101;
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
}

.left {
  position: absolute;
  width: 50%;
  height: 5px;
  background-color: #d4cdcf;
  transform: translateX(20%) translateY(400%) rotate(-45deg);
}

.right {
  position: absolute;
  width: 50%;
  height: 5px;
  background-color: #d4cdcf;
  transform: translateX(80%) translateY(400%) rotate(45deg);
}
</style>
