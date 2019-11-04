<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell logo">Logo</div>
      <div class="mob" id="mob">
          <input class="mobile_search" type="button" value="検索" v-on:click="onClick" id="aa"/>
      </div>
      <div class="theflex_cell">
        <form class="search_form" id="vanish">
          <input type="text" placeholder="検索内容を入力" class="textform"/><!--
          --><input type="submit" value="検索" class="button"/>
        </form>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "theHeader",
  methods: {
    //検索ボタンを出す
          onClick: function(event){
            let obj = document.getElementById("vanish");
            obj.classList.toggle("active");
            let obj2 = document.getElementById("mob");
            obj2.classList.toggle("moba");
            if(document.getElementById("aa").value == "閉じる"){
              document.getElementById("aa").value = "検索";
            }
            else{
            document.getElementById("aa").value = "閉じる";
            }
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
//モバイルの時検索ボタンを隠す
.mob{
  position: absolute;
  right: 30px;
  @include mq(){
    transform: translateY(-60px);
  }
}
.moba{
  transform: translateX(-230px);
}
.mobile_search{
  background-color: #328d55;
  color: #c9c2c2;
  border: none;
}

.search_form{
  transform: translateY(-300px); 
  @include mq(){
    margin-right: 20px;
    transform: translateY(0);
  }
}

.active{
  transform: translateY(0px);
}


  //ロゴのcss
.logo{
  @include mq(){
    margin-left: 50px;
  }
}


//入力フォームのcss
.textform{
  // border: 2px solid #328d55;
  line-height: 1.8em;
  background-color: #506657;
  color: #f0f0f0;
  border: none;
  padding-left: 5px;
}
//検索ボタンのcss
.button{
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

</style>