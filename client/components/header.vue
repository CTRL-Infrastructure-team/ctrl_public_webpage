<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell">
        <nuxt-link to="/">
        <img src="~/assets/img/KariLogo.jpg" class="img">
        </nuxt-link>
      </div>
      <div class="theflex_cell">
        <form class="search_form">
          <input type="text" placeholder="検索内容を入力" class="textform"/><!--
          --><input type="submit" value="検索" class="button" />
        </form>
      </div>
      <div class="theflex_cell">
        <div class="humburger" v-on:click='isOpen=!isOpen'>
          <span class="top"></span>
          <span class="middle"></span>
          <span class="bottom"></span>
        </div>
      </div>
      <div id="menu" class="menu" v-bind:class='{open:isOpen}'>
        <ul>
          <li><nuxt-link to="/">Top</nuxt-link></li>
          <li>活動報告</li>
          <li>作品紹介</li>
          <li>お問合せ</li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "theHeader",
  data() {
    return{
      isOpen: false
    }
  }
};
</script>
<style lang="scss">
.theflex {
  display: flex;
  height: 60px;
  background: #2c2c2c;
  align-items: center;
  justify-content: space-between;
  &_cell {
    /* justify-content: flex-start; */
    /* margin-bottom: 10px; */
    line-height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }
}

//検索バーのcss
.search_form{
  display: none;
  @include mq(){
    display: inline;
    margin-right: 10px;
  }
}


//入力フォームのcss
.textform{
  @include mq{
    // border: 2px solid #328d55;
    line-height: 1.8em;
    background-color: #506657;
    color: #f0f0f0;
    border: none;
    padding-left: 5px;
  }
}
//検索ボタンのcss
.button{
  @include mq{
    cursor: pointer;
    border: 2px solid #328d55;
    color: #328d55;
     background-color: #2c2c2c;
    transition :500ms;
    &:hover{
      color: #c9c2c2;
      background-color: #328d55;
      transition: 500ms;
    }
  }
}

//画像のcss
.img{
  height: 60px;
  margin: 0;
  padding: 0;
  display: block;
  @include mq{
    margin-left: 10px;
  }
}


.theflex_cell:nth-child(3){
  @include mq{
    display: none;
  } 
}

.humburger{
  @include mq{
    display: none;
  }
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 60px;
  padding: 4px;
    & span{
      height: 2px;
      background-color: #c9c2c2;
      margin: 7px;
    }
}


.menu{
  opacity: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
  top:60px;
  right: 0;
  background-color: #328d55;
  line-height: 60px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  transform: translateX(1000px);
  & ul{
    padding:0;
    & li{
    padding: 2px;
    margin: 10px;
    border: solid 2px #c9c2c2;
    }
  }
  @include mq{
    display: none;
  }
}

.menu.open{
  opacity: 1;
  transform: translateX(0);
}


</style>