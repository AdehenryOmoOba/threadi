import { db } from "@/db/dbClient";
import { eq, sql} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { users } from "@/db/schema";
import bcrypt from "bcrypt"

export async function POST(req: NextRequest){

    const url = new URL(req.url)
    const pwd = url.searchParams.get("password")
    const user_id = url.searchParams.get("user_id")

    try {

        if(!pwd || !user_id) throw new Error("Please provide password")

        const hashedPwd =  await bcrypt.hash(pwd, 10)

        const response = await db.update(users).set({password: hashedPwd}).where(eq(users.uuid, user_id)).returning()
  
        return NextResponse.json(response)
  
    } catch (error: any) {
        return NextResponse.json({error: error.message,},{status: 501})
    } 
}