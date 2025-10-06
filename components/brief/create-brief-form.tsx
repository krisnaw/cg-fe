"use client";

import * as React from "react";
import {useActionState, useState} from "react";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Loader2} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {ActionResponse} from "@/lib/types";
import {useRouter} from "next/navigation";
import {BriefDescriptions} from "@/components/brief/brief-description";
import BriefPrice from "@/components/brief/brief-price";
import type {MemberWithUser} from "@/db/types/auth.types";
import {toast} from "sonner";
import {createBrief} from "@/app/action/brief/brief.create.action";

const initialData: ActionResponse = {
   success: false,
   message: ""
}

type CreateBriefFormProps = {
   organizationId: string
   writers: MemberWithUser[]
   managers: MemberWithUser[]
}

export function CreateBriefForm({organizationId, writers, managers}: CreateBriefFormProps) {
   const [open, setOpen] = React.useState(false)
   const [date, setDate] = React.useState<Date>(() => {
      const now = new Date()
      now.setDate(now.getDate() + 3)
      return now
   })
   const [description, setDescription] = React.useState<string>("")
  const [currency, setCurrency] = useState<string>("USD")
   const router = useRouter();

   const [, formAction, isPending] = useActionState<ActionResponse, FormData>(async (_, formData: FormData) => {
      const name = formData.get("title") as string
      const manager = formData.get("manager") as string
      const writerValue = formData.get("writer") as string
      const dueDateValue = (formData.get("dueDate") as string) ?? ""
      const price = formData.get("price") as string
      const currency = (formData.get("currency") as string) ?? "USD"
      const wordCount = formData.get("wordCount") as string | null
      const submitData = {
         name,
         description,
         manager,
         writer: writerValue != "" ? writerValue : undefined,
         currency,
         price,
         organizationId,
         dueDate: dueDateValue ? new Date(dueDateValue) : date ?? new Date(),
         wordCount: wordCount ? parseInt(wordCount) : 0,
      }

      console.log("submit", submitData)

      const res = await createBrief(submitData)

      if (!res.success) {
         toast.error(res.message)
         return res
      }

      toast.success(res.message)
      router.push(`/dashboard/${organizationId}/brief`)
      return res
   }, initialData)


   return (
       <form action={formAction}>
          <Card>
             <CardHeader>
                <CardTitle>Create Brief</CardTitle>
                <CardDescription>
                   Capture the essentials so your team can align quickly.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                   <div className="col-span-6 grid grid-cols-2 gap-6">
                      <div className="grid gap-2">
                         <Label htmlFor="manager">Manager</Label>
                         <Select
                             name="manager"
                             defaultValue={managers.find((member) => member.user)?.user?.id}
                         >
                            <SelectTrigger id="manager" className="w-full justify-between">
                               <SelectValue placeholder="Select a manager" />
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
                                              alt="" className="size-5 shrink-0 rounded-full"/>
                                         <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">
                                      {manager.user.name ?? "Unknown"}
                                   </span>
                                      </SelectItem>
                                  )
                               })}
                            </SelectContent>
                         </Select>
                      </div>

                      <div className="grid gap-2">
                         <Label htmlFor="writer">Writer</Label>
                         <Select name="writer">
                            <SelectTrigger id="writer" className="w-full justify-between">
                               <SelectValue placeholder="Select a writer" />
                            </SelectTrigger>
                            <SelectContent>
                               {writers.map((writer) => {
                                  if (!writer.user) {
                                     return null
                                  }

                                  return (
                                      <SelectItem key={writer.id} value={writer.user.id}>
                                         {/* eslint-disable-next-line @next/next/no-img-element */}
                                         <img src={writer.user.image ?? "/images/default-user.png"}
                                              alt="" className="size-5 shrink-0 rounded-full"/>
                                         <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">
                                      {writer.user.name ?? "Unknown"}
                                   </span>
                                      </SelectItem>
                                  )
                               })}
                            </SelectContent>
                         </Select>
                      </div>


                   </div>

                   <div className="col-span-6 grid grid-cols-3 gap-6">
                      <div className="grid gap-2">
                         <Label htmlFor="dueDate">Due Date</Label>
                         <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                               <Input id="date" name="dueDate" className="text-left" value={date.toLocaleDateString()}/>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                               <Calendar
                                   disabled={{before: (() => {
                                         const tomorrow = new Date()
                                         tomorrow.setDate(tomorrow.getDate() + 1)
                                         return tomorrow
                                      })()}}
                                   mode="single"

                                   selected={date}
                                   captionLayout="dropdown"
                                   onSelect={(date) => {
                                      if (date instanceof Date) {
                                         setDate(date)
                                         setOpen(false)
                                      }
                                   }}
                               />
                            </PopoverContent>
                         </Popover>
                      </div>

                      <div>
                         <BriefPrice price={100} currency={currency} setCurrency={setCurrency} />
                      </div>
                      <div className="grid gap-2">
                         <Label htmlFor="wordCount">Word Count</Label>
                         <Input
                             id="wordCount"
                             name="wordCount"
                             type="number"
                             defaultValue="500"
                             min="100"
                             inputMode="numeric"
                             placeholder="Approximate word target"
                         />
                      </div>
                   </div>

                   <div className="col-span-6 grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" placeholder="e.g. Product Launch Campaign" required/>
                   </div>

                   <div className="col-span-6 grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <BriefDescriptions content={description} setContent={setDescription} editable={!isPending}  />
                      <p className="text-xs text-muted-foreground">Share enough detail so collaborators understand
                         the objective.</p>
                   </div>

                </div>
             </CardContent>
             <CardFooter className="flex justify-end">
                <Button disabled={isPending}>
                   Save
                   {isPending && <Loader2 className="animate-spin"/>}
                </Button>
             </CardFooter>
          </Card>
       </form>
   );
}
