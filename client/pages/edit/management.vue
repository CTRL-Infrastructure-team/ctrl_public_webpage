<template>
  <div v-if="auth">
    <pageTitle title="管理画面" />
    <div class="select-wrapper">
      <div>
        <nuxt-link :to="'/edit/createReport'">
          <el-button>活動報告投稿</el-button>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link :to="'/edit/createWork'">
          <el-button>作品投稿</el-button>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link :to="'/edit/reportList'">
          <el-button>活動報告管理</el-button>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link :to="'/edit/workList'">
          <el-button>作品管理</el-button>
        </nuxt-link>
      </div>
      <div>
        <el-button @click="logout()">
          ログアウト
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
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
    return { auth: false }
  },
  created() {
    if(!this.res.user) {
      this.$router.push('/')
    } else {
      this.auth = true
    }
  },
  methods: {
    logout() {
      axios.post('/api/logout')
        .then(result => {
          console.log(result)
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-wrapper {
  width: 90%;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-button {
    width: 200px;
    height: 70px;
    margin: 20px 0px;
  }
}
</style>