<template>
    <div>
    <h1>
      成果物投稿ページ
    </h1>
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
        <div class="images">
        <div class="image1">
          画像1:
        <el-upload
          class="upload-demo"
          drag
          action="localhost:3000"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
        </div>
        <div class="image2">
        画像2:
        <el-upload
          class="upload-demo"
          drag
          action="localhost:3000"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
        </div>
        </div>
        <div fileUpload>
        ファイルをアップロード
        <el-upload
          class="upload-demo"
          drag
          action="localhost:3000"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :limit="1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
        </el-upload>
        </div>
        <div class="form-button">
          Twitter IDを掲載する
        </div>
        <el-checkbox v-model="checked">Twitter IDを掲載する</el-checkbox>
        <div class="form-button">
          <el-button @clicl="doSendForm">内容を確認する</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import { Input } from 'element-ui'
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
      fileList:[],
      checked: false,
      alert:''
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
    doSendForm(){
    },
    doValidateTitle(data,index){
      this.title.value ? '': this.title.alert = '値を入力してください'
   },
    doValidateInquiry(data,index){
      this.inquiry.value ? '': this.inquiry.alert = '値を入力してください'
   },
  }
}
</script>
<style lang="scss" scoped>

.form{
    margin: 20px;
}

span{
    color: red;

}
//画像アップロード
.images{
    display:flex;
    flex-direction: rows;
    justify-content: space-around;
    padding: 20px;
}
.image1{
    margin: 10px;
}
.image2{
    margin: 10px;
}
</style>