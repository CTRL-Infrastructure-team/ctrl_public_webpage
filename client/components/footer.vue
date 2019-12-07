<template>
  <div>
    <transition>
      <footer class="footer" v-if="$store.state.created">
        <hr />footer
         <ul class = "link">
           <li class="leftlink">
             <nuxt-link to="/">Top</nuxt-link>
             <nuxt-link to="/report">活動報告</nuxt-link>
             <nuxt-link to="/progress">作品</nuxt-link>
             <nuxt-link to="/inquiry">問い合わせ</nuxt-link>
           </li>
           <li class="rightlink">
              <nuxt-link to="twitter.vue"><img src="D:\Web\github\client\assets\img\img5.jpg" alt="Twitter"></nuxt-link>
           </li>
         </ul>
        <span class="copyright">&copy; 2019 CTRL web creater</span>
      </footer>
    </transition>
  </div>
</template>
<script>
export default {
  name: "footer_component"
};
</script>
<style lang="scss" scoped>
.footer {
  background: inherit;
}
.copyright {
  font-size: 10px;
}
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 2s;
}
hr {
}
footer {
}
</style>