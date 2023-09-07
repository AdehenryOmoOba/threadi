import { drizzle } from "drizzle-orm/node-postgres";
import { Pool} from "pg";
import * as databaseSchema from "./schema"
import "dotenv/config"


export const  pool = new Pool({
  connectionString: process.env.DB_URL + "?sslmode=require"
})

export const db = drizzle(pool, {schema: databaseSchema})