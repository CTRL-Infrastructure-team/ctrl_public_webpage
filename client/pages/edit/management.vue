<template>
  <div class="content">
    <div class="select-wrapper">
      <div>
        <nuxt-link :to="'/edit/reportList'">
          <el-button>
            活動報告管理
          </el-button>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link :to="'/edit/workList'">
          <el-button>
            作品管理
          </el-button>
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
</style>