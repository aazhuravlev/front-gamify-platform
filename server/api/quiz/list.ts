import type { ApiQuizListResponse } from '#shared/api/quiz/types';

import { HttpStatus } from 'business-modules/systemic/enums';

import { $apiBaseExternal } from '../../utils/api';

export default defineEventHandler(async () => {
    try {
        return await $apiBaseExternal<ApiQuizListResponse>('/v1/quiz');
    } catch {
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to fetch quiz list',
        });
    }
});
