<template>
  <div class="quiz-card">
    <div class="quiz-card__row">
      <span class="quiz-card__label">Заголовок:</span>
      <span class="quiz-card__value">{{ quiz.title }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Описание:</span>
      <span class="quiz-card__value">{{ quiz.description }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Короткое описание:</span>
      <span class="quiz-card__value">{{ quiz.shortDescription }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Основной градиент:</span>
      <span class="quiz-card__value">{{ quiz.bgColor }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Градиент баннера:</span>
      <span class="quiz-card__value">{{ quiz.bannerBgColor }}</span>
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Основное изображение:</span>
      <img :src="quiz.image" :alt="quiz.title" class="quiz-card__img" />
    </div>

    <div class="quiz-card__row">
      <span class="quiz-card__label">Изображение баннера:</span>
      <img :src="quiz.widgetImage" :alt="quiz.title" class="quiz-card__img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiQuizListItemResponse } from '#shared/api/quiz/types';

defineProps<{
  quiz: ApiQuizListItemResponse;
}>();
</script>

<style scoped lang="scss">
$img-size: 96px;

.quiz-card {
  display: flex;
  flex-direction: column;
  justify-content: left;
  border: 1px solid $gray-400;
  padding: 12px;
  border-radius: 12px;
  width: 100%;

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__label {
    width: 200px;
    margin-right: 8px;
    color: $gray-600;
  }

  &__value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 576px;
  }

  &__img {
    max-width: $img-size;
    max-height: $img-size;
  }
}
</style>
