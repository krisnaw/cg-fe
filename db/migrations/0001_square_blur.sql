CREATE TABLE "briefs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "briefs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"organization_id" text NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" varchar DEFAULT 'draft' NOT NULL,
	"currency" varchar DEFAULT 'USD' NOT NULL,
	"price" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"due_date" timestamp NOT NULL,
	"closed_at" timestamp,
	"word_count" integer DEFAULT 0 NOT NULL,
	"draft_url" text,
	"manager" text,
	"writer" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_manager_user_id_fk" FOREIGN KEY ("manager") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_writer_user_id_fk" FOREIGN KEY ("writer") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;