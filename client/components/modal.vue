<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot />
        </div>
        <footer class="modal-footer">
          <div class="modal-botton_circle">
            <div @click="$emit('close')" class="modal-button_inner">Close</div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
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
    background: #fff;
    overflow: hidden;
    width: 90%;
    top: 20%;
  }

  &-content {
    padding: 10px 20px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
  &-button {
    &_circle {
      &:hover {
        background: #f0f0f0;
        border-radius: 50%;
      }
    }

    &_inner {
      background: rgba(10, 10, 10, 0.2);
      color: rgba(200, 200, 200, 0.7);
      cursor: pointer;
    }
  }
}

// オーバーレイのトランジション
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>