<template>
  <div>
    <transition>
      <footer class="footer" v-if="$store.state.created">
        <hr />footer
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