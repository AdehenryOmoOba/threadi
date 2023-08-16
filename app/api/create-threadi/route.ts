import { db } from "@/db/dbClient";
import { threadis, users } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'


export async function POST(req: NextRequest){

    const body = await req.json()

    try {

        const newThreadi = await db.insert(threadis).values(body).returning()
        revalidatePath("/")
        return NextResponse.json(newThreadi)

    } catch (error: any) {
        console.log("error block from create-threadi API: ", error.message)
        return NextResponse.json({error: error.message})
    }
}