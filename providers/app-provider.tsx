'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '@techcell/node-sdk';
import { isClient } from '@/lib/http';
import { differenceInHours } from 'date-fns';
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
  const [user, setUser] = useState<User | null>(() => {
    return null;
  });
  const isAuthenticated = Boolean(user);
  const accessToken = isClient ? localStorage.getItem('accessToken') : null;

  const setUserToStorage = useCallback(
    (user: User | null) => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    },
    [setUser],
  );

  const handleLogoutCurrentUser = async () => {
    setUser(null);
    await authApiRequest.logoutFromNextClientToNextServer(true);
    localStorage.removeItem('user');
  };

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
