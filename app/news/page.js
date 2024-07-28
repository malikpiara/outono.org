import Home from './news-client';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function HomeN() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Home user={user} />;
}
