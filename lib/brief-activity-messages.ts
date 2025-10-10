export const BRIEF_ACTIVITY_MESSAGES = {
  brief_created: "Brief created.",
  status_changed: "Brief status updated.",
  brief_updated: "Brief information updated.",
} as const;

export type BriefActivityMessageKey = keyof typeof BRIEF_ACTIVITY_MESSAGES;
