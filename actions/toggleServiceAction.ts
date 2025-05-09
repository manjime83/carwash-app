"use server";

import { DAL } from "@/lib/db/dal";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const toggleServiceAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput;

    const result = await DAL.mutation.toggleService(id);

    console.log(result);
    return result;
  });
