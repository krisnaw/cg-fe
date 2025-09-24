import * as authSchema from "./auth-schema"
import * as briefShema from "./brief-schema"
import * as chatSchema from "./chat-schema"

export const schema = {
   ...authSchema,
   ...briefShema,
   ...chatSchema,
}
