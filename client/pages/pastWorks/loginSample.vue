<template>
  <div>
    <form method="POST" action="/api/login">
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="password" placeholder="password" />
      <input type="submit" />
    </form>
    <button @click="loginUser">ユーザ確認</button>
  </div>
</template>

<script>
import querystring from "querystring";

export default {
  methods: {
    loginUser: function() {
      this.$axios.$get("/api/userTest");
    }
  }
};
</script>

<style scoped></style>
