import { createId, getConstants } from "@paralleldrive/cuid2";
import { boolean, json, numeric, pgEnum, pgTable, smallint, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  active: boolean("active").notNull().default(true),
});

const vehicleTypeValues = ["car", "motorcycle", "truck"] as const;
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

export const services = pgTable("services", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  name: text("name").notNull(),
  price: json("price").$type<Record<(typeof vehicleTypeValues)[number], number>>().notNull(),
  active: boolean("active").notNull().default(true),
});

export const carWashes = pgTable("car_washes", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  vehicleId: varchar("vehicle_id", { length: getConstants().defaultLength }).references(() => vehicles.id, {
    onDelete: "cascade",
  }),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at", { precision: 0 }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 0 }).notNull().defaultNow(),
});

export const carWashServices = pgTable("car_wash_services", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  carWashId: varchar("car_wash_id", { length: getConstants().defaultLength }).references(() => carWashes.id, {
    onDelete: "cascade",
  }),
  serviceId: varchar("service_id", { length: getConstants().defaultLength }).references(() => services.id, {
    onDelete: "cascade",
  }),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

export const payments = pgTable("payments", {
  id: varchar("id", { length: getConstants().defaultLength }).primaryKey().$defaultFn(createId),
  carWashId: varchar("car_wash_id", { length: getConstants().defaultLength }).references(() => carWashes.id, {
    onDelete: "cascade",
  }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date", { precision: 0 }).notNull().defaultNow(),
});
