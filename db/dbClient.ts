import { drizzle } from "drizzle-orm/node-postgres";
import { Pool} from "pg";
import * as databaseSchema from "./schema"
import "dotenv/config"


const dbString = process.env.NODE_ENV === "production" ? process.env.DB_URL + "?sslmode=require" : process.env.DB_URL

export const  pool = new Pool({
  connectionString: dbString 
})

export const db = drizzle(pool, {schema: databaseSchema})