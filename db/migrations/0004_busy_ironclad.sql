CREATE TABLE "organization_setting" (
	"organization_id" text PRIMARY KEY NOT NULL,
	"stripe_customer_id" text,
	"pm_type" text,
	"pm_last_four" text,
	"service_fee" numeric DEFAULT '15'
);
--> statement-breakpoint
ALTER TABLE "organization_setting" ADD CONSTRAINT "organization_setting_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;