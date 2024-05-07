import envConfig from '@/config';
import { RootPath } from '@/constants';
import {
  EMAIL_LOGIN_ENDPOINT,
  GOOGLE_LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  LOGOUT_ENDPOINT_FORCE,
} from '@/constants/services';
import { normalizePath } from '@/lib/utils';
import { LoginResponseDto } from '@techcell/node-sdk';
import { redirect } from 'next/navigation';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;
const NO_CONTENT_STATUS = 204;

type EntityErrorPayload = {
  errors: {
    [field: string]: string;
  };
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient: boolean = typeof window !== 'undefined';

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
) => {
  // Interceptor
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const headersFromRequest: {
    [key: string]: string;
  } = body instanceof FormData ? {} : { 'Content-Type': 'application/json' };

  if (isClient) {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (accessToken) {
      headersFromRequest.Authorization = `Bearer ${accessToken}`;
    }
  }

  const baseHeaders = options?.headers === undefined ? headersFromRequest : {};

  console.log('request headers:', headersFromRequest);
  console.log('options headers:', options?.headers);
  console.log('headers:', baseHeaders);

  // if dont pass baseUrl (or baseUrl = undefined) then get it from envConfig.NEXT_PUBLIC_API_ENDPOINT
  // If pass baseUrl then get it, baseUrl = '' means call API to Next.js Server
  const baseUrl =
    options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  console.log(fullUrl);

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload: Response = await res
    .json()
    .catch((reason) => console.log('reason', reason.status));

  console.log(payload);

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      console.log('entity error');
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth-client/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });

          try {
            await clientLogoutRequest;
          } catch (error) {
            console.log(error);
          } finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessTokenExpires');
            clientLogoutRequest = null;
            location.reload();
          }
        }
      } else {
        console.log('unauthorized error', fullUrl);
        const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1];
        redirect(`/dang-xuat?sessionToken=${sessionToken}`);
      }
    } else {
      console.log(data);
      console.log(res);
      throw new HttpError(data);
    }
  }

  console.log('request success');

  // make sure that logics below only runs in client
  if (isClient) {
    if ([EMAIL_LOGIN_ENDPOINT, GOOGLE_LOGIN_ENDPOINT].some((item) => item === normalizePath(url))) {
      const { accessToken, refreshToken, accessTokenExpires } = payload as LoginResponseDto;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessTokenExpires', accessTokenExpires.toString());
    } else if (
      [LOGOUT_ENDPOINT, LOGOUT_ENDPOINT_FORCE].some((item) => item === normalizePath(url))
    ) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpires');
    }
  }
  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options);
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body });
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PATCH', url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options });
  },
};

export default http;
