<template>
    <div v-if="auth">
    <div class="form">
      <div class="page-title">
        <span>作品編集ページ</span>
      </div>
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
              <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            <p><img :src="data.image2"></p>
          </div>
        </div>
        <div class="file-input">
        ファイルをアップロード(zipファイル形式)
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
          <div>Twitter IDを掲載する</div>
          <el-checkbox v-model="checked">
            Twitter IDを掲載する
          </el-checkbox>
        </div>
        <div class="form-button">
          <el-button @click="doSendForm">内容を確認する</el-button>
        </div>
    </div>
  </div>
</template>
<script>
import { Input } from 'element-ui';
import axios from 'axios';
import img from "~/assets/img/img1.jpg";

export default {
  async asyncData({ app, params }) {
    let res = await app.$axios.asyncGet('/api/loginCheck'),
        befo = await app.$axios.asyncGet(`/api/pastWork/${params.updateWork}`);
    return { res, befo };
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
    this.title.value = this.befo.title;
    this.content.value = this.befo.content;
    if(this.befo.twitter_id !== "") {
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
          uploadFile = this.gameFile[0].raw,
          uploadTopImage = this.topImage[0].raw;

      this.otherImage.map(image => {
        formData.append('otherImage', image.raw);
      });

      formData.append('gameFile', uploadFile);
      formData.append('topImage', uploadTopImage);
      formData.append('title', this.title.value);
      formData.append('content', this.content.value);
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

.attention {
  margin: 10px 0px;
  font-size: calc(15px + 0.2vw);
}

.form{
  margin: 20px;
  &-button {
    margin: 15px 0px 15px 30px;
  }
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