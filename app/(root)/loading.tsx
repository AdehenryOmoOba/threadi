import HeadText from '@/components/shared/HeadText'
import ThreadiCardSkeleton from '@/components/skeletons/ThreadiCardSkeleton'
import React from 'react'

function loading() {

  const threads = Array.from({length: 5})

  return (
    <>
    <HeadText content='Home' />
    <section className="mt-9 flex flex-col gap-5">
      {threads.map((_, i) => (<ThreadiCardSkeleton key={i} />) )}
    </section>
   </>
  )
}

export default loading