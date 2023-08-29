import type { Config } from "drizzle-kit";
import "dotenv/config"

console.log("connection string from drizzle.confis.ts file: ", process.env.DB_URL)

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!
  }
} satisfies Config;