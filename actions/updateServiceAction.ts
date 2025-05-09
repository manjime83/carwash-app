"use server";

import { DAL } from "@/lib/db/dal";
import { authActionClient } from "@/lib/safe-action";
import { z } from "zod";

export const updateServiceAction = authActionClient
  .schema(
    z.object({
      id: z.string(),
      name: z.string(),
      prices: z.object({
        motorcycle: z.number().min(0),
        car: z.number().min(0),
        truck: z.number().min(0),
      }),
    }),
  )
  .action(async ({ parsedInput }) => {
    const result = await DAL.mutation.updateService(parsedInput);
    return result;
  });
