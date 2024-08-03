import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { BarChartLabel } from './bar-chart-label';
import KpiCards from './kpi-cards';

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
    <div className="flex flex-col gap-6 justify-center w-screen min-h-screen px-4">
      <KpiCards />
      <div className="w-full sm:w-1/2">
        <BarChartLabel />
      </div>
    </div>
  );
}
