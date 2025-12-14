import type { ApiEmptyResponse } from 'business-modules/systemic/types';

import type {
  ApiCreateQuizPayload,
  ApiCreateTaskPayload,
  ApiQuizListResponse,
  ApiQuizResponse,
  ApiTaskDetailResponse,
  ApiTaskListResponse,
  ApiTaskResponse,
  ApiUpdateQuizPayload,
  ApiUpdateTaskPayload,
} from './types';

export const quizApi = {
  getQuizList(): Promise<ApiQuizListResponse> {
    return $fetch('/api/quiz');
  },
  getQuizByUuid(uuid: string, phone: string): Promise<ApiQuizResponse> {
    return $fetch(`/api/quiz/${uuid}?phone=${phone}`);
  },
  createQuiz(payload: ApiCreateQuizPayload): Promise<ApiQuizResponse> {
    return $fetch('/api/quiz', { method: 'POST', body: payload });
  },
  updateQuiz(id: ApiQuizResponse['entityId'], payload: ApiUpdateQuizPayload): Promise<ApiQuizResponse> {
    // @ts-ignore
    return $fetch(`/api/quiz/${id}`, { method: 'PATCH', body: payload });
  },
  deleteQuiz(id: ApiQuizResponse['entityId']): Promise<ApiEmptyResponse> {
    // @ts-ignore
    return $fetch(`/api/quiz/${id}`, { method: 'DELETE' });
  },
  getTaskList(): Promise<ApiTaskListResponse> {
    return $fetch('/api/task');
  },
  getTaskById(id: ApiTaskResponse['entityId']): Promise<ApiTaskDetailResponse> {
    return $fetch(`/api/task/${id}`);
  },
  getTaskByQuizId(id: ApiQuizResponse['entityId']): Promise<ApiTaskListResponse> {
    return $fetch(`/api/task/by-quiz/${id}`);
  },
  createTask(payload: ApiCreateTaskPayload): Promise<ApiTaskDetailResponse> {
    // @ts-ignore
    return $fetch('/api/task', { method: 'POST', body: payload });
  },
  updateTask(id: ApiTaskDetailResponse['entityId'], payload: ApiUpdateTaskPayload): Promise<ApiTaskDetailResponse> {
    return $fetch(`/api/task/${id}`, { method: 'PATCH', body: payload });
  },
  deleteTask(id: ApiTaskResponse['entityId']): Promise<ApiEmptyResponse> {
    // @ts-ignore
    return $fetch(`/api/task/${id}`, { method: 'DELETE' });
  },
};
