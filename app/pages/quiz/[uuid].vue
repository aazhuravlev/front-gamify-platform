<template>
  <div class="tasks-page">
    <quiz-hero :quiz />

    <quiz-tasks :tasks="quiz.tasks" class="tasks-page__tasks" />

    <ui-container border-radius="top" class="tasks-page__bottom-sheet">
      <ui-button disabled>Получить приз</ui-button>
    </ui-container>
  </div>
</template>

<script lang="ts" setup>
import type { ApiQuizResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

const route = useRoute();
const quizStore = useQuizStore();

const { error } = await useAsyncData(() =>
  quizStore.fetchQuizByUuid(String(route.params.uuid), String(route.query.phone || '')).catch(() => {
    throw createError({ statusCode: HttpStatus.NOT_FOUND });
  }),
);

if (error.value) {
  showError({
    statusCode: HttpStatus.NOT_FOUND,
    statusMessage: 'Не удалось найти страницу',
  });
}

const quiz = computed<ApiQuizResponse>(() => quizStore.quiz!);
</script>

<style lang="scss" scoped>
.tasks-page {
  padding: 0 0 116px;

  &__tasks {
    margin-top: $space-2xs;
  }

  &__bottom-sheet {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 24px 0 rgb(0, 0, 0, 0.16);
    padding: $space-m $space-m $space-4xl $space-m;
  }
}
</style>
