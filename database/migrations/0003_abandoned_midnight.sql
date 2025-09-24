ALTER TABLE "briefs" ADD COLUMN "currency" varchar DEFAULT 'USD' NOT NULL;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "price" numeric(10, 2) DEFAULT '0.00' NOT NULL;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "closed_at" timestamp;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "manager" text;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "writer" text;--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_manager_user_id_fk" FOREIGN KEY ("manager") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "briefs" ADD CONSTRAINT "briefs_writer_user_id_fk" FOREIGN KEY ("writer") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;