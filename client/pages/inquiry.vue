<template>
  <div class="form">
    <div class="page-title">
      <span>問い合わせ</span>
    </div>

    <el-card class="card op03">
      <form action="post" class="form">
        <div class="form-email form-box">
          <p>
            <label for="email">返信先メールアドレス</label>
            <span>(必須)</span>
          </p>
          <p>
            問い合わせへの返答をお送りするための連絡先メールアドレスを正確に入力してください。
          </p>
          <el-input
            placeholder="メールアドレス"
            v-model="email.value"
            name="email"
            clearable
            @change="doValidateEmail(email)"
          ></el-input>
          {{ email.alert }}
        </div>
        <div class="form-inquiry form-box">
          <p>
            <label for="inquiry">問い合わせ本文</label>
            <span>(必須)</span>
          </p>
          <p>問い合わせ内容を入力してください</p>
          <el-input
            placeholder="要件を入力"
            v-model="inquiry.value"
            name="inquiry"
            type="textarea"
            @change="doValidateInquiry(inquiry)"
          ></el-input>
          {{ inquiry.alert }}
        </div>
        <div class="form-button">
          <el-button @click="doSendForm">内容を確認する</el-button>
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
      inquiry: {
        value: "",
        alert: ""
      },
      email: {
        value: "",
        alert: ""
      },

      alert: ""
    };
  },
  methods: {
    doSendForm() {
      const sendText = `${this.inquiry}\n From:${this.email}`;
      console.log("send");
      axios
        .post(
          "/api/mail",
          { text: this.inquiry.value, email: this.email.value },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(val => {
          console.log(val);
        })
        .catch(error => {
          console.log(error.message);
        });
    },
    doValidateEmail(data, index) {
      this.email.value ? "" : (this.email.alert = "値を入力してください");
    },
    doValidateInquiry(data, index) {
      this.inquiry.value ? "" : (this.inquiry.alert = "値を入力してください");
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
