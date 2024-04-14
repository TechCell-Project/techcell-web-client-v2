import { cookies } from 'next/headers';
import { authApiRequest } from '@/apiRequests';
import { SUCCESS, UNAUTHORIZED } from '@/constants/error';
import { HttpError } from '@/lib/http';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    return Response.json(
      { message: 'Không nhận được refresh token' },
      {
        status: UNAUTHORIZED,
      },
    );
  }

  try {
    const res = await authApiRequest.refreshTokenFromNextServerToServer({
      refreshToken: refreshToken.value,
    });

    const newExpriredDate = new Date(res.payload.accessTokenExpires).toUTCString();

    return Response.json(res.payload, {
      status: SUCCESS,
      headers: {
        'Set-Session-Cookie': `sessionToken=${res.payload.accessToken}; Path=/; HttpOnly; Expires=${newExpriredDate}; SameSite=Lax; Secure`,
        'Set-Refresh-Cookie': `refreshToken=${res.payload.refreshToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: 'Lỗi không xác định',
        },
        {
          status: 500,
        },
      );
    }
  }
}
