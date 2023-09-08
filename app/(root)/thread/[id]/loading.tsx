import ThreadiCardSkeleton from '@/components/skeletons/ThreadiCardSkeleton'
import React from 'react'

function loading() {
  return (
    <section className="mt-9 flex flex-col gap-5">
    <ThreadiCardSkeleton />
    </section>
  )
}

export default loading