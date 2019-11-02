<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell">Logo</div>
      <div class="theflex_cell">
        <form class="search_form">
          <input type="text" placeholder="検索内容を入力" class="textform"/><!--
          --><input type="submit" value="検索" class="button"/>
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
@media screen and (min-width: 600px){
  
.search_form{
  margin-right: 20px;
}
.textform{
  // border: 2px solid #328d55;
  line-height: 1.8em;
  background-color: #506657;
  color: #f0f0f0;
  border: none;
  padding-left: 5px;
}
.button{
  color: #c9c2c2;
  cursor: pointer;
  border: 2px solid #328d55;
  background-color: #328d55;

  &:hover{
    background-color: #2c2c2c;
    color: #328d55;
  }
}
}
</style>