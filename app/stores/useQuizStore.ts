import { defineStore } from 'pinia';

import { quizApi } from '#shared/api/quiz';
import type { ApiQuizResponse } from '#shared/api/quiz/types';

interface State {
  quiz: ApiQuizResponse | undefined;
}

export const useQuizStore = defineStore('quiz', {
  state: (): State => ({
    quiz: undefined,
  }),

  actions: {
    SET_CURRENT_QUIZ_DATA(response: ApiQuizResponse): void {
      this.quiz = response;
    },

    async fetchQuizByUuid(uuid: string): Promise<ApiQuizResponse> {
      const res = await quizApi.getByUuid(uuid);
      this.SET_CURRENT_QUIZ_DATA(res);
      return res;
    },

    getters: {
      currentQuiz: (state: State): ApiQuizResponse | undefined => state.quiz,
    },
  },
});
