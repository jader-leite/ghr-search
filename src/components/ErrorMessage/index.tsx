interface ErrorMessageProps {
  title?: string;
  message: string;
  details?: string;
  status?: number;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorMessage({
  title = 'Error',
  message,
  details,
  status,
  onRetry,
  showRetry = true
}: ErrorMessageProps) {
  const getStatusColor = (status?: number) => {
    if (!status) return 'bg-red-100 text-red-600';
    if (status >= 500) return 'bg-red-100 text-red-600';
    if (status >= 400) return 'bg-yellow-100 text-yellow-600';
    return 'bg-blue-100 text-blue-600';
  };

  const getStatusIcon = (status?: number) => {
    if (!status) return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    );
    
    if (status >= 500) return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    );
    
    if (status >= 400) return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    );
    
    return (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(status)}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {getStatusIcon(status)}
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-medium text-gray-900">
            {title}
            {status && <span className="ml-2 text-sm text-gray-500">({status})</span>}
          </h3>
          <p className="mt-1 text-sm text-gray-600">{message}</p>
          {details && (
            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700">
                Show details
              </summary>
              <p className="mt-1 text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded">
                {details}
              </p>
            </details>
          )}
          {showRetry && onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 