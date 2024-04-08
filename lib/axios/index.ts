import envConfig from '@/config';
import axios, { AxiosError, AxiosInstance, AxiosRequestHeaders, CreateAxiosDefaults } from 'axios';
import axiosRetry from 'axios-retry';

// import { AuthApi } from '@techcell/node-sdk';

// import { getSession } from 'next-auth/react';
// import { update } from '@libs/next-auth';

/**
 * Generates an Axios instance with the provided options.
 *
 * @param {CreateAxiosDefaults} options - (optional) The default options for the Axios instance.
 * @param {boolean} enableRetry - (optional) Indicates whether to enable retrying failed requests.
 * @return {AxiosInstance} The Axios instance.
 */
function getAxios(options?: CreateAxiosDefaults, enableRetry: boolean = true): AxiosInstance {
  const instance = axios.create({
    baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 10 * 1000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (enableRetry) {
    axiosRetry(instance, {
      retries: 5,
      retryDelay: (retryCount) => {
        return retryCount * 2000;
      },
      retryCondition: (error) => {
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          axiosRetry.isSafeRequestError(error)
        );
      },
    });
  }

  return instance;
}

/**
 * The axios instance used for public requests
 */
export const axiosPublic = getAxios();

// const ENTITY_ERROR_STATUS = 422;
// const AUTHENTICATION_ERROR_STATUS = 401;

// type EntityErrorPayload = {
//   message: string;
//   errors: {
//     field: string;
//     message: string;
//   }[];
// };

// type CustomOptions = Omit<RequestInit, 'method'> & {
//   baseUrl?: string | undefined;
// };

// export class HttpError extends AxiosError {
//   status: number;
//   payload: {
//     message: string;
//     [key: string]: any;
//   };
//   constructor({ status, payload }: { status: number; payload: any }) {
//     super('Http Error');
//     this.status = status;
//     this.payload = payload;
//   }
// }

// export class EntityError extends HttpError {
//   status: 422;
//   payload: EntityErrorPayload;
//   constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
//     super({ status, payload });
//     this.status = status;
//     this.payload = payload;
//   }
// }

// export const axiosInstance = axios.create({
//   timeout: 10 * 1000,
// });
// axiosRetry(axiosInstance, {
//   retries: 5,
//   retryDelay: (retryCount) => {
//     return retryCount * 2000;
//   },
//   retryCondition: (error) => {
//     return (
//       axiosRetry.isNetworkOrIdempotentRequestError(error) || axiosRetry.isSafeRequestError(error)
//     );
//   },
// });

// class SessionToken {
//   private token = '';
//   private _expiresAt = new Date().toISOString();
//   get value() {
//     return this.token;
//   }
//   set value(token: string) {
//     // throw error when trying to set token on server
//     if (typeof window === 'undefined') {
//       throw new Error('Cannot set token on server side');
//     }
//     this.token = token;
//   }
//   get expiresAt() {
//     return this._expiresAt;
//   }
//   set expiresAt(expiresAt: string) {
//     // throw error when trying to set token on server
//     if (typeof window === 'undefined') {
//       throw new Error('Cannot set token on server side');
//     }
//     this._expiresAt = expiresAt;
//   }
// }

// export const clientSessionToken = new SessionToken();
// let clientLogoutRequest: null | Promise<any> = null;

// axiosInstance.interceptors.request.use(
//   async (request) => {
//     const baseUrl =
//       request.baseURL === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : request.baseURL;

//     request.baseURL = baseUrl;

//     console.log('request', request);
//     const body = request.data
//       ? request.data instanceof FormData
//         ? request.data
//         : JSON.stringify(request.data)
//       : undefined;

//     const baseHeaders =
//       body instanceof FormData
//         ? { Authorization: `Bearer ${clientSessionToken.value}` }
//         : {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${clientSessionToken.value}`,
//           };

//     request.headers = baseHeaders as AxiosRequestHeaders;

//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     const prevRequest = error.config;

//     if (error.response?.status === ENTITY_ERROR_STATUS) {
//       throw new EntityError({ status: error.response.status, payload: error.response.data } as {
//         status: 422;
//         payload: EntityErrorPayload;
//       });
//     } else if (error.response?.status === AUTHENTICATION_ERROR_STATUS) {
//       // make sure that these logics are not running on the server
//       if (typeof window !== 'undefined') {
//         if (!clientLogoutRequest) {
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// /**
//  * The axios instance used for authenticated requests
//  * @description It will use the access token from the session to authenticate the requests
//  * It will also refresh the access token if it expires
//  * And update the session with the new access token
//  */
// export const axiosAuth = getAxios({
//     timeout: 10000,
// });

// /**
//  * Interceptors to add auth headers to requests
//  * So that we don't need to pass the access token in every request, or manually add it to the header
//  */
// axiosAuth.interceptors.request.use(
//     async (request) => {
//         if (!request.headers.Authorization) {
//             const session = await getSession();

//             if (!session?.user.accessToken) {
//                 throw new Error('No access token found');
//             }
//             const authHeaderValue = `Bearer ${session?.user.accessToken}`;
//             request.headers.Authorization = authHeaderValue;
//         }

//         return request;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// /**
//  * Interceptors to handle 401 errors and refresh the access token
//  * Then retry the original request with the new token
//  * It also updates the session with the new access token
//  */
// axiosAuth.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const prevRequest = error.config;

//         if (error.response?.status === 401 && prevRequest) {
//             const session = await getSession();
//             if (!session?.user.refreshToken) {
//                 return Promise.reject(new Error('No refresh token found'));
//             }

//             const header = `Bearer ${session.user.refreshToken}`;

//             axiosPublic.defaults.headers.common.Authorization = header;

//             const { data } = await new AuthApi(
//                 undefined,
//                 undefined,
//                 axiosPublic,
//             ).authControllerRefresh();

//             if (!data) {
//                 throw new Error('No new access token found');
//             }

//             // Update the session to store the new access, refresh token
//             await update(
//                 Object.assign(
//                     session,
//                     {},
//                     {
//                         user: data,
//                     },
//                 ),
//             );

//             const authHeaderValue = `Bearer ${session?.user.accessToken}`;

//             // Update the Authorization header
//             prevRequest.headers.Authorization = authHeaderValue;

//             // Retry the original request with the new token
//             return axiosAuth(prevRequest);
//         }

//         return Promise.reject(error);
//     },
// );
