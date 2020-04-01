<template>
  <div>
    <h1>News</h1>
    <div class="scroll">
      <div class="back">
        <div v-for="article in articles" :key="article.id">
          <articleItem :article="article" />
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import articleItem from "~/components/article";
import axios from 'axios';

export default { 
  components: {
    articleItem
  },
  props: ['articles']
}

</script>
<style lang="scss" scoped>
$modalBorder: #8193a9;
.flexNews {
  width: 80%;
  //display: flex;
  // border: solid black 1px;
  justify-content: space-around;
  flex-wrap: wrap;

  /* width: 100;*/
}

.scroll {
  height: 30em;
  overflow-x: hidden;
  //overflow-y: scroll;
}
.back{
  padding-top: 1px;
  padding-bottom: 20px;
  padding-right: 10px;
  padding-left: 15px;
  background-color: #292F33;
  min-height: 480px;
}

.scroll::-webkit-scrollbar {
  //background:#09C9D9;
  width: 7px;
}
.scroll::-webkit-scrollbar-thumb {
  //background: linear-gradient(0deg, #43e2c6, #3183d0);
  background: #888888;
  border-radius: 3px;
}
/*
.scroll::-webkit-scrollbar{
  width: 5px;
}
*/
/*
/* スクロールバーの横幅設定 
.scroll.deco::-webkit-scrollbar{
  width: 5px;
}
/* スクロールバーの背景色、角丸指定  
.scroll::-webkit-scrollbar-track{
  border-radius: 1px;
}
/*スクロールバーの色・角丸指定
.scroll::-webkit-scrollbar-thumb {
  border-radius: 1px;
	background:#09C9D9;
}
*/
.modal {
  width: 90%;
  &-flex {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-img {
      width: 35%;
    }
    &-text {
      width: 60%;

      &_title {
        font-family: monospace;
        width: 165%;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 20px;
        margin-top: 10px;
        padding-left: 3px;
        border-bottom: 1px solid $modalBorder;
        border-left: 4px solid $modalBorder;
      }

      &_content{
        padding: 0 0px;
      }
    }
  }
}
</style>