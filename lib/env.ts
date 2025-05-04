// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_RUNTIME: z.enum(["nodejs", "edge"]).default("nodejs"),

    DATABASE_URL: z.string().url(),

    AUTH_SECRET: z.string(),
    BASE_URL: z.string().url(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_RUNTIME: process.env.NEXT_RUNTIME,

    DATABASE_URL: process.env.DATABASE_URL,

    AUTH_SECRET: process.env.AUTH_SECRET,
    BASE_URL: process.env.BASE_URL,
  },
});
