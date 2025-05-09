"use server";

import { DAL } from "@/lib/db/dal";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const createServiceAction = authActionClient
  .schema(
    z.object({
      name: z.string(),
      prices: z.object({
        motorcycle: z.number().min(0),
        car: z.number().min(0),
        truck: z.number().min(0),
      }),
    }),
  )
  .action(async ({ parsedInput }) => {
    const result = await DAL.mutation.createService(parsedInput);
    return result;
  });
