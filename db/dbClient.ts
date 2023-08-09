import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as databaseSchema from "./schema"


// const client = new Client({
//     connectionString: process.env.DB_URL
// })

const client = new Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "test_db",
  });

client.connect()

export const db = drizzle(client, {schema: databaseSchema})