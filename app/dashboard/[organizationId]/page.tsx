import ButtonSend from "@/app/dashboard/[organizationId]/button-send";

export default async function Page() {
   return (
      <div className="flex flex-col gap-4">
         <div>
            Hey welcome to the Dashboard of your organization
         </div>
         <ButtonSend />
      </div>
   );
}
