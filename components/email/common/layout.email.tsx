import {Head, Html, Tailwind} from "@react-email/components";
import * as React from "react";

export const LayoutEmail = ({children} : {children: React.ReactNode}) => {
   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             {children}
          </Tailwind>
       </Html>
   )
}