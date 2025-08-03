import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FavoriteRepo {
  id: number;
  html_url: string;
  full_name: string;
  description: string | null;
  addedAt: string;
}

interface FavoritesState {
  favorites: FavoriteRepo[];
  addFavorite: (repo: Omit<FavoriteRepo, 'addedAt'>) => void;
  removeFavorite: (repoId: number) => void;
  isFavorite: (repoId: number) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (repo: Omit<FavoriteRepo, 'addedAt'>) => {
        const { favorites } = get();
        const exists = favorites.some(fav => fav.id === repo.id);
        
        if (!exists) {
          const newFavorite: FavoriteRepo = {
            ...repo,
            addedAt: new Date().toISOString(),
          };
          
          set({ favorites: [...favorites, newFavorite] });
        }
      },
      
      removeFavorite: (repoId: number) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.id !== repoId) });
      },
      
      isFavorite: (repoId: number) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === repoId);
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'github-favorites',
    }
  )
); 