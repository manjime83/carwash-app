import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        console.log("sendMagicLink", email, token, url);
      },
    }),
  ],
});
