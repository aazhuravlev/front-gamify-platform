import { defineStore } from 'pinia';

import { quizApi } from '#shared/api/quiz';
import type {
  ApiCreateQuizPayload,
  ApiCreateTaskPayload,
  ApiQuizListResponse,
  ApiQuizResponse,
  ApiTaskDetailResponse,
  ApiTaskListItemResponse,
  ApiTaskListResponse,
  ApiTaskResponse,
  ApiUpdateTaskPayload,
} from '#shared/api/quiz/types';

import type { ApiEmptyResponse } from 'business-modules/systemic/types';

interface State {
  quiz: ApiQuizResponse | undefined;
  quizList: ApiQuizListResponse | undefined;
  taskList: ApiTaskListResponse | undefined;
}

export const useQuizStore = defineStore('quiz', {
  state: (): State => ({
    quiz: undefined,
    quizList: undefined,
    taskList: undefined,
  }),

  actions: {
    SET_QUIZ_LIST(response: ApiQuizListResponse): void {
      this.quizList = response;
    },
    SET_CURRENT_QUIZ_DATA(response: ApiQuizResponse): void {
      this.quiz = response;
    },
    ADD_QUIZ_TO_LIST(response: ApiQuizResponse): void {
      if (this.quizList) {
        ++this.quizList.total;
        this.quizList.items.unshift(response);
      } else {
        this.quizList = { total: 1, items: [response] };
      }
    },
    // UPDATE_QUIZ(response: ApiQuizResponse): void {
    //   if (this.quizList) {
    //     const index = this.quizList.items.findIndex(quiz => quiz.entityId === response.entityId);
    //     if (index >= 0) {
    //       this.quizList.items.splice(index, 1, response);
    //     }
    //   }
    // },
    DELETE_QUIZ(id: ApiQuizResponse['entityId']): void {
      if (this.quizList) {
        const index = this.quizList.items.findIndex(quiz => quiz.entityId === id);
        if (index >= 0) {
          this.quizList.items.splice(index, 1);
        }
      }
    },
    SET_TASK_LIST(response: ApiTaskListResponse): void {
      this.taskList = response;
    },
    ADD_TASK_TO_LIST(response: ApiTaskListItemResponse): void {
      if (this.taskList) {
        ++this.taskList.total;
        this.taskList.items.unshift(response);
      } else {
        this.taskList = { total: 1, items: [response] };
      }
    },
    // UPDATE_TASK(response: ApiTaskListItemResponse): void {
    //   if (this.taskList) {
    //     const index = this.taskList.items.findIndex(task => task.entityId === response.entityId);
    //     if (index >= 0) {
    //       this.taskList.items.splice(index, 1, response);
    //     }
    //   }
    // },
    DELETE_TASK(id: ApiTaskResponse['entityId']): void {
      if (this.taskList) {
        const index = this.taskList.items.findIndex(task => task.entityId === id);
        if (index >= 0) {
          this.taskList.items.splice(index, 1);
        }
      }
    },

    async fetchQuizList(): Promise<ApiQuizListResponse> {
      const res = await quizApi.getQuizList();
      this.SET_QUIZ_LIST(res);
      return res;
    },
    async fetchQuizByUuid(uuid: string): Promise<ApiQuizResponse> {
      const res = await quizApi.getQuizByUuid(uuid);
      this.SET_CURRENT_QUIZ_DATA(res);
      return res;
    },
    async createQuiz(payload: ApiCreateQuizPayload): Promise<ApiQuizResponse> {
      const res = await quizApi.createQuiz(payload);
      this.ADD_QUIZ_TO_LIST(res);
      return res;
    },
    // async updateQuiz(payload: ApiCreateQuizPayload): Promise<ApiQuizResponse> {
    //   const res = await quizApi.updateQuiz(payload);
    //   this.UPDATE_QUIZ(res);
    //   return res;
    // },
    deleteQuiz(id: ApiQuizResponse['entityId']): Promise<ApiEmptyResponse> {
      const res = quizApi.deleteQuiz(id);
      this.DELETE_QUIZ(id);
      return res;
    },
    async fetchTaskList(): Promise<ApiTaskListResponse> {
      const res = await quizApi.getTaskList();
      this.SET_TASK_LIST(res);
      return res;
    },
    fetchTaskById(id: ApiTaskResponse['entityId']): Promise<ApiTaskDetailResponse> {
      return quizApi.getTaskById(id);
    },
    fetchTaskByQuizId(id: ApiQuizResponse['entityId']): Promise<ApiTaskListResponse> {
      return quizApi.getTaskByQuizId(id);
    },
    async createTask(payload: ApiCreateTaskPayload): Promise<ApiTaskDetailResponse> {
      const res = await quizApi.createTask(payload);
      this.ADD_TASK_TO_LIST(res);
      return res;
    },
    // async updateTask(payload: ApiUpdateTaskPayload): Promise<ApiTaskDetailResponse> {
    //   const res = await quizApi.updateTask(payload);
    //   this.UPDATE_TASK(res);
    //   return res;
    // },
    deleteTask(id: ApiQuizResponse['entityId']): Promise<ApiEmptyResponse> {
      const res = quizApi.deleteTask(id);
      this.DELETE_TASK(id);
      return res;
    },

    getters: {
      currentQuiz: (state: State): ApiQuizResponse | undefined => state.quiz,
      quizList: (state: State): ApiQuizListResponse | undefined => state.quizList,
      taskList: (state: State): ApiTaskListResponse | undefined => state.taskList,
    },
  },
});
