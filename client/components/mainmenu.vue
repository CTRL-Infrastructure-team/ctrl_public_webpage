<template>
  <div>
    <li>
      <ul v-for="item in menu" :key="item">{{item}}</ul>
    </li>
  </div>
</template>
<script>
export default {
  name: "main_menu",
  data() {
    return {
      menu: ["Top", "活動報告", "...etc"]
    };
  }
};
</script>
<style lang="scss">
li {
  list-style: none;
  ul {
    display: inline;
  }
}
</style>
