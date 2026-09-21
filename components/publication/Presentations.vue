<template>
  <div>
    <PublicationThePresentation
      v-for="data in presentations"
      :key="data.id"
      :name="data.contributor"
      :url="data.slide_url"
      class="border"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  presentations: { id: string, contributor: string, slide_url: string }[]
}>()
</script>

<style lang="scss" scoped>
.border {
  border-top: 2px solid $mainchar;
}
</style>
