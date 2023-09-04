import React from 'react'
import { Skeleton } from '../ui/skeleton'

function ThreadiCardSkeleton() {
  return (
    <div className="flex w-full rounded-xl p-7 h-44 bg-dark-2">
        <div className='flex items-center flex-col w-11 h-full mr-4'>
            <Skeleton className='h-11 w-11 rounded-full bg-slate-600' />
            <div className='w-[2px] mt-2 h-4 bg-slate-800 grow' />
        </div>
        <div className='relative flex flex-col flex-1 h-full py-2'>
            <Skeleton className='w-2/5 max-w-2xl h-5 mb-4 bg-slate-600' />
            <Skeleton className='w-full max-w-[500px] h-4 mb-1 bg-slate-600' />
            <Skeleton className='w-full max-w-[500px] h-4 mb-1 bg-slate-600' />
            <Skeleton className='w-3/5 max-w-[300px] h-4 mb-4 bg-slate-600' />
            <Skeleton className='w-full max-w-[500px] h-6 bg-slate-600'/>
        </div>
    </div>
  )
}

export default ThreadiCardSkeleton