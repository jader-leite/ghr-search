'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const status = searchParams.get('status');
  const message = searchParams.get('message');

  const getErrorInfo = (status: string | null) => {
    switch (status) {
      case '400':
        return {
          title: 'Bad Request',
          description: 'The request could not be understood or was missing required parameters.',
          icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'bg-yellow-100 text-yellow-600'
        };
      case '401':
        return {
          title: 'Unauthorized',
          description: 'Authentication is required to access this resource.',
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          color: 'bg-red-100 text-red-600'
        };
      case '403':
        return {
          title: 'Forbidden',
          description: 'You do not have permission to access this resource.',
          icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
          color: 'bg-red-100 text-red-600'
        };
      case '422':
        return {
          title: 'Unprocessable Entity',
          description: 'The request was well-formed but contains invalid parameters.',
          icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
          color: 'bg-yellow-100 text-yellow-600'
        };
      default:
        return {
          title: 'Error',
          description: message || 'An unexpected error occurred.',
          icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z',
          color: 'bg-red-100 text-red-600'
        };
    }
  };

  const errorInfo = getErrorInfo(status);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className={`flex items-center justify-center w-16 h-16 mx-auto ${errorInfo.color} rounded-full mb-6`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={errorInfo.icon} />
          </svg>
        </div>
        
        {status && (
          <h1 className="text-6xl font-bold text-gray-900 mb-4">{status}</h1>
        )}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{errorInfo.title}</h2>
        <p className="text-gray-500 mb-8">
          {errorInfo.description}
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="block w-full mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
} 