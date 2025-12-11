<template>
  <header class="core-header">
    <div class="core-header__container">
      <button class="core-header__back-btn" @click="backBtnClick">
        <icon class="core-header__back-icon" name="icon:arrow-back" size="12" />
      </button>
    </div>
  </header>
</template>

<script lang="ts" setup>
function backBtnClick(): void {
  window.history.back();
}
</script>

<style lang="scss" scoped>
.core-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw;
  z-index: 10;
  padding-top: $header-padding-top;

  &__container {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: $space-2xs 14px;
    box-sizing: border-box;
  }

  &__back-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  &__back-icon {
    color: $fg-primary;
  }
}
</style>
