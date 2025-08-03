import Link from 'next/link';

export default function RateLimitExceeded() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-yellow-100 rounded-full mb-6">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">429</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Too Many Requests</h2>
        <p className="text-gray-500 mb-8">
          You have exceeded the rate limit. Please wait a moment before trying again.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go Home
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="block w-full mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 