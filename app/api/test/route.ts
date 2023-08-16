import { db } from "@/db/dbClient";
import { commentsReplies, communities, test, threadis, users } from "@/db/schema";
import { asc, desc, eq, isNotNull, isNull, ne, not, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NextResponse } from 'next/server'
import { commentsRepliesSql, topThreadisSql } from "../sql";
import { commentsRepliesCleanUp, threadisCleanUp } from "@/lib/utils"
import { QueryResult } from "pg";




export async function GET(){

    try {
///////////////////////////////////////////////////
        // const result = await db.query.threadis.findMany()

        const result = await db.insert(threadis).values({text: "biolosjhddie", author: "9b0553eb-fe29-4cdd-b566-f4fb86d22f09", community: null}).returning()

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

        if(!result) throw new Error("tada!")

        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}

