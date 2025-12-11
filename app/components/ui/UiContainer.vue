<template>
  <section :class="['ui-container', borderRadius]">
    <slot name="default" />
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  borderRadius?: 'top' | 'bottom';
}>();
</script>

<style lang="scss" scoped>
.ui-container {
  border-radius: $radius-l;
  background-color: $white;

  &.top {
    border-radius: $radius-l $radius-l $radius-none $radius-none;
  }

  &.bottom {
    border-radius: $radius-none $radius-none $radius-l $radius-l;
  }
}
</style>
