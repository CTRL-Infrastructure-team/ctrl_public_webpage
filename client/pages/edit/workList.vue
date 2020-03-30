<template>
  <div class="content">
    <div class="card-wrapper" v-for="work in works" :key="work.id">
      <el-card>
        <div slot="header">
          <h3>sample</h3>
        </div>
        <div class="card-content">
          <div>{{ work.createdAt }}</div>
          <div>{{ work.title }}</div>
          <div>{{ work.content }}</div>
          <div class="card-button">
            <el-button>編集する</el-button>
            <el-button @click="deleteWork">削除する</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import workCard from "~/components/workCard.vue";
import axios from "axios";

export default {
  async asyncData({ app }) {
    let works = await app.$axios.asyncGet('/api/user/pastWorks')
    return{ works }
  },
  methods: {
    deleteWork() {
      axios.delete('/api/pastWork/:pastWorkId').then(result => {
        console.log(result);
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

.card-button {
  margin-top: 20px;
}

</style>