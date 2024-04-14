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
  private token = '';
  private _expiresAt = new Date().toISOString();
  get value() {
    return this.token;
  }
  set value(token: string) {
    // cannot call this method in server
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
    }
    this.token = token;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  set expiresAt(expiresAt: string) {
    // cannot call this method in server
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
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
  const baseHeaders =
    body instanceof FormData
      ? {
          Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
        }
      : {
          'Content-Type': 'application/json',
          Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
        };

  // if dont pass baseUrl (or baseUrl = undefined) then get it from envConfig.NEXT_PUBLIC_API_ENDPOINT
  // If pass baseUrl then get it, baseUrl = '' means call API to Next.js Server
  const baseUrl =
    options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload: Response = await res.json().catch((reason) => {
    console.log(reason);
  });
  
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== 'undefined') {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });

          await clientLogoutRequest;
          clientSessionToken.value = '';
          clientSessionToken.expiresAt = new Date().toISOString();
          clientLogoutRequest = null;
          location.href = RootPath.Login;
        }
      } else {
        const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1];
        redirect(`/logout?sessionToken=${sessionToken}`);
      }
    } else {
      throw new HttpError(data);
    }
  }

  // make sure that logics below only runs in client
  if (typeof window !== 'undefined') {
    if (
      [EMAIL_LOGIN_ENDPOINT, EMAIL_REGISTER_ENDPOINT].some((item) => item === normalizePath(url))
    ) {
      clientSessionToken.value = (payload as LoginResponseDto).accessToken;
      clientSessionToken.expiresAt = new Date(
        (payload as LoginResponseDto).accessTokenExpires,
      ).toISOString();
    } else if (LOGOUT_ENDPOINT === normalizePath(url)) {
      clientSessionToken.value = '';
      clientSessionToken.expiresAt = new Date().toISOString();
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
