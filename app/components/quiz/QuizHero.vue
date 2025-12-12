<template>
  <ui-container :style="backgroundGradient" border-radius="bottom" class="quiz-hero">
    <nuxt-img :src="quiz.image" alt="Фоновое изображение" height="230" loading="lazy" width="287" />

    <h1 class="quiz-hero__title">{{ quiz.title }}</h1>

    <p v-if="quiz.description" class="quiz-hero__description">{{ quiz.description }}</p>

    <quiz-progress
      :completed-tasks-qty="quiz.progress.completedTasks"
      :tasks-qty="quiz.progress.totalTasks"
      class="quiz-hero__progress"
    />
  </ui-container>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import type { ApiQuizResponse } from '#shared/api/quiz/types';

const props = defineProps<{
  quiz: ApiQuizResponse;
}>();

const backgroundGradient = computed<CSSProperties>(() => {
  if (props.quiz.bgColor) {
    return {
      background: props.quiz.bgColor,
    };
  }
  return {};
});
</script>

<style lang="scss" scoped>
.quiz-hero {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px $space-m $space-xl;

  &__title {
    @include title-h2;

    color: $text-primary;
  }

  &__description {
    @include body-h4;

    margin-top: $space-xs;
    padding: 0 $space-ml;
    text-align: center;
    color: $text-primary;
  }

  &__progress {
    width: 100%;
    margin-top: $space-xs;
  }
}
</style>
