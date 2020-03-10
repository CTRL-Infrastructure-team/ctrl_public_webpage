<template>
  <div>
    <h1>News</h1>
    <div class="scroll">
      <div class="back">
        <div class="box4">
          <h2>twitter boxと色を揃えてみた</h2>
          <p>ページのソースから、カラーコードを探り出した</p>
        </div>
        <!-- < content="コンテンツ" img_url="url" overview="概要" contributor="投稿者" twitter_id="id"> -->
        <div v-for="sample_content in sample_contents" :key="sample_content.date">
          <!-- <h2 class="modal-flex-text_title">{{ title }}</h2> -->
          <articleItem v-bind:post="sample_content" />
          <!-- <div class="modal-flex-text_content">
            {{ '日付 : ' + sample_content.date }}
              <br>
            {{ '概要 : ' + sample_content.overview }}
              <br>
            {{'本文：' + sample_content.content}}
          </div> -->
          <!-- {{info}} -->
        </div>
        <!-- <div v-for="i in 5" :key="i"> -->
          <!-- <el-low :span="8"> -->
          <!-- </el-low> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
  
</template>
<script>
//import news1 from './news1'
import mainGuide from "~/components/news1";
import articleItem from "~/components/article";
import data from '~/assets/data/data.json';
import axios from '@nuxtjs/axios';



export default { 
  components: {
    //mainGuide,
    articleItem
  },
  data:() =>({
    sample_contents:data
  }),
  
  // props: ['title'],
  
  mounted(){
    this.$axios.get("~/assets/data/data.json")
    .then(response => {
      this.results = response.data
      console.log(response.data)
    })
  },
  computed:{
    processedPosts(){
      let posts = this.results;
    }
  }
  
}

/*

export default {
  components: {
    //mainGuide,
    articleItem
  },
  data () {
    return {

    }
  }
};
*/
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
.box27 {
  position: relative;
  padding: 0.5em 1em;
  margin: 2em 0;
  border: solid 2px #4ff0f0;
  border-radius: 0 5px 5px 5px;
  color: #2c2c2f;
  background: #ffffff;
}
.box27 .box-title {
  position: absolute;
  display: inline-block;
  top: -27px;
  left: -2px;
  padding: 0 9px;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  background: #4ff0f0;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
}
.box27 p {
  margin: 0;
  padding: 0;
}
.box27-a {
  position: relative;
  padding: 0.5em 1em;
  margin: 2em 0;
  border: solid 2px #5767bf;
  border-radius: 0 5px 5px 5px;
  color: #2c2c2f;
  background: #ffffff;
}
.box27-a .box-title {
  position: absolute;
  display: inline-block;
  top: -27px;
  left: -2px;
  padding: 0 9px;
  height: 25px;
  line-height: 25px;
  font-size: 17px;
  background: #5767bf;
  color: #ffffff;
  font-weight: bold;
  border-radius: 5px 5px 0 0;
}
.box19 {
  position: relative;
  padding: 0.25em 1em;
}
.box19:before,
.box19:after {
  content: "";
  width: 20px;
  height: 30px;
  position: absolute;
  display: inline-block;
}
.box19:before {
  border-left: solid 1px #5767bf;
  border-top: solid 1px #5767bf;
  top: 0;
  left: 0;
}
.box19:after {
  border-right: solid 1px #5767bf;
  border-bottom: solid 1px #5767bf;
  bottom: 0;
  right: 0;
}
.box19 p {
  margin: 0;
  padding: 0;
}

.box4 {
  padding: 8px 19px;
  margin: 2em 0;
  color: #ffffff;
  //background:  #2c2c2f;
  border-top: solid 1px #cde4ff;
  // border-bottom: solid 1px #cde4ff;
}
.box4 p {
  margin: 0;
  padding: 0;
}
.scroll {
  height: 30em;
  overflow-x: hidden;
  //overflow-y: scroll;
}
.back{
  padding-top: 1px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: #292F33;
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