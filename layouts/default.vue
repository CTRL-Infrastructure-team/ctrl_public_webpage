<template>
  <div class="body">
    <AppHeader />
    <slot />
    <ScrollButton />
    <AppFooter />
  </div>
</template>

<style lang="scss">
html {
  font-family: "Noto Sans JP", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: $maincolorBlack;
  color: $mainchar;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.body {
  min-height: 100vh;
}

.header {
  position: relative;
}

hr {
  margin-top: 10px;
}
</style>
