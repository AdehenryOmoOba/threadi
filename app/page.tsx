import { getUsers } from "./utils/apiCalls/getUsers"


export default async function Home() {

  const usersList = await getUsers()
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <p>Hello world 👋</p>
     {Array.isArray(usersList) && usersList.map((user) => (<div key={user.uuid}>{JSON.stringify(user, null, 2)}</div>))}
    </main>
  )
}