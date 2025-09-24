import {Suspense} from "react";
import SignUp from "@/components/auth/sign-up";
import SignUpCompany from "@/components/auth/sign-up-company";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function RegisterPage() {
  return (
      <div>
         <Tabs defaultValue="company" className="w-full max-w-xl space-y-6">
            <TabsList className="mx-auto">
               <TabsTrigger value="company">Company</TabsTrigger>
               <TabsTrigger value="individual">Freelancer</TabsTrigger>
            </TabsList>
            <TabsContent value="company" className="min-h-[520px]">
               <Suspense fallback={<div>Loading...</div>}>
                  <SignUpCompany/>
               </Suspense>
            </TabsContent>
            <TabsContent value="individual" className="min-h-[520px]">
               <Suspense fallback={<div>Loading...</div>}>
                  <SignUp/>
               </Suspense>
            </TabsContent>
         </Tabs>
      </div>
  );
}
