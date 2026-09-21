<template>
  <div class="modal-flex-text">
    <NuxtLink :to="`/currentSituations/${article.id}`">
      <div class="modal-flex-text--title">{{ article.title }}</div>
    </NuxtLink>
    <div class="modal-flex-text--content">
      <div>{{ `日付 : ${timestamp}` }}</div>
      <div class="sanitize-text" v-html="sanitized"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { sanitize } from '~/utils/sanitize'

const props = defineProps<{
  article: { id: string, title: string, content: string, created_at: string }
}>()

const timestamp = computed(() => formatDate(props.article.created_at))
const sanitized = computed(() => {
  const text = props.article.content || ''
  const clipped = text.length >= 100 ? `${text.substring(0, 80)} [...]` : text
  return sanitize(clipped)
})
</script>

<style lang="scss" scoped>
$modalBorder: #8193a9;
.modal-flex-text {
  width: 100%;
  padding-bottom: 10px;
  &--title {
    width: 100%;
    font-size: calc(15px + 0.8vw);
    font-weight: bolder;
    margin-bottom: 10px;
    margin-top: 10px;
    padding-left: 3px;
    border-bottom: 1px solid $modalBorder;
    border-left: 4px solid $modalBorder;
  }
  &--content {
    padding-left: 10px;
  }
}

.sanitize-text {
  margin-top: 10px;
}

a {
  text-decoration: none;
  color: $mainchar;
}
</style>
