CREATE TYPE "public"."payment_methods" AS ENUM('cash', 'card', 'bank_transfer');--> statement-breakpoint
ALTER TABLE "car_wash_services" RENAME TO "wash_services";--> statement-breakpoint
ALTER TABLE "car_washes" RENAME TO "washes";--> statement-breakpoint
ALTER TABLE "wash_services" RENAME COLUMN "car_wash_id" TO "wash_id";--> statement-breakpoint
ALTER TABLE "wash_services" RENAME COLUMN "price" TO "price_at_wash_time";--> statement-breakpoint
ALTER TABLE "washes" RENAME COLUMN "created_at" TO "start_time";--> statement-breakpoint
ALTER TABLE "washes" RENAME COLUMN "updated_at" TO "end_time";--> statement-breakpoint
ALTER TABLE "payments" RENAME COLUMN "car_wash_id" TO "wash_id";--> statement-breakpoint
ALTER TABLE "services" RENAME COLUMN "price" TO "prices";--> statement-breakpoint
ALTER TABLE "wash_services" DROP CONSTRAINT "car_wash_services_car_wash_id_car_washes_id_fk";
--> statement-breakpoint
ALTER TABLE "wash_services" DROP CONSTRAINT "car_wash_services_service_id_services_id_fk";
--> statement-breakpoint
ALTER TABLE "washes" DROP CONSTRAINT "car_washes_vehicle_id_vehicles_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_car_wash_id_car_washes_id_fk";
--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."vehicle_types";--> statement-breakpoint
CREATE TYPE "public"."vehicle_types" AS ENUM('motorcycle', 'car', 'truck');--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "type" SET DATA TYPE "public"."vehicle_types" USING "type"::"public"."vehicle_types";--> statement-breakpoint
ALTER TABLE "washes" ADD COLUMN "notified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "method" "payment_methods" NOT NULL;--> statement-breakpoint
ALTER TABLE "wash_services" ADD CONSTRAINT "wash_services_wash_id_washes_id_fk" FOREIGN KEY ("wash_id") REFERENCES "public"."washes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "wash_services" ADD CONSTRAINT "wash_services_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "washes" ADD CONSTRAINT "washes_vehicle_id_vehicles_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_wash_id_washes_id_fk" FOREIGN KEY ("wash_id") REFERENCES "public"."washes"("id") ON DELETE cascade ON UPDATE no action;