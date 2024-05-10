import { useLocalStorageState } from 'ahooks';

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useLocalStorageState<string[]>('recent-searches', {
    defaultValue: [],
  });

  return {
    recentSearches,
    setRecentSearches,
  };
};
