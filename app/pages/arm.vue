<template>
  <div class="arm">
    <h1 class="arm__title">АРМ сотрудника</h1>
    <ui-button v-if="!isOpenForm" class="arm__quiz-create-btn" @click="openCreateQuizForm">Создать викторину</ui-button>
    <template v-if="showQuizList">
      <quiz-card
        v-for="quiz in quizList.items"
        :key="quiz.entityId"
        :quiz
        @click:change="() => handleChangeQuiz(quiz)"
      />
    </template>

    <quiz-form v-else-if="isOpenForm" :quiz="selectedQuiz" @close-form="isOpenForm = false" />
  </div>
</template>

<script lang="ts" setup>
import type { ApiQuizListItemResponse, ApiQuizListResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

const quizStore = useQuizStore();

const isOpenForm = ref<boolean>(false);
const selectedQuiz = ref<ApiQuizListItemResponse | undefined>(undefined);

const { error } = await useAsyncData(() =>
  quizStore.fetchQuizList().catch(() => {
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

const handleChangeQuiz = (quiz: ApiQuizListItemResponse) => {
  selectedQuiz.value = quiz;
  isOpenForm.value = true;
};
</script>

<style lang="scss" scoped>
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
  gap: 8px;

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
