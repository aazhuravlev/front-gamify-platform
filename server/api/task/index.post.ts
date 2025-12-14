import type { ApiTaskDetailResponse, ApiTaskResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<ApiTaskDetailResponse>(event);

    return await $apiBaseInternal<ApiTaskResponse>('/v1/task', {
      method: 'POST',
      body,
    });
  } catch {
    throw createError({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to create task',
    });
  }
});
