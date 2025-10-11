import * as authSchema from "./auth-schema"
import * as briefShema from "./brief.schema"
import * as briefActivity from "./brief-activities.schema"
import * as briefDiscussion from "./brief-discussion.schema"
import * as invoiceSchema from "./invoice.schema"
import * as organizationSettings from "./organization-setting.schema"

export const schema = {
  ...authSchema,
  ...briefShema,
  ...briefActivity,
  ...briefDiscussion,
  ...invoiceSchema,
  ...organizationSettings,
}
