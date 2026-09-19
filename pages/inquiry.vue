<template>
  <div class="form">
    <UiPageTitle title="お問い合わせ" />
    <el-card class="card">
      <form class="form" @submit.prevent="send">
        <div class="form-box">
          <p>
            <label for="email">返信先メールアドレス</label>
            <span>(必須)</span>
          </p>
          <p>問い合わせへの返答をお送りするための連絡先メールアドレスを正確に入力してください。</p>
          <el-input id="email" v-model="email" placeholder="メールアドレス" clearable />
          <span class="red">{{ emailAlert }}</span>
        </div>
        <div class="form-box">
          <p>
            <label for="inquiry">問い合わせ本文</label>
            <span>(必須)</span>
          </p>
          <p>問い合わせ内容を入力してください</p>
          <el-input id="inquiry" v-model="inquiry" type="textarea" placeholder="要件を入力" />
          <span class="red">{{ inquiryAlert }}</span>
        </div>
        <p v-if="success" class="ok">送信しました。</p>
        <p v-if="error" class="red">{{ error }}</p>
        <div class="form-button">
          <el-button native-type="submit" :loading="pending">内容を送信する</el-button>
        </div>
      </form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'お問い合わせ | ',
  meta: [{ hid: 'twitter:description', name: 'twitter:description', content: 'お問い合わせ' }]
})

const email = ref('')
const inquiry = ref('')
const emailAlert = ref('')
const inquiryAlert = ref('')
const success = ref(false)
const error = ref('')
const pending = ref(false)

async function send() {
  emailAlert.value = ''
  inquiryAlert.value = ''
  success.value = false
  error.value = ''
  pending.value = true
  try {
    await $fetch('/api/mail', {
      method: 'POST',
      body: { email: email.value, inquiry: inquiry.value }
    })
    email.value = ''
    inquiry.value = ''
    success.value = true
  } catch (err: any) {
    const data = err?.data?.data || err?.data
    if (Array.isArray(data?.error)) {
      for (const message of data.error) {
        if (message.param === 'email') emailAlert.value = message.msg
        if (message.param === 'inquiry') inquiryAlert.value = message.msg
      }
    } else {
      error.value = err?.statusMessage || '送信に失敗しました'
    }
  } finally {
    pending.value = false
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 10px 20px 0;
}
.form {
  width: calc(100% - (30px - 1rem) * 2);
  margin: 20px calc(30px - 1rem) 0;
  font-size: calc(10px + 0.625vw);
  &-box {
    margin-bottom: 1.8em;
  }
  p {
    label {
      font-size: 1.2em;
      font-weight: 500;
    }
    span {
      font-size: 0.75em;
      color: red;
    }
  }
}
.red {
  color: red;
}
.ok {
  color: #7dcea0;
}
</style>
