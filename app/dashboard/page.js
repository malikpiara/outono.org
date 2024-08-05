import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { PostsBarChart } from './charts/posts';
import { RepliesBarChart } from './charts/replies';
import KpiCards from './kpi-cards';

export default async function Dashboard() {
  const supabase = createClient();
  const session = await getSession(supabase);
  if (!session) redirect('/login');

  const { userCount, postCount, activeUsersCount } =
    await fetchCounts(supabase);
  const { chartData, trendPercentage } = await fetchChartData(supabase);
  const { usersTrend, activeUsersTrend } = await fetchTrends(
    supabase,
    userCount,
    activeUsersCount
  );

  return (
    <div className="flex flex-col gap-6 justify-center w-screen min-h-screen px-4">
      <KpiCards
        userCount={userCount}
        postCount={postCount}
        postsTrendPercentage={trendPercentage}
        activeUsersCount={activeUsersCount}
        usersTrend={usersTrend}
        activeUsersTrend={activeUsersTrend}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PostsBarChart data={chartData} trendPercentage={trendPercentage} />
        <RepliesBarChart data={chartData} trendPercentage={trendPercentage} />
      </div>
    </div>
  );
}

async function getSession(supabase) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

async function fetchCounts(supabase) {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const [{ count: userCount }, { count: postCount }, { data: activeUsers }] =
    await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase
        .from('posts')
        .select('author_id')
        .gte('created_at', oneMonthAgo.toISOString()),
    ]);

  const activeUsersCount = activeUsers
    ? new Set(activeUsers.map((post) => post.author_id)).size
    : 0;

  return {
    userCount: userCount || 0,
    postCount: postCount || 0,
    activeUsersCount,
  };
}

async function fetchChartData(supabase) {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 6, 1); // July 1st
  const currentDate = new Date();

  const { data: postsByMonth } = await supabase
    .from('posts')
    .select('created_at')
    .gte('created_at', startDate.toISOString())
    .order('created_at');

  const postCounts =
    postsByMonth?.reduce((acc, post) => {
      const month = new Date(post.created_at).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}) || {};

  const months = ['July', 'August', 'September', 'October', 'November'];
  const chartData = months
    .map((month, index) => {
      const monthIndex = 6 + index;
      const year = currentYear + (monthIndex > 11 ? 1 : 0);
      const monthDate = new Date(year, monthIndex % 12);
      return monthDate <= currentDate
        ? { month, count: postCounts[monthIndex % 12] || null }
        : null;
    })
    .filter(Boolean);

  const trendPercentage = calculateTrendPercentage(chartData, currentDate);

  return { chartData, trendPercentage };
}

function calculateTrendPercentage(chartData, currentDate) {
  const currentMonthIndex = currentDate.getMonth() - 6;
  const currentMonthCount = chartData[currentMonthIndex]?.count ?? 0;
  const previousMonthCount = chartData[currentMonthIndex - 1]?.count ?? 0;

  if (previousMonthCount > 0 && currentMonthCount !== null) {
    return (
      ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100
    );
  }
  return 0;
}

async function fetchTrends(supabase, userCount, activeUsersCount) {
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  const oneMonthAgo = new Date(twoMonthsAgo);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() + 1);

  const [{ count: previousUserCount }, { data: previousActiveUsers }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', oneMonthAgo.toISOString()),
      supabase
        .from('posts')
        .select('author_id')
        .gte('created_at', twoMonthsAgo.toISOString())
        .lt('created_at', oneMonthAgo.toISOString()),
    ]);

  const previousActiveUsersCount = previousActiveUsers
    ? new Set(previousActiveUsers.map((post) => post.author_id)).size
    : 0;

  return {
    usersTrend: userCount - (previousUserCount || 0),
    activeUsersTrend: activeUsersCount - previousActiveUsersCount,
  };
}
