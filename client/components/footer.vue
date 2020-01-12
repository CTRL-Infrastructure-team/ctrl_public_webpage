<template>
  <div>
    <transition>
      <footer class="footer" v-if="$store.state.created">
        <hr />
         <ul class = "link">
           <li class="leftlink">
             <nuxt-link to="/" class="select_menu">Top</nuxt-link>
             <nuxt-link to="/report" class="select_menu">活動報告</nuxt-link>
             <nuxt-link to="/progress" class="select_menu">作品</nuxt-link>
             <nuxt-link to="/inquiry" class="select_menu">問い合わせ</nuxt-link>
           </li>
           <li class="mail-adress">
             <p>連絡先:tcu.ctrl@gmail.com</p>
            </li>
           <li class="rightlink">
              <a href="https://twitter.com/tcuctrl?ref_src=twsrc%5Etfw"><img class="twitter_style" :src="twitter_img" alt="Twitter"></a>
           </li>
         </ul>
        <span class="copyright">&copy; 2019 CTRL web creater</span>
      </footer>
    </transition>
  </div>
</template>
<script>
import twitter_img from "~/assets/img/img5.jpg"

export default {
  data() {
    return {
      twitter_img: twitter_img
    }
  },
  name: "footer_component"
};
</script>
<style lang="scss" scoped>


.mail-adress{
  margin-top:10%;
}
.footer {
  background: inherit;
}

.leftlink {
  margin-top: 20px;
  list-style: none;
}

.rightlink {
  list-style: none;
}

.copyright {
  font-size: 10px;
}

.select_menu {
  color: $mainchar;
}

.twitter_style {
  margin: 10px;
  width: 30px;
  height: auto;
}

//アニメーション制御だから触らないで
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 2s;
}
</style>