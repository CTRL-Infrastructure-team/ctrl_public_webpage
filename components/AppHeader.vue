<template>
  <header class="header_box">
    <div class="flex">
      <div class="flex_cell">
        <NuxtLink to="/">
          <img src="~/assets/img/logo.png" class="img" alt="CTRL ロゴ">
        </NuxtLink>
      </div>
      <AppNav :menu="menu" class="flex_menu" />
      <div class="flex_cell">
        <button
          class="humburger"
          type="button"
          :aria-expanded="isOpen"
          aria-label="メニュー"
          @click="isOpen = !isOpen"
        >
          <span class="top"></span>
          <span class="middle"></span>
          <span class="bottom"></span>
        </button>
      </div>
      <div id="menu" class="menu" :class="{ open: isOpen }">
        <ul>
          <li v-for="item in menu" :key="item.to">
            <NuxtLink :to="item.to" @click="isOpen = false">
              {{ item.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { siteNav } from '~/utils/nav'

const menu = siteNav
const isOpen = ref(false)
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  z-index: 10;
  position: relative;
  background: #2c2c2c;
  align-items: center;
  justify-content: space-between;
  &_cell {
    line-height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }
  &_menu {
    flex: 5 1;
  }
}

.img {
  height: 60px;
  margin: 0;
  padding: 0;
  display: block;
  @include mq {
    margin-left: 10px;
  }
}

.flex_cell:nth-child(3) {
  @include mq {
    display: none;
  }
}

.humburger {
  @include mq {
    display: none;
  }
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 60px;
  padding: 4px;
  border: 0;
  background: transparent;
  cursor: pointer;
  span {
    height: 2px;
    background-color: #c9c2c2;
    margin: 7px;
  }
}

.menu {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  z-index: 10;
  background-color: #979797;
  width: 0;
  height: 100vh;
  top: 60px;
  right: 0;
  bottom: 0;
  line-height: 60px;
  text-align: center;
  transition: all 0.5s ease-in-out;
  transform: translateX(100%);
  ul {
    padding: 0;
    height: 100%;
    a {
      text-decoration: none;
      color: #e9e8e8;
    }
    li {
      list-style: none;
      font-size: 1.2em;
      padding: 10px;
      margin: 10px;
      border: solid 2px #e9e8e8;
    }
  }
  @include mq {
    display: none;
  }
}

.open {
  opacity: 1;
  width: 100%;
  display: block;
  padding: 10px;
  transform: translateX(0);
}
</style>
