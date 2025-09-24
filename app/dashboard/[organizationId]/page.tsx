
export default async function Page() {
   const res = process.env.RAILWAY_PUBLIC_DOMAIN;

   return (
      <div className="flex flex-col gap-4">
         <div>
            Hey welcome to the Dashboard of your organization
            {res}

         </div>
      </div>
   );
}
