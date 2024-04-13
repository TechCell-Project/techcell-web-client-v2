import { ApiTags } from '@/constants';
import http from '@/lib/http';
import { MessageResType } from '@/validationSchemas/common.schema';
import { AuthEmailLoginDto, AuthSignupDto, AuthUpdateDto, LoginResponseDto, User } from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Auth;

export const authApiRequest = {
  loginEmail: (body: AuthEmailLoginDto) =>
    http.post<LoginResponseDto>(`${ApiPrefix}/email/login`, body),

  registerEmail: (body: AuthSignupDto) => http.post<void>(`${ApiPrefix}/email/register`, body),

  auth: (body: { sessionToken: string; expiresAt: number }) =>
    http.post('/api/auth-client', body, {
      baseUrl: '',
    }),

  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post(
      `${ApiPrefix}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      },
    ),

  logoutFromNextClientToNextServer: (force?: boolean, signal?: AbortSignal) =>
    http.post<MessageResType>('/api/auth-client/logout', { force }, { baseUrl: '', signal }),

  getMe: (sessionToken: string) =>
    http.get<User>(`${ApiPrefix}/me`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    }),

  getMeClient: () => http.get<User>(`${ApiPrefix}/me`),

  updateMe: (body: AuthUpdateDto) => http.patch<User>(`${ApiPrefix}/me`, body),
};
