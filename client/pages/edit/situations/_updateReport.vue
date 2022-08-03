<template>
  <div v-if="auth">
    <pageTitle title="活動報告編集" />
    <div class="form">
      <div class="attention">
        こちらは仮の編集ページとなっております。タイトル、本文、TwitterIDの有無は引き継がれますが、画像とファイルは引き継がれません。
      </div>
      <div class="attention">
        そのため、更新する際は必ず画像及びゲームファイルを入力し直してください。
      </div>
      <div class="form-box">
        <div>
          <p>
            <label for="content">タイトル</label>
            <span>(必須)</span>
          </p>
        </div>
        <el-input 
          v-model="title.value" 
          placeholder="タイトルを入力"
          @change="doValidateTitle(title)"></el-input>
        {{ title.alert }}
      </div>
      <div class="form-box">
          <p>
            <label for="content">本文</label>
            <span>(必須)</span>
          </p>
          <p>内容を入力してください</p>
          <el-input
            placeholder="内容を入力"
            v-model="content.value"
            name="content"
            type="textarea"
            rows="7"
            cols="100"
            @change="doValidateContent(content)"
          ></el-input>
          {{content.alert}}
        </div>
          <p>
            <label for="content">画像</label>
            <span>(1枚必須)</span>
          </p>
        <el-upload
          class="upload-demo"
          drag
          action=""
          :on-change="dropImage"
          :file-list="fileList"
          list-type="picture"
          :auto-upload="false"
          :limit="1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
        </el-upload>
        {{ alert }}
        <div class="form-button">
          <el-button @click="doSendForm">編集を確定する</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import { Input } from 'element-ui';
import axios from 'axios';
import pageTitle from "~/components/ui/pageTitle";

export default {
  components: {
    pageTitle
  },
  async asyncData({ app, params }) {
    let res = await app.$axios.asyncGet('/api/loginCheck');
    let before = await app.$axios.asyncGet(`/api/situations/${params.updateReport}`)
    return { res, before }
  },
  data(){
    return{
      title: { value:'', alert:'' },
      content: { value:'', alert:'' },
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
    this.title.value = this.before.title;
    this.content.value = this.before.content.replace(/<br>/g,"\n");
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
      let formData = new FormData();
      
      if (this.fileList.length == 0 || !("raw" in this.fileList[0])) {
        this.alert = "画像ないよ！";
      } else {
        this.alert = "";
        const uploadImage = this.fileList[0].raw;
        formData.append("file", uploadImage);
      }

      if (this.title.alert != "" || this.content.alert != "" || this.alert != "") {
        return;
      }
      let uploadImage = this.fileList[0].raw

      formData.append('title', this.title.value)
      formData.append('content', this.content.value)

      axios.put(`/api/situations/${this.$route.params.updateReport}`,
        formData,
        { header: { 'Content-Type': 'multipart/form-data' } }
      ).then(result => {
        console.log(result)
      })
    },
    doValidateTitle(data,index){
      this.title.value ? '': this.title.alert = 'タイトルを入力してください'
   },
    doValidateContent(data,index){
      this.content.value ? '': this.content.alert = '本文を入力してください'

   },
  },
}
</script>
<style lang="scss" scoped>
.el-upload__tip{
  color: white;
}

.checkbox{
  margin-top: 1.5em;
  color: white;
}

.attention {
  margin: 10px 0px;
  font-size: calc(15px + 0.2vw);
}

.form {
  width: 90%;
  margin: 0 auto;
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
      font-size: 0.9em;
      font-weight: 300;
      vertical-align: center;
    }
  }
}

</style>