import { db } from "@/db/dbClient";
import { sql} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { userThreadsAndCooments } from "../sql";


export async function GET(req: NextRequest){

    const id = new URL(req.url).searchParams.get("id")

    try {

        if(!id) throw new Error("Invalid id")

        const result =  await db.execute(sql.raw(userThreadsAndCooments(id)))

        const rows = result.rows[0]

        return NextResponse.json(rows)

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}