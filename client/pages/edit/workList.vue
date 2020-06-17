<template>
  <div class="content" v-if="auth">
    <div class="card-wrapper" v-for="work in works" :key="work.id">
      <el-card>
        <div slot="header" class="card-title">
          {{ work.title }}
        </div>
        <div class="card-content">
          <div>{{ work.createdAt }}</div>
          <div>{{ work.content }}</div>
          <div class="card-button">
            <el-button>
              <nuxt-link :to="`/edit/works/${work._id}`">
                編集する
              </nuxt-link>
            </el-button>
            <el-button @click="deleteWork(work._id)">削除する</el-button>
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
    let works = await app.$axios.asyncGet('/api/user/pastWorks'),
        res = await app.$axios.asyncGet('/api/loginCheck')
    return{ works, res }
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
      axios.delete(`/api/pastWork/${id}`).then(result => {
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