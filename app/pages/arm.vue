<template>
  <div class="arm">
    <h1 class="arm__title">АРМ сотрудника</h1>
    <ui-button
      v-if="!isOpenForm"
      class="arm__quiz-create-btn"
      @click="openCreateQuizForm"
    >
      Создать викторину
    </ui-button>
    <template v-if="showQuizList">
      <quiz-card
        v-for="(quiz) in quizList.items"
        :key="quiz.entityId"
        :quiz
      />
    </template>

    <quiz-form v-else />
  </div>
</template>

<script setup lang="ts">
import type { ApiQuizListResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

const quizStore = useQuizStore();

const isOpenForm = ref<boolean>(false);

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
const showQuizList = computed<boolean>(() => {
  return quizList.value && !isOpenForm.value;
});

const openCreateQuizForm = () => {
  isOpenForm.value = true;
};
</script>

<style scoped lang="scss">
.arm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  width: 832px;
  margin-top: 20px;

  &__title {
    margin-bottom: 20px;
  }

  &__quiz-create-btn {
    max-width: 200px;
    margin-left: auto;
    margin-bottom: 12px;
    cursor: pointer;
  }
}
</style>
