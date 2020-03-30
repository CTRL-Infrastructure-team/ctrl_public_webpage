<template>
  <div class="form">
    <div class="page-title">
      <span>ログインページ</span>
    </div>

    <el-card class="login-card">
      <form method="POST" action="/api/login" class="form">
        <div class="form-loginId form-box">
          <p>
            <label for="id">ログインID</label>
            <span>(必須)</span>
          </p>
          <el-input
            placeholder="ID"
            v-model="username.value"
            name="username"
            clearable
            @change="doValidateUser(username)"
          ></el-input>
          {{ username.alert }}
        </div>
        <div class="form-password form-box">
          <p>
            <label for="password">パスワード</label>
            <span>(必須)</span>
          </p>
          <el-input
            placeholder="パスワード"
            v-model="password.value"
            name="password"
            type="password"
            @change="doValidatePassword(password)"
          ></el-input>
          {{ password.alert }}
        </div>
        <div class="form-button">
          <el-button native-type="submit">ログイン</el-button>
        </div>
      </form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      username: { value: "", alert: "" },
      password: { value: "", alert: "" },
      alert: ""
    };
  },
  methods: {
    doValidateUser(data, index) {
      this.username.value ? "" : (this.username.alert = "値を入力してください");
    },
    doValidatePassword(data, index) {
      this.password.value ? "" : (this.password.alert = "値を入力してください");
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  margin: 10px 20px 0;
}
.form {
  margin: 0 calc(30px - 1rem);
  font-family: "ヒラギノ角ゴシック";
  margin-top: 20px;
  font-size: calc(10px + 0.625vw);
  &-box {
    margin-bottom: 1.8em;
    p:nth-child(1) {
      margin-bottom: 0.5rem;
    }
    p:nth-child(2) {
      margin-bottom: 0.4rem;
    }
  }
  p {
    label {
      font-size: 1.2em;
      font-weight: 500;
    }
    span {
      font-size: 0.75em;
      font-weight: 300;
      color: red;
      vertical-align: center;
    }
  }
}
.page-title {
  height: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
  span {
    &::before {
      content: "";
      position: absolute;
      top: 15px;
      left: -20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translateY(-50%);
      background: #f0f0f0;
    }
    position: relative;
    margin-left: 50px;
    font-family: "ヒラギノ角ゴシック";
    text-align: left;
    font-size: calc(17px + 0.625vw);
    font-weight: 500;
  }
}
</style>
