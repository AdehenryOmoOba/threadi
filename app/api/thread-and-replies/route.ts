import { db } from "@/db/dbClient";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { threadAndReplies } from "../sql";


export async function GET(req: NextRequest){

    const id = new URL(req.url).searchParams.get("id")

    try {
        if(!id) throw new Error("Please provide id")

        const response = await db.execute(sql.raw(threadAndReplies(id)))
  
        return NextResponse.json(response.rows[0])
    } catch (error: any) {
        return NextResponse.json({error: error.message, origin: "from comments API route"})
    } 
}