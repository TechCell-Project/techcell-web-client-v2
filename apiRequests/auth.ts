import envConfig from '@/config';
import { ApiTags } from '@/constants';
import http from '@/lib/http';
import { MessageResType } from '@/validationSchemas/common.schema';
import {
  AuthConfirmEmailDto,
  AuthEmailLoginDto,
  AuthSignupDto,
  AuthUpdateDto,
  LoginResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  ResendConfirmEmail,
  User,
} from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Auth;

export const authApiRequest = {
  loginEmail: (body: AuthEmailLoginDto) =>
    http.post<LoginResponseDto>(`${ApiPrefix}/email/login`, body),

  registerEmail: (body: AuthSignupDto) => http.post(`${ApiPrefix}/email/register`, body),

  confirmEmail: (body: AuthConfirmEmailDto) => http.post(`${ApiPrefix}/email/confirm`, body),

  resendEmail: (body: ResendConfirmEmail) => http.post(`${ApiPrefix}/email/resend-confirm`, body),

  auth: (body: { sessionToken: string; refreshToken: string; expiresAt: number }) =>
    http.post('/api/auth-client', body, {
      baseUrl: '',
    }),

  logoutFromNextServerToServer: (sessionToken: string) =>
    fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}${ApiPrefix}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  logoutFromNextClientToNextServer: (force?: boolean, signal?: AbortSignal) =>
    http.post<MessageResType>('/api/auth-client/logout', { force }, { baseUrl: '', signal }),

  refreshTokenFromNextServerToServer: (refreshPayload: RefreshTokenDto) =>
    http.post<RefreshTokenResponseDto>(`${ApiPrefix}/refresh`, refreshPayload),

  refreshTokenFromNextClientToNextServer: () =>
    http.post<RefreshTokenResponseDto>(
      `/api/auth-client/refresh`,
      {},
      {
        baseUrl: '',
      },
    ),

  getMe: (sessionToken: string) =>
    http.get<User>(`${ApiPrefix}/me`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getMeClient: () => http.get<User>(`${ApiPrefix}/me`),

  updateMe: (body: Partial<AuthUpdateDto>) => http.patch<User>(`${ApiPrefix}/me`, body),
};
