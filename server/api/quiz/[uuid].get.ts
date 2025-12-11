import type { ApiQuizResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseExternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, 'uuid');

  if (!uuid) {
    throw createError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Uuid is required',
    });
  }

  try {
    return await $apiBaseExternal<ApiQuizResponse>(`/v1/quiz/${uuid}`);
  } catch {
    throw createError({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Failed to fetch quiz',
    });
  }
});
