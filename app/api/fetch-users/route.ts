import { db } from "@/db/dbClient";
import {sql} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { fetchAllUsers } from "../sql";


export async function GET(req: NextRequest){

    const urlObject = new URL(req.url)
    const searchString = urlObject.searchParams.get("searchString") || ""
    const userId = urlObject.searchParams.get("userId") || undefined
    const pageNumber = Number(urlObject.searchParams.get("pageNumber") ) || 1
    const pageSize = Number(urlObject.searchParams.get("pageSize")) || 20
    const sortBy = urlObject.searchParams.get("sortBy") || "ASC"

    try {
        const result =  await db.execute(sql.raw(fetchAllUsers({searchString, pageNumber, pageSize, sortBy, userId})))

        if(!result.rows.length) throw new Error("no result found")

        const users = result.rows

        const skip = (pageNumber - 1) * pageSize

        const isNext = Number(users[0].total_match_count) > skip + result.rows.length


        return NextResponse.json({users, isNext})

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}