import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  // Create a server's supabase client with newly configured cookie,
  // which could be used to maintain user's session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
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
    const mockUserEmail = 'malik@outono.org';

    // Mock authentication
    supabase.auth.getSession = async () => ({
      data: {
        session: {
          user: {
            id: 'b1371eca-f218-471b-9214-d3df8ff419ab',
            email: mockUserEmail,
          },
        },
      },
      error: null,
    });

    supabase.auth.getUser = async () => ({
      data: {
        user: {
          id: 'b1371eca-f218-471b-9214-d3df8ff419ab',
          email: mockUserEmail,
        },
      },
      error: null,
    });

    // Wrap data fetching methods to use the mock user email
    const originalFrom = supabase.from.bind(supabase);
    supabase.from = (table) => {
      const query = originalFrom(table);
      const originalSelect = query.select.bind(query);
      query.select = (...args) => {
        const selectQuery = originalSelect(...args);
        const originalEq = selectQuery.eq.bind(selectQuery);
        selectQuery.eq = (column, value) => {
          if (column === 'email' && value === undefined) {
            return originalEq(column, mockUserEmail);
          }
          return originalEq(column, value);
        };
        return selectQuery;
      };
      return query;
    };
  }
  return supabase;
}
