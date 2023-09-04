import { db } from "@/db/dbClient";
import { sql} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { topThreadisSql } from "../sql";


export async function GET(req: NextRequest){

    const pageNumber = Number(new URL(req.url).searchParams.get("page"))

    const pageSize = Number(new URL(req.url).searchParams.get("size"))

    const skip = (pageNumber - 1) * pageSize
  
    try {

        const response = await db.execute(sql.raw(topThreadisSql(skip, pageSize)))

        const threads = response.rows[0].top_threads as unknown[]

        const topThreadCount = response.rows[0].top_threadis_count as number

        if(!threads.length) throw new Error("no threadis found")
  
        const isNext = topThreadCount > skip + threads.length
  
        return NextResponse.json({threads, isNext})
  
    } catch (error: any) {
        return NextResponse.json({error: error.message,},{status: 501})
    } 
}