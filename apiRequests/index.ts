export const publicHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

export const revalidateRequest: NextFetchRequestConfig = {
  revalidate: 60,
};

export * from './auth';
export * from './address';
export * from './cart';
export * from './order';
export * from './product';
export * from './brand';

