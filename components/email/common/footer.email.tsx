import {Hr, Section, Text} from "@react-email/components";
import * as React from "react";

export const FooterEmail = () => {
   return (
       <>
          <Hr className="border-gray-200 my-[32px]" />
          <Section>
             <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0">
                © 2025 {process.env.APP_NAME}. All rights reserved.
             </Text>
          </Section>
       </>
   )
}