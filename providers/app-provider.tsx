'use client';

import { clientSessionToken } from '@/lib/http';
import { GetMeResponseDto } from '@techcell/node-sdk';
import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext<{ user: GetMeResponseDto | null; setUser: (user: GetMeResponseDto | null) => void }>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = '',
  initialRefreshToken = '',
  user: userProp,
}: Readonly<{
  children: React.ReactNode;
  initialSessionToken?: string;
  initialRefreshToken?: string;
  user: GetMeResponseDto | null;
}>) {
  const [user, setUser] = useState<GetMeResponseDto | null>(userProp);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.accessValue = initialSessionToken;
      clientSessionToken.refreshValue = initialRefreshToken;
    }
  }, [initialSessionToken, initialRefreshToken]);

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}
