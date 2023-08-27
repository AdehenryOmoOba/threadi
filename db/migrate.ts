import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config"


let pool;

if(!pool){
    pool = new Pool({
        connectionString: process.env.DB_URL
    })
} 

const db = drizzle(pool)

async function main() {
    console.log("migration started...")
    await migrate(db, {migrationsFolder: "drizzle"})
    console.log("migration done")
    process.exit(0)
}

main()
.catch((error) => {
    console.log(error.message)
    process.exit(0)
})

