import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );

  if (process.env.NODE_ENV === 'development') {
    const mockUserId = 'b1371eca-f218-471b-9214-d3df8ff419ab';
    const mockUserEmail = 'malik@outono.org';

    // Mock authentication
    supabase.auth.getSession = async () => ({
      data: { session: { user: { id: mockUserId, email: mockUserEmail } } },
      error: null,
    });

    supabase.auth.getUser = async () => ({
      data: { user: { id: mockUserId, email: mockUserEmail } },
      error: null,
    });

    // Set Authorization header for all requests in development
    const originalRequest = supabase.rest.request;
    supabase.rest.request = async (method, path, options) => {
      const headers = options?.headers || {};
      headers['Authorization'] = `Bearer ${mockUserId}`;
      return originalRequest(method, path, { ...options, headers });
    };
  }

  return supabase;
}
