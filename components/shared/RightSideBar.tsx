import React from 'react'

function RightSideBar() {
  return (
    <section className='custom_scrollbar rightsidebar'>

      <div className="flex flex-1 flex-col justify-start">
        <h1 className='text-heading4-medium text-light-1'>Suggested communities</h1>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h1 className='text-heading4-medium text-light-1'>Suggested Users</h1>
      </div>

    </section>
  )
}

export default RightSideBar