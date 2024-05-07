import envConfig from '@/config';
import { ApiTags } from '@/constants';
import http from '@/lib/http';
import { MessageResType } from '@/validationSchemas/common.schema';
import {
  AuthConfirmEmailDto,
  AuthEmailLoginDto,
  AuthForgotPasswordDto,
  AuthGoogleLoginDto,
  AuthResetPasswordDto,
  AuthSignupDto,
  AuthUpdateDto,
  GetMeResponseDto,
  LoginResponseDto,
  RefreshTokenDto,
  RefreshTokenResponseDto,
  ResendConfirmEmail,
} from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Auth;

export const authApiRequest = {
  loginEmail: (body: AuthEmailLoginDto) =>
    http.post<LoginResponseDto>(`${ApiPrefix}/email/login`, body),

  loginGoogle: (body: AuthGoogleLoginDto) =>
    http.post<LoginResponseDto>(`${ApiPrefix}/google/login`, body),

  registerEmail: (body: AuthSignupDto) => http.post(`${ApiPrefix}/email/register`, body),

  confirmEmail: (body: AuthConfirmEmailDto) => http.post(`${ApiPrefix}/email/confirm`, body),

  resendEmail: (body: ResendConfirmEmail) => http.post(`${ApiPrefix}/email/resend-confirm`, body),

  auth: (body: { accessToken: string; refreshToken: string; expiresAt: number }) =>
    http.post('/api/auth-client', body, {
      baseUrl: '',
    }),

  logoutFromNextServerToServer: (accessToken: string) =>
    fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}${ApiPrefix}/logout`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
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

  forgotPassword: (body: AuthForgotPasswordDto) => http.post(`${ApiPrefix}/forgot/password`, body),

  resetPassword: (body: AuthResetPasswordDto) => http.post(`${ApiPrefix}/reset/password`, body),

  getMe: (accessToken: string) =>
    http.get<GetMeResponseDto>(`${ApiPrefix}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getMeClient: () => http.get<GetMeResponseDto>(`${ApiPrefix}/me`),

  updateMe: (body: Partial<AuthUpdateDto>) => http.patch<MessageResType>(`${ApiPrefix}/me`, body),
};
