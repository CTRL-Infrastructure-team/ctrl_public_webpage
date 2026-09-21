<template>
  <nav class="breadcrumb-wrapper" aria-label="パンくず">
    <ol class="breadcrumb-list">
      <li v-for="data in pathDatas" :key="data.path" class="breadcrumb-path">
        <NuxtLink class="breadcrumb-link" :to="data.path">{{ data.name }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  pathDatas: { name: string, path: string }[]
}>()
</script>

<style lang="scss" scoped>
.breadcrumb {
  &-wrapper {
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
  }
  &-list {
    padding-left: 0;
    text-align: left;
  }
  &-path {
    display: inline-block;
    list-style: none;
  }
  &-path:not(:last-child)::after {
    display: inline-block;
    margin: 0 5px;
    content: ">";
  }
  &-link {
    text-decoration: none;
    color: $mainchar;
  }
}
</style>
