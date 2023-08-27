import { NodePgClient, drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool, } from "pg";
import * as databaseSchema from "./schema"
import "dotenv/config"


export const  dbClient = new Pool({
  connectionString: process.env.DB_URL
})

async function main() {
  await dbClient.connect()
} 

main()
.then(() => console.log("Connection to Database successful"))
.catch((error) => console.log("Database connection error: ", error.message))

export const db = drizzle(dbClient, {schema: databaseSchema})