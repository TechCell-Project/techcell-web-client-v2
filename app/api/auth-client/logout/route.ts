import { authApiRequest } from '@/apiRequests/auth';
import { HttpError } from '@/lib/http';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req);
  const force = req.force as boolean | undefined;
  const appendHeaders = new Headers();
  appendHeaders.append('Set-Cookie', 'accessToken=; Path=/; HttpOnly; Max-Age=0');
  appendHeaders.append('Set-Cookie', 'refreshToken=; Path=/; HttpOnly; Max-Age=0');

  if (force) {
    return Response.json(
      {
        message: 'Buộc đăng xuất thành công',
      },
      {
        status: 200,
        headers: appendHeaders
      },
    );
  }
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 401,
      },
    );
  }
  try {
    await authApiRequest.logoutFromNextServerToServer(accessToken.value);

    return new Response(null, {
      status: 204,
      headers: appendHeaders
    });
  } catch (error) {
    console.log('error', error);
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
