'use client'

import {useLinkStatus} from 'next/link'
import {Loader2} from "lucide-react";
import React from "react";

export default function LoadingIndicator({children}: { children?: React.ReactNode }) {
   const {pending} = useLinkStatus()

   if (children) {
      return (
          <span>{ pending ? <Loader2 size={18} className="animate-spin" /> :   children}</span>
      )
   }

   return pending ? (
       <span className="animate-spin items-center inline-block">
            <Loader2 size={18}/>
        </span>
   ) : null

}