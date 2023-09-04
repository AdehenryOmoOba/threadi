import { db } from "@/db/dbClient";
import {sql} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { fetchUserActivities } from "../sql";


export async function GET(req: NextRequest){

    const id = new URL(req.url).searchParams.get("id")

    if(!id) throw new Error("Invalid id")

    try {
        const result =  await db.execute(sql.raw(fetchUserActivities(id)))

        const activities = result.rows

        return NextResponse.json(activities)

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}