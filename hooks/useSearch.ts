import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useSearch = create<SearchState>((set) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));