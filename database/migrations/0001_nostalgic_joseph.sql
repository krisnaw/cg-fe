ALTER TABLE "briefs" ADD COLUMN "description" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "status" varchar DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "briefs" ADD COLUMN "due_date" timestamp NOT NULL;