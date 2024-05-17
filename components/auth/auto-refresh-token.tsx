'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApiRequest } from '@/apiRequests/auth';
import { differenceInHours } from 'date-fns';

export default function AutoRefreshToken() {
  const { refresh } = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      await handleRefresh();
    }, 1000 * 60 * 1);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = async () => {
    const now = new Date();
    const accessTokenExpiresAt = localStorage.getItem('accessTokenExpires');
    const refreshToken = localStorage.getItem('refreshToken');
    const expiresAt = accessTokenExpiresAt ? new Date(parseInt(accessTokenExpiresAt)) : new Date();

    if (refreshToken && differenceInHours(expiresAt, now) < 1) {
      const res = await authApiRequest.refreshTokenFromNextClientToNextServer();
      localStorage.setItem('accessToken', res.payload.accessToken);
      localStorage.setItem('accessTokenExpires', res.payload.accessTokenExpires.toString());
      refresh();
    }
  };

  return null;
}
