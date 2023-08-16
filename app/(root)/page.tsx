import ThreadiCard from "@/components/cards/ThreadiCard"
import { getThreadis } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs"


export default async function Home() {
  
  const user = await currentUser()

  const response = await getThreadis(1, 30)

  const threadis = response && response.threads

  const isNext = response && response.isNext
  
  return (
    <>
     <h1 className="head-text">Home Page 👋</h1>
     <section className="mt-9 flex flex-col gap-10">
      {
        !threadis?.length ? (
          <p className="no-result">No threads to display 😐</p>
        ) : (<>
        {threadis.map((threadi) => (
         <ThreadiCard
          key={threadi.thread_uuid}
          id={threadi.thread_uuid}
          currentUser={user?.id}
          content={threadi.thread_text}
          author={threadi.thread_author}
          communityId={threadi.community_uuid}
          communityName={threadi.community_name}
          communityImage={threadi.community_image}
          createdAt={threadi.created_at}
          commentsCount={threadi.comments_count}
          />
        ))}
        </>)
      }

     </section>
    </>
  )
}