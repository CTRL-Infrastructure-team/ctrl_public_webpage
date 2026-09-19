<template>
  <div class="form">
    <div class="form-box">
      <p>
        <label :for="`${prefix}-title`">タイトル</label>
        <span>(必須)</span>
      </p>
      <div class="alert">{{ titleAlert }}</div>
      <el-input :id="`${prefix}-title`" v-model="title" placeholder="タイトルを入力" />
    </div>
    <div class="form-box">
      <p>
        <label :for="`${prefix}-content`">本文</label>
        <span>(必須)</span>
      </p>
      <div class="alert">{{ contentAlert }}</div>
      <el-input :id="`${prefix}-content`" v-model="content" type="textarea" :rows="7" placeholder="内容を入力" />
    </div>
    <div class="form-box">
      <p>
        <label>{{ imageLabel }}</label>
        <span>{{ requiredImage ? '(1枚必須)' : '(未選択なら既存を維持)' }}</span>
      </p>
      <div class="alert">{{ imageAlert }}</div>
      <p v-if="existingImage" class="existing">現在の画像は保持されます。差し替える場合のみ選択してください。</p>
      <el-upload
        drag
        action="#"
        list-type="picture"
        :auto-upload="false"
        :limit="1"
        :on-change="onImage"
        :on-remove="() => (imageFile = null)"
      >
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">ここにファイルをドロップ <em>またはクリックしてアップロード</em></div>
        <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
      </el-upload>
    </div>
    <div class="form-button">
      <el-button :loading="pending" @click="submit">{{ submitLabel }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

const props = withDefaults(defineProps<{
  prefix?: string
  initialTitle?: string
  initialContent?: string
  existingImage?: boolean
  requiredImage?: boolean
  submitLabel?: string
  imageLabel?: string
}>(), {
  prefix: 'report',
  initialTitle: '',
  initialContent: '',
  existingImage: false,
  requiredImage: true,
  submitLabel: '投稿する',
  imageLabel: '画像'
})

const emit = defineEmits<{
  submit: [payload: { title: string, content: string, file: File | null }]
}>()

const title = ref(props.initialTitle)
const content = ref(props.initialContent)
const titleAlert = ref('')
const contentAlert = ref('')
const imageAlert = ref('')
const imageFile = ref<File | null>(null)
const pending = ref(false)

function onImage(_file: UploadFile, fileList: UploadFile[]) {
  const raw = fileList[0]?.raw
  imageFile.value = raw || null
}

async function submit() {
  titleAlert.value = title.value ? '' : 'タイトルを入力してください'
  contentAlert.value = content.value ? '' : '本文を入力してください'
  imageAlert.value = ''
  if (props.requiredImage && !imageFile.value) {
    imageAlert.value = '画像を1枚指定してください'
  }
  if (titleAlert.value || contentAlert.value || imageAlert.value) return
  pending.value = true
  try {
    emit('submit', { title: title.value, content: content.value, file: imageFile.value })
  } finally {
    pending.value = false
  }
}
</script>

<style lang="scss" scoped>
.el-upload__tip {
  color: white;
}
.form {
  width: 90%;
  margin: 10px auto 50px;
  &-box {
    margin-bottom: 1.8em;
  }
}
.alert,
.existing {
  margin: 0.3rem 0;
}
.alert {
  color: rgb(230, 30, 30);
}
</style>
