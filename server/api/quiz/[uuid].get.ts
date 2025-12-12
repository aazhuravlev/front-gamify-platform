import type { ApiQuizResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
  const uuid = getRouterParam(event, 'id');
  const query = getQuery(event);
  const phone = query.phone as string;

  if (!uuid) {
    throw createError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Uuid is required',
    });
  }

  return await $apiBaseInternal<ApiQuizResponse>(`/v1/quiz/${uuid}?phone=${phone}`);
});
