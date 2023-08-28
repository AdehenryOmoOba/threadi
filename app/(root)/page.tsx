import ThreadiCard from "@/components/cards/ThreadiCard"
import { getThreadis } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import HeadText from "@/components/shared/HeadText"


export default async function Home() {

  const session = await getServerSession(authOptions)

  const user = session?.user

  console.log("user from home page: ", user)

  const response = await getThreadis(1, 10)

  const threadis = response && response.threads

  const isNext = response && response.isNext

  return (
    <>
     {/* <h1 className="head-text">Home Page 👋</h1> */}
     <HeadText content='Home' />
     <section className="mt-9 flex flex-col gap-10">
      {
        !threadis?.length ? (
          <p className="no-result">No threads to display 😐</p>
        ) : (<>
        {threadis.map((threadi) => {
          return (
            <ThreadiCard
             key={threadi.thread_uuid}
             id={threadi.thread_uuid}
             currentUser={user?.pgUUID}
             content={threadi.thread_text}
             authorId={threadi.thread_author.author_uuid}
             authorImage={threadi.thread_author.author_image}
             authorName={threadi.thread_author.author_name}
             communityId={threadi.community_uuid}
             communityName={threadi.community_name}
             communityImage={threadi.community_image}
             createdAt={threadi.created_at}
             commentsCount={threadi.comments_count}
             />
           )
        })}
        </>
        )}
     </section>
    </>
  )
}