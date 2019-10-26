<template>
  <div>進捗一覧</div>
</template>
<script>
export default {
  mounted() {
    this.$store.commit("doFooter");
  },
  destroyed() {
    this.$store.commit("doFooter");
  }
};
</script>
<style lang="scss" scoped>
</style>