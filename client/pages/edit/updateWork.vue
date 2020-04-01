<template>
    <div v-if="auth">
    <div class="form">
      <div class="page-title">
        <span>作品編集ページ</span>
      </div>
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
            <div>画像1：</div>
            <div>
            <el-upload
              class="upload-demo" drag
              action="" list-type="picture"
              :on-change="changeTopImage"
              :file-list="topImage"
              :auto-upload="false"
              :limit="1"
              @change="setImage1($event)"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            </div>
          </div>
          <div class="image2">
            <div>画像2：</div>
            <div>
            <el-upload
              class="upload-demo2" drag
              action="" list-type="picture"
              :on-change="changeOtherImage"
              :file-list="otherImage"
              :auto-upload="false"
              :limit="2"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            </div>
          </div>
        </div>
          <div class="file-input">
          ファイルをアップロード
              <el-upload
                class="upload-demo" drag
                action="" :limit="1"
                :on-change="changeGameFile"
                :file-list="gameFile"
                :auto-upload="false"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
              </el-upload>
          </div>
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
  async asyncData({ app }) {
    let res = await app.$axios.asyncGet('/api/loginCheck')
    return { res }
  },
  data() {
    return{
      data: { image1:'', image2:'' },
      title: { value:'', alert:'' },
      content: { value:'', alert:'' },
      topImage: [],
      otherImage: [],
      gameFile: [],
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
    changeTopImage(file, topImage) {
      this.topImage = topImage
    },
    changeOtherImage(file, otherImage) {
      this.otherImage = otherImage
    },
    changeGameFile(file, gameFile) {
      this.gameFile = gameFile
    },
    doSendForm(){
      // let formData = new FormData(),
      //     uploadFile = this.gameFile[0].raw,
      //     uploadTopImage = this.topImage[0].raw

      // this.otherImage.map(image => {
      //   formData.append('otherImage', image.raw)
      // })

      // formData.append('gameFile', uploadFile)
      // formData.append('topImage', uploadTopImage)
      // formData.append('title', this.title.value)
      // formData.append('content', this.content.value)

      // axios.post('/api/pastWork',
      //   formData,
      //   { header: { 'Content-Type': 'multipart/form-data' } }
      // ).then(result => {
      //   console.log(result)
      // })
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

.form-box {
  span{
      color: red;
  }
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
    flex-direction: column;
    & p{
      width: 100px;
      height: 100px;
    }
  }
  .image2{
    margin: 10px;
    display: flex;
    flex-direction: column;
  }
  .file-input {
    padding: 20px;
    margin: 10px;
  }

  .upload-demo {
    width: 100%;
    margin: 0 auto;
  }
  .upload-demo2 {
    width: 100%;
    margin: 0 auto;
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
    margin-left: 30px;
    font-family: "ヒラギノ角ゴシック";
    text-align: left;
    font-size: calc(17px + 0.625vw);
    font-weight: 500;
  }
}

</style>