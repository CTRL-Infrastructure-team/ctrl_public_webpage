<template>
  <div class="header_box">
    <header class="theflex">
      <div class="theflex_cell">
        <nuxt-link to="/">
          <img src="~/assets/img/logo.png" class="img" />
        </nuxt-link>
      </div>
      <div class="theflex_cell">
        <form class="search_form">
          <input type="text" placeholder="検索内容を入力" class="textform" /><input type="submit" value="検索" class="button" />
        </form>
      </div>
      <div class="theflex_cell">
        <div class="humburger" v-on:click="isOpen=!isOpen">
          <span class="top"></span>
          <span class="middle"></span>
          <span class="bottom"></span>
        </div>
      </div>
      <div id="menu" class="menu" v-bind:class="{open:isOpen}">
        <ul v-on:click="isOpen=!isOpen">
            <nuxt-link v-for="item in menu" :key="item.to" :to="item.to">
                <li >
                {{item.name}}
                </li>
            </nuxt-link>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "theHeader",
  data() {
    return {
      isOpen: false
    };
  },
  props:{
    menu:{
      type: Array,
      required: true
      }
  }
};
</script>
<style lang="scss" scoped>
.theflex {
  display: flex;
  // height: 60px;
  position: relative;
  background: #2c2c2c;
  align-items: center;
  justify-content: space-between;
  &_cell {
    line-height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }
}


//検索バーのcss
.search_form {
  display: none;
  @include mq() {
    display: inline;
    margin-right: 10px;
  }
}

//入力フォームのcss
.textform {
  @include mq {
    // border: 2px solid #328d55;
    height: 26px;
    background-color: #434644;
    color: #f0f0f0;
    border: none;
    padding-left: 5px;
  }
}
//検索ボタンのcss
.button {
  @include mq {
    cursor: pointer;
    border: 2px solid #666;
    color: #5c6961;
    background-color: #2c2c2c;
    transition: 500ms;
    &:hover {
      color: #c9c2c2;
      background-color: #666;
      transition: 500ms;
    }
  }
}

//画像のcss
.img {
  height: 60px;
  margin: 0;
  padding: 0;
  display: block;
  @include mq {
    margin-left: 10px;
  }
}

.theflex_cell:nth-child(3) {
  @include mq {
    display: none;
  }
  cursor: pointer;
}

.humburger {
  @include mq {
    display: none;
  }
  display: flex;
  flex-direction: column;
  height: 60px;
  width: 60px;
  padding: 4px;
  & span {
    height: 2px;
    background-color: #c9c2c2;
    margin: 7px;
  }
}
.menu {
  position: absolute;
  overflow: hidden;
  opacity: 0;
  z-index: 10;
  background-color: #6d7570;
  width: 0;
  height: 100vh;
  top: 60px;
  right: 0;
  bottom: 0;
  line-height: 60px;
  text-align: center;
  transition: all 0.5s ease-in-out;
  transform: translateX(100%);
  & ul {
    padding: 0;
    height: 100%;
    & a {
      text-decoration: none;
      text-emphasis: none;
      color: #c9c2c2;
    }
    & li {
      list-style: none;
      font-size: 1.2em;
      padding: 10px;
      margin: 10px;
      border: solid 2px #c9c2c2;
    }
  }
  @include mq {
    display: none;
  }
}

.open {
  opacity: 1;
  width: 100%;
  display: block;
  padding: 10px;
  transform: translateX(0);
}
</style>
