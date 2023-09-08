import { type ClassValue, clsx } from "clsx";
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

export type NewThreadInfo = {
  text: string;
  author: string;
  community?: string | null;
  path: string
  parentId?: string | null
}

export type NewCommentReplyInfo = {
  author: string;
  parentId: string
  text: string;
  path: string
}

export type ThreadRow = {
  uuid: string,
  text: string,
  author: string,
  created_at: string,
  likes: string[] | null,
  reposts: string[] | null,
  shares_count:  number,
  views_count:  number,
  parent_id: string | null,
  author_name: string,
  author_email: string,
  author_image: string,
  community: string | null,
  community_name: string | null,
  community_image: string | null,
  replies_count: number
}

export type ThreadAndReplies = {
  thread_uuid: string
  thread_parent_id: string
  thread_text:  string
  parent_community_uuid:  string | null
  thread_community_name: string | null
  thread_community_image: string | null
  thread_created_at:  string
  thread_likes: string[] | null,
  thread_reposts: string[] | null,
  thread_shares_count: number
  thread_views_count:number
  thread_reply_count: number
  thread_author_email: string
  thread_author_name: string
  thread_author_image: string
  thread_author_uuid: string
  comments: 
    {
      comment_uuid: string
      comment_text: string
      comment_reply_count: number
      comment_created_at: string

      comment_likes: string[] | null,
      comment_reposts: string[] | null,
      comment_shares_count: number
      comment_views_count: number
      comment_author_email: string
      comment_author_name:string
      comment_author_image: string
      comment_author_uuid: string
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

type GetThreadis = {
  threads: ThreadRow[]
  isNext: boolean
}

type UserTopThreads = {
  user_bio: string,
  user_threads: {
      uuid: string,
      text: string,
      author: string,
      community: string | null,
      created_at: string
      likes: string[] | null,
      reposts: string[] | null,
      shares_count: number,
      views_count: number,
      parent_id: string | null,
      reply_count: number
    }[]
}

type FetchUsersResult = {
  uuid: string
  name: string
  email: string
  image: string
}

export type USerActivities = {
  comment_author_id: string
  comment_author_name: string
  comment_author_image: string
  comment_author_email: string
  comment_created_at: string
  comment_parent_id: string
  parent_thread_text: string
  parent_thread_created_at: string
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

export async function getThredAndReplies(threadId: string) {
    
  try {
    const response = await fetch(`${origin}api/thread-and-replies?id=${threadId}`, {
      cache: "no-store"
    })

    const comments: ThreadAndReplies = await response.json()

    return comments

  } catch (error: any) {
    console.log(error.message)
    return null 
    
  }
}

export async function createThreadi({author, community,text, parentId=null, path}: NewThreadInfo) {

  try {
    const response = await fetch(`${origin}api/create-threadi`, {
      method: "POST",
      body: JSON.stringify({author, text, community, parentId, path})
    })
    await response.json()
  } catch (error: any) {
    console.log(error.message)
  }
}

export async function finUserThreadsAndComments(userId: string) {
    
  try {
    const response = await fetch(`${origin}api/find-user-threads?id=${userId}`)

    const responseObject: UserTopThreads = await response.json() 

    return responseObject

  } catch (error: any) {
    console.log(error.message)
    return null 
  }
}

export async function fetchUserActivities(userId: string) {
    
  try {
    const response = await fetch(`${origin}api/fetch-user-activities?id=${userId}`, {
      cache: "no-store"
    })

    const userActivities: USerActivities[] = await response.json() 

    return userActivities

  } catch (error: any) {
    console.log(error.message)
    return null
  }
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

type UpdateLikes = {currentUserId: string, 
  threadId: string,
  likeStatus: string, 
}


export async function updateLikes({currentUserId, threadId,likeStatus}: UpdateLikes) {
  
  try {
    const response = await fetch(`${origin}api/update-likes`, {
      method: "PUT",
      body: JSON.stringify({currentUserId, threadId,likeStatus})
    })
    
    if(!response.ok ) throw new Error("unable to update likes")

    await response.json()
    
    return response
  } catch (error: any) {
    console.log(error.message)
  }
}

