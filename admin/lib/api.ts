const MAIN_APP_URL = 
  process.env.NEXT_PUBLIC_MAIN_APP_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://wct-final.rachhy.online');

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Use same-origin relative /api endpoint in browser so Next.js server proxy handles it with 0 CORS issues!
  const url = typeof window !== 'undefined'
    ? `/api${cleanEndpoint}`
    : `${MAIN_APP_URL}/api${cleanEndpoint}`;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  // Only attach Content-Type if sending payload body
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

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
 * point directly to the main application running on https://wct-final.rachhy.online.
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
