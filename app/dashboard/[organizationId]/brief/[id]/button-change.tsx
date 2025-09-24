"use client"
import {setActiveOrgAction} from "@/app/action/auth/set-active-org.action";

export default function ButtonChange({id} : {id: string}) {
   return (
       <button onClick={async () => {
          await setActiveOrgAction(id)
       }}>Change</button>
   )
}