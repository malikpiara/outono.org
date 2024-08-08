import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  if (process.env.NODE_ENV === 'development') {
    const mockUserId = 'b1371eca-f218-471b-9214-d3df8ff419ab';
    const mockUserEmail = 'malik@outono.org';

    // Mock authentication
    (supabase.auth.getSession as any) = async () => ({
      data: { session: { user: { id: mockUserId, email: mockUserEmail } } },
      error: null,
    });

    (supabase.auth.getUser as any) = async () => ({
      data: { user: { id: mockUserId, email: mockUserEmail } },
      error: null,
    });

    // Set Authorization header for all requests in development
    const supabaseClient = supabase as any;
    const originalFetch = supabaseClient.fetch;
    supabaseClient.fetch = async (input: RequestInfo, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      headers.set('Authorization', `Bearer ${mockUserId}`);
      return originalFetch(input, { ...init, headers });
    };
  }

  return supabase;
}
