<template>
  <div class="content" v-if="auth">
    <div class="card-wrapper" v-for="situation in situations" :key="situation.id">
      <el-card>
        <div slot="header" class="card-title">
          {{ situation.title }}
        </div>
        <div class="card-content">
          <div>{{ situation.createdAt }}</div>
          <div>{{ situation.content }}</div>
          <div class="card-button">
            <el-button>編集する</el-button>
            <el-button @click="deleteWork(situation._id)">削除する</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ app }) {
    let situations = await app.$axios.asyncGet('/api/user/situations'),
        res = await app.$axios.asyncGet('/api/loginCheck')
    return{ situations, res }
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
    deleteWork(id) {
      axios.delete(`/api/situations/${id}`).then(result => {
        console.log(result);
        this.$router.go({path: this.$router.currentRoute.path, force: true})
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.content {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.card-wrapper {
  width: 90%;
  max-width: 800px;
  margin: 10px auto;
}

.card-title {
  font-size: calc(15px + 0.5vw);
}

.card-button {
  margin-top: 20px;
}

</style>