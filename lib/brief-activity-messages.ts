export const BRIEF_ACTIVITY_MESSAGES = {
  brief_created: "Brief created.",
  brief_draft_submitted: "Draft link submitted.",
} as const;

export type BriefActivityMessageKey = keyof typeof BRIEF_ACTIVITY_MESSAGES;
