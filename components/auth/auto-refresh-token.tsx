'use client';


import { authApiRequest } from '@/apiRequests/auth';
import { clientSessionToken } from '@/lib/http';
import { useEffect } from 'react';
import { differenceInMinutes } from 'date-fns';

export default function AutoRefreshToken() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const expiresAt = new Date(clientSessionToken.expiresAt);
      if (differenceInMinutes(expiresAt, now) < 5) {
        const res = await authApiRequest.refreshTokenFromNextClientToNextServer();
        clientSessionToken.expiresAt = new Date(res.payload.accessTokenExpires).toISOString();
        clientSessionToken.accessValue = res.payload.accessToken;
        clientSessionToken.refreshValue = res.payload.refreshToken;
      }
    }, 1000 * 60 * 14);
    return () => clearInterval(interval);
  }, []);
  return null;
}
