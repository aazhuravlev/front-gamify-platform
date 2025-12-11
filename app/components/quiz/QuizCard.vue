<template>
  <div class="quiz-card">
    <div class="quiz-card__row">
      <span class="quiz-card__title">Заголовок:</span>
      <span class="quiz-card__value">{{ quiz.title }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__title">Описание:</span>
      <span class="quiz-card__value">{{ quiz.description }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__title">Короткое описание:</span>
      <span class="quiz-card__value">{{ quiz.shortDescription }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__title">Градиент:</span>
      <span class="quiz-card__value">{{ quiz.bgColor }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiQuizResponse } from '#shared/api/quiz/types';

defineProps<{
  quiz: ApiQuizResponse;
}>();
</script>

<style scoped lang="scss">
.quiz-card {
  display: flex;
  flex-direction: column;
  justify-content: left;
  border: 1px solid $gray-400;
  padding: 12px;
  border-radius: 12px;
  width: 660px;

  &__row {
    display: flex;
  }

  &__title {
    width: 160px;
    margin-right: 6px;
    color: $gray-600;
  }

  &__value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 476px;
  }
}
</style>
