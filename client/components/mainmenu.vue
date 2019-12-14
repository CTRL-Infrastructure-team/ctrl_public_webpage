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
  data() {
    return {
      menu: [
        { name: "Top", to: "/" },
        { name: "活動報告", to: "/report" },
        { name: "作品", to: "/progress" },
        { name: "問い合わせ", to: "/inquiry" }
      ]
    };
  }
};
</script>
<style lang="scss">
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
    margin: auto;
      
    :link{
      color: whitesmoke;
    }
    :visited{
      color: whitesmoke;
    }
    :hover{
      background-color: gray;
    }

    a {
      text-decoration: none;
    }

  }
}



</style>
