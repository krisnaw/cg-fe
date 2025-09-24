CREATE TABLE "brief_default" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "brief_default_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"organization_id" text NOT NULL,
	"currency" varchar DEFAULT 'USD' NOT NULL,
	"price" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"word_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brief_default" ADD CONSTRAINT "brief_default_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;