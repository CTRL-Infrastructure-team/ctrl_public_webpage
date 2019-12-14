<template>
  <div class="content">
    {{ title }}
    <div class="flex_images">
      <el-image
        :src="img"
        :preview-src-list="images"
      >
      </el-image>
    </div>
    <div class="flex_images">
      <el-image
        :src="img2"
        :preview-src-list="images"
      >
      </el-image>
    </div>
    <div class="flex_images">
      <el-image
        :src="img3"
        :preview-src-list="images"
      >
      </el-image>
    </div>

    
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

.el-image {
  width: 30%;
  max-height: 50%;
}
</style>