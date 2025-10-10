CREATE TABLE "brief_activities" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "brief_activities_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"brief_id" integer NOT NULL,
	"actor" text,
	"message" text NOT NULL,
	"type" text DEFAULT 'brief_updated',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brief_activities" ADD CONSTRAINT "brief_activities_brief_id_briefs_id_fk" FOREIGN KEY ("brief_id") REFERENCES "public"."briefs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brief_activities" ADD CONSTRAINT "brief_activities_actor_user_id_fk" FOREIGN KEY ("actor") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;