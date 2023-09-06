import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchUsers, findUser } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import UserCard from '@/components/cards/UserCard'
import HeadText from '@/components/shared/HeadText'
import defaultImage from "@/public/assets/user.svg"


async function page() {

  const session = await getServerSession(authOptions)
  
  const result = await fetchUsers({userId: session?.user?.pgUUID || "", searchString: "", pageNumber: 1, pageSize: 20, sortBy: ""})

  const users = result?.users
  
  return (
    <section>
      <HeadText content='Search' />
    
      {/* TODO: Search bar  */}

      <div className="mt-14 flex flex-col gap-9">
        {users && !users.length && (<p className='no-result'>No users</p>)}
        {users && users.map((user) => (
            <UserCard key={user.uuid} userType='user' id={user.uuid} name={user.name} imgUrl={user.image} email={user.email}  />
          ))}
      </div>



    </section>
  )
}

export default page