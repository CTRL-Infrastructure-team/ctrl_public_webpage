<template>
  <div>
    <li>
      <nuxt-link v-for="item in menu" :key="item.to" :to="item.to" class="link">
        <ul>{{item.name}}</ul>  
      </nuxt-link>
    </li>
  </div>
</template>
<script>
export default {
  name: "main_menu",
  
  props:{
    menu:{
      type: Array,
      required: true,
      
      }
  }
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
  background-color: #666;
  display: none;
  @include mq {
    display: flex;
  }
  flex-direction: row;
  justify-content: space-around;
  flex-wrap:nowrap;
  line-height: 1.5cm;
  
  :hover {
    background-color: gray;
  }

  ul {
    outline: none;
    color: whitesmoke;
    padding: 0cm 0cm;
    width: 4cm;
    text-align: center;
      
    :link{
      color: whitesmoke;
    }
    :visited {
      color: whitesmoke;
    }
    
    border-right: thin whitesmoke solid;
    border-left: thin whitesmoke solid;
    
  }
}
.link{
  text-decoration: none;
}
</style>
