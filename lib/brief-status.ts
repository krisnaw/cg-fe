export const BRIEF_STATUS_TEXT = {
   O: "Open",
   P: "Progress",
   Q: "Request Revision",
   S: "Submitted",
   R: "Resubmitted",
   C: "Closed",
};

export const BRIEF_STATUS = {
   "OPEN": "O",
   "PROGRESS": "P",
   "REQUEST_REVISION": "Q",
   "SUBMITTED": "S",
   "RESUBMITTED": "R",
   "CLOSED": "C",
};

const BriefStatusLabel = {
   O: "border-green-200 bg-green-50 text-green-600",
   P: "border-green-300 bg-green-200 text-green-800",
   Q: "border-yellow-200 bg-yellow-50 text-yellow-700",
   S: "border-sky-200 bg-sky-50 text-sky-700",
   R: "border-sky-200 bg-sky-50 text-sky-700",
   C: "border-gray-200 bg-gray-50 text-gray-700",
};

const mapStatusText = new Map(Object.entries(BRIEF_STATUS_TEXT));
const mapStatusLabel = new Map(Object.entries(BriefStatusLabel));

export function getBriefStatusText(value: string): string {
   return mapStatusText.get(value) || "Unknown";
}

export function getBriefStatusLabel(value: string): string {
   return mapStatusLabel.get(value) || "Unknown";
}
