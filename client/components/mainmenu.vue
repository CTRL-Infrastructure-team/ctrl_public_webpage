<template>
  <div class="content">
    <div class="menu-wrapper">
      <div v-for="item in menu" :key="item.id" class="single-menu">
        <nuxt-link :key="item.to" :to="item.to" class="text-wrapper">
          {{ item.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: "main_menu",
  props: {
    menu: {
      type: Array,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  height: 100%;
  height: 60px;
  z-index: 11;
}

.menu-wrapper {
  // width: 100%;
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

li {
  list-style: none;
  display: none;
  @include mq {
    display: flex;
  }
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  line-height: 1.5cm;

  :hover {
    background-color: gray;
  }

  ul {
    outline: none;
    color: whitesmoke;
    // padding: 0px 0px;
    width: 100px;
    text-align: center;
    display: inline-block;
    :link {
      color: whitesmoke;
    }
    :visited {
      color: whitesmoke;
    }
    border-right: thin whitesmoke solid;
  }
}
.single-menu {
  width: 20%;
  height: 50px;
  line-height: 50px;
  vertical-align: middle;
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
