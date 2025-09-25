import Knock from "@knocklabs/node"

let knockClient: Knock | null = null

export function getKnockClient() {
  if (!knockClient) {
    knockClient = new Knock({ apiKey: process.env.KNOCK_SECRET_API_KEY })
  }

  return knockClient
}

export function resetKnockClient() {
  knockClient = null
}
