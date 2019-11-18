<template>
  <div>
    <h1>News</h1>
    <div>this is first news.</div>
    <div class="flexNews">
      <mainGuide name="first news" class="main guide" color="#4ff0f0" />
    </div>
    <div class="box27">
      <span class="box-title">タイトル</span>
      <p>ラベルをつけたようなデザイン<br>
        2行目<br>
        3行目
      </p>
    </div>
    <div>this is second news.</div>
    <div class="flexNews">
      <mainGuide name="second news" class="main guide" color="#4f4fff" />
    </div>
    <div class="box27-a">
      <span class="box-title">迷言</span>
      <div class="box19">
        <p>htmlが挿さらない</p>
      </div>
    </div>
    <div>this is third news</div>
    <div class="flexNews">
      <mainGuide name="third news" class="main guide" color="#4f4fff" />
    </div>
    <div class="box27-a">
      <!-- <span class="box-title">タイトル</span> -->
      <p>ラベルをつけたようなデザイン<br>
        2行目<br>
        3行目
      </p>
    </div>
    <div class="box4">
      <p>ここに文章</p>
    </div>
    <!-- <div id="app1">{{ greeting }}</div> -->
  </div>
</template>
<script>
//import news1 from './news1'
import mainGuide from "~/components/news1";
export default {
  /*data () {
    return {
      // greeting: <mainGuide name="4" class="main guide" color="black" />
      greeting:'third'
    }
  }*/
  components: {
    mainGuide
  }
};
</script>
<style lang="scss" scoped>
div {
  border: solid black 0px;
}
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
.box27 p{
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
    padding:0.25em 1em;
    
}
.box19:before,.box19:after{ 
    content:'';
    width: 20px;
    height: 30px;
    position: absolute;
    display: inline-block;
}
.box19:before{
    border-left: solid 1px #5767bf;
    border-top: solid 1px #5767bf;
    top:0;
    left: 0;
}
.box19:after{
    border-right: solid 1px #5767bf;
    border-bottom: solid 1px #5767bf;
    bottom:0;
    right: 0;
}
.box19 p {
    margin: 0; 
    padding: 0;
}

.box4{
    padding: 8px 19px;
    margin: 2em 0;
    color:#cde4ff;
    //background:  #2c2c2f;
    border-top: solid 1px #cde4ff;
    border-bottom: solid 1px #cde4ff;
}
.box4 p {
    margin: 0; 
    padding: 0;
}
</style>