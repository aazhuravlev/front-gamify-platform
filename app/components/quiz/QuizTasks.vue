<template>
  <ui-container class="quiz-tasks">
    <h2 class="quiz-tasks__title">Выполните задания</h2>

    <p class="quiz-tasks__description">Выполнять задания можно в любом удобном вам порядке</p>

    <ul class="quiz-tasks__list">
      <li v-for="task in tasks" :key="task.entityId" class="quiz-tasks__item">
        <quiz-task-item :completed="task.isCompleted" :task />
      </li>
    </ul>
  </ui-container>
</template>

<script lang="ts" setup>
import type { ApiTaskResponse } from '#shared/api/quiz/types';

defineProps<{
  tasks: ApiTaskResponse[];
}>();
</script>

<style lang="scss" scoped>
.quiz-tasks {
  display: flex;
  flex-direction: column;
  padding: $space-m;

  &__title {
    @include headline-h3;

    color: $text-primary;
  }

  &__description {
    @include body-h3;

    margin-top: $space-2xs;
    color: $text-secondary;
  }

  &__list {
    display: flex;
    flex-direction: column;
    margin: $space-s 0 0;
    padding: 0;
    list-style: none;
    gap: $space-xs;
  }
}
</style>
