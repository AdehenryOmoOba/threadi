import HeadText from '@/components/shared/HeadText'
import SearchSkeleton from '@/components/skeletons/SearchSkeleton'
import React from 'react'

function loading() {

  const threads = Array.from({length: 10})

  return (
    <section>
      <HeadText content='Search' />
      <div className="mt-14 flex flex-col gap-9">
        {threads.map((_,i) => (<SearchSkeleton />))}
      </div>
    </section>
  )
}

export default loading