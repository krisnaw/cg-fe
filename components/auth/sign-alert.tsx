import {Alert, AlertTitle} from "@/components/ui/alert";
import {Info} from "lucide-react";

export default function SignAlert() {
  return (
      <Alert>
        <Info />
        <AlertTitle>Please sign-in/sign-up to accept invitation</AlertTitle>
      </Alert>
  )
}