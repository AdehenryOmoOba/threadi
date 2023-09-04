import ThreadiCardSkeleton from '@/components/skeletons/ThreadiCardSkeleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {

  const threads = Array.from({length: 5})
    
  return (
    <section>
    <div className='flex w-full flex-col justify-start pt-12'>
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 mb-6">
            <Skeleton className='relative h-20 w-20 object-cover rounded-full bg-slate-600' />
            <div className="flex-1">
                <Skeleton className='h-5 w-40 mb-3 bg-slate-600'/>
                <Skeleton className='h-3 w-32 bg-slate-600'/>
            </div>
        </div>
    </div>
      <Skeleton className='h-2 w-80 mb-3 bg-slate-600'/>
      <Skeleton className='h-2 w-60 bg-slate-600'/>
      <div className='mt-2 h-0.5 w-full bg-dark-3' />
    </div>

   <div className="mt-9">
   <div className="w-full">
     <Skeleton className='tab mb-9' />
     {threads.map((_, i) => (<ThreadiCardSkeleton key={i} />))}
   </div>
   </div>
   </section>
  )
}

export default loading