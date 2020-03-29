<template>
  <div>
    <form method="POST" action="/api/login">
      <input type="text" name="username" placeholder="username" />
      <input type="text" name="password" placeholder="password" />
      <input type="submit" />
    </form>
    <button @click="loginUser">ユーザ確認</button>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    loginUser: function() {
      this.$axios.asyncGet("/api/userTest")
      .then(result => {
        console.log(result)
      }).catch(err => {
        console.log(err)
      })
    },
    logout: function() {
      axios.post('/api/logout')
      .then(result => {
        console.log(result)
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style scoped></style>
