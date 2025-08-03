import { useState, useCallback } from 'react';

interface ApiError {
  error: string;
  details?: string;
  status?: number;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (url: string, options?: RequestInit) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        const error: ApiError = {
          error: errorData.error || `HTTP ${response.status}`,
          details: errorData.details || errorData.message || 'An error occurred',
          status: response.status,
        };

        setState(prev => ({
          ...prev,
          loading: false,
          error,
          data: null,
        }));

        return { error, data: null };
      }

      const data = await response.json();
      
      setState(prev => ({
        ...prev,
        loading: false,
        data,
        error: null,
      }));

      return { data, error: null };
    } catch (err) {
      const error: ApiError = {
        error: 'Network Error',
        details: 'Failed to connect to the server. Please check your internet connection.',
      };

      setState(prev => ({
        ...prev,
        loading: false,
        error,
        data: null,
      }));

      return { error, data: null };
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
} 