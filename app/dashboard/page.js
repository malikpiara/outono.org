import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { BarChartLabel } from './bar-chart-label';

export default async function Dashboard() {
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

  return (
    <div className="flex justify-center w-screen min-h-screen items-center">
      <div className="w-[650px]">
        <BarChartLabel />
      </div>
    </div>
  );
}
