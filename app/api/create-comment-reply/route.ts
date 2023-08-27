import { db, dbClient } from "@/db/dbClient";
import { commentsReplies, users } from "@/db/schema";
import { NewThreadInfo } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'

type CommentReply = {
    parentId: string
} & Omit<NewThreadInfo, "community">

export async function POST(req: NextRequest){

    const {parentId,author,text,path}: CommentReply = await req.json()

    try {
        
        const newThreadi = await db.insert(commentsReplies).values({author, text, parentId}).returning()
        revalidatePath(path)
        return NextResponse.json(newThreadi)
    } catch (error: any) {
        console.log("error block from create-comment-reply API: ", error.message)
        return NextResponse.json({error: error.message})
    } 
}