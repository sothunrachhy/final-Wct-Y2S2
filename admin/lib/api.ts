const MAIN_APP_URL = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'http://localhost:3000';
const API_BASE_URL = process.env.NEXT_PUBLIC_MAIN_APP_API || `${MAIN_APP_URL}/api`;

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error (${response.status}): ${response.statusText}`);
  }

  return response.json();
}

/**
 * Resolves image URLs so relative paths like `/assets/recipes/...` 
 * point directly to the main application running on port 3000.
 */
export function getImageUrl(url: string | undefined): string {
  if (!url || url.trim() === '') {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop';
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${MAIN_APP_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}
