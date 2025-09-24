export default async function Page() {
   const res = process.env.RAILWAY_PUBLIC_DOMAIN;
   return (
       <div>
          Hey welcome to the Dashboard of your organization
          {res}
       </div>
   )
}