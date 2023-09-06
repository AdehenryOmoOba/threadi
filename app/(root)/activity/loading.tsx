import HeadText from '@/components/shared/HeadText'
import ActivitySkeleton from '@/components/skeletons/ActivitySkeleton'
import React from 'react'

function loading() {

  const activities = Array.from({length: 10})
    
  return (
    <section>
      <HeadText content='Activity' />
      <section className='mt-10 flex flex-col gap-5'>
        {activities.map((_,i) => (<ActivitySkeleton key={i} />))}
      </section>
    </section>
  )
}

export default loading