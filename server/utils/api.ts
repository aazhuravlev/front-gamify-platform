import { createFetch } from 'ofetch';

const fetchInstance = createFetch();

export const $apiBaseExternal = fetchInstance.create({
  baseURL: useRuntimeConfig().public.apiHostExternal,
});
