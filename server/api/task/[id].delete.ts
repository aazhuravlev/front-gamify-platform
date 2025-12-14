import { HttpStatus } from 'business-modules/systemic/enums';
import type { ApiEmptyResponse } from 'business-modules/systemic/types';

import { $apiBaseInternal } from '../../utils/api';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Id is required',
        });
    }

    try {
        return await $apiBaseInternal<ApiEmptyResponse>(`/v1/task/${id}`, {
            method: 'DELETE',
        });
    } catch {
        throw createError({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete task',
        });
    }
});
