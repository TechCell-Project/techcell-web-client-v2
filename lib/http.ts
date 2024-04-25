import envConfig from '@/config';
import { RootPath } from '@/constants';
import {
  EMAIL_LOGIN_ENDPOINT,
  EMAIL_REGISTER_ENDPOINT,
  LOGOUT_ENDPOINT,
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

class SessionToken {
  private accessToken = '';
  private refreshToken = '';
  private _expiresAt = new Date().toISOString();
  get accessValue() {
    return this.accessToken;
  }
  set accessValue(accessToken: string) {
    // cannot call this method in server
    if (typeof window === 'undefined') {
      throw new Error('Cannot set accessToken on server side');
    }
    this.accessToken = accessToken;
  }
  get refreshValue() {
    return this.refreshToken;
  }
  set refreshValue(refreshToken: string) {
    // cannot call this method in server
    if (typeof window === 'undefined') {
      throw new Error('Cannot set refreshToken on server side');
    }
    this.refreshToken = refreshToken;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  set expiresAt(expiresAt: string) {
    // cannot call this method in server
    if (typeof window === 'undefined') {
      throw new Error('Cannot set accessToken on server side');
    }
    this._expiresAt = expiresAt;
  }
}

export const clientSessionToken = new SessionToken();
let clientLogoutRequest: null | Promise<any> = null;

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined,
) => {
  // Interceptor
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  const headersFromRequest =
    body instanceof FormData
      ? {
          Authorization: clientSessionToken.accessValue
            ? `Bearer ${clientSessionToken.accessValue}`
            : '',
        }
      : {
          'Content-Type': 'application/json',
          Authorization: clientSessionToken.accessValue
            ? `Bearer ${clientSessionToken.accessValue}`
            : '',
        };

  const baseHeaders = options?.headers === undefined ? headersFromRequest : {};

  // console.log('method:', method);
  // console.log(clientSessionToken.accessValue);
  // console.log('options-headers:', options?.headers);
  // console.log('headersFromRequest:', headersFromRequest);
  // console.log('headers:', baseHeaders);

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

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    console.log('entity error');
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      console.log('unauthorized error', fullUrl);
      if (typeof window !== 'undefined') {
        if (!clientLogoutRequest) {
          if (!clientSessionToken.accessValue) {
            location.assign(
              `${RootPath.Login}?callbackUrl=${encodeURIComponent(location.pathname)}`,
            );
          }
          clientLogoutRequest = fetch('/api/auth-client/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });

          await clientLogoutRequest;
          clientSessionToken.accessValue = '';
          clientSessionToken.refreshValue = '';
          clientSessionToken.expiresAt = new Date().toISOString();
          clientLogoutRequest = null;
          location.reload();
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
  if (typeof window !== 'undefined') {
    if (EMAIL_LOGIN_ENDPOINT === normalizePath(url)) {
      clientSessionToken.accessValue = (payload as LoginResponseDto).accessToken;
      clientSessionToken.refreshValue = (payload as LoginResponseDto).refreshToken;
      clientSessionToken.expiresAt = new Date(
        (payload as LoginResponseDto).accessTokenExpires,
      ).toISOString();
    } else if (LOGOUT_ENDPOINT === normalizePath(url)) {
      clientSessionToken.accessValue = '';
      clientSessionToken.refreshValue = '';
      clientSessionToken.expiresAt = new Date().toISOString();
    }
  }
  return data;
};

export function hardSetClientSessionToken(data: LoginResponseDto) {
  clientSessionToken.accessValue = data.accessToken;
  clientSessionToken.refreshValue = data.refreshToken;
  clientSessionToken.expiresAt = new Date(data.accessTokenExpires).toISOString();
}

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
