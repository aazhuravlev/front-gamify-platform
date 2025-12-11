import { createFetch } from 'ofetch';

const fetchInstance = createFetch();

export const $apiBaseInternal = fetchInstance.create({
  baseURL: useRuntimeConfig().public.apiHostInternal,
});
