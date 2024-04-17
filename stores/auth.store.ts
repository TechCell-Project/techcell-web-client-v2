import { User } from '@techcell/node-sdk';
import { create, createStore } from 'zustand';

export type AuthState = {
  user: User | null;
  isLoading: boolean;
};

export type AuthActions = {
  setUser: (user: User | null) => void;
  onFetching: () => void;
  onFetchedDone: () => void;
  reset: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => {
  return {
    user: null,
    isLoading: false,
  };
};

export const initialState: AuthState = {
  user: null,
  isLoading: false,
};

export const createAuthStore = (initState: AuthState = initialState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    setUser: (user: User | null) => set(() => ({ user })),
    onFetching: () => set(() => ({ isLoading: true })),
    onFetchedDone: () => set(() => ({ isLoading: false })),
    reset: () => set(() => ({ ...initState })),
  }));
};
