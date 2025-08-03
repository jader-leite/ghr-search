import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '10';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const githubUrl = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    
    const response = await fetch(githubUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ghr-search-app'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 403) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded. Please try again later.',
            details: errorData.message || 'GitHub API rate limit reached'
          },
          { status: 429 }
        );
      }
      
      if (response.status === 422) {
        return NextResponse.json(
          { 
            error: 'Invalid search query. Please check your search terms.',
            details: errorData.message || 'Validation failed'
          },
          { status: 422 }
        );
      }

      return NextResponse.json(
        { 
          error: 'Failed to fetch repositories from GitHub',
          details: errorData.message || 'Unknown error occurred'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      items: data.items || [],
      total_count: data.total_count || 0,
      incomplete_results: data.incomplete_results || false
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: 'An unexpected error occurred while processing your request'
      },
      { status: 500 }
    );
  }
} 