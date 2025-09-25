import * as authSchema from "./auth-schema"
import * as briefShema from "./brief.schema"
import * as invoiceSchema from "./invoice.schema"

export const schema = {
   ...authSchema,
   ...briefShema,
   ...invoiceSchema,
}
