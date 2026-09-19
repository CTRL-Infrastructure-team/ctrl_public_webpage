<template>
  <div>
    <div class="slideShow">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        type="button"
        class="slide_box"
        @click="$emit('open', counter)"
        @touchstart="recordX"
        @touchend="compareX"
      >
        <img :src="slide.img" :style="slide.style" class="slide_img" :alt="slide.title">
      </button>
      <span class="slide_title">{{ nowTitle }}</span>
    </div>
    <div class="flex">
      <button
        v-for="(value, index) in slides"
        :key="index"
        type="button"
        class="box"
        :class="{ box_active: value.isActive }"
        :aria-label="`${value.title}を表示`"
        @click="changeActive(index)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  slidesData: { img: string, title: string }[]
}>()
defineEmits<{ open: [index: number] }>()

const counter = ref(0)
const touchX = ref(0)
let intervalId: ReturnType<typeof setInterval> | undefined

const slides = computed(() =>
  props.slidesData.map((value, index) => ({
    ...value,
    isActive: counter.value === index,
    style: {
      left: `${100 * (index - counter.value)}%`,
      transition: 'all 0.4s ease'
    }
  }))
)

const nowTitle = computed(() => props.slidesData[counter.value]?.title || '')

function startInterval() {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    counter.value = (counter.value + 1) % props.slidesData.length
  }, 5000)
}

function changeActive(index: number) {
  counter.value = index
  startInterval()
}

function getClientX(event: TouchEvent) {
  return event.changedTouches?.[0]?.clientX ?? event.touches?.[0]?.clientX ?? 0
}

function recordX(event: TouchEvent) {
  touchX.value = getClientX(event)
  clearInterval(intervalId)
}

function compareX(event: TouchEvent) {
  const subtraction = touchX.value - getClientX(event)
  if (Math.abs(subtraction) < 40) {
    startInterval()
    return
  }
  if (subtraction < 0) {
    counter.value = counter.value ? counter.value - 1 : props.slidesData.length - 1
  } else {
    counter.value = (counter.value + 1) % props.slidesData.length
  }
  startInterval()
}

onMounted(startInterval)
onBeforeUnmount(() => clearInterval(intervalId))
</script>

<style lang="scss" scoped>
.slideShow {
  position: relative;
  height: 35vh;
  overflow: hidden;
}
.slide {
  &_img {
    position: absolute;
    width: 100%;
    height: 35vh;
    object-fit: cover;
    left: 0;
    top: 0;
  }
  &_title {
    position: absolute;
    bottom: 5%;
    right: 5%;
    z-index: 2;
    color: rgba(#f0f0f0, 0.8);
    font-weight: bold;
    font-size: 20px;
  }
  &_box {
    border: 0;
    padding: 0;
    background: transparent;
    width: 100%;
    height: 35vh;
    position: relative;
  }
}

.flex {
  display: flex;
  justify-content: space-around;
  background: #353837;
  padding: 0 10%;
}
.box {
  margin-top: 10px;
  margin-bottom: 10px;
  background: rgb(143, 142, 142);
  border: solid 1px #5c5a5a;
  width: 22%;
  height: 9px;
  cursor: pointer;
  &_active {
    background: #f0f0f0;
  }
}
</style>
