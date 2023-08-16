import { db } from "@/db/dbClient";
import { threadis, users } from "@/db/schema";
import { NewThreadInfo } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export async function POST(req: NextRequest){

    const {author,text,community,path}: NewThreadInfo = await req.json()

    try {
        const newThreadi = await db.insert(threadis).values({author, text, community}).returning()
        revalidatePath("/")
        return NextResponse.json(newThreadi)
    } catch (error: any) {
        console.log("error block from create-threadi API: ", error.message)
        return NextResponse.json({error: error.message})
    }
}