export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken as string;
  const refreshToken = body.refreshToken as string;
  const accessTokenExpiresAt = body.expiresAt as number;
  if (!accessToken) {
    return Response.json(
      { message: 'Không nhận được access token' },
      {
        status: 400,
      },
    );
  }

  const expiresDate = new Date(accessTokenExpiresAt);

  const appendHeaders = new Headers();

  appendHeaders.append(
    'Set-Cookie',
    `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
  );

  appendHeaders.append(
    'Set-Cookie',
    `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
  );

  return Response.json(body, {
    status: 200,
    headers: appendHeaders,
  });
}
