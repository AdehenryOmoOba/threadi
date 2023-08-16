import { type ClassValue, clsx } from "clsx";
import { revalidatePath ,revalidateTag } from "next/cache";
import { twMerge } from "tailwind-merge";


let origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : `https://threadi.vercel.app/`;

export default origin;

export type ThreadRow =   {
  thread_uuid: string,
  thread_text: string,
  author: string,
  community: string,
  created_at: string,
  likes: string[] | null,
  reposts: string[] | null,
  shares_count:  number,
  views_count:  number,
  comments_count: number,
  community_uuid: string,
  community_name: string,
  community_image: string,
  thread_author: {
    author_uuid: string,
    author_username: string,
    author_name: string,
    author_image: string,
    author_bio: string,
    author_onboarded: boolean
  },
  comments: {
    comment_uuid: string,
    comment_text: string,
    user_uuid: string,
    user_username: string,
    user_name: string,
    user_image: string,
    user_bio: string,
    user_onboarded: boolean
  }[]
}

type CommentsRepliesRow = {
    comment_uuid: string,
    comment_text:  string,
    comment_parent_id: string,
    replies_count: number,
    replies: {
      comment_uuid: string,
      comment_text: string,
      comment_parent_id: string,
      author_image: string
    }[]
  }
  


export function threadisCleanUp(data: unknown[]): ThreadRow[] {
  const cleanDtata = data.map((row: any) => {
    if(!row.comments[0].comment_uuid){
      row.comments = []
      row.comments_count = 0
    }else{
      row.comments_count = row.comments.length
    }
    return row
  })
  return cleanDtata
}

export function commentsRepliesCleanUp(data: unknown[]): CommentsRepliesRow[] {
  const cleanDtata = data.map((row: any) => {
    if(!row.replies[0].comment_uuid){
      row.replies = []
      row.replies_count = 0
    }else{
      row.replies_count = row.replies.length
    }
    return row
  })
  return cleanDtata
}


export type UserInfo = {
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
}

type DbUser = {
  username: string;
  image: string | null;
  uuid: string;
  name: string;
  bio: string | null;
  onboarded: boolean | null;
  communitiesInfo: {
      username: string;
      image: string | null;
      uuid: string;
      name: string;
      bio: string | null;
      createdBy: string;
  }[];
}

type Threadi =  {
  uuid: string;
  parentId: string | null;
  text: string;
  author: string;
  community: string | null;
  createdAt: Date;
  comments_replies: string | null;
  reposts: string | null;
  sharesCount: string | null;
  viewsCount: number;
  authorInfo: {
    uuid: string
    name: string
    image: string
  },
  communitiesInfo: {
    uuid: string
    name: string
    image: string
  } | null
}

export type NewThreadInfo = {
  text: string;
  author: string;
  community: string | null;
  path: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}

export async function updateUser(userInfo: UserInfo) {
  try {
    const response = await fetch(`${origin}api/update-user`, {
      method: "PUT",
      body: JSON.stringify(userInfo)
    })
    const updatedUser = await response.json()
    return updatedUser
  } catch (error: any) {
    console.log(error.message)
  }
}

export async function findUser(username: string) {
  try {
    const response = await fetch(`${origin}api/find-user?username=${username}`)
    const user: DbUser = await response.json()
    return user
  } catch (error: any) {
    console.log(error.message)
  }
}

type GetThreadis = {
  threads: ThreadRow[]
  isNext: boolean
}

export async function getThreadis(page=1, size=20): Promise<GetThreadis | null> {

  try {
    const response = await fetch(`${origin}api/get-threadis?page=${page}&size=${size}`, {
      cache: "no-store"
    })

    if(!response.ok) throw new Error("No threadis")
  
    const threadis: GetThreadis = await response.json()
  
    return threadis

  } catch (error: any) {
    console.log(error.message)
    return null
  }
}

export async function getComments(id: string): Promise<Threadi[] | null> {

  try {

    const response = await fetch(`${origin}api/comments?id=${id}`)

    const comments = await response.json()

    return comments

  } catch (error: any) {
    console.log(error.message)
    return null 
    
  }
}

export async function createThreadi(threadiInfo: NewThreadInfo) {
  try {
    const response = await fetch(`${origin}api/create-threadi`, {
      method: "POST",
      body: JSON.stringify(threadiInfo)
    })
    await response.json()
    revalidatePath("/?tag=tag")
  } catch (error: any) {
    console.log(error.message)
  }
}