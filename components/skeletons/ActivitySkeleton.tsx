import React from 'react'
import { Skeleton } from '../ui/skeleton'

function ActivitySkeleton() {
  return (
    <div className="relative flex w-full rounded-xl p-9 h-52 bg-dark-2">
        <div className='flex items-center h-4 w-11/12 max-w-[700px]'>
          <Skeleton className='h-6 w-6 rounded-full mr-2 bg-slate-600' />
          <Skeleton className='h-3 flex-1 bg-slate-600' />
        </div>
        <div className='absolute left-14 w-3/4 flex self-end'>
          <div className='flex items-center flex-col w-11 h-full mr-4'>
            <Skeleton className='h-11 w-11 rounded-full bg-slate-600' />
          </div>
          <div className='relative flex flex-col flex-1 h-full'>
            <Skeleton className='w-2/5 max-w-2xl h-4 mb-4 bg-slate-600' />
            <Skeleton className='w-full max-w-[500px] h-3 mb-1 bg-slate-600' />
            <Skeleton className='w-full max-w-[500px] h-3 mb-1 bg-slate-600' />
            <Skeleton className='w-3/5 max-w-[300px] h-3 mb-4 bg-slate-600' />
          </div>
        </div>

    </div>
  )
}

export default ActivitySkeleton