<template>
  <div class="arm">
    <h1 class="arm__title">АРМ сотрудника</h1>
    <ui-button v-if="!isOpenForm" class="arm__quiz-create-btn" @click="openCreateQuizForm">Создать викторину</ui-button>
    <template v-if="showQuizList">
      <quiz-card
        v-for="quiz in quizList.items"
        :key="quiz.entityId"
        :quiz
        :tasks="getTasksByQuizId(quiz.entityId)"
        @click:change="() => handleChangeQuiz(quiz)"
      />
    </template>

    <quiz-form
      v-else-if="isOpenForm"
      :quiz="selectedQuiz"
      :tasks="getTasksByQuizId(selectedQuiz?.entityId)"
      @close-form="isOpenForm = false"
    />
  </div>
</template>

<script lang="ts" setup>
import type { ApiQuizListItemResponse, ApiQuizListResponse, ApiTaskListResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

const quizStore = useQuizStore();

const isOpenForm = ref<boolean>(false);
const selectedQuiz = ref<ApiQuizListItemResponse | undefined>(undefined);

const { error } = await useAsyncData(() => {
  quizStore.fetchTaskList().catch(() => {
    throw createError({ statusCode: HttpStatus.NOT_FOUND });
  });
  return quizStore.fetchQuizList().catch(() => {
    throw createError({ statusCode: HttpStatus.NOT_FOUND });
  });
});

if (error.value) {
  showError({
    statusCode: HttpStatus.NOT_FOUND,
    statusMessage: 'Не удалось найти страницу',
  });
}

const quizList = computed<ApiQuizListResponse>(() => quizStore.quizList!);
const taskList = computed<ApiTaskListResponse>(() => quizStore.taskList!);
const showQuizList = computed<boolean>(() => {
  return quizList.value && !isOpenForm.value;
});

const openCreateQuizForm = () => {
  isOpenForm.value = true;
  selectedQuiz.value = undefined;
};

const handleChangeQuiz = (quiz: ApiQuizListItemResponse) => {
  selectedQuiz.value = quiz;
  isOpenForm.value = true;
};

const getTasksByQuizId = (quizId?: ApiQuizListItemResponse['entityId']) => {
  return taskList?.value.items?.filter((task) => task.quizId === quizId).reverse();
};
</script>

<style lang="scss" scoped>
.arm {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: calc(100% - 16px);
  max-width: 832px;
  margin: 20px auto 40px;
  gap: 20px;

  &__quiz-create-btn {
    max-width: 200px;
    margin-left: auto;
    cursor: pointer;

    @media #{$media-to-sm} {
      width: 100%;
      max-width: unset;
    }
  }
}
</style>
