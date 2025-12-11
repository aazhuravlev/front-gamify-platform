<template>
  <component :is="href ? 'a' : 'button'" :class="['ui-button', { disabled }]" :disabled :href>
    <slot name="default" />
  </component>
</template>

<script lang="ts" setup>
defineProps<{
  href?: string;
  disabled?: true;
}>();
</script>

<style lang="scss" scoped>
.ui-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  padding: $space-s $space-m;
  border-radius: $radius-s;
  background-color: $brand-500;
  box-sizing: border-box;
  text-decoration: none;
  color: $white;
  transition:
    background-color $default-transition,
    color $default-transition;
  user-select: none;

  @include headline-h5;

  &.disabled {
    background-color: $base-bg-color;
    color: $text-disabled;
    pointer-events: none;
  }
}
</style>
