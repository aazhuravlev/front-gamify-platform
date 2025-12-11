<template>
  <div class="container">
    <h1 class="arm__title">АРМ сотрудника</h1>
    <template v-if="quizList">
      <quiz-card
        class="row" v-for="(quiz) in quizList.items"
        :key="quiz.entityId"
        :quiz
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ApiQuizListResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

const quizStore = useQuizStore();

const { error } = await useAsyncData(() =>
    quizStore.fetchQuizList()
        .catch(() => {
      throw createError({ statusCode: HttpStatus.NOT_FOUND });
    }),
);

if (error.value) {
  showError({
    statusCode: HttpStatus.NOT_FOUND,
    statusMessage: 'Не удалось найти страницу',
  });
}

const quizList = computed<ApiQuizListResponse>(() => quizStore.quizList!);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  width: 1200px;
  margin-top: 20px;

  .arm {
    &__title {
      margin-bottom: 20px;
    }
  }
}
</style>
