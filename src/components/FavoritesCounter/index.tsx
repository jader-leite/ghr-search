import React from 'react';
import { useFavoritesStore } from '@/stores/favoritesStore';

export default function FavoritesCounter() {
  const favorites = useFavoritesStore((state) => state.favorites);
  
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{favorites.length} favorite{favorites.length !== 1 ? 's' : ''}</span>
    </div>
  );
} 