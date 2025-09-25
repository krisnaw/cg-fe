# Knock Notification Refactor Strategy

- Centralize Knock client creation in a shared helper (e.g. `lib/knock-client.ts`) so actions import a single instance instead of instantiating their own.
- Move all brief-related notification logic into a service module such as `services/notifications/brief.ts`, exposing `notifyBriefSubmitted`, `notifyRevisionRequested`, and `notifyBriefResubmitted` to keep action files lean.
- Add a utility like `buildBriefNotificationPayload(brief, overrides)` to generate the shared payload structure (title, deadline, price, URL) so copy updates happen in one place.
- Encode recipient expectations in TypeScript helpers to validate manager/writer presence consistently rather than ad-hoc checks.
- Wrap `knock.workflows.trigger` in a dispatcher (e.g. `triggerBriefWorkflow({event, actor, recipients, data})`) that maps event types to the `brief-was-created` workflow, making slug changes or metadata additions painless.

## To-Do

- [x] Extract a reusable Knock client helper and update all call sites.
- [ ] Create a brief notification service module and migrate submission/revision/resubmission functions.
- [ ] Implement a shared payload builder for brief notifications.
- [ ] Introduce recipient validation utilities tied to brief roles.
- [ ] Add a workflow trigger wrapper to centralize event-to-slug mapping.
