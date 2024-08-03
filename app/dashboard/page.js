import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PostsBarChart, RepliesBarChart } from './bar-chart-label';
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

  // Get the date one month ago
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  // Fetch the user count
  const { count: userCount, userError } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // Fetch the post count
  const { count: postCount, error: postError } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  // Fetch the count of active users in the last month
  const { data: activeUsers, error: activeUsersError } = await supabase
    .from('posts')
    .select('author_id')
    .gte('created_at', oneMonthAgo.toISOString());

  const activeUsersCount = activeUsers
    ? new Set(activeUsers.map((post) => post.author_id)).size
    : 0;

  if (userError || postError || activeUsersError) {
    console.error(
      'Error fetching data:',
      userError || postError || activeUsersError
    );
  }

  return (
    <div className="flex flex-col gap-6 justify-center w-screen min-h-screen px-4">
      <KpiCards
        userCount={userCount || 0}
        postCount={postCount || 0}
        activeUsersCount={activeUsersCount}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PostsBarChart />
        <RepliesBarChart />
      </div>
    </div>
  );
}
