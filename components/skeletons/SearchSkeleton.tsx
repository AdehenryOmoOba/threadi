import React from 'react'
import { Skeleton } from '../ui/skeleton'

function SearchSkeleton() {

  return (
   <div className='flex w-full h-8 items-center'>
    <Skeleton className='w-12 bg-slate-600 h-12 rounded-full mr-3'/>
    <div className='flex justify-between items-center h-12 flex-1'>
      <Skeleton className='h-4 bg-slate-600 w-1/2' />
      <Skeleton className='h-8 bg-slate-600 rounded-lg w-16' />
    </div>
   </div>
  )
}

export default SearchSkeleton