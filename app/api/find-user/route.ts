import { db } from "@/db/dbClient";
import { users } from "@/db/schema";
import { eq , sql} from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from 'next/server'
import { userAndThreadCount } from "../sql";


export async function GET(req: NextRequest){

    const id = new URL(req.url).searchParams.get("id")

    try {

        if(!id) throw new Error("Invalid id")

        const result =  await db.execute(sql.raw(userAndThreadCount(id)))

        if(!result.rows.length) throw new Error("user not found")

        const userAndThreadsInfo = result.rows[0]

        return NextResponse.json(userAndThreadsInfo)

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    } 
}