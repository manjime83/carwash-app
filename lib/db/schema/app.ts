import { createId, getConstants } from "@paralleldrive/cuid2";
import { boolean, json, numeric, pgEnum, pgTable, smallint, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";

export const services = pgTable("services", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  prices: json("prices").$type<Record<(typeof vehicleTypeValues)[number], number>>().notNull(),
  active: boolean("active").notNull().default(true),
});

export type Service = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

export const serviceSelectSchema = createSelectSchema(services);
export const serviceInsertSchema = createInsertSchema(services);
export const serviceUpdateSchema = createUpdateSchema(services);

export const clients = pgTable("clients", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  active: boolean("active").notNull().default(true),
});

export const vehicleTypeValues = ["motorcycle", "car", "truck"] as const;
export const vehicleTypes = pgEnum("vehicle_types", vehicleTypeValues);

export const vehicles = pgTable("vehicles", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  clientId: varchar("client_id", { length: getConstants().defaultLength }).references(() => clients.id, {
    onDelete: "cascade",
  }),
  type: vehicleTypes("type").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: smallint("year").notNull(),
  color: text("color").notNull(),
  plate: text("plate").notNull(),
  active: boolean("active").notNull().default(true),
});

export const washes = pgTable("washes", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  vehicleId: varchar("vehicle_id", { length: getConstants().defaultLength }).references(() => vehicles.id, {
    onDelete: "cascade",
  }),
  completed: boolean("completed").notNull().default(false),
  startTime: timestamp("start_time", { precision: 0 }).notNull().defaultNow(),
  notified: boolean("notified").notNull().default(false),
  endTime: timestamp("end_time", { precision: 0 }),
});

export const washServices = pgTable("wash_services", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  washId: varchar("wash_id", { length: getConstants().defaultLength }).references(() => washes.id, {
    onDelete: "cascade",
  }),
  serviceId: varchar("service_id", { length: getConstants().defaultLength }).references(() => services.id, {
    onDelete: "cascade",
  }),
  priceAtWashTime: numeric("price_at_wash_time", { precision: 10, scale: 2 }).notNull(),
});

export const paymentMethodValues = ["cash", "card", "bank_transfer"] as const;
export const paymentMethods = pgEnum("payment_methods", paymentMethodValues);

export const payments = pgTable("payments", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  washId: varchar("wash_id", { length: getConstants().defaultLength }).references(() => washes.id, {
    onDelete: "cascade",
  }),
  method: paymentMethods("method").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date", { precision: 0 }).notNull().defaultNow(),
});
