import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  repo: {
    id: number;
    html_url: string;
    full_name: string;
    description: string | null;
  };
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoriteButton({ repo, size = 'md' }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(repo.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(repo.id);
    } else {
      addFavorite(repo);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <button
      onClick={handleToggle}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
        favorite 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
      }`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`}
        fill={favorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
} 