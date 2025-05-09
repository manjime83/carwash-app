import "server-only";

import { eq, sql } from "drizzle-orm";
import { db } from ".";
import { Service, services } from "./schema/app";

export class DatabaseError extends Error {}

export const DAL = {
  query: {
    getServices: async () => {
      const services = await db.query.services.findMany();
      return services;
    },
    getServiceById: async (id: string) => {
      const service = await db.query.services.findFirst({ where: eq(services.id, id) });
      return service;
    },
  },
  mutation: {
    createService: async (service: Omit<Service, "id" | "active">) => {
      const [result] = await db.insert(services).values(service).returning({ id: services.id });
      return result?.id;
    },
    updateService: async (service: Omit<Service, "active">) => {
      const { id, ...fields } = service;
      const [result] = await db.update(services).set(fields).where(eq(services.id, id)).returning({ id: services.id });
      return result?.id === id;
    },
    toggleService: async (id: string) => {
      const [result] = await db
        .update(services)
        .set({ active: sql`NOT ${services.active}` })
        .where(eq(services.id, id))
        .returning({ id: services.id });
      return result?.id === id;
    },
  },
};
