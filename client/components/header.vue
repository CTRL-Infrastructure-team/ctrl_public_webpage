<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell">Logo</div>
      <div class="theflex_cell">
        <input type="text" placeholder="seachbar" />
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
    line-height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>