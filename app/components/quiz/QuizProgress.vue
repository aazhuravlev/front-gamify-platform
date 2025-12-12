<template>
  <div class="quiz-progress">
    <h2 class="quiz-progress__title">Выполнено {{ completedTasksQty }} из {{ tasksQty }}</h2>

    <ui-progress-bar :progress class="quiz-progress__line" />
  </div>
</template>

<script lang="ts" setup>
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
.quiz-progress {
  padding: $space-s 30px;
  border-radius: $radius-s;
  background-color: $base-bg-color;
  box-sizing: border-box;

  &__title {
    @include headline-h5;

    color: $black;
    text-align: center;
  }

  &__line {
    margin-top: 10px;
  }
}
</style>
