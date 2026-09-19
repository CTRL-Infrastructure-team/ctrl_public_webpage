<template>
  <div
    class="modal modal-overlay"
    role="dialog"
    aria-modal="true"
    @click.self="$emit('close')"
    @keydown.esc="$emit('close')"
  >
    <div class="modal-window">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ close: [] }>()
</script>

<style lang="scss" scoped>
$backcolor: #1e1e1e;
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  &-window {
    position: absolute;
    background: $backcolor;
    width: 90%;
    top: 20%;
    border-radius: 10px;
  }

  &-content {
    padding: 10px 20px;
  }
}
</style>
