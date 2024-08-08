import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

// If you have a Database type, uncomment the next line and provide the correct import
// import { Database } from '@/types/supabase';

export function createClient(): SupabaseClient {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  if (process.env.NODE_ENV === 'development') {
    const mockUserId = 'b1371eca-f218-471b-9214-d3df8ff419ab';
    const mockUserEmail = 'malik@outono.org';

    // Set the auth context for development
    (supabase.auth.getSession as any) = async () => ({
      data: { session: { user: { id: mockUserId, email: mockUserEmail } } },
      error: null,
    });

    (supabase.auth.getUser as any) = async () => ({
      data: { user: { id: mockUserId, email: mockUserEmail } },
      error: null,
    });

    // Intercept requests to add the Authorization header
    const supabaseAny = supabase as any;
    const originalFetch = supabaseAny.fetch;
    supabaseAny.fetch = async (input: RequestInfo, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      headers.set('Authorization', `Bearer ${mockUserId}`);
      return originalFetch(input, { ...init, headers });
    };
  }

  return supabase;
}
