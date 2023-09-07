import { db } from "@/db/dbClient";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { updateLikes } from "../sql";


export async function PUT(req: NextRequest){

    const {currentUserId, threadId,likeStatus, path} = await req.json()

    try {
        
        const result = await db.execute(sql.raw(updateLikes(currentUserId, threadId,likeStatus)))

        if(path) revalidatePath(path)

        return NextResponse.json({updateStatus: "success"})
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}