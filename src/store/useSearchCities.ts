import { create } from 'zustand';

import { CitiesService } from '@/services';
import { CitiesTypes } from '@/types';

interface SearchCitiesStore {
  searchResults: CitiesTypes | null;
  isLoading: boolean;
  fetchSearchResults: (query: string) => Promise<void>;
}

export const useSearchCitiesStore = create<SearchCitiesStore>((set) => ({
  searchResults: null,
  isLoading: false,
  fetchSearchResults: async (query: string) => {
    if (!query || query.length < 3) {
      set({ searchResults: null, isLoading: false });
      return;
    }

    set({ isLoading: true });
    try {
      const { data: cities } = await CitiesService.getCitiesByFilters(query);

      set({ searchResults: cities, isLoading: false });
    } catch {
      set({ searchResults: null, isLoading: false });
    }
  },
}));
