import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  if (process.env.NODE_ENV === 'development') {
    const mockUserId = 'b1371eca-f218-471b-9214-d3df8ff419ab';
    const mockUserEmail = 'malik@outono.org';

    // Set the auth context for development
    supabase.auth.getSession = async () => ({
      data: { session: { user: { id: mockUserId, email: mockUserEmail } } },
      error: null,
    });

    supabase.auth.getUser = async () => ({
      data: { user: { id: mockUserId, email: mockUserEmail } },
      error: null,
    });

    // Intercept requests to add the Authorization header
    const originalRequest = supabase.rest.request;
    supabase.rest.request = async (method, path, options) => {
      const headers = options?.headers || {};
      headers['Authorization'] = `Bearer ${mockUserId}`;
      return originalRequest(method, path, { ...options, headers });
    };
  }

  return supabase;
}
