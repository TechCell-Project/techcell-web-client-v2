'use client';

import { clientSessionToken } from '@/lib/http';
import { User } from '@techcell/node-sdk';
import { createContext, useContext, useMemo, useState } from 'react';

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

  if (typeof window !== 'undefined') {
    clientSessionToken.value = inititalSessionToken;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contextValue = useMemo(() => ({ user, setUser }), []);

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
