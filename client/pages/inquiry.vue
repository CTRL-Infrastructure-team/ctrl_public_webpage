<template>
  <div class="form">
    <pageTitle :title="title" />
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
          ></el-input>
          <span class="red">
            {{ email.alert }}
          </span>
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
          ></el-input>
          <span class="red">
            {{ inquiry.alert }}
          </span>
        </div>
        <div class="form-button">
          <el-button @click="doSendForm">内容を送信する</el-button>
        </div>
      </form>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import pageTitle from "~/components/ui/pageTitle.vue"

export default {
  components: {
    pageTitle
  },
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
      alert: "",
      title: "お問い合わせ"
    };
  },
  methods: {
    doSendForm() {
      const sendText = `${this.inquiry}\n From:${this.email}`;
      axios
        .post(
          "/api/mail",
          { inquiry: this.inquiry.value, email: this.email.value },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(val => {
          if ("error" in val.data) {
            val.data.error.forEach(message => {
              this.$set(this[message.param], "alert", message.msg);
            });
          } else {
            this.$set(this.email, "value", "");
            this.$set(this.inquiry, "value", "");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  margin: 10px 20px 0;
}
.form {
  width: calc(100% - (30px - 1rem) * 2);
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
.red {
  color: red;
}
</style>
