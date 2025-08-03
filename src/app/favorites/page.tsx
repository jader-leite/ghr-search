'use client';
import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import FavoritesList from '@/components/FavoritesList';
import { ErrorBoundary } from '@/components';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites();

  const handleClearFavorites = () => {
    if (confirm('Are you sure you want to remove all favorites?')) {
      clearFavorites();
    }
  };

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-600">My Favorites</h1>
          {favorites.length > 0 && (
            <button
              onClick={handleClearFavorites}
              className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            {favorites.length === 0 
              ? 'You don\'t have any favorite repositories yet.'
              : `You have ${favorites.length} favorite repository${favorites.length !== 1 ? 's' : ''}.`
            }
          </p>
        </div>

        <FavoritesList favorites={favorites} />
      </div>
    </ErrorBoundary>
  );
} 