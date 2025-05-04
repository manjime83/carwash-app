import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  entities: {
    roles: { provider: "neon" },
  },
  casing: "snake_case",
});
