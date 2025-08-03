'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FavoritesCounter } from '@/components';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Search' },
    { href: '/favorites', label: 'Favorites' }
  ];

  return (
    <nav className="shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.href === '/favorites' && <FavoritesCounter />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 