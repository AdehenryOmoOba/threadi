import { getUsers } from "./utils/apiCalls/getUsers"
// import { getIPAddress } from "./utils/libs/getIPAddress"


export default async function Home() {

  // const ipAddress = getIPAddress()

  // console.log({ipAddress})

  // const usersList = await getUsers()

  const usersList = [{uuid: 123 ,name: "foo"}]

  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <p>Hello world 👋</p>
     {Array.isArray(usersList) && usersList.map((user) => (<div key={user.uuid}>{JSON.stringify(user, null, 2)}</div>))}
    </main>
  )
}