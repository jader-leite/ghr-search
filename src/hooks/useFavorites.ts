import { useFavoritesStore, type FavoriteRepo } from '../stores/favoritesStore';

export type { FavoriteRepo };

export function useFavorites() {
  const { 
    favorites, 
    addFavorite, 
    removeFavorite, 
    isFavorite, 
    clearFavorites 
  } = useFavoritesStore();

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };
} 