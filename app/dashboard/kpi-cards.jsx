import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { MailIcon, Sparkle } from 'lucide-react';

export default function KpiCards({
  userCount,
  postCount,
  postsTrendPercentage,
  activeUsersCount,
  usersTrend,
  activeUsersTrend,
}) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
      <Card className=''>
        <CardContent className='flex flex-col gap-4 p-4'>
          <div className='flex w-full items-center justify-between'>
            <div>
              <CardTitle className='text-sm font-normal'>
                Updates Publicados
              </CardTitle>
              <div className='text-3xl font-semibold'>{postCount}</div>
              {postsTrendPercentage !== 0 && (
                <div className='text-sm text-muted-foreground'>
                  {postsTrendPercentage > 0 ? '+' : ''}
                  {postsTrendPercentage.toFixed(1)}% from last month
                </div>
              )}
              {postsTrendPercentage === 0 && (
                <div className='text-sm text-muted-foreground'>
                  No change from last month
                </div>
              )}
            </div>
            <MailIcon className='h-4 w-4 text-muted-foreground' />
          </div>
        </CardContent>
      </Card>
      <Card className=''>
        <CardContent className='flex flex-col gap-4 p-4'>
          <div className='flex w-full items-center justify-between'>
            <div>
              <CardTitle className='text-sm font-normal'>Respostas</CardTitle>
              <div className='text-3xl font-semibold'>0</div>
              <div className='text-sm text-muted-foreground'>
                +0 from last month
              </div>
            </div>
            <Sparkle className='h-4 w-4 text-muted-foreground' />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex flex-col gap-4 p-4'>
          <div className='flex w-full items-center justify-between'>
            <div>
              <CardTitle className='text-sm font-normal'>
                Community Members
              </CardTitle>
              <div className='text-3xl font-semibold'>{userCount}</div>
              {usersTrend !== undefined ? (
                <div className='text-sm text-muted-foreground'>
                  {usersTrend > 0 ? '+' : ''}
                  {usersTrend} from last month
                </div>
              ) : (
                <div className='text-sm text-muted-foreground'>
                  No data available for trend
                </div>
              )}
            </div>
            <UsersIcon className='h-4 w-4 text-muted-foreground' />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex flex-col gap-4 p-4'>
          <div className='flex w-full items-center justify-between'>
            <div>
              <CardTitle className='text-sm font-normal'>Active Now</CardTitle>
              <div className='text-3xl font-semibold'>{activeUsersCount}</div>
              {activeUsersTrend !== undefined ? (
                <div className='text-sm text-muted-foreground'>
                  {activeUsersTrend > 0 ? '+' : ''}
                  {activeUsersTrend} from last month
                </div>
              ) : (
                <div className='text-sm text-muted-foreground'>
                  No data available for trend
                </div>
              )}
            </div>
            <ActivityIcon className='h-4 w-4 text-muted-foreground' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2' />
    </svg>
  );
}

function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='20' height='14' x='2' y='5' rx='2' />
      <line x1='2' x2='22' y1='10' y2='10' />
    </svg>
  );
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' x2='12' y1='2' y2='22' />
      <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}
