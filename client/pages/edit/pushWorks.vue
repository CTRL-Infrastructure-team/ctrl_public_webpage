<template>
    <div>
    <h1>
      成果物投稿ページ
    </h1>
    <div class="form">
      <div class="form-inquiry form-box">
        <p>
          <label for="content">タイトル</label>
          <span>(必須)</span>
        </p>
        <br>
        <el-input v-model="title.value" placeholder="タイトルを入力"></el-input>
      </div>
      
      <div class="form-inquiry form-box">
          <p>
            <label for="content">本文</label>
            <span>(必須)</span>
          </p>
          <p>成果物の内容を入力してください</p>
          <el-input
            placeholder="内容を入力"
            v-model="content.value"
            name="content"
            type="textarea"
            rows="7"
            cols="100"
            @change="doValidateInquiry(content)"
          ></el-input>
          {{content.alert}}
        </div>
        <div class="images">
          <div class="image1">
            <div>
            画像1：
            </div>
            <el-upload
              class="upload-demo"
              drag
              action="localhost:3000"
              :on-preview="handlePreview1"
              :on-remove="handleRemove1"
              :file-list="fileList1"
              :auto-upload="false"
              :list-type="picture"
              :limit="1"
              @change="setImage1($event)"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <p>
              <img :src="data.image1">
            </p>
          </div>
          <div class="image2">
            <div>
            画像2：
            </div>
            <el-upload
              class="upload-demo2"
              drag
              action="localhost:3000"
              :on-preview="handlePreview2"
              :on-remove="handleRemove2"
              :file-list="fileList2"
              :auto-upload="false"
              :list-type="picture"
              :limit="1"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <p>
              <img :src="data.image2">
            </p>
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
     data() {
       return{
      data:{
        image1:'',
        image2:'',
      },
      title:{
        value:'',
        alert:'',
      },
      content:{
        value:'',
        alert:''
      },
      fileList1:[],
      fileList2:[],
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
    handleRemove1(file,fileList1){
      console.log(file, fileList);
    },
    handlePreview1(file){
      console.log(file);
    },
    handleRemove2(file,fileList2){
      console.log(file, fileList);
    },
    handlePreview2(file){
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
      this.content.value ? '': this.content.alert = '値を入力してください'
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
@include mq{
.images{
    
    display:flex;
    flex-direction: column;
    padding: 20px;
}
.image1{
    margin: 10px;
    display: flex;
    flex-direction: row;
    & p{
      width: 100px;
      height: 100px;
    }
}
.image2{
    margin: 10px;
    display: flex;
    flex-direction: row;
}
}
</style>