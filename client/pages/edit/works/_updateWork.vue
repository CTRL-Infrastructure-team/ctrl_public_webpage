<template>
  <div v-if="auth">
    <pageTitle title="作品編集" />
    <div class="form">
      <div class="attention">
        こちらは仮の編集ページとなっております。タイトル、本文、TwitterIDの有無は引き継がれますが、画像とファイルは引き継がれません。
      </div>
      <div class="attention">
        そのため、更新する際は必ず画像及びゲームファイルを入力し直してください。
      </div>
      <div class="form-inquiry form-box">
        <p>
          <label for="content">タイトル</label>
          <span>(必須)</span>
        </p>
        <el-input 
          v-model="title.value"
          placeholder="タイトルを入力"></el-input>
      </div>

      <div class="form-inquiry form-box">
        <p>
          <label for="content">本文</label>
          <span>(必須)</span>
        </p>



        <el-input
          placeholder="内容を入力"
          v-model="content.value"
          name="content"
          type="textarea"
          rows="7"
          cols="100"
          @change="doValidateInquiry(content)"
        ></el-input>
      </div>
      <div class="images">
        <div class="image1">
          <p>
            <label for="content">トップ画像</label>
            <span>(1枚必須)</span>
          </p>
          <el-upload
            class="upload-demo"
            drag
            action=""
            list-type="picture"
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
        <div class="image2">
          <p>
            <label for="content">その他の画像</label>
            <span>(2枚必須)</span>
          </p>
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
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
          </el-upload>
          <p><img :src="data.image2"></p>
        </div>
      </div>
      <div class="file-input">
        <p>
          <label for="content">ファイルをアップロード</label>
          <span>(必須, zipファイル形式)</span>
        </p>
        <el-upload
          class="upload-demo"
          drag
          action=""
          list-type="text"
          :on-change="changeGameFile"
          :file-list="gameFile"
          :auto-upload="false"
          :limit="1"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">ここにファイルをドロップ <br><em>またはクリックしてアップロード</em></div>
          <div class="el-upload__tip" slot="tip">zip files with a size less than 100Mb</div>
        </el-upload>
        
      </div>
      <div class="form-button">
        Twitter IDを掲載する
      </div>
      <el-checkbox v-model="checked">Twitter IDを掲載する</el-checkbox>
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
    let res = await app.$axios.asyncGet('/api/loginCheck'),
        before = await app.$axios.asyncGet(`/api/pastWork/${params.updateWork}`);
    return { res, before };
  },
  data() {
    return{
      data: { image1:'', image2:'' },
      title: { value: '', alert:'' },
      content: { value:'', alert:'' },
      topImage: [],
      otherImage: [],
      gameFile: [],
      checked: false,
      alert: '',
      auth: false
    };
  },
  created() {
    if(!this.res.user) {
      this.$router.push('/');
    } else {
      this.auth = true;
    }
    this.title.value = this.before.title;
    this.content.value = this.before.content.replace(/<br>/g,"\n");
    if(this.before.twitter_id !== "") {
      this.checked = true;
    }
  },
  methods:{
    changeTopImage(file, topImage) {
      this.topImage = topImage;
      console.log(this.title.value);
    },
    changeOtherImage(file, otherImage) {
      this.otherImage = otherImage;
      console.log(this.otherImage);
    },
    changeGameFile(file, gameFile) {
      this.gameFile = gameFile;
      console.log(this.gameFile);
    },
    doSendForm(){
      let formData = new FormData(),
          uploadFile = '',
          uploadTopImage = '',
          uploadContent = this.content.value.replace(/\n/g,"<br>");

      if(this.gameFile[0] !== 'undefined') {
        uploadFile = this.gameFile[0].raw;
      }
      if(this.topImage[0] !== 'undefined') {
        uploadTopImage = this.topImage[0].raw;
      }

      if(this.otherImage !== 'undefined') {
        this.otherImage.map(image => {
          formData.append('otherImage', image.raw);
        });
      }

      formData.append('gameFile', uploadFile);
      formData.append('topImage', uploadTopImage);
      formData.append('title', this.title.value);
      formData.append('content', uploadContent);
      formData.append('twitter', this.checked);

      axios.put(`/api/pastWork/${this.$route.params.updateWork}`,
        formData,
        { header: { 'Content-Type': 'multipart/form-data' } }
      ).then(result => {
        this.$router.go({path: this.$router.currentRoute.path, force: true});
        console.log(result);
      })
    },
    doValidateTitle(data,index){
      this.title.value ? '': this.title.alert = '値を入力してください'
    },
    doValidateInquiry(data,index){
      this.content.value ? '': this.content.alert = '値を入力してください'
    }
  }
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