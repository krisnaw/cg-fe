"use client"

import {ContentEditor} from "@/components/brief/content-editor";

interface BriefDescriptionsProps {
   content: string,
   setContent: (content: string) => void
   editable: boolean
}

export function BriefDescriptions({content, setContent, editable = true}: BriefDescriptionsProps) {
   return (
       <ContentEditor
           content={content}
           onChange={setContent}
           editable={editable}
           placeholder="Enter brief description..."
       />
   )
}
