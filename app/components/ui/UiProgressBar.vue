<template>
  <div class="ui-progress-bar">
    <div :style="successLineStyles" class="ui-progress-bar__success-line"></div>
  </div>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue';

const props = defineProps<{
  progress: number;
}>();

const successLineStyles = computed<StyleValue | undefined>(() => {
  if (!props.progress) {
    return undefined;
  }

  return { width: `${Math.min(Math.max(props.progress, 0), 100)}%` };
});
</script>

<style lang="scss" scoped>
.ui-progress-bar {
  position: relative;
  height: 8px;
  border-radius: $radius-l;
  background-color: $gray-200;
  overflow: hidden;

  &__success-line {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: $brand-500;
    border-radius: inherit;
    transition: width $default-transition;
    width: 8px;
  }
}
</style>
