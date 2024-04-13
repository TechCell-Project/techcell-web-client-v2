'use client';

import { clientSessionToken } from '@/lib/http';
import { User } from '@techcell/node-sdk';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

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
  inititalSessionToken = '',
  user: userProp,
}: Readonly<{
  children: React.ReactNode;
  inititalSessionToken?: string;
  user: User | null;
}>) {
  const [user, setUser] = useState<User | null>(userProp);
  
  useState(() => {
    if (typeof window !== 'undefined') {
      clientSessionToken.value = inititalSessionToken;
    }
  });

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
}
