<template>
  <div v-if="auth">
    <pageTitle title="活動報告投稿" />
    <div class="form">
      <div class="form-content form-box">
        <p>
          <label for="content">タイトル</label>
          <span>(必須)</span>
        </p>
        <div class="alert">
          {{ title.alert }}
        </div>
        <el-input v-model="title.value" placeholder="タイトルを入力"></el-input>
      </div>

      <div class="form-content form-box">
        <p>
          <label for="content">本文</label>
          <span>(必須)</span>
        </p>
        <div class="alert">
          {{ content.alert }}
        </div>
        <el-input
          placeholder="内容を入力"
          v-model="content.value"
          name="content"
          type="textarea"
          rows="7"
          cols="100"
        ></el-input>
      </div>
      <div class="form-button-file">
        画像:
      </div>
      <div class="alert">
        {{ alert }}
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
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          ここにファイルをドロップ <br /><em>またはクリックしてアップロード</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          jpg/png files with a size less than 500kb
        </div>
      </el-upload>
      <div class="form-button">
        <el-button @click="doSendForm">投稿する</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Input } from "element-ui";
import axios from "axios";
import pageTitle from "~/components/ui/pageTitle";

export default {
  components: {
    pageTitle
  },
  async asyncData({ redirect, app }) {
    let res = await app.$axios.asyncGet('/api/loginCheck')
    return { res }
  },
  data() {
    return {
      title: { value: "", alert: "" },
      content: { value: "", alert: "" },
      fileList: [],
      alert: "",
      auth: false
    };
  },
  created() {
    if(!this.res.user) {
      this.$router.push('/')
    } else {
      this.auth = true
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    doSendFile() {},
    dropImage(file, fileList) {
      this.fileList = fileList;
    },
    doSendForm() {
      let formData = new FormData();

      if (this.title.value === "") {
        this.title.alert = "値を入力してください";
      } else {
        this.title.alert = "";
        formData.append("title", this.title.value);
      }
      
      if (this.content.value === "") {
        this.content.alert = "値を入力してください";
      } else {
        this.content.alert = "";
        formData.append("content", this.content.value);
      }

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

      axios
        .post("/api/situation", formData, {
          header: { "Content-Type": "multipart/form-data" }
        })
        .then(result => {
          this.$router.go({path: this.$router.currentRoute.path, force: true});
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>
<style lang="scss" scoped>
.el-upload__tip {
  color: white;
}

.checkbox {
  margin-top: 1.5em;
  color: white;
}

.form {
  width: 90%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 50px;
  &-box {
    margin-bottom: 1.8em;
    p:nth-child(1) {
      margin-bottom: 0.5rem;
    }
    p:nth-child(2) {
      margin-bottom: 0.4rem;
    }
  }
  &-button {
    margin-top: 1em;
    &-file {
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
.alert {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  color: rgb(230, 30, 30);
}
</style>
