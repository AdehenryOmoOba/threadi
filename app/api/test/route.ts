import { db, dbClient } from "@/db/dbClient";
import { commentsReplies, communities, test, threadis, users } from "@/db/schema";
import { asc, desc, eq, isNotNull, isNull, ne, not, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NextResponse } from 'next/server'
import { commentsRepliesSql, topThreadisSql, userAndThreadCount, userThreadsAndCooments } from "../sql";
import { commentsRepliesCleanUp, threadisCleanUp, userThreadsAndCoomentsCleanUp } from "@/lib/utils"
import { QueryResult } from "pg";




export async function GET(){

    try {
        
///////////////////////////////////////////////////
        // const result = await db.query.threadis.findMany()

        // const result = await db.insert(threadis).values({text: "biolosjhddie", author: "9b0553eb-fe29-4cdd-b566-f4fb86d22f09", community: null}).returning()

        // let result = await db.execute(sql.raw(commentsRepliesSql("95bff2e8-e10c-43a0-938d-f8620e1c1cea", "comments_replies")))

        // let row = commentsRepliesCleanUp(result.rows)

        // const result = await db.execute(sql.raw(userAndThreadCount("e2f8de16-af09-483c-b411-f087f7b8e8c1")))

        let result = await db.execute(sql.raw(userThreadsAndCooments("e2f8de16-af09-483c-b411-f087f7b8e8c1")))

        let rows = userThreadsAndCoomentsCleanUp(result.rows)




        // const result =  await db.execute(sql`UPDATE "test" 
        // SET "names" = array_append("names", 'kiwiooooooooooooooooo') 
        // WHERE "id" = '8ea5bbdc-6490-4d79-803f-280b829ad735';`)

        // const result =  await db.execute(sql`UPDATE "test" 
        // SET "names" = array_remove("names", 'kiwiooooooooooooooooo') 
        // WHERE "id" = '8ea5bbdc-6490-4d79-803f-280b829ad735';`)


        // const response = await db.execute(sql.raw(topThreadisSql()))
        // const result = threadisCleanUp(response.rows)

        // const response = await db.execute(sql.raw(commentsRepliesSql("7acbc0cb-801d-4874-a285-0f6ee5fe4d37")))
        // const result = commentsRepliesCleanUp(response.rows)


// TODO: limits, offset, orderby
//////////////////////////////////////////////////////////////////////////////

        if(!rows.length) throw new Error("tada!")

        return NextResponse.json(rows)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}

