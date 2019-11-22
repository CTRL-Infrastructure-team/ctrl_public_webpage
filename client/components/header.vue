<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell">
        <nuxt-link to="~/pages/index.vue">
        <img src="~/assets/img/KariLogo.jpg" class="img">
        </nuxt-link>
        </div>
      <div class="theflex_cell">
        <form class="search_form">
          <input type="text" placeholder="検索内容を入力" class="textform"/><!--
          --><input type="submit" value="検索" class="button" />
        </form>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "theHeader"
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
    display: block;
    margin-right: 20px;
    transform: translateY(0);
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
    color: #c9c2c2;
    cursor: pointer;
    border: 2px solid #328d55;
    background-color: #328d55;
    transition :500ms;
    &:hover{
      background-color: #2c2c2c;
      color: #328d55;
      transition: 500ms;
    }
  }
}
.img{
  height: 60px;
  margin: 0;
  padding: 0;
  display: block;
  @include mq{
    margin-left: 50px;
  }
}
</style>