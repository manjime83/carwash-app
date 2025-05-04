import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env";
import schema from "./schema";

const globalForDb = globalThis as unknown as {
  client: NeonQueryFunction<false, false> | undefined;
};

const client = globalForDb.client ?? neon(env.DATABASE_URL);
if (env.NODE_ENV === "development") globalForDb.client = client;

export const db = drizzle({ client, schema, casing: "snake_case" });
