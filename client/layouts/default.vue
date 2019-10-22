<template>
  <div>
    <header class="theflex">
      <div class="theflex_cell">Logo</div>
      <div class="theflex_cell">
        <input type="text" placeholder="seachbar" />
      </div>
    </header>
    <nuxt />
    <hr />
    <div>
      <footer class="footer">footer</footer>
    </div>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: hsl(240, 1%, 25%);
  color: #f0f0f0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.theflex {
  display: flex;
  height: 60px;
  background: #2c2c2c;
  align-items: center;
  justify-content: space-between;
}
.theflex_cell {
  /* justify-content: flex-start; */
  /* margin-bottom: 10px; */
  line-height: 60px;
  margin-left: 10px;
  margin-right: 10px;
}
footer {
  margin-top: 20px;
  text-align: center;
  margin-bottom: 20px;
}
hr {
  margin-top: 10px;
}
</style>
