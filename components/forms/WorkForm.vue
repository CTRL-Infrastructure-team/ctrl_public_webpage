<template>
  <div class="form">
    <div class="form-box">
      <p>
        <label for="work-title">タイトル</label>
        <span>(必須)</span>
      </p>
      <div class="alert">{{ titleAlert }}</div>
      <el-input id="work-title" v-model="title" placeholder="タイトルを入力" />
    </div>
    <div class="form-box">
      <p>
        <label for="work-content">本文</label>
        <span>(必須)</span>
      </p>
      <div class="alert">{{ contentAlert }}</div>
      <el-input id="work-content" v-model="content" type="textarea" :rows="7" placeholder="内容を入力" />
    </div>
    <div class="form-box">
      <p>
        <label>トップ画像</label>
        <span>{{ requiredFiles ? '(1枚必須)' : '(未選択なら既存を維持)' }}</span>
      </p>
      <div class="alert">{{ topAlert }}</div>
      <el-upload drag action="#" list-type="picture" :auto-upload="false" :limit="1" :on-change="onTop">
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">ここにファイルをドロップ <em>またはクリックしてアップロード</em></div>
      </el-upload>
    </div>
    <div class="form-box">
      <p>
        <label>その他の画像</label>
        <span>{{ requiredFiles ? '(2枚必須)' : '(未選択なら既存を維持)' }}</span>
      </p>
      <div class="alert">{{ otherAlert }}</div>
      <el-upload drag action="#" list-type="picture" :auto-upload="false" :limit="2" multiple :on-change="onOther">
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">ここにファイルをドロップ <em>またはクリックしてアップロード</em></div>
      </el-upload>
    </div>
    <div class="form-box">
      <p>
        <label>ファイルをアップロード</label>
        <span>{{ requiredFiles ? '(必須, zip)' : '(未選択なら既存を維持)' }}</span>
      </p>
      <div class="alert">{{ gameAlert }}</div>
      <el-upload drag action="#" :auto-upload="false" :limit="1" :on-change="onGame">
        <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
        <div class="el-upload__text">ここにファイルをドロップ <em>またはクリックしてアップロード</em></div>
      </el-upload>
    </div>
    <el-checkbox v-model="twitter">Twitter IDを掲載する</el-checkbox>
    <div class="form-button">
      <el-button :loading="pending" @click="submit">{{ submitLabel }}</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

const props = withDefaults(defineProps<{
  initialTitle?: string
  initialContent?: string
  initialTwitter?: boolean
  requiredFiles?: boolean
  submitLabel?: string
}>(), {
  initialTitle: '',
  initialContent: '',
  initialTwitter: false,
  requiredFiles: true,
  submitLabel: '投稿する'
})

const emit = defineEmits<{
  submit: [payload: {
    title: string
    content: string
    twitter: boolean
    topImage: File | null
    otherImage: File[]
    gameFile: File | null
  }]
}>()

const title = ref(props.initialTitle)
const content = ref(props.initialContent)
const twitter = ref(props.initialTwitter)
const titleAlert = ref('')
const contentAlert = ref('')
const topAlert = ref('')
const otherAlert = ref('')
const gameAlert = ref('')
const topImage = ref<File | null>(null)
const otherImage = ref<File[]>([])
const gameFile = ref<File | null>(null)
const pending = ref(false)

function onTop(_file: UploadFile, list: UploadFile[]) {
  topImage.value = list[0]?.raw || null
}
function onOther(_file: UploadFile, list: UploadFile[]) {
  otherImage.value = list.map(f => f.raw).filter(Boolean) as File[]
}
function onGame(_file: UploadFile, list: UploadFile[]) {
  gameFile.value = list[0]?.raw || null
}

async function submit() {
  titleAlert.value = title.value ? '' : 'タイトルを入力してください'
  contentAlert.value = content.value ? '' : '本文を入力してください'
  topAlert.value = ''
  otherAlert.value = ''
  gameAlert.value = ''
  if (props.requiredFiles) {
    if (!topImage.value) topAlert.value = '画像を1枚指定してください'
    if (otherImage.value.length < 2) otherAlert.value = '画像を2枚指定してください'
    if (!gameFile.value) gameAlert.value = 'zipファイルを1つ指定してください'
  }
  if (titleAlert.value || contentAlert.value || topAlert.value || otherAlert.value || gameAlert.value) return
  pending.value = true
  try {
    emit('submit', {
      title: title.value,
      content: content.value,
      twitter: twitter.value,
      topImage: topImage.value,
      otherImage: otherImage.value,
      gameFile: gameFile.value
    })
  } finally {
    pending.value = false
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 90%;
  margin: 10px auto 50px;
  &-box {
    margin-bottom: 1.8em;
  }
}
.alert {
  color: rgb(230, 30, 30);
}
</style>
