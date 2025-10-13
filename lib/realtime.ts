import {InferRealtimeEvents, Realtime} from "@upstash/realtime"
import {redis} from "./redis"
import z from "zod"

const schema = {
  notification: z.object({
    alert: z.string(),
  }),
}

export const realtime = new Realtime({ schema, redis })
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>