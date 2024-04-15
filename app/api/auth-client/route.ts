export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;
  const refreshToken = body.refreshToken as string;
  const accessTokenExpiresAt = body.expiresAt as number;
  if (!sessionToken) {
    return Response.json(
      { message: 'Không nhận được session token' },
      {
        status: 400,
      },
    );
  }

  const expiresDate = new Date(accessTokenExpiresAt).toUTCString();

  const appendHeaders = new Headers({
    'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
  });

  appendHeaders.append(
    'Set-Cookie',
    `refreshToken=${refreshToken}; Path=/; HttpOnly; SameSite=Lax; Secure`,
  );

  return Response.json(body, {
    status: 200,
    headers: appendHeaders,
  });
}
