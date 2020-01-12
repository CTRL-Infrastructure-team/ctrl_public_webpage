<template>
  <div>
    <li>
      <ul v-for="item in menu" :key="item.to">
        <nuxt-link :to="item.to">{{item.name}}</nuxt-link>
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  name: "main_menu",
  props:{
    menu:{
      type: Array,
      required: true
      }
  }
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  background-color: #666;
  height: 1cm;

  ul {
    display: inline;

    text-align: center;
    text-decoration: none;
    outline: none;
    color: whitesmoke;
    line-height: 1cm;

    :link {
      color: whitesmoke;
    }
    :visited {
      color: whitesmoke;
    }
    :hover {
      background-color: gray;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
