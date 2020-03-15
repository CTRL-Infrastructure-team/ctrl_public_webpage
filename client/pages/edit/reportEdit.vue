<template>
  <div>
    <div class="page-title">
      活動報告の編集ページ
    </div>
    <div class="form">
      <div class="form-inquiry form-box">
        <p>
          <label for="inquiry">タイトル</label>
          <span>(必須)</span>
        </p>
        <!-- <p style="white-space: pre-line">{{message}}</p> -->
        <br>
        <el-input v-model="title.value" placeholder="タイトルを入力"></el-input>
      </div>
      
      <div class="form-inquiry form-box">
          <p>
            <label for="inquiry">本文</label>
            <span>(必須)</span>
          </p>
          <p>内容を入力してください</p>
          <el-input
            placeholder="内容を入力"
            v-model="inquiry.value"
            name="inquiry"
            type="textarea"
            @change="doValidateInquiry(inquiry)"
          ></el-input>
          {{inquiry.alert}}
        </div>
        <div>
          画像:
        </div>
        <div class="form-button-file">
          <el-button>ファイルを選択</el-button>
        </div>
        <div class="form-button">
          <el-button @clicl="doSendForm">内容を確認する</el-button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      title:{
        value:'',
        alert:'',
      },
      inquiry:{
        value:'',
        alert:''
      },

      alert:''
    }
  },
  methods:{
    doSendForm(){

    },
    doValidateTitle(data,index){
      this.title.value ? '': this.title.alert = '値を入力してください'
   },
    doValidateInquiry(data,index){
      this.inquiry.value ? '': this.inquiry.alert = '値を入力してください'

   },
  },
}
</script>
<style lang="scss" scoped>
.page-title {
  height: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 30px;
  font-size: 20px;
}
.form {
  height: 450px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 50px;
  &-box {
    margin-bottom: 1.8em;
    p:nth-child(1) {
      margin-bottom: 0.5rem;
    }
    p:nth-child(2) {
      margin-bottom: 0.4rem;
    }
  }
  &-button{
    &-file{
      width: 5em;
      margin-bottom: 3em;
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

  
</style>