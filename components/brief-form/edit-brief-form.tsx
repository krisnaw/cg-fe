"use client"

import * as React from "react"
import {useActionState, useState} from "react"
import {useRouter} from "next/navigation"
import {toast} from "sonner"

import {type BriefUpdateData, updateBrief} from "@/app/action/brief/brief.update.action"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ActionResponse} from "@/lib/types"
import {cn} from "@/lib/utils"
import {BriefDescriptions} from "@/components/brief-form/brief-description";
import BriefPrice from "@/components/brief-form/brief-price";
import type {BriefWithUsers} from "@/db/types/brief.types";
import type {MemberWithUser} from "@/db/types/auth.types";
import {Spinner} from "@/components/ui/spinner";

type EditBriefFormProps = {
  brief: BriefWithUsers
  managers: MemberWithUser[]
  writers: MemberWithUser[]
}

const initialState: ActionResponse = {
  success: false,
  message: "",
}

export function EditBriefForm({brief, managers, writers}: EditBriefFormProps) {
  const router = useRouter()
  const initialDate = brief.dueDate ? new Date(brief.dueDate) : undefined
  const [date, setDate] = React.useState<Date | undefined>(initialDate)
  const [open, setOpen] = React.useState(false)
  const [description, setDescription] = useState<string>(brief.description ?? "")
  const [currency, setCurrency] = useState<string>(brief.currency)

  const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData) => {
    const id = Number(formData.get("id"))
    const name = (formData.get("name") as string) ?? ""
    const dueDateValue = (formData.get("dueDate") as string) ?? ""
    const currency = formData.get("currency") as string
    const price = formData.get("price") as string
    const managerValue = formData.get("manager") as string
    const writerValue = formData.get("writer") as string
    const wordCount = formData.get("wordCount") as string | null

    const payload: BriefUpdateData = {
      id,
      name,
      description,
      dueDate: dueDateValue ? new Date(dueDateValue) : initialDate ?? new Date(),
      currency,
      price: price,
      manager: managerValue,
      writer: writerValue ?? undefined,
      wordCount: wordCount ? parseInt(wordCount) : 0,
    }

    const result = await updateBrief(payload)

    if (!result.success) {
      toast.error(result.message)
      return result
    }

    toast.success(result.message)
    router.push(`/dashboard/${brief.organizationId}/brief/${id}`)
    router.refresh()

    return result
  }, initialState)

  const formattedDate = date ? date.toLocaleDateString() : "Select date"

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={brief.id} readOnly/>
      <Card>
        <CardHeader>
          <CardTitle>Edit brief</CardTitle>
          <CardDescription>Update the core details so collaborators stay aligned.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-6 grid gap-2">
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Product Launch Campaign"
                defaultValue={brief.name}
                required
              />
            </div>

            <div className="col-span-6 grid gap-2">
              <Label htmlFor="description">Description</Label>
              <BriefDescriptions content={description} setContent={setDescription} editable={!isPending}/>
              <p className="text-xs text-muted-foreground">
                Share enough detail so collaborators understand the objective.
              </p>
            </div>

            <div className="col-span-6 grid grid-cols-3 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="manager">Manager</Label>
                <Select defaultValue={brief?.manager ?? ""} name="manager">
                  <SelectTrigger id="manager" className="w-full justify-between">
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((manager) => {
                      if (!manager.user) {
                        return null
                      }

                      return (
                        <SelectItem key={manager.id} value={manager.user.id}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={manager.user.image ?? "/images/default-user.png"}
                               alt=""
                               className="size-5 shrink-0 rounded-full"
                          />
                          <span
                            className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">{manager.user.name ?? "Unknown"}
                                         </span>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="writer">Writer</Label>
                <Select defaultValue={brief.writer ?? ""} name="writer">
                  <SelectTrigger id="writer" className="w-full justify-between">
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    {writers.map((writer) => {
                      if (!writer.user) {
                        return null
                      }

                      return (
                        <SelectItem key={writer.id} value={writer.user.id}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={writer.user.image ?? "/images/default-user.png"}
                            alt=""
                            className="size-5 shrink-0 rounded-full"
                          />
                          <span
                            className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">
                            {writer.user.name ?? "Unknown"}
                          </span>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dueDateDisplay">Due date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Input
                      id="dueDateDisplay"
                      value={formattedDate}
                      readOnly
                      className={cn("w-full", !date && "text-muted-foreground")}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={value => {
                        setDate(value)
                        setOpen(false)
                      }}
                      disabled={{
                        before: (() => {
                          const tomorrow = new Date()
                          tomorrow.setDate(tomorrow.getDate() + 1)
                          return tomorrow
                        })()
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="col-span-6 grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <BriefPrice currency={currency} setCurrency={setCurrency} price={Number(brief.price)}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="wordCount">Word Count</Label>
                <Input
                  id="wordCount"
                  name="wordCount"
                  type="number"
                  min={0}
                  inputMode="numeric"
                  placeholder="Approximate word target"
                  defaultValue={(brief as { wordCount?: number | string }).wordCount ?? ""}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            Save changes
            {isPending ?? <Spinner />}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
