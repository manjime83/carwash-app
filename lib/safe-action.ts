import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "./auth";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  defineMetadataSchema: () => z.object({ actionName: z.string() }),
  defaultValidationErrorsShape: "flattened",
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  if (!data) {
    throw new ActionError("Session not found");
  }

  const { id: sessionId } = data.session;
  const { id: userId } = data.user;

  return next({ ctx: { sessionId, userId } });
});
