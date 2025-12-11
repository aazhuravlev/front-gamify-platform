import type { ApiQuizResponse } from './types';

export const quizApi = {
  getByUuid(uuid: string): Promise<ApiQuizResponse> {
    return $fetch(`/api/quiz/${uuid}`);
  },
};
