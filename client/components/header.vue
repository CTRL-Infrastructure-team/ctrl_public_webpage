<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell">
        <nuxt-link to="/">
        <img src="~/assets/img/KariLogo.jpg" class="img">
        </nuxt-link>
      </div>
      <div class="theflex_cell">
        <div class="second">
          <span>～</span><span>C</span><span>T</span><span>R</span><span>L</span><span>ホ</span><span>ー</span><span>ム</span><span>ペ</span><span>ー</span><span>ジ</span><span>へ</span><span>よ</span><span>う</span><span>こ</span><span>そ</span><span>～</span>
        </div>
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
    display: inline;
    margin-right: 10px;
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

//文字のcss
.second{
  display: none;
  @include mq{
    display: block;
    span{
      color:#328d55;
      font-size: 18px;
      display: inline-block;
    }
    &:hover{
      cursor: pointer;
    }
  }
}
.second:hover span{
  animation: hove 0.5s ease-in-out;
}

  @keyframes hove{
    0%{
      transform: translateY(0px);
    }
    33%{
      transform: translateY(-10px);
      color: #ff00b3;
    }
    100%{
      transform: translateY(0px);
    }
  }

.second:hover span:nth-child(1) {
  animation-delay: 0;
}
.second:hover span:nth-child(2) {
  animation-delay: 25ms;
}
.second:hover span:nth-child(3) {
  animation-delay: 50ms;
}
.second:hover span:nth-child(4) {
  animation-delay: 75ms;
}
.second:hover span:nth-child(5) {
  animation-delay: 100ms;
}
.second:hover span:nth-child(6) {
  animation-delay: 125ms;
}
.second:hover span:nth-child(7) {
  animation-delay: 150ms;
}
.second:hover span:nth-child(8) {
  animation-delay: 175ms;
}
.second:hover span:nth-child(9) {
  animation-delay: 200ms;
}
.second:hover span:nth-child(10) {
  animation-delay: 225ms;
}
.second:hover span:nth-child(11) {
  animation-delay: 250ms;
}
.second:hover span:nth-child(12) {
  animation-delay: 275ms;
}
.second:hover span:nth-child(13) {
  animation-delay: 300ms;
}
.second:hover span:nth-child(14) {
  animation-delay: 325ms;
}
.second:hover span:nth-child(15) {
  animation-delay: 350ms;
}
.second:hover span:nth-child(16) {
  animation-delay: 375ms;
}
.second:hover span:nth-child(17) {
  animation-delay: 400ms;
}
</style>