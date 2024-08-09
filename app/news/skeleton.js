import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

export function SkeletonTitle() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='space-y-4'>
        <Skeleton className='h-9 w-[650px]' />
      </div>
    </div>
  );
}

export function SkeletonSummary() {
  return (
    <div className='flex items-center space-x-4'>
      <div className='space-y-4'>
        <Skeleton className='h-5 w-[150px]' />
        <Skeleton className='h-4 w-[550px]' />
        <Skeleton className='h-4 w-[450px]' />
      </div>
    </div>
  );
}

export function SkeletonPost() {
  return (
    <>
      <Skeleton className='h-5 w-[150px]' />
      <Card className='w-full md:w-[650px]'>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-14 w-14 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex w-full flex-col space-y-8'>
            <div className='flex flex-col gap-3'>
              <Skeleton className='h-5 w-[600px]' />
              <Skeleton className='h-5 w-[550px]' />
              <Skeleton className='h-5 w-[550px]' />
            </div>
            <div>
              <div className='space-y-4'>
                <Skeleton className='h-28 w-[600px]' />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <div />
          <div className={'w-full sm:w-fit'}></div>
        </CardFooter>
      </Card>
    </>
  );
}
