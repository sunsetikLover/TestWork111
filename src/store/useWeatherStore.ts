import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CityWeatherInfoTypes } from '@/types';

interface WeatherStore {
  favorites: CityWeatherInfoTypes[];
  toggleFavorite: (city: CityWeatherInfoTypes) => void;
  isFavorite: (cityId: number) => boolean;
}

export const useWeatherStore = create(
  persist<WeatherStore>(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (city) => {
        const favorites = get().favorites;
        const isFavorite = favorites.some((fav) => fav.id === city.id);
        set({
          favorites: isFavorite
            ? favorites.filter((fav) => fav.id !== city.id)
            : [...favorites, city],
        });
      },
      isFavorite: (cityId) => get().favorites.some((fav) => fav.id === cityId),
    }),
    {
      name: 'weather-app-favorites',
    },
  ),
);
