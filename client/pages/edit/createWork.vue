<template>
  <div v-if="auth">
    <h1>成果物投稿ページ</h1>
    <div class="form">
      <div class="form-inquiry form-box">
        <div>
          <label for="content">タイトル</label>
          <span>(必須)</span>
        </div>
        <el-input v-model="title.value" placeholder="タイトルを入力"></el-input>
      </div>
      <div class="form-inquiry form-box">
        <p>
          <label class="label-text" for="content">本文</label>
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
          <div class="label-text">トップ画像（1枚）：</div>
          <el-upload
            class="upload-demo"
            drag
            action=""
            :on-change="changeTopImage"
            :file-list="topImage"
            :auto-upload="false"
            list-type="picture"
            :limit="1"
            @change="setImage1($event)"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
            <div class="el-upload__tip" slot="tip">jpg files with a size less than 500kb</div>
          </el-upload>
          <p><img :src="data.image1"></p>
        </div>
        <div class="image2">
          <div>その他画像（2枚）：</div>
          <el-upload
            class="upload-demo2"
            drag
            action=""
            :on-change="changeOtherImage"
            :file-list="otherImage"
            :auto-upload="false"
            list-type="picture"
            :limit="2"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
            <div class="el-upload__tip" slot="tip">jpg files with a size less than 500kb</div>
          </el-upload>
          <p><img :src="data.image2"></p>
        </div>
      </div>
      <div fileUpload>
        ファイルをアップロード(zipファイル形式)
        <el-upload
          class="upload-demo"
          drag
          action=""
          :on-change="changeGameFile"
          :file-list="gameFile"
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
        <el-button @click="doSendForm">投稿する</el-button>
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
      let formData = new FormData(),
          uploadFile = this.gameFile[0].raw,
          uploadTopImage = this.topImage[0].raw

      this.otherImage.map(image => {
        formData.append('otherImage', image.raw)
      })

      formData.append('gameFile', uploadFile)
      formData.append('topImage', uploadTopImage)
      formData.append('title', this.title.value)
      formData.append('content', this.content.value)
      formData.append('twitter', this.checked)

      axios.post('/api/pastWork',
        formData,
        { header: { 'Content-Type': 'multipart/form-data' } }
      ).then(result => {
        this.$router.go({path: this.$router.currentRoute.path, force: true})
        console.log(result)
      })
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

.label-text {
  margin-top: 20px;
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
    flex-direction: column;
}
.image2{
    margin: 10px;
    display: flex;
    flex-direction: column;
}
}
</style>