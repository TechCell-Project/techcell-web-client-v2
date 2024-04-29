'use client';

import { createContext, useContext, useState } from 'react';
import { clientSessionToken } from '@/lib/http';
import { GetMeResponseDto } from '@techcell/node-sdk';
import { jwtDecode } from 'jwt-decode';

const AppContext = createContext<{
  user: GetMeResponseDto | null;
  setUser: (user: GetMeResponseDto | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);

  return context;
};

export default function AppProvider({
  children,
  initialSessionToken,
  initialRefreshToken,
  user: userProp,
}: Readonly<{
  children: React.ReactNode;
  initialSessionToken?: string;
  initialRefreshToken?: string;
  user: GetMeResponseDto | null;
}>) {
  const [user, setUser] = useState<GetMeResponseDto | null>(userProp);

  useState(() => {
    if (typeof window !== 'undefined') {
      if (initialSessionToken && initialRefreshToken) {
        clientSessionToken.accessValue = initialSessionToken;
        clientSessionToken.refreshValue = initialRefreshToken;
        clientSessionToken.expiresAt = new Date(
          jwtDecode(clientSessionToken.accessValue).exp!.toString(),
        ).toISOString();
      }
    }
  });

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}
