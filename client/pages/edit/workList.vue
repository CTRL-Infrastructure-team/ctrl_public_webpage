<template>
  <div class="content" v-if="auth">
    <div class="card-list" v-if="zeroCheck">
      <div 
        class="card-wrapper" 
        v-for="work in works" 
        :key="work.id"
      >
        <el-card>
          <div slot="header" class="card-title">
            {{ work.title }}
          </div>
          <div class="card-content">
            <div>{{ work.createdAt }}</div>
            <div v-html="$sanitize(work.content)"></div>
            <div class="card-button">
              <el-button>
                <nuxt-link :to="`/edit/works/${work._id}`" style="text-decoration: none;color:inherit;">
                  編集する
                </nuxt-link>
              </el-button>
              <el-button @click="deleteWork(work._id)">削除する</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- /.card-list -->
    <div class="no-content" v-else>
      作品がありません。
    </div>
    <!-- /.no-content -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ app }) {
    let works = await app.$axios.asyncGet('/api/user/pastWorks'),
        res = await app.$axios.asyncGet('/api/loginCheck'),
        zeroCheck = works.length !== 0 ? true : false;
    return { works, res, zeroCheck };
  },
  data() {
    return { auth: false };
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
}

.no-content {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  font-size: calc(20px + 0.3vw);
  text-align: center;
}

.card-list {
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