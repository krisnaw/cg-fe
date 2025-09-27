import * as authSchema from "./auth-schema"
import * as briefShema from "./brief.schema"
import * as invoiceSchema from "./invoice.schema"
import * as organizationSettings from "./organization-setting.schema"

export const schema = {
   ...authSchema,
   ...briefShema,
   ...invoiceSchema,
   ...organizationSettings,
}
