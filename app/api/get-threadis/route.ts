import { db } from "@/db/dbClient";
import { threadis } from "@/db/schema";
import { threadisCleanUp } from "@/lib/utils";
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

        const threads = threadisCleanUp(response.rows)
  
        if(!threads) throw new Error("no threadis found")
  
        const preparedCount = db.select({count: sql<number>`count(*)`})
        .from(threadis)
        .prepare("prepared_count")
  
        const threadisCount = await preparedCount.execute()
  
        const isNext = threadisCount[0].count > skip + response.rowCount
  
        return NextResponse.json({threads, isNext})
  
    } catch (error: any) {
        return NextResponse.json({error: error.message,},{status: 501})
    }
}