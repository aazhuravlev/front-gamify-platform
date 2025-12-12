<template>
  <div class="tasks-progress">
    <span class="tasks-progress__title">Выполнено {{ completedTasksQty }} из {{ tasksQty }}</span>

    <progress-bar :progress class="tasks-progress__line" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import ProgressBar from './ProgressBar.vue';

const props = withDefaults(
  defineProps<{
    completedTasksQty?: number;
    tasksQty: number;
  }>(),
  {
    completedTasksQty: 0,
  },
);

const progress = computed<number>(() => (props.completedTasksQty / props.tasksQty) * 100);
</script>

<style lang="scss" scoped>
.tasks-progress {
  padding: $space-s 30px;
  border-radius: $radius-s;
  background-color: $white;
  box-sizing: border-box;

  &__title {
    @include headline-h5;

    display: block;
    color: $black;
    text-align: center;
  }

  &__line {
    margin-top: 10px;
  }
}
</style>
