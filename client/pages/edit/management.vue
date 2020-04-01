<template>
  <div class="content" v-if="auth">
    <div class="page-title">
      <span>管理画面</span>
    </div>
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
        <el-button>
          ログアウト
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}

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

.page-title {
  height: 30px;
  // margin-top: 30px;
  // margin-bottom: 10px;
  margin: 30px 20px 10px 20px;
  span {
    &::before {
      content: "";
      position: absolute;
      top: 55%;
      left: -20px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      transform: translateY(-50%);
      background: #f0f0f0;
    }
    position: relative;
    margin-left: 50px;
    text-align: left;
    font-size: calc(15px + 0.8vw);
    font-weight: 500;
  }
}
</style>