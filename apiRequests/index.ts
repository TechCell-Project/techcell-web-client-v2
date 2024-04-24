export const publicHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

export const revalidateRequest: NextFetchRequestConfig = {
  revalidate: 60 * 15,
};

export * from './auth';
export * from './address';
