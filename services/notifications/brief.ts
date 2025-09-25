import {getKnockClient} from "@/lib/knock-client"

const BRIEF_WORKFLOW_SLUG = "brief-was-created"

type WorkflowRecipients = string[]

type BriefNotificationPayloadType = {
   briefId: number
   title: string
   price: string
}

type WorkflowPayload = Record<string, unknown>

type WorkflowContext = {
   actor?: string | null
   recipients: WorkflowRecipients
   data: WorkflowPayload
}

export async function notifyBriefSubmitted(context: WorkflowContext) {
   await triggerBriefWorkflow(context)
}

export async function notifyRevisionRequested(context: WorkflowContext) {
   await triggerBriefWorkflow(context)
}

export async function notifyBriefResubmitted(context: WorkflowContext) {
   await triggerBriefWorkflow(context)
}

async function triggerBriefWorkflow({actor, recipients, data}: WorkflowContext) {
   if (!recipients.length) {
      return
   }

   const knock = getKnockClient()

   await knock.workflows.trigger(BRIEF_WORKFLOW_SLUG, {
      actor: actor ?? undefined,
      recipients,
      data,
   })
}
