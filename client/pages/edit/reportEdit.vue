<template>
  <div v-if="auth">
    <div class="page-title">
      活動報告投稿ページ
    </div>
    <div class="form">
      <div class="form-inquiry form-box">
        <p>
          <label for="inquiry">タイトル</label>
          <span>(必須)</span>
        </p>
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
            rows="7"
            cols="100"
            @change="doValidateInquiry(inquiry)"
          ></el-input>
          {{inquiry.alert}}
        </div>
        <div class="form-button-file">
          画像:
        </div>
        <el-upload
          class="upload-demo"
          drag
          action=""
          :on-change="dropImage"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
          :limit="1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
        <!-- <div class="form-button">
          Twitter IDを掲載する
        </div> -->
        <el-checkbox v-model="checked" class="checkbox">Twitter IDを掲載する</el-checkbox>
        <div class="form-button">
          <el-button @click="doSendForm">内容を確認する</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import { Input } from 'element-ui'
import axios from 'axios'

export default {
  async asyncData({ redirect, app }) {
    let res = await app.$axios.asyncGet('/api/loginCheck')
    return { res }
  },
  data(){
    return{
      title: { value:'', alert:'' },
      inquiry: { value:'', alert:'' },
      fileList: [],
      checked: false,
      alert: '',
      auth: false
    }
  },
  created() {
    if(!this.res.user) {
      this.$router.push('/')
    } else {
      this.auth = true
    }
  },
  methods:{
    handleRemove(file,fileList){
      console.log(file, fileList);
    },
    handlePreview(file){
      console.log(file);
    },
    doSendFile(){
      
    },
    dropImage(file, fileList) {
      this.fileList = fileList
      console.log(this.fileList[0].raw)
      console.log("file upload!")
    },
    doSendForm(){
      let formData = new FormData(),
          uploadImage = this.fileList[0].raw

      formData.append('file', uploadImage)
      formData.append('title', this.title.value)
      formData.append('inquery', this.inquiry.value)

      axios.post('/api/situation',
        formData,
        { header: { 'Content-Type': 'multipart/form-data' } }
      ).then(result => {
        console.log(result)
      })
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
  margin-right: 30px;
  font-size: 20px;
}
.el-upload__tip{
  color: white;
}
.checkbox{
  margin-top: 1.5em;
  color: white;
}
.form {
  height: 800px;
  margin-top: 10px;
  margin-bottom: 50px;
  margin-left: 60px;
  margin-right: 10px;
  &-box {
    //width: 90%;
    //margin-left: 10px;
    margin-right: 50px;
    margin-bottom: 1.8em;
    p:nth-child(1) {
      margin-bottom: 0.5rem;
    }
    p:nth-child(2) {
      margin-bottom: 0.4rem;
    }
  }
  &-button{
    margin-top: 2.5em;
    &-file{
      width: 10em;
      margin-bottom: 1em;
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