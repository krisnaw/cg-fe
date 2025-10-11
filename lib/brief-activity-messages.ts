export const BRIEF_ACTIVITY_MESSAGES = {
  brief_created: "Brief created.",
  brief_draft_submitted: "Draft link submitted.",
  brief_closed: "Brief closed.",
  brief_revision_requested: "Revision requested.",
  brief_resubmitted: "Updated draft resubmitted.",
} as const;

export type BriefActivityMessageKey = keyof typeof BRIEF_ACTIVITY_MESSAGES;
