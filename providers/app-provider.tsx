'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@techcell/node-sdk';
import { isClient } from '@/lib/http';
import { differenceInMinutes } from 'date-fns';
import { authApiRequest } from '@/apiRequests';

const AppContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
});

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

export default function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { refresh } = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    return null;
  });
  const isAuthenticated = Boolean(user);
  const accessToken = isClient ? localStorage.getItem('accessToken') : null;
  const refreshToken = isClient ? localStorage.getItem('refreshToken') : null;
  const accessTokenExpires = isClient ? localStorage.getItem('accessTokenExpires') : null;

  const setUserToStorage = useCallback(
    (user: User | null) => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [setUser],
  );

  const handleLogoutCurrentUser = async () => {
    console.log('logout user');
    setUser(null);
    await authApiRequest.logoutFromNextClientToNextServer(true);
    localStorage.removeItem('user');
  };

  // useEffect(() => {
  //   if (!refreshToken || refreshToken === 'undefined' || !accessTokenExpires || accessTokenExpires === 'undefined') {
  //     handleLogoutCurrentUser();
  //     return;
  //   }

  //   const firstRefresh = async () => {
  //     const res = await authApiRequest.refreshTokenFromNextClientToNextServer();
  //     localStorage.setItem('accessToken', res.payload.accessToken);
  //     localStorage.setItem('accessTokenExpires', res.payload.accessTokenExpires.toString());
  //     refresh();
  //   }

  //   if (differenceInMinutes(new Date(parseInt(accessTokenExpires)), new Date()) < 10) {
  //     firstRefresh();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!accessToken || accessToken === 'undefined') {
      handleLogoutCurrentUser();
      return;
    }
    const _user = localStorage.getItem('user');
    setUser(_user ? JSON.parse(_user) : null);
  }, [setUser, accessToken]);

  return (
    <AppContext.Provider value={{ user, setUser: setUserToStorage, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
