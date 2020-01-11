<template>
  <div class="content">
    {{ title }}
    <el-row>
      <el-col span="14">
        <div class="flex_images_top">
          <el-image
            :src="img"
            :preview-src-list="images"
          >
          </el-image>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="7">
        <div class="flex_images">
          <el-image
            :src="img2"
            :preview-src-list="images"
          >
          </el-image>
        </div>
      </el-col>
      <el-col span="7">
        <div class="flex_images">
          <el-image
            :src="img3"
            :preview-src-list="images"
          >
          </el-image>
        </div>
      </el-col>
    </el-row>

    
  </div>
</template>
<script>
import img from '~/assets/img/img4.jpg'
import img2 from '~/assets/img/img2.jpg'
import img3 from '~/assets/img/img1.jpg'

export default {
  data() {
    return {
      title: '過去作品',
      img: img,
      img2: img2,
      img3: img3,
      images: [
        img,
        img2,
        img3
      ]
    }
  }
};
</script>
<style lang="scss" scoped>

.content {
  margin: 20px 20px;
}

.flex_images_top {
  width: 95%;
  max-height: 50%;
}
.flex_images {
  margin: 20px 0px;
  width: 90%;
  max-height: 50%;
}
</style>