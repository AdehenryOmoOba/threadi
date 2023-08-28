import { type ClassValue, clsx } from "clsx";
import { revalidatePath ,revalidateTag } from "next/cache";
import { twMerge } from "tailwind-merge";


let origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : `https://threadi.vercel.app/`;

export default origin;


export type UserInfo = {
  uuid: string
  name: string,
  bio: string,
  image: string,
  path: string
}

type DbUser = {
  email: string;
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

export type NewCommentReplyInfo = {
  author: string;
  parentId: string
  text: string;
  path: string
}

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

export type CommentsRepliesRow = {
  uuid: string
  text: string
  community: {
    uuid: string 
    name: string
    image: string
  } | null
  created_at: string
  likes: string[] | null
  reposts: string[] | null
  shares_count: number
  views_count: number
  parent_id: string
  author: string
  thread_author_name: string
  thread_author_image: string
  replies:     {
    comment_uuid: string
    comment_text: string
    comment_parent_id: string
    comment_created_at: string
    comment_author_name: string
    comment_author_image: string
    comment_author_uuid: string
    replies_count: number
  }[],
  replies_count: number
}

type UserThreadsAndCoomentsRow = {
  thread_uuid: string
  thread_text: string
  thread_author: string
  thread_created_at: string
  comments: {
      comment_uuid: string,
      comment_text: string,
      comment_created_at: string,
      comment_author: {
        name: string,
        image: string,
        uuid: string
      }
  }[]
}

export type UserAndThreadCount =  {
  uuid: string
  email: string
  password: string
  name: string
  image: string
  bio: string
  onboarded: boolean
  social_media_user: boolean
  thread_count: number
}

export type FetchUsers = {
  searchString?: string 
  userId?: string
  pageNumber?: number
  pageSize?: number
  sortBy?: string
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

export function commentsRepliesCleanUp(data: any[]): CommentsRepliesRow {
  
  const item: CommentsRepliesRow = data[0]
  
  if(!item.replies){
    item.replies = []
    item.replies_count = 0
  }else{
    item.replies_count = item.replies.length
  }
  return item
}

export function userThreadsAndCoomentsCleanUp(data: any[]): UserThreadsAndCoomentsRow[] {
 const cleanDtata = data.map((row) => {
    if(row.comments[0].comment_author.name === null){
      row.comments = []
    }
    row.replies_count = row.comments.length
    return row
  })
  return cleanDtata
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

export async function createUser({email, password, confirmPassword}: {email: string, password: string, confirmPassword: string}) {

  try {
    if(password !== confirmPassword) throw new Error("Password and confirm password must match.")
    const response = await fetch(`${origin}api/create-user`, {
      method: "POST",
      body: JSON.stringify({email, password})
    })
    const newUser = await response.json()
    console.log({newUser})
    return newUser
  } catch (error: any) {
    console.log(error.message)
  }
}

export async function updateUser(userInfo: UserInfo) {
  try {
    const response = await fetch(`${origin}api/update-user`, {
      method: "PUT",
      body: JSON.stringify(userInfo)
    })
    const updatedUser = await response.json()
    return updatedUser[0]
  } catch (error: any) {
    console.log(error.message)
    return {error: error.message}
  }
}

export async function findUser(id: string) {
  try {
    const response = await fetch(`${origin}api/find-user?id=${id}`)
    const user: UserAndThreadCount = await response.json()
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
    const response = await fetch(`${origin}api/get-threadis?page=${page}&size=${size}`)

    if(!response.ok) throw new Error("No threadis")

    const threadis: GetThreadis = await response.json()
  
    return threadis

  } catch (error: any) {
    console.log(error.message)
    return null
  }
}

export async function getComments(id: string, table: string) {
    
  try {
    const response = await fetch(`${origin}api/comments?id=${id}&table=${table}`, {
      cache: "no-store"
    })

    const comments: CommentsRepliesRow = await response.json()

    return comments

  } catch (error: any) {
    console.log(error.message)
    return null 
    
  }
}

export async function createThreadi({author, community,text}: NewThreadInfo) {
  try {
    const response = await fetch(`${origin}api/create-threadi`, {
      method: "POST",
      body: JSON.stringify({author, text, community})
    })
    await response.json()
    revalidatePath("/")
  } catch (error: any) {
    console.log(error.message)
  }
}

export async function createCommentReply({author, parentId,path,text}: NewCommentReplyInfo) {
  try {
    const response = await fetch(`${origin}api/create-comment-reply`, {
      method: "POST",
      body: JSON.stringify({author, parentId, text,path})
    })
    await response.json()
  } catch (error: any) {
    console.log("from utils: createCommentReply",error.message)
  }
}

export async function finUserThreadsAndComments(userId: string) {
    
  try {
    const response = await fetch(`${origin}api/find-user-threads?id=${userId}`)

    const userThreadsAndComments = await response.json()

    return userThreadsAndComments

  } catch (error: any) {
    console.log(error.message)
    return null 
  }
}

type FetchUsersResult = {
    uuid: string
    name: string
    email: string
    image: string
  }


export async function fetchUsers({searchString, userId, pageNumber, pageSize, sortBy}: FetchUsers) {
    
  try {
    const response = await fetch(`${origin}api/fetch-users?searchString=${searchString}&userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)

    const users = await response.json()

    return users as {users: FetchUsersResult[], isNext: boolean}

  } catch (error: any) {
    console.log(error.message)
    return null 
  }
}