'use client';

import { clientSessionToken } from '@/lib/http';
import { User } from '@techcell/node-sdk';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({
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
  user: User | null;
}>) {
  const [user, setUser] = useState<User | null>(userProp);
  
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.accessValue = initialSessionToken;
      clientSessionToken.refreshValue = initialRefreshToken;
    }
  });

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}
