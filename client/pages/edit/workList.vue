<template>
  <div class="content">
    <div class="card-wrapper">
      <el-card>
        <div slot="header">
          <h3><nuxt-link :to="`/edit/`" :work="work">sample</nuxt-link></h3>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  // async asyncData({ app }) {
  //   let data = await app.$axios.asyncGet('/api/user/situations')
  //   return{ data }
  // }
}
</script>

<style lang="scss" scoped>

.content {
  width: 100%;
}

.card-wrapper {
  width: 90%;
  max-width: 800px;
  margin: 10px auto;
}

</style>