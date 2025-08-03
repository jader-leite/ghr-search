'use client'
import { Pagination, RepoList, SearchBar, ErrorMessage, ErrorBoundary } from "@/components";
import { useEffect, useState } from "react";

interface ApiError {
  error: string;
  details?: string;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [repos, setRepos] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const searchRepos = async () => {
    if (!query) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&page=${page}&per_page=10`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        setError({
          error: errorData.error || 'An error occurred',
          details: errorData.details
        });
        setRepos([]);
        setTotalCount(0);
        return;
      }
      
      const data = await response.json();
      setRepos(data.items || []);
      setTotalCount(data.total_count || 0);
    } catch (err) {
      setError({
        error: 'Failed to connect to the server',
        details: 'Please check your internet connection and try again.'
      });
      setRepos([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) searchRepos();
  }, [page]);

  const handleRetry = () => {
    searchRepos();
  };

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Search Repositories</h1>
          <p className="text-center text-gray-600">Find and save your favorite GitHub repositories</p>
        </div>
        
        <SearchBar query={query} setQuery={setQuery} onSearch={() => { setPage(1); searchRepos(); }} />
        
        {loading ? (
          <div className="text-center mt-6">
            <div className="inline-flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          </div>
        ) : error ? (
          <div className="mt-6">
            <ErrorMessage
              title="Search Error"
              message={error.error}
              details={error.details}
              onRetry={handleRetry}
            />
          </div>
        ) : (
          <RepoList repos={repos} />
        )}
        
        {!loading && !error && totalCount > 0 && (
          <Pagination
            currentPage={page}
            totalCount={totalCount}
            perPage={10}
            onPageChange={setPage}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
