<template>
  <div class="content">
    <div v-if="items.length" class="card-list">
      <el-card v-for="item in items" :key="item.id" class="card-wrapper">
        <template #header>
          <div class="card-title">{{ item.title }}</div>
        </template>
        <div>{{ formatDate(item.created_at) }}</div>
        <div v-html="sanitize(item.content)"></div>
        <div class="card-button">
          <el-button>
            <NuxtLink :to="`${editBase}/${item.id}`" class="link">編集する</NuxtLink>
          </el-button>
          <el-button @click="remove(item.id)">削除する</el-button>
        </div>
      </el-card>
    </div>
    <div v-else class="no-content">{{ emptyText }}</div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/formatDate'
import { sanitize } from '~/utils/sanitize'

const props = defineProps<{
  apiList: string
  apiItem: string
  editBase: string
  emptyText: string
}>()

const { data, refresh } = await useFetch<{ id: string, title: string, content: string, created_at: string }[]>(props.apiList)
const items = computed(() => data.value || [])

async function remove(id: string) {
  await $fetch(`${props.apiItem}/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>

<style lang="scss" scoped>
.no-content {
  width: 90%;
  max-width: 1000px;
  margin: 50px auto;
  font-size: calc(20px + 0.3vw);
  text-align: center;
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
.link {
  text-decoration: none;
  color: inherit;
}
</style>
