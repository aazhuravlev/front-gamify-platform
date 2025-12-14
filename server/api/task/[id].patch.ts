import type { ApiTaskDetailResponse, ApiUpdateTaskPayload } from '#shared/api/quiz/types';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody<ApiUpdateTaskPayload>(event);

  return await $apiBaseInternal<ApiTaskDetailResponse>(`/v1/task/${id}`, { method: 'PATCH', body });
});
