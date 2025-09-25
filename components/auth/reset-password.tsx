"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"

export default function ResetPassword() {
  // const [state, formAction, isPending] = useActionState(handleReset, initialState)

  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Forgot password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">New password</Label>
            </div>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              autoComplete="new-password"
              required
            />
          </div>

          {/*<Button type="submit" className="w-full" disabled={isPending}>*/}
          {/*  Reset password*/}
          {/*  {isPending ? <Loader2 className="animate-spin" /> : null}*/}
          {/*</Button>*/}
        </form>
      </CardContent>
    </Card>
  )
}
