<template>
  <div :class="['quiz-task-item', { completed }]">
    <div class="quiz-task-item__status">
      <div class="quiz-task-item__status-mark">
        <icon class="quiz-task-item__status-icon" name="icon:check-mark" size="20" />
      </div>
      <div class="quiz-task-item__status-line"></div>
    </div>

    <nuxt-link class="quiz-task-item__link" external href="#">
      <div class="quiz-task-item__link-wrapper">
        <h3 class="quiz-task-item__title" v-html="task.title" />

        <p class="quiz-task-item__description" v-html="task.description" />
      </div>

      <icon class="quiz-task-item__link-icon" name="icon:arrow-right" />
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import type { ApiTaskResponse } from '#shared/api/quiz/types';

defineProps<{
  task: ApiTaskResponse;
  completed?: boolean;
}>();
</script>

<style lang="scss" scoped>
.quiz-task-item {
  display: flex;

  &__status {
    position: relative;
    margin-top: $space-xs;
  }

  &__status-mark {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    outline: 0.5px solid #dce0e4;
    box-sizing: border-box;
    border: 2px solid $white;
    background-color: $base-bg-color;
    transition: background-color $default-transition;
  }

  &__status-icon {
    color: $white;
  }

  &__status-line {
    z-index: 0;
    position: absolute;
    top: 30px;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: calc(100% - 30px);
    border-radius: $radius-2xs;
    background: linear-gradient(180deg, #dde0e4 0%, rgb(221, 224, 228, 0.1) 100%);
  }

  &.completed {
    .quiz-task-item__status-mark {
      background-color: $fg-brand-secondary;
    }
  }

  &__link {
    position: relative;
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    padding: $space-m $space-s;
    margin-left: $space-2xs;
    border-radius: $radius-m;
    background-color: $base-bg-color;
    text-decoration: none;
  }

  &__link-wrapper {
    width: calc(100% - 28px);
  }

  &__title {
    @include headline-h5;

    color: $black;
  }

  &__description {
    @include body-h4;

    margin-top: $space-2xs;
    color: $text-primary;
  }

  &__link-icon {
    position: absolute;
    top: 16px;
    right: 5px;
    width: 32px;
    height: 24px;
    margin-left: $space-2xs;
    color: $fg-secondary;
  }
}
</style>
