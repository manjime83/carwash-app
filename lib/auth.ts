import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";
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

export async function checkSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    unauthorized();
  }

  return session.user;
}
