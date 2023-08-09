import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as databaseSchema from "./schema"

let client;

if(!client){
    client = new Client({
        connectionString: process.env.DB_URL
    })
} 

client.connect()

export const db = drizzle(client, {schema: databaseSchema})