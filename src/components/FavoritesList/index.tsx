import React from 'react';
import { type FavoriteRepo } from '@/stores/favoritesStore';
import FavoriteButton from '../FavoriteButton';

interface FavoritesListProps {
  favorites: FavoriteRepo[];
  onRemove?: (repoId: number) => void;
}

export default function FavoritesList({ favorites, onRemove }: FavoritesListProps) {
  if (!favorites.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">No favorites yet</h3>
        <p className="text-gray-500">Add repositories to your favorites to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {favorites.map((repo) => (
        <div key={repo.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <a 
                  href={repo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 font-semibold hover:underline truncate"
                >
                  {repo.full_name}
                </a>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  Favorite
                </span>
              </div>
              {repo.description && (
                <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                  {repo.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Added on: {new Date(repo.addedAt).toLocaleDateString('en-US')}
              </p>
            </div>
            <div className="ml-4 flex-shrink-0">
              <FavoriteButton repo={repo} size="sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 