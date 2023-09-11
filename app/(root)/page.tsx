import ThreadiCard from "@/components/cards/ThreadiCard"
import { getThreadis } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import HeadText from "@/components/shared/HeadText"


export default async function Home() {

  const session = await getServerSession(authOptions)

  const user = session?.user

  console.log("user from home page: ", user)

  const response = await getThreadis(1, 25)

  // await new Promise((resolve, _) => setTimeout(resolve, 5000))

  const threadis = response && response.threads

  const isNext = response && response.isNext

  return (
    <>
     <HeadText content='Home' />
     <section className="mt-9 flex flex-col gap-5">
      {
        !threadis?.length ? (
          <p className="no-result">No threads to display 😐</p>
        ) : (<>
        {threadis.map((threadi) => {
          let isliked = false
          if(session?.user && threadi.likes){
            isliked = threadi.likes.some((id) => id === session.user?.pgUUID)
          }
          return (
            <ThreadiCard
             key={threadi.uuid}
             id={threadi.uuid}
             currentUser={user?.pgUUID}
             content={threadi.text}
             authorId={threadi.author}
             authorImage={threadi.author_image}
             authorName={threadi.author_name}
             authorEmail={threadi.author_email}
             communityId={threadi.community || undefined}
             communityName={threadi.community_name || undefined}
             communityImage={threadi.community_image || undefined}
             createdAt={threadi.created_at}
             commentsCount={threadi.replies_count}
             isComment={false}
             threadParentId={threadi.parent_id}
             isLiked={isliked}
             likesCount={threadi.likes?.length || 0}
             />
           )
        })}
        </>
        )}
     </section>
    </>
  )
}