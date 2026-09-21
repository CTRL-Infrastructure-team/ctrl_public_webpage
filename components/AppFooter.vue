<template>
  <footer class="footer around">
    <hr>
    <div class="contaner">
      <NuxtLink
        v-for="item in menu"
        :key="item.name"
        :to="item.to"
        class="select_menu"
      >
        {{ item.name }}
      </NuxtLink>
    </div>
    <div class="contaner center">
      <a href="https://twitter.com/tcuctrl" rel="noopener noreferrer">
        <img class="icon_style" src="/twitter.png" alt="Twitter">
      </a>
    </div>
    <span class="copyright">&copy; 2019 CTRL web creater</span>
  </footer>
</template>

<script setup lang="ts">
import { siteNav } from '~/utils/nav'

const menu = siteNav
</script>

<style lang="scss" scoped>
.around {
  justify-content: space-around;
}

.contaner {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 30px 10%;
  @include mq() {
    flex-wrap: nowrap;
  }
}

.center {
  justify-content: center;
  a {
    margin: 10px;
    opacity: 0.6;
    &:hover {
      opacity: 1;
      transition: all 0.5s ease;
    }
  }
}

.copyright {
  font-size: 10px;
}

.select_menu {
  color: $mainchar;
  flex: 1 1 200px;
  margin-bottom: 0.2vw;
  text-align: center;
  font-size: 14px;
  text-decoration: none;
  font-weight: 300;
  padding: 10px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transition: all 0.5s ease;
  }
}

.icon_style {
  width: 30px;
  height: auto;
}

.footer {
  background: #2c2c2c;
}
</style>
