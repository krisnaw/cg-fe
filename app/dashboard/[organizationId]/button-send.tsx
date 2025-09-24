"use client"

import {Button} from "@/components/ui/button";
import {sendEmail} from "@/app/action/send.action";

export default function ButtonSend() {
   return (
       <Button onClick={() => sendEmail()}>
          Send
       </Button>
   )
}