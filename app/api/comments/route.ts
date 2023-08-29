import { db } from "@/db/dbClient";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { commentsRepliesSql } from "../sql";
import { commentsRepliesCleanUp } from "@/lib/utils";


export async function GET(req: NextRequest){

    const id = new URL(req.url).searchParams.get("id")

    const table = new URL(req.url).searchParams.get("table")

    try {
        if(!id || !table) throw new Error("Please provide id and table")

        

        const response = await db.execute(sql.raw(commentsRepliesSql(id, table)))

        if(!response.rows.length) throw new Error("no comments found")

        const commentsAndReplies = commentsRepliesCleanUp(response.rows)
  
        return NextResponse.json(commentsAndReplies)
    } catch (error: any) {
        return NextResponse.json({error: error.message, origin: "from comments API route"})
    } 
}