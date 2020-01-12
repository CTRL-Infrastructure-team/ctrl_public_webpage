<template>
  <div>
    <div>
      <h1>問い合わせ欄</h1>
      問い合わせはこちらにお願いします。必要に応じて返信用のメールアドレスを入力してください。
    </div>
    <div class="control">
      <!-- <h3>連絡先</h3> -->
      <p style="font-size: 14px">次のフォームに必要事項をご記入ください。</p>
      <label for="mymail">
        メールアドレス：
        <span class="required">任意</span>
      </label>
      <!-- <input id="mymail" type="email" name="mymail" value="me@example.com" /> -->
      <input id="mymail" type="email" name="mymail" placeholder="me@example.com"/>
      
    </div>
    <div class="control">
      <button type="submit">送信</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.control {
  margin: 2em;
}
label {
  display: block;
  margin-bottom: 0.5em;
}

.required {
  margin-left: 0.3em; /*左の余白を0.3em(1文字の30%)に*/
  color: #f33;
  font-size: 0.9em;
  padding: 3px; /*要素内余白を3pxに*/
  background-color: #fee;
  font-weight: bold;
}
</style>